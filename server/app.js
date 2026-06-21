import { randomUUID } from "node:crypto";
import { createSupabaseStore } from "./supabase-store.js";

const packages = [
  { id: "sa_starter_10", label: "Saudi Starter", priceAmount: 10, currency: "SAR", credits: 100, maxProviderCostAmount: 5, enabled: false },
  { id: "usd_starter_5", label: "USD Starter", priceAmount: 5, currency: "USD", credits: 185, maxProviderCostAmount: 2.5, enabled: false },
  { id: "sa_regular_25", label: "Saudi Regular", priceAmount: 25, currency: "SAR", credits: 250, maxProviderCostAmount: 12.5, enabled: false },
  { id: "usd_regular_10", label: "USD Regular", priceAmount: 10, currency: "USD", credits: 370, maxProviderCostAmount: 5, enabled: false },
  { id: "sa_creative_50", label: "Saudi Creative", priceAmount: 50, currency: "SAR", credits: 500, maxProviderCostAmount: 25, enabled: false },
  { id: "usd_creative_20", label: "USD Creative", priceAmount: 20, currency: "USD", credits: 740, maxProviderCostAmount: 10, enabled: false }
];

const rewardRules = {
  foundingUserCampaign: { enabled: false, maxUsers: 100, credits: 100, sarValue: 10, usdReferenceValue: 5, requiresVerification: true },
  signupVerified: { credits: 20, sarValue: 2, requiresVerification: true },
  dailyLogin: { minCredits: 1, maxCredits: 2, weeklyCap: 10 },
  referralVerifiedRegistration: { credits: 20, sarValue: 2, requiresVerification: true }
};

const pricingRules = [
  { id: "premium_short_chat", taskType: "chat", label: "Premium short chat", minCredits: 2, maxCredits: 2, costLevel: "low", freeCreditsAllowed: true, requiresConfirmation: false },
  { id: "prompt_improvement", taskType: "prompt", label: "Prompt improvement", minCredits: 2, maxCredits: 2, costLevel: "low", freeCreditsAllowed: true, requiresConfirmation: false },
  { id: "premium_long_answer", taskType: "chat", label: "Premium long answer", minCredits: 5, maxCredits: 5, costLevel: "medium", freeCreditsAllowed: true, requiresConfirmation: true },
  { id: "long_document_summary", taskType: "document", label: "Long document summary", minCredits: 10, maxCredits: 20, costLevel: "medium", freeCreditsAllowed: false, requiresConfirmation: true },
  { id: "table_file_analysis", taskType: "document", label: "Table/file analysis", minCredits: 10, maxCredits: 20, costLevel: "medium", freeCreditsAllowed: false, requiresConfirmation: true },
  { id: "image_prompt_review", taskType: "image", label: "Image prompt and review", minCredits: 3, maxCredits: 3, costLevel: "low", freeCreditsAllowed: true, requiresConfirmation: false },
  { id: "image_generation_low", taskType: "image", label: "Low-tier image generation", minCredits: 20, maxCredits: 40, costLevel: "medium", freeCreditsAllowed: true, requiresConfirmation: true, freeCreditDailyCap: 1 },
  { id: "image_generation_high", taskType: "image", label: "High-tier image generation", minCredits: 50, maxCredits: 80, costLevel: "high", freeCreditsAllowed: false, requiresConfirmation: true },
  { id: "image_edit", taskType: "image", label: "Image edit", minCredits: 40, maxCredits: 80, costLevel: "high", freeCreditsAllowed: false, requiresConfirmation: true },
  { id: "ppt_outline", taskType: "slides", label: "PPT outline", minCredits: 8, maxCredits: 15, costLevel: "medium", freeCreditsAllowed: true, requiresConfirmation: true },
  { id: "ppt_first_draft", taskType: "slides", label: "PPT first draft", minCredits: 30, maxCredits: 60, costLevel: "medium", freeCreditsAllowed: false, requiresConfirmation: true },
  { id: "video_script", taskType: "video", label: "Video script", minCredits: 8, maxCredits: 15, costLevel: "medium", freeCreditsAllowed: true, requiresConfirmation: true },
  { id: "storyboard_text", taskType: "video", label: "9-grid storyboard text", minCredits: 15, maxCredits: 25, costLevel: "medium", freeCreditsAllowed: false, requiresConfirmation: true },
  { id: "storyboard_images", taskType: "video", label: "9-grid storyboard images", minCredits: 120, maxCredits: 250, costLevel: "high", freeCreditsAllowed: false, requiresConfirmation: true },
  { id: "video_generation_short", taskType: "video", label: "Short video generation", minCredits: 0, maxCredits: 0, costLevel: "manual", freeCreditsAllowed: false, requiresConfirmation: true, enabled: false, comingSoon: true },
  { id: "music_generation", taskType: "music", label: "Music generation", minCredits: 30, maxCredits: 80, costLevel: "high", freeCreditsAllowed: false, requiresConfirmation: true }
];

