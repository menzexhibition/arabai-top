import assert from "node:assert/strict";
import { packages, rewardRules } from "../src/config/credits.js";
import { canUseFreeCredits, estimateTaskCredits, providerCostToCredits } from "../src/services/pricing.js";
import { createWallet } from "../src/services/wallet.js";
import { confirmTaskRoute, estimateTaskRoute, runTaskRoute } from "../src/routes/task-routes.js";
import { grantSignupRewardRoute } from "../src/routes/wallet-routes.js";

const saStarter = packages.find((item) => item.id === "sa_starter_10");
assert.equal(saStarter.priceAmount, 10);
assert.equal(saStarter.currency, "SAR");
assert.equal(saStarter.credits, 100);
assert.equal(saStarter.maxProviderCostAmount, 5);

const usdStarter = packages.find((item) => item.id === "usd_starter_5");
assert.equal(usdStarter.priceAmount, 5);
assert.equal(usdStarter.currency, "USD");
assert.equal(usdStarter.credits, 185);
assert.equal(usdStarter.maxProviderCostAmount, 2.5);

assert.equal(rewardRules.signupVerified.credits, 20);
assert.equal(rewardRules.referralVerifiedRegistration.credits, 20);
assert.equal(rewardRules.referralFirstPaidPackage.credits, 20);
assert.equal(rewardRules.dailyLogin.weeklyCap, 10);

const chatEstimate = estimateTaskCredits({
  pricingRuleId: "premium_short_chat",
  taskType: "chat",
  prompt: "Rewrite this message in a polite tone."
});
assert.equal(chatEstimate.estimatedCredits, 2);
assert.equal(chatEstimate.freeCreditsAllowed, true);
assert.equal(chatEstimate.requiresConfirmation, false);

const highImageEstimate = estimateTaskRoute({
  pricingRuleId: "image_generation_high",
  taskType: "image",
  prompt: "Create a premium product campaign poster.",
  options: { quality: "high" }
});
assert.equal(highImageEstimate.freeCreditsAllowed, false);
assert.equal(highImageEstimate.requiresConfirmation, true);
assert.equal(highImageEstimate.costLevel, "high");

const videoEstimate = estimateTaskRoute({
  pricingRuleId: "video_generation_short",
  taskType: "video",
  prompt: "Create a short product video."
});
assert.equal(videoEstimate.available, false);

assert.equal(canUseFreeCredits({ pricingRuleId: "premium_short_chat" }), true);
assert.equal(canUseFreeCredits({ pricingRuleId: "image_generation_high" }), false);
assert.equal(canUseFreeCredits({ pricingRuleId: "video_generation_short" }), false);

assert.equal(providerCostToCredits(0.5, 10, 100), 10);

const wallet = createWallet(100);
const user = { verified: true, signupRewardGranted: false };
grantSignupRewardRoute({ wallet, user });
assert.equal(wallet.creditBalance, 120);
assert.equal(wallet.redeemableCreditBalance, 120);

const task = confirmTaskRoute({
  wallet,
  taskId: "task-1",
  requestBody: {
    pricingRuleId: "premium_short_chat",
    taskType: "chat",
    prompt: "Write a short product description."
  }
});
assert.equal(task.reservedCredits, 2);
assert.equal(wallet.reservedCreditBalance, 2);

const completed = await runTaskRoute({
  wallet,
  task,
  requestBody: {
    pricingRuleId: "premium_short_chat",
    taskType: "chat",
    prompt: "Write a short product description."
  },
  adapter: {
    async runTextTask() {
      return { outputText: "A short product description.", actualCredits: 2, providerCost: 0.01 };
    }
  }
});

assert.equal(completed.status, "completed");
assert.equal(wallet.creditBalance, 118);
assert.equal(wallet.reservedCreditBalance, 0);

console.log("ARABAI pricing prototype tests passed.");

