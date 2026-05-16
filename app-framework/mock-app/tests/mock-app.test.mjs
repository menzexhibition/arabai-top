import assert from "node:assert/strict";
import { once } from "node:events";
import { server, state } from "../server.mjs";

const port = 8891;
server.listen(port, "127.0.0.1");
await once(server, "listening");

try {
  const baseUrl = `http://127.0.0.1:${port}`;

  const me = await getJson(`${baseUrl}/api/me`);
  assert.equal(me.user.email, "demo@arabai.top");
  assert.equal(me.wallet.creditBalance, 100);

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
  assert.equal(confirmed.wallet.creditBalance, 98);

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
  state.wallet.creditBalance = 100;
  state.wallet.redeemableCreditBalance = 100;
  state.wallet.reservedCreditBalance = 0;
  state.wallet.transactions = [];
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

