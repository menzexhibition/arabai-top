import assert from "node:assert/strict";
import { EventEmitter } from "node:events";

process.env.ENABLE_AI_REDEMPTION = "true";
process.env.ENABLE_FOUNDING_USER_CAMPAIGN = "false";
process.env.PAYMENT_PROVIDER = "virtual";
process.env.PAYMENT_MODE = "sandbox";
process.env.ENABLE_REAL_RECHARGE = "false";

const { default: handler } = await import("../server/app.js");

async function callHandler(method, url, body = null) {
  const req = new MockRequest(method, url, body);
  const res = new MockResponse();
  await handler(req, res);
  return {
    statusCode: res.statusCode,
    headers: res.headers,
    body: JSON.parse(res.payload)
  };
}

class MockRequest extends EventEmitter {
  constructor(method, url, body) {
    super();
    this.method = method;
    this.url = url;
    this.bodyText = body ? JSON.stringify(body) : "";
  }

  async *[Symbol.asyncIterator]() {
    if (this.bodyText) {
      yield Buffer.from(this.bodyText);
    }
  }
}

class MockResponse {
  constructor() {
    this.statusCode = 200;
    this.headers = {};
    this.payload = "";
  }

  setHeader(name, value) {
    this.headers[name.toLowerCase()] = value;
  }

  end(payload) {
    this.payload = payload;
  }
}

let response = await callHandler("GET", "/api/me");
assert.equal(response.statusCode, 200);
assert.equal(response.body.user, null);

response = await callHandler("POST", "/api/tasks/confirm", {
  pricingRuleId: "premium_short_chat",
  taskType: "chat",
  prompt: "Rewrite this message."
});
assert.equal(response.statusCode, 401);
assert.equal(response.body.error.code, "AUTH_REQUIRED");

response = await callHandler("POST", "/api/auth/verified-signin", {
  displayName: "Demo User",
  email: "demo@arabai.top",
  phone: "+966****0000",
  country: "SA",
  preferredLanguage: "ar"
});
assert.equal(response.statusCode, 200);
assert.equal(response.body.user.registrationNumber, 58);
assert.equal(response.body.wallet.creditBalance, 500);
assert.equal(response.body.wallet.redeemableCreditBalance, 500);
const balanceTestTransactions = response.body.wallet.transactions.filter(
  (item) => item.type === "top_up" && item.providerReference?.startsWith("arabai_balance_test_")
);
assert.equal(balanceTestTransactions.length, 1);

response = await callHandler("GET", "/api/me");
assert.equal(response.statusCode, 200);
assert.equal(response.body.user.registrationNumber, 58);
assert.equal(response.body.user.email, "demo@arabai.top");
const originalPhone = response.body.user.phone;
assert.equal(response.body.wallet.creditBalance, 500);

response = await callHandler("POST", "/api/auth/verified-signin", {
  displayName: "Phone Collision",
  email: "phone-collision@arabai.top",
  phone: originalPhone,
  country: "SA",
  preferredLanguage: "ar"
});
assert.equal(response.statusCode, 409);
assert.match(response.body.error.code, /EMAIL_ALREADY_REGISTERED|PHONE_ALREADY_REGISTERED/);

response = await callHandler("POST", "/api/auth/verified-signin", {
  displayName: "Email Collision",
  email: "demo@arabai.top",
  phone: "+966****9999",
  country: "SA",
  preferredLanguage: "ar"
});
assert.equal(response.statusCode, 409);
assert.match(response.body.error.code, /EMAIL_ALREADY_REGISTERED|PHONE_ALREADY_REGISTERED/);

response = await callHandler("GET", "/api/me");
assert.equal(response.statusCode, 200);
assert.equal(response.body.user.email, "demo@arabai.top");
assert.equal(response.body.user.phone, originalPhone);
assert.equal(response.body.wallet.creditBalance, 500);

response = await callHandler("GET", "/api/wallet");
assert.equal(response.statusCode, 200);
assert.equal(response.body.creditBalance, 500);

response = await callHandler("GET", "/api/wallet/transactions");
assert.equal(response.statusCode, 200);
assert.equal(Array.isArray(response.body.transactions), true);
assert.ok(response.body.transactions.length >= 1);

response = await callHandler("POST", "/api/auth/verified-signin", {
  displayName: "Demo User",
  email: "demo@arabai.top",
  phone: "+966****0000",
  country: "SA",
  preferredLanguage: "ar"
});
assert.equal(response.statusCode, 200);
assert.equal(response.body.wallet.creditBalance, 500);
assert.equal(
  response.body.wallet.transactions.filter(
    (item) => item.type === "top_up" && item.providerReference?.startsWith("arabai_balance_test_")
  ).length,
  1
);

