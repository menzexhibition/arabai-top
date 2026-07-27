import assert from "node:assert/strict";
import { EventEmitter } from "node:events";

process.env.ENABLE_SUPABASE_STORE = "true";
process.env.SUPABASE_URL = "https://database.example";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key";

const writes = [];
let storageAvailable = true;
globalThis.fetch = async (url, options = {}) => {
  assert.match(String(url), /database\.example\/rest\/v1\/(waitlist_leads|task_marketplace_leads)/);
  if (!storageAvailable) throw new Error("simulated database outage");
  if ((options.method || "GET") === "GET") {
    return new Response("[]", { status: 200, headers: { "content-type": "application/json" } });
  }
  const rows = JSON.parse(options.body || "[]");
  writes.push(...rows);
  return new Response(JSON.stringify(rows), { status: 201, headers: { "content-type": "application/json" } });
};

const { default: handler } = await import(`../server/app.js?waitlist-test=${Date.now()}`);

class MockRequest extends EventEmitter {
  constructor(method, url, body, origin = "https://arabai.top") {
    super();
    this.method = method;
    this.url = url;
    this.headers = { origin };
    this.bodyText = body ? JSON.stringify(body) : "";
  }
  async *[Symbol.asyncIterator]() { if (this.bodyText) yield Buffer.from(this.bodyText); }
}

class MockResponse {
  constructor() { this.statusCode = 200; this.headers = {}; this.payload = ""; }
  setHeader(name, value) { this.headers[name.toLowerCase()] = value; }
  end(payload = "") { this.payload = payload; }
}

async function call(method, body = null, origin, url = "/api/waitlist") {
  const req = new MockRequest(method, url, body, origin);
  const res = new MockResponse();
  await handler(req, res);
  return { status: res.statusCode, headers: res.headers, body: res.payload ? JSON.parse(res.payload) : null };
}

let response = await call("OPTIONS");
assert.equal(response.status, 204);
assert.equal(response.headers["access-control-allow-origin"], "https://arabai.top");
assert.equal(response.headers["access-control-allow-methods"], "POST, OPTIONS");

response = await call("POST", { email: "lead@example.com", consent: true, sourcePage: "https://arabai.top/?utm_source=search" });
assert.equal(response.status, 201);
assert.equal(response.body.persisted, true);
assert.equal(writes.at(-1).email, "lead@example.com");
assert.equal(writes.at(-1).whatsapp, null);

response = await call("POST", { whatsapp: "+966 50 123 4567", consent: true });
assert.equal(response.status, 201);
assert.equal(response.body.persisted, true);
assert.equal(writes.at(-1).whatsapp, "+966501234567");

response = await call("POST", { consent: true });
assert.equal(response.status, 400);
assert.equal(response.body.error.code, "CONTACT_REQUIRED");

response = await call("POST", { email: "not-an-email", consent: true });
assert.equal(response.status, 400);
assert.equal(response.body.error.code, "INVALID_EMAIL");

response = await call("POST", { whatsapp: "0501234567", consent: true });
assert.equal(response.status, 400);
assert.equal(response.body.error.code, "INVALID_WHATSAPP");

response = await call("POST", { email: "lead@example.com", consent: false });
assert.equal(response.status, 400);
assert.equal(response.body.error.code, "CONSENT_REQUIRED");

assert.equal(writes.length, 2);

response = await call("GET", null, undefined, "/api/health");
assert.equal(response.status, 200);
assert.equal(response.body.ok, true);
assert.equal(response.body.mode, "supabase");

storageAvailable = false;
response = await call("GET", null, undefined, "/api/health");
assert.equal(response.status, 503);
assert.equal(response.body.ok, false);
assert.equal(response.body.error.code, "DATABASE_UNAVAILABLE");

response = await call("POST", { email: "outage@example.com", consent: true });
assert.equal(response.status, 503);
assert.equal(response.body.error.code, "WAITLIST_STORAGE_UNAVAILABLE");
assert.equal(response.body.persisted, undefined);

console.log("ARABAI waitlist persistence and validation tests passed.");
