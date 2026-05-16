import { estimateTask, confirmTask, completeTask, failTask } from "../services/tasks.js";

export function estimateTaskRoute(requestBody) {
  validateTaskRequest(requestBody);
  return estimateTask(requestBody);
}

export function confirmTaskRoute({ wallet, requestBody, taskId }) {
  validateTaskRequest(requestBody);
  return confirmTask({ wallet, input: requestBody, taskId });
}

export async function runTaskRoute({ wallet, task, adapter, requestBody }) {
  try {
    const providerResult =
      requestBody.taskType === "image"
        ? await adapter.runImageTask(requestBody)
        : await adapter.runTextTask(requestBody);

    return completeTask({ wallet, task, providerResult });
  } catch (error) {
    return failTask({
      wallet,
      task,
      errorMessage: error instanceof Error ? error.message : "Unknown provider error"
    });
  }
}

function validateTaskRequest(requestBody) {
  if (!requestBody || typeof requestBody !== "object") {
    throw new Error("Task request body is required.");
  }
  if (!requestBody.pricingRuleId) {
    throw new Error("pricingRuleId is required.");
  }
  if (!requestBody.taskType) {
    throw new Error("taskType is required.");
  }
  if (!requestBody.prompt || typeof requestBody.prompt !== "string") {
    throw new Error("prompt is required.");
  }
}

