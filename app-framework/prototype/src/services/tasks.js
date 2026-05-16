import { estimateTaskCredits } from "./pricing.js";
import { completeReservedSpend, failReservedTask, reserveCredits } from "./wallet.js";

export function estimateTask(input) {
  return estimateTaskCredits(input);
}

export function confirmTask({ wallet, input, taskId }) {
  const estimate = estimateTask(input);
  if (!estimate.available) {
    throw new Error(estimate.message);
  }

  reserveCredits(wallet, taskId, estimate.estimatedCredits);

  return {
    id: taskId,
    status: shouldQueue(estimate.taskType) ? "queued" : "confirmed",
    pricingRuleId: estimate.pricingRuleId,
    taskType: estimate.taskType,
    estimatedCredits: estimate.estimatedCredits,
    reservedCredits: estimate.estimatedCredits,
    requiresQueue: shouldQueue(estimate.taskType)
  };
}

export function completeTask({ wallet, task, providerResult }) {
  const actualCredits = providerResult.actualCredits || task.reservedCredits;
  completeReservedSpend(wallet, task.id, task.reservedCredits, actualCredits);

  return {
    ...task,
    status: "completed",
    actualCredits,
    providerCost: providerResult.providerCost,
    outputText: providerResult.outputText,
    outputUrl: providerResult.outputUrl,
    completedAt: new Date().toISOString()
  };
}

export function failTask({ wallet, task, errorMessage }) {
  failReservedTask(wallet, task.id, task.reservedCredits);

  return {
    ...task,
    status: "refunded",
    errorMessage,
    completedAt: new Date().toISOString()
  };
}

function shouldQueue(taskType) {
  return ["image", "video", "music", "slides", "document"].includes(taskType);
}

