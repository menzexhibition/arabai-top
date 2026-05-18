import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import handler from "./app.js";

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
  phone: "+966500000000",
  country: "SA",
  preferredLanguage: "ar"
});
assert.equal(response.statusCode, 200);
assert.equal(response.body.user.registrationNumber, 58);
assert.equal(response.body.wallet.creditBalance, 120);

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
assert.equal(response.body.wallet.creditBalance, 118);

console.log("ARABAI Vercel API handler tests passed.");
