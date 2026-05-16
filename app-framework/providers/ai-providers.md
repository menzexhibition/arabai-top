# AI Provider Adapter Plan

ARABAI should use provider adapters so the app can switch between OpenRouter, SiliconFlow, and official APIs without rewriting the user experience.

ARABAI should not expose API keys or raw API access to normal users. Users see task buttons such as write, summarize, create image, make PPT outline, and create video script. The backend chooses the provider.

## Adapter Shape

```ts
type EstimateInput = {
  taskType: "chat" | "prompt" | "image" | "video" | "music" | "slides" | "document";
  pricingRuleId: string;
  prompt: string;
  options?: Record<string, unknown>;
};

type EstimateResult = {
  estimatedCredits: number;
  costLevel: "low" | "medium" | "high";
  requiresConfirmation: boolean;
  freeCreditsAllowed: boolean;
  estimatedProviderCost?: number;
  providerCostCurrency?: string;
};

type RunTaskInput = EstimateInput & {
  userId: string;
  taskId: string;
  reservedCredits: number;
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

- New API or another gateway owned by ARABAI for routing.
- SiliconFlow-style pricing as the benchmark for internal cost tables.
- One paid-level text model for chat, writing, translation, prompt cleanup, and summaries.
- One image provider for low-tier image generation tests.

Add later:

- video provider
- music provider
- slide/document provider

## First Supported Task Set

Open these first:

| Pricing rule | User task | Provider type |
|---|---|---|
| `premium_short_chat` | Stronger answer, rewrite, translate | Text model |
| `prompt_improvement` | Clean messy idea into a prompt | Text model |
| `premium_long_answer` | Plan, proposal, comparison | Text model |
| `long_document_summary` | Summarize long text or PDF text | Text/document model |
| `image_prompt_review` | Write image prompt and critique | Text model |
| `image_generation_low` | One simple paid image test | Image model |
| `ppt_outline` | Slide titles and content skeleton | Text model |
| `video_script` | Hook, shot list, 9-grid plan text | Text model |

Keep closed or admin-only first:

- high-tier image generation
- image edits
- PPT first draft with images
- 9-grid generated images
- music generation
- real video generation

Reason: media tasks can cost much more, fail more often, and create refund pressure.

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

## Cost Estimation Rule

Use this flow:

```text
provider cost estimate
x safety multiplier, minimum 2.0
= internal cost budget
converted to ARABAI credits
rounded up to the pricing rule range
```

If the provider price changes, update `credit_pricing_rules` in the backend. Do not hard-code final prices in the frontend.

## Concurrency Rules

Text tasks can run with higher concurrency.

Suggested launch defaults:

```text
TEXT_TASK_CONCURRENCY=20
MEDIA_TASK_CONCURRENCY=2
```

Slow tasks should go through a queue. Do not keep the browser request open for long video, image batch, music, or PPT tasks.

## User Safety

- Reject prompts that request illegal, harmful, or privacy-invasive output.
- Block users from uploading confidential financial, government ID, or password data unless a clear privacy policy and storage rule exist.
- Store prompt summaries in task logs, not full sensitive content when possible.
