import assert from "node:assert/strict";
import { once } from "node:events";
import { server, state } from "../server.mjs";

const port = 0;
server.listen(port, "127.0.0.1");
await once(server, "listening");

try {
  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  const me = await getJson(`${baseUrl}/api/me`);
  assert.equal(me.user, null);
  assert.equal(me.wallet.creditBalance, 0);

  const blockedBeforeSignin = await postJson(`${baseUrl}/api/tasks/confirm`, {
    pricingRuleId: "premium_short_chat",
    taskType: "chat",
    prompt: "Rewrite this message."
  });
  assert.equal(blockedBeforeSignin.error.code, "AUTH_REQUIRED");

  const signedIn = await postJson(`${baseUrl}/api/auth/verified-signin`, {
    displayName: "Demo User",
    email: "demo@arabai.top",
    phone: "+966500000000",
    country: "SA",
    preferredLanguage: "ar"
  });
  assert.equal(signedIn.user.email, "demo@arabai.top");
  assert.equal(signedIn.user.phone, "+966500000000");
  assert.equal(signedIn.user.country, "SA");
  assert.equal(signedIn.user.registrationNumber, 58);
  assert.equal(signedIn.wallet.creditBalance, 5);

  const meAfterSignin = await getJson(`${baseUrl}/api/me`);
  assert.equal(meAfterSignin.user.email, "demo@arabai.top");
  assert.equal(meAfterSignin.user.registrationNumber, 58);
  assert.equal(meAfterSignin.wallet.creditBalance, 5);

  const packages = await getJson(`${baseUrl}/api/wallet/packages`);
  assert.ok(packages.packages.some((item) => item.id === "sa_starter_10"));

  const estimate = await postJson(`${baseUrl}/api/tasks/estimate`, {
    pricingRuleId: "premium_short_chat",
    taskType: "chat",
    prompt: "Rewrite this message."
  });
  assert.equal(estimate.estimatedCredits, 2);

  const confirmed = await postJson(`${baseUrl}/api/tasks/confirm`, {
    pricingRuleId: "premium_short_chat",
    taskType: "chat",
    prompt: "Rewrite this message."
  });
  assert.equal(confirmed.status, "completed");
  assert.equal(confirmed.actualCredits, 2);
  assert.equal(confirmed.wallet.creditBalance, 3);

  const task = await getJson(`${baseUrl}/api/tasks/${confirmed.taskId}`);
  assert.equal(task.status, "completed");

  const comingSoon = await postJson(`${baseUrl}/api/tasks/estimate`, {
    pricingRuleId: "video_generation_short",
    taskType: "video",
    prompt: "Create a video."
  });
  assert.equal(comingSoon.available, false);

  console.log("ARABAI mock app tests passed.");
} finally {
  state.user = null;
  state.wallet.creditBalance = 0;
  state.wallet.redeemableCreditBalance = 0;
  state.wallet.reservedCreditBalance = 0;
  state.wallet.transactions = [];
  state.registrationCount = 57;
  state.foundingRewardCount = 57;
  state.tasks.clear();
  server.close();
}

async function getJson(url) {
  const response = await fetch(url);
  return response.json();
}

async function postJson(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  return response.json();
}
