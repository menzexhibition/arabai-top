import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { packages, pricingRules } from "../prototype/src/config/credits.js";
import { createWallet } from "../prototype/src/services/wallet.js";
import { estimateTaskRoute, confirmTaskRoute, runTaskRoute } from "../prototype/src/routes/task-routes.js";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const publicDir = join(rootDir, "prototype/public");

const state = {
  wallet: createWallet(100),
  tasks: new Map()
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1");

    if (url.pathname === "/api/me" && req.method === "GET") {
      return json(res, {
        user: {
          id: "demo-user",
          email: "demo@arabai.top",
          preferredLanguage: "ar",
          country: "SA",
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
        adapter: createMockAdapter()
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

function createMockAdapter() {
  return {
    async runTextTask(input) {
      return {
        outputText: `Demo result for ${input.pricingRuleId}: ARABAI would call the paid AI provider here.`,
        actualCredits: undefined,
        providerCost: 0.01
      };
    },
    async runImageTask(input) {
      return {
        outputText: `Demo image task accepted for ${input.pricingRuleId}.`,
        outputUrl: null,
        actualCredits: undefined,
        providerCost: 0.05
      };
    }
  };
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