response = await callHandler("POST", "/api/tasks/estimate", {
  pricingRuleId: "premium_short_chat",
  taskType: "chat",
  prompt: "Rewrite this message."
});
assert.equal(response.body.estimatedCredits, 2);

response = await callHandler("POST", "/api/tasks/confirm", {
  pricingRuleId: "premium_short_chat",
  taskType: "chat",
  prompt: "Rewrite this message."
});
assert.equal(response.body.status, "completed");
assert.equal(response.body.wallet.creditBalance, 498);

response = await callHandler("POST", "/api/wallet/claim-daily-login");
assert.equal(response.statusCode, 200);
assert.equal(response.body.ok, true);
assert.ok(response.body.credits >= 1);

response = await callHandler("GET", "/api/tasks");
assert.equal(response.statusCode, 200);
assert.equal(response.body.tasks.length, 1);
assert.equal(response.body.tasks[0].status, "completed");

response = await callHandler("GET", `/api/tasks/${response.body.tasks[0].id}`);
assert.equal(response.statusCode, 200);
assert.equal(response.body.status, "completed");
assert.equal(response.body.taskType, "chat");
assert.equal(response.body.pricingRuleId, "premium_short_chat");

const walletBeforeTopUp = await callHandler("GET", "/api/wallet");
const checkoutResponse = await callHandler("POST", "/api/wallet/top-up/create-checkout", {
  packageId: "sa_starter_10"
});
assert.equal(checkoutResponse.statusCode, 200);
assert.equal(checkoutResponse.body.status, "checkout_ready");
assert.equal(checkoutResponse.body.provider, "virtual");
assert.equal(checkoutResponse.body.mode, "sandbox");
assert.equal(checkoutResponse.body.packageId, "sa_starter_10");
assert.equal(checkoutResponse.body.credits, 100);
assert.match(checkoutResponse.body.checkoutUrl, /payment=virtual/);

response = await callHandler("POST", "/api/wallet/top-up/webhook", {
  provider: "virtual",
  event: "payment_succeeded",
  checkoutId: checkoutResponse.body.checkoutId
});
assert.equal(response.statusCode, 200);
assert.equal(response.body.ok, true);
assert.equal(response.body.credited, 100);
assert.equal(response.body.wallet.creditBalance, walletBeforeTopUp.body.creditBalance + 100);

response = await callHandler("POST", "/api/wallet/top-up/webhook", {
  provider: "virtual",
  event: "payment_succeeded",
  checkoutId: checkoutResponse.body.checkoutId
});
assert.equal(response.statusCode, 200);
assert.equal(response.body.duplicate, true);
assert.equal(response.body.wallet.creditBalance, walletBeforeTopUp.body.creditBalance + 100);

const failedCheckoutResponse = await callHandler("POST", "/api/wallet/top-up/create-checkout", {
  packageId: "sa_starter_10",
  simulate: "failed"
});
response = await callHandler("POST", "/api/wallet/top-up/webhook", {
  provider: "virtual",
  event: "payment_failed",
  checkoutId: failedCheckoutResponse.body.checkoutId
});
assert.equal(response.statusCode, 200);
assert.equal(response.body.ok, true);
assert.equal(response.body.credited, 0);
assert.equal(response.body.wallet.creditBalance, walletBeforeTopUp.body.creditBalance + 100);

response = await callHandler("POST", "/api/wallet/top-up/webhook", {
  provider: "virtual",
  event: "payment_succeeded",
  checkoutId: failedCheckoutResponse.body.checkoutId
});
assert.equal(response.statusCode, 200);
assert.equal(response.body.duplicate, true);
assert.equal(response.body.credited, 0);
assert.equal(response.body.status, "failed");
assert.equal(response.body.wallet.creditBalance, walletBeforeTopUp.body.creditBalance + 100);

response = await callHandler("POST", "/api/outbound-clicks", {
  articleId: "create-images",
  linkLabel: "Official website",
  targetUrl: "https://example.com/tool"
});
assert.equal(response.statusCode, 202);
assert.equal(response.body.accepted, true);

response = await callHandler("POST", "/api/recharge-exposure", {
  articleId: "expert",
  shown: false,
  anonymousBucket: 3
});
assert.equal(response.statusCode, 202);
assert.equal(response.body.accepted, true);

response = await callHandler("GET", "/api/health");
assert.equal(response.statusCode, 200);
assert.equal(response.body.ok, true);
assert.equal(response.body.mode, "demo");

response = await callHandler("POST", "/api/auth/sign-out");
assert.equal(response.statusCode, 200);
assert.equal(response.body.ok, true);

console.log("ARABAI Vercel API handler tests passed.");
