export const creditUnit = {
  userFacingSarValue: 0.1,
  providerCostTargetRatio: 0.5
};

export const packages = [
  {
    id: "sa_starter_10",
    label: "Saudi Starter",
    priceAmount: 10,
    currency: "SAR",
    credits: 100,
    maxProviderCostAmount: 5,
    enabled: false
  },
  {
    id: "usd_starter_5",
    label: "USD Starter",
    priceAmount: 5,
    currency: "USD",
    credits: 185,
    maxProviderCostAmount: 2.5,
    enabled: false
  },
  {
    id: "sa_regular_25",
    label: "Saudi Regular",
    priceAmount: 25,
    currency: "SAR",
    credits: 250,
    maxProviderCostAmount: 12.5,
    enabled: false
  },
  {
    id: "usd_regular_10",
    label: "USD Regular",
    priceAmount: 10,
    currency: "USD",
    credits: 370,
    maxProviderCostAmount: 5,
    enabled: false
  },
  {
    id: "sa_creative_50",
    label: "Saudi Creative",
    priceAmount: 50,
    currency: "SAR",
    credits: 500,
    maxProviderCostAmount: 25,
    enabled: false
  },
  {
    id: "usd_creative_20",
    label: "USD Creative",
    priceAmount: 20,
    currency: "USD",
    credits: 740,
    maxProviderCostAmount: 10,
    enabled: false
  }
];

export const rewardRules = {
  foundingUserCampaign: {
    enabled: false,
    maxUsers: 100,
    credits: 100,
    sarValue: 10,
    usdReferenceValue: 5,
    requiresVerification: true,
    notes: "Launch campaign: first 100 verified users can receive starter credits for controlled paid AI capability tests."
  },
  signupVerified: {
    credits: 20,
    sarValue: 2,
    requiresVerification: true
  },
  dailyLogin: {
    minCredits: 1,
    maxCredits: 2,
    weeklyCap: 10
  },
  referralVerifiedRegistration: {
    credits: 20,
    sarValue: 2,
    requiresVerification: true
  },
  referralFirstPaidPackage: {
    credits: 20,
    sarValue: 2,
    grantAfterRefundRiskWindow: true
  },
  contribution: {
    minCredits: 5,
    maxCredits: 15,
    requiresModeration: true
  }
};

export const pricingRules = [
  {
    id: "premium_short_chat",
    taskType: "chat",
    label: "Premium short chat",
    minCredits: 2,
    maxCredits: 2,
    costLevel: "low",
    freeCreditsAllowed: true,
    requiresConfirmation: false
  },
  {
    id: "prompt_improvement",
    taskType: "prompt",
    label: "Prompt improvement",
    minCredits: 2,
    maxCredits: 2,
    costLevel: "low",
    freeCreditsAllowed: true,
    requiresConfirmation: false
  },
  {
    id: "premium_long_answer",
    taskType: "chat",
    label: "Premium long answer",
    minCredits: 5,
    maxCredits: 5,
    costLevel: "medium",
    freeCreditsAllowed: true,
    requiresConfirmation: true
  },
  {
    id: "long_document_summary",
    taskType: "document",
    label: "Long document summary",
    minCredits: 10,
    maxCredits: 20,
    costLevel: "medium",
    freeCreditsAllowed: false,
    requiresConfirmation: true
  },
  {
    id: "table_file_analysis",
    taskType: "document",
    label: "Table/file analysis",
    minCredits: 10,
    maxCredits: 20,
    costLevel: "medium",
    freeCreditsAllowed: false,
    requiresConfirmation: true
  },
  {
    id: "image_prompt_review",
    taskType: "image",
    label: "Image prompt and review",
    minCredits: 3,
    maxCredits: 3,
    costLevel: "low",
    freeCreditsAllowed: true,
    requiresConfirmation: false
  },
  {
    id: "image_generation_low",
    taskType: "image",
    label: "Low-tier image generation",
    minCredits: 20,
    maxCredits: 40,
    costLevel: "medium",
    freeCreditsAllowed: true,
    requiresConfirmation: true,
    freeCreditDailyCap: 1
  },
  {
    id: "image_generation_high",
    taskType: "image",
    label: "High-tier image generation",
    minCredits: 50,
    maxCredits: 80,
    costLevel: "high",
    freeCreditsAllowed: false,
    requiresConfirmation: true
  },
  {
    id: "image_edit",
    taskType: "image",
    label: "Image edit",
    minCredits: 40,
    maxCredits: 80,
    costLevel: "high",
    freeCreditsAllowed: false,
    requiresConfirmation: true
  },
  {
    id: "ppt_outline",
    taskType: "slides",
    label: "PPT outline",
    minCredits: 8,
    maxCredits: 15,
    costLevel: "medium",
    freeCreditsAllowed: true,
    requiresConfirmation: true
  },
  {
    id: "ppt_first_draft",
    taskType: "slides",
    label: "PPT first draft",
    minCredits: 30,
    maxCredits: 60,
    costLevel: "medium",
    freeCreditsAllowed: false,
    requiresConfirmation: true
  },
  {
    id: "video_script",
    taskType: "video",
    label: "Video script",
    minCredits: 8,
    maxCredits: 15,
    costLevel: "medium",
    freeCreditsAllowed: true,
    requiresConfirmation: true
  },
  {
    id: "storyboard_text",
    taskType: "video",
    label: "9-grid storyboard text",
    minCredits: 15,
    maxCredits: 25,
    costLevel: "medium",
    freeCreditsAllowed: false,
    requiresConfirmation: true
  },
  {
    id: "storyboard_images",
    taskType: "video",
    label: "9-grid storyboard images",
    minCredits: 120,
    maxCredits: 250,
    costLevel: "high",
    freeCreditsAllowed: false,
    requiresConfirmation: true
  },
  {
    id: "video_generation_short",
    taskType: "video",
    label: "Short video generation",
    minCredits: 0,
    maxCredits: 0,
    costLevel: "manual",
    freeCreditsAllowed: false,
    requiresConfirmation: true,
    enabled: false,
    comingSoon: true
  },
  {
    id: "music_generation",
    taskType: "music",
    label: "Music generation",
    minCredits: 30,
    maxCredits: 80,
    costLevel: "high",
    freeCreditsAllowed: false,
    requiresConfirmation: true
  }
];

export const launchFeatureFlags = {
  realRecharge: false,
  aiRedemption: false,
  freeRewards: true,
  referrals: true,
  mediaTasks: false
};
