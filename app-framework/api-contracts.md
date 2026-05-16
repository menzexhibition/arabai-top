# ARABAI API Contracts

Last updated: 2026-05-16

These contracts define the first real app backend for `app.arabai.top` and `api.arabai.top`.

## Principles

- Public articles remain free and do not require login.
- Users never receive provider API keys.
- All credit changes happen server-side.
- Expensive tasks require estimate and confirmation.
- Free credits cannot run high-cost media tasks.
- Real recharge and AI redemption stay disabled until feature flags are enabled.

## Auth

### `GET /api/me`

Returns the current user and wallet summary.

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "preferredLanguage": "ar",
    "country": "SA",
    "role": "user",
    "referralCode": "a1b2c3"
  },
  "wallet": {
    "creditBalance": 100,
    "redeemableCreditBalance": 100,
    "reservedCreditBalance": 0,
    "pendingCreditBalance": 0,
    "currency": "SAR"
  },
  "flags": {
    "realRecharge": false,
    "aiRedemption": false
  }
}
```

### `POST /api/auth/verified-signin`

Called after auth provider verifies email, phone, Google, or magic link.

Server actions:

1. Upsert profile.
2. Create wallet if missing.
3. Grant signup reward once if eligible.
4. Grant daily login reward if eligible.

## Wallet

### `GET /api/wallet/packages`

Returns public packages. If real recharge is disabled, return packages as `coming_soon`.

```json
{
  "packages": [
    {
      "id": "sa_starter_10",
      "label": "Saudi Starter",
      "priceAmount": 10,
      "currency": "SAR",
      "credits": 100,
      "status": "coming_soon"
    }
  ]
}
```

### `GET /api/wallet/transactions`

Returns user's own credit history.

Query:

```text
?limit=20&cursor=optional
```

### `POST /api/wallet/top-up/create-checkout`

Request:

```json
{
  "packageId": "sa_starter_10"
}
```

If `ENABLE_REAL_RECHARGE=false`, return:

```json
{
  "status": "coming_soon",
  "message": "Recharge is not open yet."
}
```

When enabled, create payment session server-side.

### `POST /api/wallet/top-up/webhook`

Provider webhook endpoint.

Rules:

- Verify provider signature.
- Deduplicate by provider event ID.
- Add credits only after verified successful payment.
- Store raw payment event for audit.

## Task Pricing

### `GET /api/tasks/pricing`

Returns enabled pricing rules.

```json
{
  "rules": [
    {
      "id": "premium_short_chat",
      "taskType": "chat",
      "label": "Premium short chat",
      "minCredits": 2,
      "maxCredits": 2,
      "costLevel": "low",
      "freeCreditsAllowed": true,
      "requiresConfirmation": false
    }
  ]
}
```

## Task Estimate

### `POST /api/tasks/estimate`

Request:

```json
{
  "pricingRuleId": "image_generation_low",
  "taskType": "image",
  "prompt": "Create a square product poster for oud perfume.",
  "options": {
    "quality": "standard",
    "count": 1
  }
}
```

Response:

```json
{
  "available": true,
  "pricingRuleId": "image_generation_low",
  "estimatedCredits": 30,
  "costLevel": "medium",
  "freeCreditsAllowed": true,
  "requiresConfirmation": true,
  "message": "This task may use about 30 credits. Please confirm before running."
}
```

Coming soon response:

```json
{
  "available": false,
  "pricingRuleId": "video_generation_short",
  "estimatedCredits": null,
  "costLevel": "manual",
  "freeCreditsAllowed": false,
  "requiresConfirmation": true,
  "message": "Short video generation is coming soon."
}
```

## Task Confirm

### `POST /api/tasks/confirm`

Request:

```json
{
  "pricingRuleId": "premium_short_chat",
  "taskType": "chat",
  "prompt": "Rewrite this customer reply in a polite tone.",
  "options": {
    "language": "ar"
  }
}
```

Server actions:

1. Recalculate estimate server-side.
2. Check wallet balance.
3. Check free-credit eligibility.
4. Reserve credits.
5. Create `ai_tasks` row.
6. Run immediately if text task, otherwise queue.

Response for immediate/queued:

```json
{
  "taskId": "uuid",
  "status": "queued",
  "estimatedCredits": 30,
  "reservedCredits": 30,
  "pollUrl": "/api/tasks/uuid"
}
```

## Task Status

### `GET /api/tasks/:id`

```json
{
  "id": "uuid",
  "status": "completed",
  "taskType": "chat",
  "estimatedCredits": 2,
  "actualCredits": 2,
  "outputText": "Here is the rewritten reply...",
  "outputUrl": null,
  "createdAt": "2026-05-16T00:00:00Z",
  "completedAt": "2026-05-16T00:00:03Z"
}
```

## Rewards

### `POST /api/rewards/daily-login`

Server grants 1-2 credits if eligible and weekly cap is not reached.

### `POST /api/community/submissions`

Request:

```json
{
  "type": "question",
  "title": "How do I use AI for a restaurant menu?",
  "content": "I want a beginner tutorial about menu photos and short ads."
}
```

Moderator later approves and assigns 5-15 credits.

### `POST /api/referrals/create-code`

Returns user's referral code and link.

```json
{
  "code": "a1b2c3",
  "url": "https://arabai.top/?ref=a1b2c3"
}
```

## Error Shape

All errors should use:

```json
{
  "error": {
    "code": "INSUFFICIENT_CREDITS",
    "message": "Not enough redeemable credits.",
    "details": {}
  }
}
```

Common codes:

```text
AUTH_REQUIRED
FEATURE_DISABLED
TASK_COMING_SOON
INSUFFICIENT_CREDITS
FREE_CREDITS_NOT_ALLOWED
RATE_LIMITED
PAYMENT_NOT_VERIFIED
PROVIDER_UNAVAILABLE
TASK_FAILED_REFUNDED
```

## Concurrency

Recommended launch limits:

```text
text tasks: 20 concurrent
media tasks: 2 concurrent
per user free-credit spend cap: 20 credits/day
per user paid-credit spend cap: 300 credits/day
```

Queue these task types:

```text
image
slides
document
music
video
```

