import { packages, pricingRules, rewardRules } from "../app-framework/prototype/src/config/credits.js";
import { createWallet } from "../app-framework/prototype/src/services/wallet.js";
import { verifiedSigninRoute } from "../app-framework/prototype/src/routes/auth-routes.js";
import { grantFoundingUserRewardRoute, grantSignupRewardRoute } from "../app-framework/prototype/src/routes/wallet-routes.js";
import { estimateTaskRoute, confirmTaskRoute, runTaskRoute } from "../app-framework/prototype/src/routes/task-routes.js";
import {
  createGatewayAdapter,
  createMockGatewayAdapter
} from "../app-framework/prototype/src/providers/gateway-adapter.js";
import { createSupabaseStore } from "./supabase-store.js";

const state = globalThis.__ARABAI_VERCEL_DEMO_STATE__ || {
  user: null,
  wallet: createWallet(0),
  registrationCount: 57,
  foundingRewardCount: 57,
  tasks: new Map()
};

globalThis.__ARABAI_VERCEL_DEMO_STATE__ = state;
rewardRules.foundingUserCampaign.enabled = process.env.ENABLE_FOUNDING_USER_CAMPAIGN !== "false";

const adapter = createRuntimeAdapter();
const store = process.env.ENABLE_SUPABASE_STORE === "true" ? createSupabaseStore() : null;

export default async function handler(req, res) {
  try {
    const path = new URL(req.url, "https://arabai.top").pathname;

    if (store?.isReady) {
      return handlePersistedRequest(req, res, path);
    }

    return handleDemoRequest(req, res, path);
  } catch (error) {
    return json(
      res,
      {
        error: {
          code: "SERVER_ERROR",
          message: error instanceof Error ? error.message : "Unknown error"
        }
      },
      500
    );
  }
}

