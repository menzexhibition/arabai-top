import { pricingRules } from "../config/credits.js";

export function getPricingRule(pricingRuleId) {
  const rule = pricingRules.find((item) => item.id === pricingRuleId);
  if (!rule) {
    throw new Error(`Unknown pricing rule: ${pricingRuleId}`);
  }
  return rule;
}

export function estimateTaskCredits(input) {
  const rule = getPricingRule(input.pricingRuleId);

  if (rule.enabled === false || rule.comingSoon) {
    return {
      pricingRuleId: rule.id,
      taskType: rule.taskType,
      estimatedCredits: null,
      costLevel: rule.costLevel,
      requiresConfirmation: true,
      freeCreditsAllowed: false,
      available: false,
      message: `${rule.label} is coming soon.`
    };
  }

  const complexity = estimateComplexity(input);
  const estimatedCredits = clamp(
    Math.ceil(rule.minCredits + (rule.maxCredits - rule.minCredits) * complexity),
    rule.minCredits,
    rule.maxCredits
  );

  return {
    pricingRuleId: rule.id,
    taskType: rule.taskType,
    estimatedCredits,
    costLevel: rule.costLevel,
    requiresConfirmation: rule.requiresConfirmation,
    freeCreditsAllowed: rule.freeCreditsAllowed,
    available: true,
    message: buildEstimateMessage(rule, estimatedCredits)
  };
}

export function canUseFreeCredits(input) {
  const rule = getPricingRule(input.pricingRuleId);
  if (!rule.freeCreditsAllowed) return false;
  if (rule.costLevel === "high" || rule.costLevel === "manual") return false;
  if (["storyboard_images", "video_generation_short", "image_generation_high", "image_edit"].includes(rule.id)) {
    return false;
  }
  return true;
}

export function providerCostToCredits(providerCostAmount, packageValueAmount, packageCredits) {
  if (providerCostAmount < 0 || packageValueAmount <= 0 || packageCredits <= 0) {
    throw new Error("Invalid cost conversion input.");
  }

  const providerCostTargetRatio = 0.5;
  const creditValue = packageValueAmount / packageCredits;
  const userFacingCost = providerCostAmount / providerCostTargetRatio;
  return Math.ceil(userFacingCost / creditValue);
}

function estimateComplexity(input) {
  const promptLength = typeof input.prompt === "string" ? input.prompt.length : 0;
  const fileCount = Number(input.options?.fileCount || 0);
  const count = Number(input.options?.count || 1);
  const quality = input.options?.quality;

  let score = 0;
  if (promptLength > 800) score += 0.25;
  if (promptLength > 2000) score += 0.25;
  if (fileCount > 0) score += 0.25;
  if (count > 1) score += 0.2;
  if (quality === "high") score += 0.3;

  return clamp(score, 0, 1);
}

function buildEstimateMessage(rule, estimatedCredits) {
  if (rule.costLevel === "low") {
    return `This paid AI task may use about ${estimatedCredits} credits.`;
  }
  if (rule.costLevel === "medium") {
    return `This task may use about ${estimatedCredits} credits. Please confirm before running.`;
  }
  if (rule.costLevel === "high") {
    return `This is a high-cost paid AI task and may use about ${estimatedCredits} credits.`;
  }
  return "This task needs manual pricing or is coming soon.";
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

