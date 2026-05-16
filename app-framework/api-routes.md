# ARABAI API Routes Draft

These routes are for a future backend. They are not implemented in the current static site.

## Auth

```text
GET  /api/me
POST /api/auth/sign-in
POST /api/auth/sign-out
POST /api/auth/verify
```

On first verified sign-in, backend may create a wallet and grant the signup reward.
Suggested signup reward: 20 credits, about 2 SAR equivalent.
During the early launch campaign, the backend may also grant 100 credits to the first 100 verified users when the campaign flag is enabled.

## Wallet

```text
GET  /api/wallet
GET  /api/wallet/transactions
GET  /api/wallet/packages
POST /api/wallet/top-up/create-checkout
POST /api/wallet/top-up/webhook
```

### Wallet Response

```json
{
  "creditBalance": 100,
  "pendingCreditBalance": 0,
  "redeemableCreditBalance": 100,
  "reservedCreditBalance": 0,
  "currency": "SAR"
}
```

### Launch Packages

```json
[
  { "id": "sa_starter_10", "price": "10 SAR", "credits": 100, "status": "coming_soon" },
  { "id": "usd_starter_5", "price": "$5", "credits": 185, "status": "coming_soon" }
]
```

Provider/API cost target should stay at or below 50% of paid package value.

## AI Tasks

```text
GET  /api/tasks/pricing
POST /api/tasks/estimate
POST /api/tasks/confirm
GET  /api/tasks/:id
GET  /api/tasks
```

### Task Estimate Request

```json
{
  "taskType": "image",
  "pricingRuleId": "image_generation_low",
  "prompt": "Create a square product poster...",
  "options": {
    "quality": "standard",
    "count": 1
  }
}
```

### Task Estimate Response

```json
{
  "estimatedCredits": 30,
  "costLevel": "medium",
  "requiresConfirmation": true,
  "freeCreditsAllowed": true,
  "message": "This paid image task may use about 30 credits."
}
```

### Task Confirm Rules

1. User confirms the estimate.
2. Backend reserves credits server-side.
3. Text and small prompt tasks may run immediately.
4. Image, slides, music, and video tasks should be queued.
5. Backend calls provider adapter.
6. On success, backend deducts actual credits and stores output.
7. On provider failure, backend releases or refunds reserved credits.

### First Supported AI Tasks

```text
premium_short_chat
prompt_improvement
premium_long_answer
long_document_summary
image_prompt_review
image_generation_low
ppt_outline
video_script
```

Keep these disabled or admin-only at first:

```text
high-tier image generation
image edit
PPT first draft
storyboard images
music generation
real video generation
```

Real video generation should stay `coming_soon` or manual pricing until provider cost and failure rate are proven.

## Rewards

```text
POST /api/rewards/daily-login
POST /api/rewards/founding-user
POST /api/community/submissions
GET  /api/community/submissions
POST /api/referrals/create-code
GET  /api/referrals
```

Reward rules:

- signup reward: 20 credits after verification
- founding user campaign: 100 credits for the first 100 verified users when enabled, equivalent to the planned 10 SAR starter trial
- daily login: 1-2 credits, max 10 per week
- verified referral registration: 20 credits
- referred user's first paid package: additional 20 credits after refund-risk checks
- useful approved contribution: 5-15 credits depending on quality

Free credits cannot be used for expensive video, batch image generation, or high-tier image editing.

## Outbound Links

```text
POST /api/outbound-clicks
```

Purpose:

- track official tool clicks
- support affiliate/referral links later
- understand which tutorials lead users to tools

## Recharge Exposure

```text
POST /api/recharge-exposure
```

Purpose:

- move the 5% control from browser localStorage to the server
- keep recharge prompts rare and measurable

## Admin

```text
GET  /api/admin/users
GET  /api/admin/wallets
GET  /api/admin/tasks
GET  /api/admin/provider-costs
GET  /api/admin/pricing-rules
PATCH /api/admin/pricing-rules/:id
POST /api/admin/wallet-adjustments
POST /api/admin/rewards/:id/reverse
```

Admin must be able to edit task credit pricing without code deployment because provider model prices can change.

## Task Marketplace Handoff

```text
POST /api/marketplace/leads
GET  /api/marketplace/leads/:id
```

Purpose:

- let ARABAI users post a custom AI task later
- connect guide readers to a separate paid task platform