const launchTaskRuleIds = ["premium_short_chat", "prompt_improvement", "premium_long_answer", "image_prompt_review"];

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
const allowedLaunchTaskIds = new Set(
  (process.env.ARABAI_ENABLED_TASKS || launchTaskRuleIds.join(","))
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
);

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
  if (path === "/api/health" && req.method === "GET") {
    return json(res, healthView(true));
  }

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
    console.log("[arabai] verified-signin:start", {
      hasEmail: Boolean(body.email),
      hasPhone: Boolean(body.phone),
      country: body.country || "",
      language: body.preferredLanguage || ""
    });
    if (!body.email && !body.phone) {
      return json(res, { error: { code: "CONTACT_REQUIRED", message: "Email or phone is required." } }, 400);
    }

    const sessionUserId = readCookie(req, "arabai_user_id");
    let userRow = sessionUserId ? await store.findUserById(sessionUserId) : null;
    userRow ||= await store.findUserByEmailOrPhone({
      email: normalizeText(body.email),
      phone: normalizeText(body.phone)
    });

    const referralCode = normalizeText(body.referralCode);
    let isNewUser = false;
    let referrerRow = null;
    if (!userRow) {
      isNewUser = true;
      const registrationNumber = (await store.countUsers()) + 1;
      if (referralCode) {
        referrerRow = await store.findUserByReferralCode(referralCode);
      }
      userRow = await store.createUser({
        id: randomUUID(),
        email: nullableText(body.email),
        phone: nullableText(body.phone),
        display_name: body.displayName || "ARABAI user",
        country: body.country || "SA",
        registration_number: registrationNumber,
        preferred_language: body.preferredLanguage || "ar",
        role: "user",
        referral_code: `arabai-${randomUUID().slice(0, 8)}`,
        referred_by_user_id: referrerRow?.id || null,
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

    if (isNewUser && referrerRow && referrerRow.id !== user.id) {
      const referrer = userFromRow(referrerRow);
      const referrerWallet = await ensurePersistedWallet(referrer.id);
      const referrerPreviousCount = referrerWallet.transactions.length;
      grantReferralRegistrationRewardRoute({
        wallet: referrerWallet,
        referrer,
        referredUser: user
      });
      await persistWallet(referrer.id, referrerWallet, referrerPreviousCount);
      await store.createReferral({
        id: randomUUID(),
        referrer_user_id: referrer.id,
        referred_user_id: user.id,
        status: "rewarded",
        reward_credits: rewardRules.referralVerifiedRegistration.credits,
        created_at: new Date().toISOString(),
        verified_at: new Date().toISOString(),
        rewarded_at: new Date().toISOString()
      });
    }

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

  if (path === "/api/auth/sign-out" && req.method === "POST") {
    return json(
      res,
      { ok: true, message: "Signed out." },
      200,
      { "set-cookie": expiredSessionCookie() }
    );
  }

  if (path === "/api/wallet/packages" && req.method === "GET") {
    return json(res, { packages: packageView() });
  }

  if (path === "/api/wallet/top-up/create-checkout" && req.method === "POST") {
    return json(res, featureDisabledResponse("Recharge is not open yet."));
  }

  if (path === "/api/wallet" && req.method === "GET") {
    const session = await requirePersistedSession(req, res);
    if (!session) return;
    return json(res, walletView(session.wallet));
  }

  if (path === "/api/wallet/claim-daily-login" && req.method === "POST") {
    const session = await requirePersistedSession(req, res);
    if (!session) return;
    try {
      const previousTransactionCount = session.wallet.transactions.length;
      const result = claimDailyLoginRewardRoute({
        wallet: session.wallet,
        user: session.user
      });
      await persistWallet(session.user.id, session.wallet, previousTransactionCount);
      return json(res, {
        ok: true,
        credits: result.credits,
        wallet: walletView(session.wallet)
      });
    } catch (error) {
      return json(res, { error: { code: "DAILY_REWARD_BLOCKED", message: error.message } }, 400);
    }
  }

  if (path === "/api/wallet/transactions" && req.method === "GET") {
    const session = await requirePersistedSession(req, res);
    if (!session) return;
    return json(res, { transactions: session.wallet.transactions.slice(-50).reverse() });
  }

  if (path === "/api/tasks/pricing" && req.method === "GET") {
    return json(res, { rules: pricingRules.filter((rule) => rule.enabled !== false) });
  }

  if (path === "/api/tasks" && req.method === "GET") {
    const session = await requirePersistedSession(req, res);
    if (!session) return;
    const tasks = await store.listTasks(session.user.id, 20);
    return json(res, { tasks: tasks.map(taskListView) });
  }

  if (path === "/api/tasks/estimate" && req.method === "POST") {
    const body = await readJson(req);
    if (!taskAllowed(body.pricingRuleId)) {
      return json(res, unavailableTask(body.pricingRuleId), 400);
    }
    return json(res, estimateTaskRoute(body));
  }

  if (path === "/api/tasks/confirm" && req.method === "POST") {
    const session = await requirePersistedSession(req, res);
    if (!session) return;

    const body = await readJson(req);
    if (process.env.ENABLE_AI_REDEMPTION !== "true") {
      return json(res, featureDisabledResponse("Paid AI tasks are not open yet."), 403);
    }
    if (!taskAllowed(body.pricingRuleId)) {
      return json(res, unavailableTask(body.pricingRuleId), 400);
    }
    const estimate = estimateTaskRoute(body);
    const dailyCapError = validateDailySpendCap(session.wallet, estimate.estimatedCredits);
    if (dailyCapError) {
      return json(res, { error: { code: "DAILY_SPEND_CAP", message: dailyCapError } }, 400);
    }
    const previousTransactionCount = session.wallet.transactions.length;
    const task = confirmTaskRoute({
      wallet: session.wallet,
      requestBody: body,
      taskId: randomUUID()
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

  if (path === "/api/outbound-clicks" && req.method === "POST") {
    const body = await readJson(req);
    return json(res, outboundClickAccepted(body, true), 202);
  }

  if (path === "/api/recharge-exposure" && req.method === "POST") {
    const body = await readJson(req);
    return json(res, rechargeExposureAccepted(body, true), 202);
  }

  return json(res, { error: { code: "NOT_FOUND", message: "API route not found." } }, 404);
}

async function handleDemoRequest(req, res, path) {
  if (path === "/api/health" && req.method === "GET") {
    return json(res, healthView(false));
  }

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
    console.log("[arabai] verified-signin:demo-start", {
      hasEmail: Boolean(body.email),
      hasPhone: Boolean(body.phone),
      country: body.country || "",
      language: body.preferredLanguage || ""
    });
    const user =
      state.user ||
      {
        id: randomUUID(),
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

  if (path === "/api/auth/sign-out" && req.method === "POST") {
    state.user = null;
    state.wallet = createWallet(0);
    state.tasks.clear();
    return json(res, { ok: true, message: "Signed out." });
  }

  if (path === "/api/wallet/packages" && req.method === "GET") {
    return json(res, { packages: packageView() });
  }

  if (path === "/api/wallet/top-up/create-checkout" && req.method === "POST") {
    return json(res, featureDisabledResponse("Recharge is not open yet."));
  }

  if (path === "/api/wallet" && req.method === "GET") {
    return json(res, walletView(state.wallet));
  }

  if (path === "/api/wallet/claim-daily-login" && req.method === "POST") {
    if (!state.user) {
      return json(res, { error: { code: "AUTH_REQUIRED", message: "Sign in before claiming rewards." } }, 401);
    }
    try {
      const result = claimDailyLoginRewardRoute({
        wallet: state.wallet,
        user: state.user
      });
      return json(res, { ok: true, credits: result.credits, wallet: walletView(state.wallet) });
    } catch (error) {
      return json(res, { error: { code: "DAILY_REWARD_BLOCKED", message: error.message } }, 400);
    }
  }

  if (path === "/api/wallet/transactions" && req.method === "GET") {
    return json(res, { transactions: state.wallet.transactions.slice(-50).reverse() });
  }

  if (path === "/api/tasks/pricing" && req.method === "GET") {
    return json(res, { rules: pricingRules.filter((rule) => rule.enabled !== false) });
  }

  if (path === "/api/tasks" && req.method === "GET") {
    if (!state.user) {
      return json(res, { error: { code: "AUTH_REQUIRED", message: "Sign in before viewing task history." } }, 401);
    }
    return json(res, { tasks: [...state.tasks.values()].map(taskListView).reverse() });
  }

  if (path === "/api/tasks/estimate" && req.method === "POST") {
    const body = await readJson(req);
    if (!taskAllowed(body.pricingRuleId)) {
      return json(res, unavailableTask(body.pricingRuleId), 400);
    }
    return json(res, estimateTaskRoute(body));
  }

  if (path === "/api/tasks/confirm" && req.method === "POST") {
    if (!state.user) {
      return json(res, { error: { code: "AUTH_REQUIRED", message: "Sign in before running AI tasks." } }, 401);
    }

    const body = await readJson(req);
    if (process.env.ENABLE_AI_REDEMPTION !== "true") {
      return json(res, featureDisabledResponse("Paid AI tasks are not open yet."), 403);
    }
    if (!taskAllowed(body.pricingRuleId)) {
      return json(res, unavailableTask(body.pricingRuleId), 400);
    }
    const estimate = estimateTaskRoute(body);
    const dailyCapError = validateDailySpendCap(state.wallet, estimate.estimatedCredits);
    if (dailyCapError) {
      return json(res, { error: { code: "DAILY_SPEND_CAP", message: dailyCapError } }, 400);
    }
    const task = confirmTaskRoute({
      wallet: state.wallet,
      requestBody: body,
      taskId: randomUUID()
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

  if (path === "/api/outbound-clicks" && req.method === "POST") {
    const body = await readJson(req);
    return json(res, outboundClickAccepted(body, false), 202);
  }

  if (path === "/api/recharge-exposure" && req.method === "POST") {
    const body = await readJson(req);
    return json(res, rechargeExposureAccepted(body, false), 202);
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

function taskListView(task) {
  return {
    id: task.id,
    status: task.status,
    taskType: task.task_type || task.taskType,
    pricingRuleId: task.pricing_rule_id || task.pricingRuleId,
    estimatedCredits: Number(task.estimated_credits ?? task.estimatedCredits ?? 0),
    actualCredits: task.actual_credits ?? task.actualCredits ?? null,
    outputText: task.output_text ?? task.outputText ?? null,
    outputUrl: task.output_url ?? task.outputUrl ?? null,
    createdAt: task.created_at || task.createdAt || null,
    completedAt: task.completed_at || task.completedAt || null
  };
}

function featureDisabledResponse(message) {
  return {
    status: "coming_soon",
    error: {
      code: "FEATURE_DISABLED",
      message
    }
  };
}

function outboundClickAccepted(body, persisted) {
  return {
    accepted: true,
    persisted,
    articleId: normalizeText(body?.articleId) || null,
    linkLabel: normalizeText(body?.linkLabel) || null,
    targetUrl: normalizeText(body?.targetUrl) || null
  };
}

function rechargeExposureAccepted(body, persisted) {
  return {
    accepted: true,
    persisted,
    articleId: normalizeText(body?.articleId) || null,
    shown: Boolean(body?.shown),
    anonymousBucket: Number.isFinite(Number(body?.anonymousBucket)) ? Number(body.anonymousBucket) : null
  };
}

function healthView(persisted) {
  return {
    ok: true,
    mode: persisted ? "supabase" : "demo",
    features: {
      recharge: process.env.ENABLE_REAL_RECHARGE === "true",
      aiRedemption: process.env.ENABLE_AI_REDEMPTION === "true",
      realGateway: process.env.USE_REAL_AI_GATEWAY === "true"
    },
    debug: {
      enableSupabaseStore: process.env.ENABLE_SUPABASE_STORE === "true",
      supabaseUrlPresent: Boolean(process.env.SUPABASE_URL),
      supabaseServiceRoleKeyPresent: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      storeReady: Boolean(store?.isReady)
    }
  };
}

function createRuntimeAdapter() {
  if (process.env.USE_REAL_AI_GATEWAY === "true") {
    if (!process.env.AI_GATEWAY_BASE_URL || !process.env.AI_GATEWAY_API_KEY) {
      return createMockGatewayAdapter();
    }

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

function createWallet(initialCredits = 0) {
  return {
    creditBalance: initialCredits,
    pendingCreditBalance: 0,
    redeemableCreditBalance: initialCredits,
    reservedCreditBalance: 0,
    transactions: []
  };
}

function addCredits(wallet, transaction) {
  requirePositiveCredits(transaction.credits);
  wallet.creditBalance += transaction.credits;
  wallet.redeemableCreditBalance += transaction.credits;
  wallet.transactions.push({
    ...transaction,
    status: transaction.status || "available",
    createdAt: transaction.createdAt || new Date().toISOString()
  });
  return wallet;
}

function reserveCredits(wallet, taskId, credits) {
  requirePositiveCredits(credits);
  if (wallet.redeemableCreditBalance < credits) {
    throw new Error("Not enough redeemable credits.");
  }
  wallet.redeemableCreditBalance -= credits;
  wallet.reservedCreditBalance += credits;
  wallet.transactions.push({
    type: "reserve",
    taskId,
    credits,
    status: "reserved",
    createdAt: new Date().toISOString()
  });
  return wallet;
}

function completeReservedSpend(wallet, taskId, reservedCredits, actualCredits = reservedCredits) {
  requirePositiveCredits(reservedCredits);
  requirePositiveCredits(actualCredits);
  if (actualCredits > reservedCredits) throw new Error("Actual credits cannot exceed reserved credits.");
  if (wallet.reservedCreditBalance < reservedCredits) throw new Error("Not enough reserved credits.");

  wallet.reservedCreditBalance -= reservedCredits;
  wallet.creditBalance -= actualCredits;

  const releasedCredits = reservedCredits - actualCredits;
  if (releasedCredits > 0) {
    wallet.redeemableCreditBalance += releasedCredits;
  }

  wallet.transactions.push({
    type: "spend",
    taskId,
    credits: actualCredits,
    status: "spent",
    createdAt: new Date().toISOString()
  });

  if (releasedCredits > 0) {
    wallet.transactions.push({
      type: "release",
      taskId,
      credits: releasedCredits,
      status: "available",
      createdAt: new Date().toISOString()
    });
  }

  return wallet;
}

function failReservedTask(wallet, taskId, reservedCredits) {
  requirePositiveCredits(reservedCredits);
  if (wallet.reservedCreditBalance < reservedCredits) {
    throw new Error("Not enough reserved credits.");
  }
  wallet.reservedCreditBalance -= reservedCredits;
  wallet.redeemableCreditBalance += reservedCredits;
  wallet.transactions.push({
    type: "refund",
    taskId,
    credits: reservedCredits,
    status: "available",
    createdAt: new Date().toISOString()
  });
  return wallet;
}

function grantSignupRewardRoute({ wallet, user }) {
  if (!user.verified) throw new Error("User must verify email or phone before signup reward.");
  if (user.signupRewardGranted) throw new Error("Signup reward already granted.");
  addCredits(wallet, {
    type: "signup_reward",
    credits: rewardRules.signupVerified.credits,
    note: "Verified signup reward"
  });
  user.signupRewardGranted = true;
  return wallet;
}

function grantFoundingUserRewardRoute({ wallet, user, campaignCount }) {
  const rule = rewardRules.foundingUserCampaign;
  if (!rule.enabled) throw new Error("Founding user campaign is not enabled.");
  if (!user.verified) throw new Error("User must verify email or phone before founding user reward.");
  if (user.foundingUserRewardGranted) throw new Error("Founding user reward already granted.");
  if (campaignCount >= rule.maxUsers) throw new Error("Founding user campaign limit reached.");
  addCredits(wallet, {
    type: "founding_user_reward",
    credits: rule.credits,
    note: "First 100 verified users starter credit campaign"
  });
  user.foundingUserRewardGranted = true;
  return wallet;
}

function claimDailyLoginRewardRoute({ wallet, user, now = new Date() }) {
  if (!user?.verified) throw new Error("User must verify email or phone before daily reward.");
  const todayKey = now.toISOString().slice(0, 10);
  const dailyTransactions = wallet.transactions.filter((item) => item.type === "daily_login_reward");
  if (dailyTransactions.some((item) => String(item.createdAt || "").slice(0, 10) === todayKey)) {
    throw new Error("Daily login reward already claimed today.");
  }
  const weekStart = startOfWeek(now);
  const weekCredits = dailyTransactions.reduce((sum, item) => {
    const createdAt = new Date(item.createdAt || 0);
    if (Number.isNaN(createdAt.getTime()) || createdAt < weekStart) return sum;
    return sum + Number(item.credits || 0);
  }, 0);
  if (weekCredits >= rewardRules.dailyLogin.weeklyCap) {
    throw new Error("Weekly daily-login reward cap reached.");
  }
  const remainingWeeklyCredits = rewardRules.dailyLogin.weeklyCap - weekCredits;
  const credits = Math.max(
    rewardRules.dailyLogin.minCredits,
    Math.min(rewardRules.dailyLogin.maxCredits, remainingWeeklyCredits)
  );
  addCredits(wallet, {
    type: "daily_login_reward",
    credits,
    note: "Daily login reward",
    createdAt: now.toISOString()
  });
  return { credits, wallet };
}

function grantReferralRegistrationRewardRoute({ wallet, referrer, referredUser, now = new Date() }) {
  if (!referrer?.verified) throw new Error("Referrer must be verified.");
  if (!referredUser?.verified) throw new Error("Referred user must be verified.");
  addCredits(wallet, {
    type: "referral_reward",
    credits: rewardRules.referralVerifiedRegistration.credits,
    note: `Verified referral reward for user #${referredUser.registrationNumber || "new"}`,
    createdAt: now.toISOString()
  });
  return { credits: rewardRules.referralVerifiedRegistration.credits, wallet };
}

function verifiedSigninRoute({ user, currentRegistrationCount, currentFoundingRewardCount }) {
  if (!user.verified) throw new Error("User must verify email or phone before registration is completed.");
  const isNewUser = !user.registrationNumber;
  if (isNewUser) user.registrationNumber = currentRegistrationCount + 1;
  const wallet = user.wallet || createWallet(0);
  if (!user.signupRewardGranted) {
    grantSignupRewardRoute({ wallet, user });
  }
  const rule = rewardRules.foundingUserCampaign;
  let foundingUserReward = {
    eligible: false,
    granted: false,
    credits: 0,
    remainingSlots: Math.max(rule.maxUsers - currentFoundingRewardCount, 0)
  };
  if (rule.enabled && !user.foundingUserRewardGranted) {
    const eligibleByCount = currentFoundingRewardCount < rule.maxUsers;
    foundingUserReward = {
      eligible: eligibleByCount,
      granted: false,
      credits: eligibleByCount ? rule.credits : 0,
      remainingSlots: Math.max(rule.maxUsers - currentFoundingRewardCount, 0)
    };
    if (eligibleByCount) {
      grantFoundingUserRewardRoute({ wallet, user, campaignCount: currentFoundingRewardCount });
      foundingUserReward.granted = true;
    }
  }
  user.wallet = wallet;
  return {
    isNewUser,
    user: {
      id: user.id,
      email: user.email,
      phone: user.phone,
      displayName: user.displayName,
      country: user.country,
      preferredLanguage: user.preferredLanguage,
      registrationNumber: user.registrationNumber,
      verified: user.verified
    },
    wallet,
    foundingUserReward,
    message: foundingUserReward.granted
      ? `You are ARABAI user #${user.registrationNumber}. Your early user trial credits have been added.`
      : `You are ARABAI user #${user.registrationNumber}.`
  };
}

function estimateTaskRoute(requestBody) {
  validateTaskRequest(requestBody);
  return estimateTask(requestBody);
}

function confirmTaskRoute({ wallet, requestBody, taskId }) {
  validateTaskRequest(requestBody);
  return confirmTask({ wallet, input: requestBody, taskId });
}

async function runTaskRoute({ wallet, task, adapter, requestBody }) {
  try {
    const providerResult =
      requestBody.taskType === "image"
        ? await adapter.runImageTask(requestBody)
        : await adapter.runTextTask(requestBody);
    return completeTask({ wallet, task, providerResult });
  } catch (error) {
    return failTask({
      wallet,
      task,
      errorMessage: error instanceof Error ? error.message : "Unknown provider error"
    });
  }
}

function estimateTask(input) {
  return estimateTaskCredits(input);
}

function confirmTask({ wallet, input, taskId }) {
  const estimate = estimateTask(input);
  if (!estimate.available) throw new Error(estimate.message);
  reserveCredits(wallet, taskId, estimate.estimatedCredits);
  return {
    id: taskId,
    status: shouldQueue(estimate.taskType) ? "queued" : "confirmed",
    pricingRuleId: estimate.pricingRuleId,
    taskType: estimate.taskType,
    estimatedCredits: estimate.estimatedCredits,
    reservedCredits: estimate.estimatedCredits,
    requiresQueue: shouldQueue(estimate.taskType)
  };
}

function completeTask({ wallet, task, providerResult }) {
  const actualCredits = providerResult.actualCredits || task.reservedCredits;
  completeReservedSpend(wallet, task.id, task.reservedCredits, actualCredits);
  return {
    ...task,
    status: "completed",
    actualCredits,
    providerCost: providerResult.providerCost,
    outputText: providerResult.outputText,
    outputUrl: providerResult.outputUrl,
    completedAt: new Date().toISOString()
  };
}

function failTask({ wallet, task, errorMessage }) {
  failReservedTask(wallet, task.id, task.reservedCredits);
  return {
    ...task,
    status: "refunded",
    errorMessage,
    completedAt: new Date().toISOString()
  };
}

function estimateTaskCredits(input) {
  const rule = getPricingRule(input.pricingRuleId);
  if (rule.enabled === false || rule.comingSoon) {
    return {
      pricingRuleId: rule.id,
      taskType: rule.taskType,
      estimatedCredits: null,
      costLevel: rule.costLevel,
      requiresConfirmation: true,
      freeCreditsAllowed: false,
      available: false,
      message: `${rule.label} is coming soon.`
    };
  }
  const complexity = estimateComplexity(input);
  const estimatedCredits = clamp(
    Math.ceil(rule.minCredits + (rule.maxCredits - rule.minCredits) * complexity),
    rule.minCredits,
    rule.maxCredits
  );
  return {
    pricingRuleId: rule.id,
    taskType: rule.taskType,
    estimatedCredits,
    costLevel: rule.costLevel,
    requiresConfirmation: rule.requiresConfirmation,
    freeCreditsAllowed: rule.freeCreditsAllowed,
    available: true,
    message: buildEstimateMessage(rule, estimatedCredits)
  };
}

function getPricingRule(pricingRuleId) {
  const rule = pricingRules.find((item) => item.id === pricingRuleId);
  if (!rule) throw new Error(`Unknown pricing rule: ${pricingRuleId}`);
  return rule;
}

function estimateComplexity(input) {
  const promptLength = typeof input.prompt === "string" ? input.prompt.length : 0;
  const fileCount = Number(input.options?.fileCount || 0);
  const count = Number(input.options?.count || 1);
  const quality = input.options?.quality;
  let score = 0;
  if (promptLength > 800) score += 0.25;
  if (promptLength > 2000) score += 0.25;
  if (fileCount > 0) score += 0.25;
  if (count > 1) score += 0.2;
  if (quality === "high") score += 0.3;
  return clamp(score, 0, 1);
}

function buildEstimateMessage(rule, estimatedCredits) {
  if (rule.costLevel === "low") return `This paid AI task may use about ${estimatedCredits} credits.`;
  if (rule.costLevel === "medium") return `This task may use about ${estimatedCredits} credits. Please confirm before running.`;
  if (rule.costLevel === "high") return `This is a high-cost paid AI task and may use about ${estimatedCredits} credits.`;
  return "This task needs manual pricing or is coming soon.";
}

function shouldQueue(taskType) {
  return ["image", "video", "music", "slides", "document"].includes(taskType);
}

function validateTaskRequest(requestBody) {
  if (!requestBody || typeof requestBody !== "object") throw new Error("Task request body is required.");
  if (!requestBody.pricingRuleId) throw new Error("pricingRuleId is required.");
  if (!requestBody.taskType) throw new Error("taskType is required.");
  if (!requestBody.prompt || typeof requestBody.prompt !== "string") throw new Error("prompt is required.");
}

function createGatewayAdapter({
  baseUrl,
  apiKey,
  defaultTextModel = "gpt-4o-mini",
  defaultImageModel = "gpt-image-1",
  timeoutMs = 60000
}) {
  if (!baseUrl || !apiKey) return createDisabledAdapter();
  return {
    async runTextTask(input) {
      const startedAt = Date.now();
      const model = input.options?.model || defaultTextModel;
      const response = await fetch(withPath(baseUrl, "/v1/chat/completions"), {
        method: "POST",
        headers: {
          authorization: `Bearer ${apiKey}`,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          model,
          messages: buildMessages(input),
          temperature: input.options?.temperature ?? 0.4
        }),
        signal: AbortSignal.timeout(timeoutMs)
      });
      const data = await parseProviderResponse(response);
      const outputText = data.choices?.[0]?.message?.content || "";
      return {
        outputText,
        providerCost: readProviderCost(data),
        providerMeta: { model, usage: data.usage, latencyMs: Date.now() - startedAt }
      };
    },
    async runImageTask(input) {
      const startedAt = Date.now();
      const model = input.options?.model || defaultImageModel;
      const response = await fetch(withPath(baseUrl, "/v1/images/generations"), {
        method: "POST",
        headers: {
          authorization: `Bearer ${apiKey}`,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          model,
          prompt: input.prompt,
          n: input.options?.count || 1,
          size: input.options?.size || "1024x1024"
        }),
        signal: AbortSignal.timeout(timeoutMs)
      });
      const data = await parseProviderResponse(response);
      const firstImage = data.data?.[0];
      return {
        outputUrl: firstImage?.url,
        outputText: firstImage?.b64_json ? "Image returned as base64 data by provider." : undefined,
        providerCost: readProviderCost(data),
        providerMeta: { model, usage: data.usage, latencyMs: Date.now() - startedAt }
      };
    }
  };
}

function createMockGatewayAdapter() {
  return {
    async runTextTask(input) {
      return {
        outputText: `Demo result for ${input.pricingRuleId}: ARABAI would call the paid AI provider here.`,
        actualCredits: undefined,
        providerCost: 0.01,
        providerMeta: { mock: true }
      };
    },
    async runImageTask(input) {
      return {
        outputText: `Demo image task accepted for ${input.pricingRuleId}.`,
        outputUrl: null,
        actualCredits: undefined,
        providerCost: 0.05,
        providerMeta: { mock: true }
      };
    }
  };
}

function createDisabledAdapter() {
  return {
    async runTextTask() {
      throw new Error("AI gateway is not configured.");
    },
    async runImageTask() {
      throw new Error("AI gateway is not configured.");
    }
  };
}

function buildMessages(input) {
  const systemPrompt =
    input.options?.system ||
    "You are ARABAI, a practical AI assistant for beginner users. Answer clearly, simply, and avoid technical language unless asked.";
  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: input.prompt }
  ];
}

async function parseProviderResponse(response) {
  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!response.ok) {
    const message = data.error?.message || data.message || `Provider request failed with ${response.status}.`;
    const error = new Error(message);
    error.status = response.status;
    error.providerResponse = data;
    throw error;
  }
  return data;
}

function readProviderCost(data) {
  return data.cost || data.provider_cost || data.usage?.cost || null;
}

function withPath(baseUrl, path) {
  return `${baseUrl.replace(/\/$/, "")}${path}`;
}

function requirePositiveCredits(credits) {
  if (typeof credits !== "number" || credits <= 0) {
    throw new Error("Credits must be a positive number.");
  }
}

function startOfWeek(now) {
  const date = new Date(now);
  const day = date.getDay();
  const diff = day === 0 ? 6 : day - 1;
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - diff);
  return date;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
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

function expiredSessionCookie() {
  return "arabai_user_id=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0";
}

function taskAllowed(pricingRuleId) {
  return allowedLaunchTaskIds.has(pricingRuleId);
}

function unavailableTask(pricingRuleId) {
  return {
    error: {
      code: "TASK_NOT_OPEN",
      message: pricingRuleId
        ? `This task is not open in the current launch phase: ${pricingRuleId}.`
        : "This task is not open in the current launch phase."
    }
  };
}

function validateDailySpendCap(wallet, estimatedCredits) {
  const dailyCap = Number(process.env.FREE_CREDIT_DAILY_SPEND_CAP || 20);
  const todayKey = new Date().toISOString().slice(0, 10);
  const spentToday = wallet.transactions.reduce((sum, item) => {
    if (item.type !== "spend") return sum;
    if (String(item.createdAt || "").slice(0, 10) !== todayKey) return sum;
    return sum + Number(item.credits || 0);
  }, 0);

  if (spentToday + Number(estimatedCredits || 0) > dailyCap) {
    return `Daily usage cap reached. Today's remaining limit is ${Math.max(dailyCap - spentToday, 0)} credits.`;
  }

  return "";
}

function json(res, payload, status = 200, headers = {}) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }
  res.end(JSON.stringify(payload, null, 2));
}
