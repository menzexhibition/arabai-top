import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { packages, pricingRules, rewardRules } from "../prototype/src/config/credits.js";
import { createWallet } from "../prototype/src/services/wallet.js";
import { verifiedSigninRoute } from "../prototype/src/routes/auth-routes.js";
import { estimateTaskRoute, confirmTaskRoute, runTaskRoute } from "../prototype/src/routes/task-routes.js";
import { createGatewayAdapter, createMockGatewayAdapter } from "../prototype/src/providers/gateway-adapter.js";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const publicDir = join(rootDir, "prototype/public");

const state = {
  user: null,
  wallet: createWallet(0),
  registrationCount: 57,
  foundingRewardCount: 57,
  tasks: new Map()
};

const adapter = createRuntimeAdapter();
rewardRules.foundingUserCampaign.enabled = true;

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1");

    if (url.pathname === "/api/me" && req.method === "GET") {
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
        user: {
          id: state.user.id,
          email: state.user.email,
          phone: state.user.phone,
          displayName: state.user.displayName,
          registrationNumber: state.user.registrationNumber,
          preferredLanguage: state.user.preferredLanguage || "ar",
          country: state.user.country || "SA",
          role: "user",
          referralCode: "arabai-demo"
        },
        wallet: walletView(),
        flags: {
          realRecharge: false,
          aiRedemption: true
        }
      });
    }

    if (url.pathname === "/api/auth/verified-signin" && req.method === "POST") {
      const body = await readJson(req);
      const user =
        state.user ||
        {
          id: crypto.randomUUID(),
          email: body.email || "demo@arabai.top",
          phone: body.phone || "",
          displayName: body.displayName || "ARABAI user",
          country: body.country || "SA",
          preferredLanguage: body.preferredLanguage || "ar",
          verified: true,
          signupRewardGranted: false,
          foundingUserRewardGranted: false
        };

      const result = verifiedSigninRoute({
        user,
        currentRegistrationCount: state.registrationCount,
        currentFoundingRewardCount: state.foundingRewardCount
      });

      if (result.isNewUser) {
        state.registrationCount += 1;
      }
      if (result.foundingUserReward.granted) {
        state.foundingRewardCount += 1;
      }

      state.user = user;
      state.wallet = result.wallet;
      return json(res, result);
    }

    if (url.pathname === "/api/wallet/packages" && req.method === "GET") {
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

    if (url.pathname === "/api/wallet" && req.method === "GET") {
      return json(res, walletView());
    }

    if (url.pathname === "/api/tasks/pricing" && req.method === "GET") {
      return json(res, { rules: pricingRules.filter((rule) => rule.enabled !== false) });
    }

    if (url.pathname === "/api/tasks/estimate" && req.method === "POST") {
      const body = await readJson(req);
      return json(res, estimateTaskRoute(body));
    }

    if (url.pathname === "/api/tasks/confirm" && req.method === "POST") {
      if (!state.user) {
        return json(
          res,
          { error: { code: "AUTH_REQUIRED", message: "Sign in before running AI tasks." } },
          401
        );
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

    if (url.pathname.startsWith("/api/tasks/") && req.method === "GET") {
      const taskId = url.pathname.split("/").pop();
      const task = state.tasks.get(taskId);
      if (!task) return json(res, { error: { code: "NOT_FOUND", message: "Task not found." } }, 404);
      return json(res, task);
    }

    return serveStatic(url.pathname, res);
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
});

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT || 8890);
  server.listen(port, "127.0.0.1", () => {
    console.log(`ARABAI mock app listening on http://127.0.0.1:${port}`);
  });
}

export { server, state };

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
      defaultTextModel: process.env.AI_GATEWAY_TEXT_MODEL || "gpt-4o-mini",
      defaultImageModel: process.env.AI_GATEWAY_IMAGE_MODEL || "gpt-image-1",
      timeoutMs: Number(process.env.AI_GATEWAY_TIMEOUT_MS || 60000)
    });
  }

  return createMockGatewayAdapter();
}

async function serveStatic(pathname, res) {
  const safePath = normalize(pathname === "/" ? "/index.html" : pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(publicDir, safePath);
  if (!filePath.startsWith(publicDir)) {
    return json(res, { error: { code: "FORBIDDEN", message: "Forbidden." } }, 403);
  }

  const data = await readFile(filePath);
  res.writeHead(200, { "content-type": contentType(filePath) });
  res.end(data);
}

function contentType(filePath) {
  return {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8"
  }[extname(filePath)] || "application/octet-stream";
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function json(res, payload, status = 200) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload, null, 2));
}
