# Real AI Gateway Setup

Last updated: 2026-05-16

This guide explains how to connect ARABAI to a real OpenAI-compatible gateway, such as New API or another owned relay.

## Current Status

- Payment remains disabled while Airwallex is under review.
- Real AI gateway can be tested privately now.
- Users should still see Credits and recharge as coming soon until owner approval.

## Required Environment Variables

```text
USE_REAL_AI_GATEWAY=true
AI_GATEWAY_BASE_URL=https://your-gateway.example.com
AI_GATEWAY_API_KEY=your-server-side-key
AI_GATEWAY_TEXT_MODEL=your-text-model
AI_GATEWAY_IMAGE_MODEL=your-image-model
AI_GATEWAY_TIMEOUT_MS=60000
```

Never put `AI_GATEWAY_API_KEY` in frontend JavaScript, GitHub Pages, browser localStorage, or public HTML.

## Expected Gateway Compatibility

The adapter currently expects OpenAI-compatible endpoints:

```text
POST /v1/chat/completions
POST /v1/images/generations
```

Text request shape:

```json
{
  "model": "configured-text-model",
  "messages": [
    { "role": "system", "content": "You are ARABAI..." },
    { "role": "user", "content": "User prompt" }
  ],
  "temperature": 0.4
}
```

Image request shape:

```json
{
  "model": "configured-image-model",
  "prompt": "User prompt",
  "n": 1,
  "size": "1024x1024"
}
```

If your gateway uses different endpoints or model fields, change only:

```text
app-framework/prototype/src/providers/gateway-adapter.js
```

## Local Private Test

From repository root:

```bash
USE_REAL_AI_GATEWAY=true \
AI_GATEWAY_BASE_URL=https://your-gateway.example.com \
AI_GATEWAY_API_KEY=your-key \
AI_GATEWAY_TEXT_MODEL=your-text-model \
node app-framework/mock-app/server.mjs
```

Then open:

```text
http://127.0.0.1:8890
```

Click a text task first:

- Ask a stronger AI model
- Improve my prompt
- Premium long answer

Do not test high-cost video first.

## First Real API Tasks To Test

Start with low-risk tasks:

1. `premium_short_chat`
2. `prompt_improvement`
3. `premium_long_answer`
4. `image_prompt_review`
5. `ppt_outline`
6. `video_script`

Only after cost logs look stable:

1. `long_document_summary`
2. `image_generation_low`

Keep disabled:

- real video generation
- storyboard image batch
- high-tier image edit
- music generation

## Cost Logging Requirement

For each real provider call, store:

- provider
- model
- latency
- usage object if provider returns it
- provider cost if provider returns it
- estimated credits
- actual credits
- status

If the gateway does not return exact cost, estimate cost server-side from your gateway dashboard and update pricing rules later.

## Safety Checklist

Before using real API with public users:

- API key is server-side only.
- Daily user spend caps are active.
- High-cost tasks are disabled or require confirmation.
- Failed provider calls release/refund reserved credits.
- Admin can disable provider/model quickly.
- Logs do not store sensitive user data unnecessarily.