async function handlePersistedRequest(req, res, path) {
  if (path === "/api/me" && req.method === "GET") {
    const session = await loadPersistedSession(req);
    if (!session.user) {
      return json(res, {
        user: null,
        wallet: walletView(createWallet(0)),
        flags: {
          realRecharge: false,
          aiRedemption: false,
          requiresSignin: true,
          persisted: true
        }
      });
    }

    return json(res, {
      user: userView(session.user),
      wallet: walletView(session.wallet),
      flags: {
        realRecharge: false,
        aiRedemption: true,
        persisted: true
      }
    });
  }

  if (path === "/api/auth/verified-signin" && req.method === "POST") {
    const body = await readJson(req);
    if (!body.email && !body.phone) {
      return json(res, { error: { code: "CONTACT_REQUIRED", message: "Email or phone is required." } }, 400);
    }

    const sessionUserId = readCookie(req, "arabai_user_id");
    let userRow = sessionUserId ? await store.findUserById(sessionUserId) : null;
    userRow ||= await store.findUserByEmailOrPhone({
      email: normalizeText(body.email),
      phone: normalizeText(body.phone)
    });

    let isNewUser = false;
    if (!userRow) {
      isNewUser = true;
      const registrationNumber = (await store.countUsers()) + 1;
      userRow = await store.createUser({
        id: crypto.randomUUID(),
        email: nullableText(body.email),
        phone: nullableText(body.phone),
        display_name: body.displayName || "ARABAI user",
        country: body.country || "SA",
        registration_number: registrationNumber,
        preferred_language: body.preferredLanguage || "ar",
        role: "user",
        referral_code: `arabai-${crypto.randomUUID().slice(0, 8)}`,
        signup_reward_granted: false,
        founding_user_reward_granted: false,
        last_login_at: new Date().toISOString()
      });
    } else {
      userRow = await store.updateUser(userRow.id, {
        display_name: body.displayName || userRow.display_name || "ARABAI user",
        email: nullableText(body.email) || userRow.email,
        phone: nullableText(body.phone) || userRow.phone,
        country: body.country || userRow.country || "SA",
        preferred_language: body.preferredLanguage || userRow.preferred_language || "ar",
        last_login_at: new Date().toISOString()
      });
    }

    const user = userFromRow(userRow);
    const wallet = await ensurePersistedWallet(user.id);
    const previousTransactionCount = wallet.transactions.length;

    if (!user.signupRewardGranted) {
      grantSignupRewardRoute({ wallet, user });
    }

    const foundingRewardCount = await store.countFoundingRewardsGranted();
    let foundingUserReward = {
      eligible: false,
      granted: false,
      credits: 0,
      remainingSlots: Math.max(rewardRules.foundingUserCampaign.maxUsers - foundingRewardCount, 0)
    };

    if (rewardRules.foundingUserCampaign.enabled && !user.foundingUserRewardGranted) {
      const eligible = foundingRewardCount < rewardRules.foundingUserCampaign.maxUsers;
      foundingUserReward = {
        eligible,
        granted: false,
        credits: eligible ? rewardRules.foundingUserCampaign.credits : 0,
        remainingSlots: Math.max(rewardRules.foundingUserCampaign.maxUsers - foundingRewardCount, 0)
      };
      if (eligible) {
        grantFoundingUserRewardRoute({ wallet, user, campaignCount: foundingRewardCount });
        foundingUserReward.granted = true;
      }
    }

    await persistWallet(user.id, wallet, previousTransactionCount);
    const savedUser = await store.updateUser(user.id, {
      signup_reward_granted: user.signupRewardGranted,
      founding_user_reward_granted: user.foundingUserRewardGranted,
      last_login_at: new Date().toISOString()
    });

    return json(
      res,
      {
        isNewUser,
        user: userView(userFromRow(savedUser || userRow)),
        wallet: walletView(wallet),
        foundingUserReward,
        message: foundingUserReward.granted
          ? `You are ARABAI user #${user.registrationNumber}. Your early user trial credits have been added.`
          : `You are ARABAI user #${user.registrationNumber}.`
      },
      200,
      { "set-cookie": sessionCookie(user.id) }
    );
  }

  if (path === "/api/wallet/packages" && req.method === "GET") {
    return json(res, { packages: packageView() });
  }

  if (path === "/api/wallet" && req.method === "GET") {
    const session = await requirePersistedSession(req, res);
    if (!session) return;
    return json(res, walletView(session.wallet));
  }

  if (path === "/api/wallet/transactions" && req.method === "GET") {
    const session = await requirePersistedSession(req, res);
    if (!session) return;
    return json(res, { transactions: session.wallet.transactions.slice(-50).reverse() });
  }

  if (path === "/api/tasks/pricing" && req.method === "GET") {
    return json(res, { rules: pricingRules.filter((rule) => rule.enabled !== false) });
  }

  if (path === "/api/tasks/estimate" && req.method === "POST") {
    const body = await readJson(req);
    return json(res, estimateTaskRoute(body));
  }

  if (path === "/api/tasks/confirm" && req.method === "POST") {
    const session = await requirePersistedSession(req, res);
    if (!session) return;

    const body = await readJson(req);
    const previousTransactionCount = session.wallet.transactions.length;
    const task = confirmTaskRoute({
      wallet: session.wallet,
      requestBody: body,
      taskId: crypto.randomUUID()
    });

    await store.insertTask(taskRowFromRequest(session.user.id, task, body));

    const completed = await runTaskRoute({
      wallet: session.wallet,
      task,
      requestBody: body,
      adapter
    });

    await persistWallet(session.user.id, session.wallet, previousTransactionCount);
    await store.updateTask(completed.id, taskCompletionPatch(completed));

    return json(res, {
      taskId: completed.id,
      status: completed.status,
      estimatedCredits: completed.estimatedCredits,
      actualCredits: completed.actualCredits,
      outputText: completed.outputText,
      outputUrl: completed.outputUrl,
      wallet: walletView(session.wallet)
    });
  }

  if (path.startsWith("/api/tasks/") && req.method === "GET") {
    const taskId = path.split("/").pop();
    const task = await store.getTask(taskId);
    if (!task) return json(res, { error: { code: "NOT_FOUND", message: "Task not found." } }, 404);
    return json(res, task);
  }

  return json(res, { error: { code: "NOT_FOUND", message: "API route not found." } }, 404);
}

