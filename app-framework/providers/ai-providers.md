# AI Provider Adapter Plan

ARABAI should use provider adapters so the app can switch between OpenRouter, SiliconFlow, and official APIs without rewriting the user experience.

## Adapter Shape

```ts
type EstimateInput = {
  taskType: "chat" | "image" | "video" | "music" | "slides" | "document";
  prompt: string;
  options?: Record<string, unknown>;
};

type EstimateResult = {
  estimatedCredits: number;
  costLevel: "low" | "medium" | "high";
  requiresConfirmation: boolean;
};

type RunTaskInput = EstimateInput & {
  userId: string;
  taskId: string;
};

type RunTaskResult = {
  outputText?: string;
  outputUrl?: string;
  providerCost?: number;
  providerMeta?: Record<string, unknown>;
};
```

## First Providers

Start with:

- OpenRouter or SiliconFlow for text
- one image provider

Add later:

- video provider
- music provider
- slide/document provider

## Cost Rules

Never expose token formulas as the first pricing layer.

Show normal users:

```text
Low
Medium
High
Estimated credits
```

Keep token/model/provider cost in admin logs.

