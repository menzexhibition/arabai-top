import { packages, pricingRules, rewardRules } from "../app-framework/prototype/src/config/credits.js";
import { createWallet } from "../app-framework/prototype/src/services/wallet.js";
import { verifiedSigninRoute } from "../app-framework/prototype/src/routes/auth-routes.js";
import { estimateTaskRoute, confirmTaskRoute, runTaskRoute } from "../app-framework/prototype/src/routes/task-routes.js";
import {
  createGatewayAdapter,
  createMockGatewayAdapter
} from "../app-framework/prototype/src/providers/gateway-adapter.js";

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

export default async function handler(req, res) {
  try {
    const path = new URL(req.url, "https://arabai.top").pathname;

    if (path === "/api/me" && req.method === "GET") {
      if (!state.user) {
        return json(res, {
          user: null,
          wallet: walletView(),
          flags: {
            realRecharge: false,
            aiRedemption: false,
            requiresSignin: true
          }
        });
      }

      return json(res, {
        user: userView(),
        wallet: walletView(),
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
      return json(res, {
        packages: packages.map((item) => ({
          id: item.id,
          label: item.label,
          priceAmount: item.priceAmount,
          currency: item.currency,
          credits: item.credits,
          status: item.enabled ? "available" : "coming_soon"
        }))
      });
    }

    if (path === "/api/wallet" && req.method === "GET") {
      return json(res, walletView());
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
        wallet: walletView()
      });
    }

    if (path.startsWith("/api/tasks/") && req.method === "GET") {
      const taskId = path.split("/").pop();
      const task = state.tasks.get(taskId);
      if (!task) return json(res, { error: { code: "NOT_FOUND", message: "Task not found." } }, 404);
      return json(res, task);
    }

    return json(res, { error: { code: "NOT_FOUND", message: "API route not found." } }, 404);
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

function userView() {
  return {
    id: state.user.id,
    email: state.user.email,
    phone: state.user.phone,
    displayName: state.user.displayName,
    registrationNumber: state.user.registrationNumber,
    preferredLanguage: state.user.preferredLanguage || "ar",
    country: state.user.country || "SA",
    role: "user",
    referralCode: "arabai-demo"
  };
}

function walletView() {
  return {
    creditBalance: state.wallet.creditBalance,
    pendingCreditBalance: state.wallet.pendingCreditBalance,
    redeemableCreditBalance: state.wallet.redeemableCreditBalance,
    reservedCreditBalance: state.wallet.reservedCreditBalance,
    transactions: state.wallet.transactions
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

function json(res, payload, status = 200) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload, null, 2));
}