async function handleDemoRequest(req, res, path) {
  if (path === "/api/me" && req.method === "GET") {
    if (!state.user) {
      return json(res, {
        user: null,
        wallet: walletView(state.wallet),
        flags: {
          realRecharge: false,
          aiRedemption: false,
          requiresSignin: true
        }
      });
    }

    return json(res, {
      user: userView(state.user),
      wallet: walletView(state.wallet),
      flags: {
        realRecharge: false,
        aiRedemption: true
      }
    });
  }

  if (path === "/api/auth/verified-signin" && req.method === "POST") {
    const body = await readJson(req);
    const user =
      state.user ||
      {
        id: crypto.randomUUID(),
        email: body.email || "",
        phone: body.phone || "",
        displayName: body.displayName || "ARABAI user",
        country: body.country || "SA",
        preferredLanguage: body.preferredLanguage || "ar",
        verified: true,
        signupRewardGranted: false,
        foundingUserRewardGranted: false
      };

    if (!user.email && !user.phone) {
      return json(res, { error: { code: "CONTACT_REQUIRED", message: "Email or phone is required." } }, 400);
    }

    const result = verifiedSigninRoute({
      user,
      currentRegistrationCount: state.registrationCount,
      currentFoundingRewardCount: state.foundingRewardCount
    });

    if (result.isNewUser) state.registrationCount += 1;
    if (result.foundingUserReward.granted) state.foundingRewardCount += 1;

    state.user = user;
    state.wallet = result.wallet;
    return json(res, result);
  }

  if (path === "/api/wallet/packages" && req.method === "GET") {
    return json(res, { packages: packageView() });
  }

  if (path === "/api/wallet" && req.method === "GET") {
    return json(res, walletView(state.wallet));
  }

  if (path === "/api/wallet/transactions" && req.method === "GET") {
    return json(res, { transactions: state.wallet.transactions.slice(-50).reverse() });
  }

  if (path === "/api/tasks/pricing" && req.method === "GET") {
    return json(res, { rules: pricingRules.filter((rule) => rule.enabled !== false) });
  }

  if (path === "/api/tasks/estimate" && req.method === "POST") {
    const body = await readJson(req);
    return json(res, estimateTaskRoute(body));
  }

  if (path === "/api/tasks/confirm" && req.method === "POST") {
    if (!state.user) {
      return json(res, { error: { code: "AUTH_REQUIRED", message: "Sign in before running AI tasks." } }, 401);
    }

    const body = await readJson(req);
    const task = confirmTaskRoute({
      wallet: state.wallet,
      requestBody: body,
      taskId: crypto.randomUUID()
    });
    state.tasks.set(task.id, task);

    const completed = await runTaskRoute({
      wallet: state.wallet,
      task,
      requestBody: body,
      adapter
    });
    state.tasks.set(task.id, completed);

    return json(res, {
      taskId: completed.id,
      status: completed.status,
      estimatedCredits: completed.estimatedCredits,
      actualCredits: completed.actualCredits,
      outputText: completed.outputText,
      outputUrl: completed.outputUrl,
      wallet: walletView(state.wallet)
    });
  }

  if (path.startsWith("/api/tasks/") && req.method === "GET") {
    const taskId = path.split("/").pop();
    const task = state.tasks.get(taskId);
    if (!task) return json(res, { error: { code: "NOT_FOUND", message: "Task not found." } }, 404);
    return json(res, task);
  }

  return json(res, { error: { code: "NOT_FOUND", message: "API route not found." } }, 404);
}

async function loadPersistedSession(req) {
  const userId = readCookie(req, "arabai_user_id");
  if (!userId) return { user: null, wallet: createWallet(0) };
  const row = await store.findUserById(userId);
  if (!row) return { user: null, wallet: createWallet(0) };
  return {
    user: userFromRow(row),
    wallet: await ensurePersistedWallet(row.id)
  };
}

async function requirePersistedSession(req, res) {
  const session = await loadPersistedSession(req);
  if (!session.user) {
    json(res, { error: { code: "AUTH_REQUIRED", message: "Sign in before running AI tasks." } }, 401);
    return null;
  }
  return session;
}

async function ensurePersistedWallet(userId) {
  const row = await store.getWallet(userId);
  if (!row) {
    const wallet = createWallet(0);
    await store.upsertWallet(userId, wallet);
    return wallet;
  }

  const transactions = await store.listTransactions(userId);
  return {
    creditBalance: Number(row.credit_balance || 0),
    pendingCreditBalance: Number(row.pending_credit_balance || 0),
    redeemableCreditBalance: Number(row.redeemable_credit_balance || 0),
    reservedCreditBalance: Number(row.reserved_credit_balance || 0),
    transactions: transactions.map(transactionFromRow)
  };
}

