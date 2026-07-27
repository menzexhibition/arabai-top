import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import http from "node:http";

const requests = [];

const gateway = http.createServer(async (req, res) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const bodyText = Buffer.concat(chunks).toString("utf8");
  requests.push({
    method: req.method,
    url: req.url,
    authorization: req.headers.authorization,
    body: JSON.parse(bodyText || "{}")
  });

  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify({
    choices: [{ message: { content: "New API gateway response." } }],
    usage: { prompt_tokens: 8, completion_tokens: 5 }
  }));
});

await new Promise((resolve) => gateway.listen(0, "127.0.0.1", resolve));
const { port } = gateway.address();

process.env.ENABLE_AI_REDEMPTION = "true";
process.env.ENABLE_FOUNDING_USER_CAMPAIGN = "false";
process.env.ENABLE_PUBLIC_REGISTRATION = "true";
process.env.USE_REAL_AI_GATEWAY = "true";
process.env.AI_GATEWAY_BASE_URL = `http://127.0.0.1:${port}/v1`;
process.env.AI_GATEWAY_API_KEY = "test-new-api-token";
process.env.AI_GATEWAY_TEXT_MODEL = "minimax-m2.7";

const { default: handler } = await import("../server/app.js?gateway-test");

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
    if (this.bodyText) yield Buffer.from(this.bodyText);
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

let response = await callHandler("POST", "/api/auth/verified-signin", {
  displayName: "Gateway User",
  email: "gateway@arabai.top",
  country: "SA",
  preferredLanguage: "ar"
});
assert.equal(response.statusCode, 200);
assert.equal(response.body.wallet.creditBalance, 5);

response = await callHandler("POST", "/api/tasks/confirm", {
  pricingRuleId: "premium_short_chat",
  taskType: "chat",
  prompt: "Explain ARABAI in one short sentence."
});

assert.equal(response.statusCode, 200);
assert.equal(response.body.status, "completed");
assert.equal(response.body.outputText, "New API gateway response.");
assert.equal(requests.length, 1);
assert.equal(requests[0].method, "POST");
assert.equal(requests[0].url, "/v1/chat/completions");
assert.equal(requests[0].authorization, "Bearer test-new-api-token");
assert.equal(requests[0].body.model, "minimax-m2.7");
assert.equal(requests[0].body.messages.at(-1).content, "Explain ARABAI in one short sentence.");

gateway.close();
console.log("ARABAI New API gateway test passed.");