async function persistWallet(userId, wallet, previousTransactionCount) {
  await store.upsertWallet(userId, wallet);
  const newTransactions = wallet.transactions.slice(previousTransactionCount);
  await store.insertTransactions(userId, newTransactions);
}

function userFromRow(row) {
  return {
    id: row.id,
    email: row.email || "",
    phone: row.phone || "",
    displayName: row.display_name || "ARABAI user",
    country: row.country || "SA",
    preferredLanguage: row.preferred_language || "ar",
    registrationNumber: row.registration_number,
    referralCode: row.referral_code || "arabai-demo",
    role: row.role || "user",
    verified: true,
    signupRewardGranted: Boolean(row.signup_reward_granted),
    foundingUserRewardGranted: Boolean(row.founding_user_reward_granted)
  };
}

function userView(user) {
  return {
    id: user.id,
    email: user.email,
    phone: user.phone,
    displayName: user.displayName,
    registrationNumber: user.registrationNumber,
    preferredLanguage: user.preferredLanguage || "ar",
    country: user.country || "SA",
    role: user.role || "user",
    referralCode: user.referralCode || "arabai-demo"
  };
}

function walletView(wallet) {
  return {
    creditBalance: wallet.creditBalance,
    pendingCreditBalance: wallet.pendingCreditBalance,
    redeemableCreditBalance: wallet.redeemableCreditBalance,
    reservedCreditBalance: wallet.reservedCreditBalance,
    transactions: wallet.transactions
  };
}

function packageView() {
  return packages.map((item) => ({
    id: item.id,
    label: item.label,
    priceAmount: item.priceAmount,
    currency: item.currency,
    credits: item.credits,
    status: item.enabled ? "available" : "coming_soon"
  }));
}

function transactionFromRow(row) {
  return {
    type: row.type,
    status: row.status,
    credits: Number(row.credits || 0),
    note: row.note || "",
    createdAt: row.created_at
  };
}

function taskRowFromRequest(userId, task, body) {
  return {
    id: task.id,
    user_id: userId,
    task_type: task.taskType,
    pricing_rule_id: task.pricingRuleId,
    status: task.status,
    estimated_credits: task.estimatedCredits,
    reserved_credits: task.reservedCredits,
    input_summary: body.prompt.slice(0, 500),
    created_at: new Date().toISOString()
  };
}

function taskCompletionPatch(task) {
  return {
    status: task.status,
    actual_credits: task.actualCredits || null,
    provider_cost_amount: task.providerCost?.amount || null,
    provider_cost_currency: task.providerCost?.currency || null,
    output_text: task.outputText || null,
    output_url: task.outputUrl || null,
    error_message: task.errorMessage || null,
    completed_at: task.completedAt || new Date().toISOString()
  };
}

function createRuntimeAdapter() {
  if (process.env.USE_REAL_AI_GATEWAY === "true") {
    return createGatewayAdapter({
      baseUrl: process.env.AI_GATEWAY_BASE_URL,
      apiKey: process.env.AI_GATEWAY_API_KEY,
      defaultTextModel: process.env.AI_GATEWAY_TEXT_MODEL || process.env.AI_MODEL_DEFAULT_CHAT,
      defaultImageModel: process.env.AI_GATEWAY_IMAGE_MODEL || process.env.AI_MODEL_IMAGE,
      timeoutMs: Number(process.env.AI_GATEWAY_TIMEOUT_MS || 60000)
    });
  }

  return createMockGatewayAdapter();
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function nullableText(value) {
  const text = normalizeText(value);
  return text || null;
}

function readCookie(req, name) {
  const cookieHeader = req.headers?.cookie || "";
  const cookies = cookieHeader.split(";").map((part) => part.trim());
  const pair = cookies.find((item) => item.startsWith(`${name}=`));
  if (!pair) return "";
  return decodeURIComponent(pair.slice(name.length + 1));
}

function sessionCookie(userId) {
  return `arabai_user_id=${encodeURIComponent(userId)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`;
}

function json(res, payload, status = 200, headers = {}) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }
  res.end(JSON.stringify(payload, null, 2));
}
