# ARABAI API Routes Draft

These routes are for a future backend. They are not implemented in the current static site.

## Auth

```text
GET  /api/me
POST /api/auth/sign-in
POST /api/auth/sign-out
```

## Wallet

```text
GET  /api/wallet
GET  /api/wallet/transactions
POST /api/wallet/top-up/create-checkout
POST /api/wallet/top-up/webhook
```

## AI Tasks

```text
POST /api/tasks/estimate
POST /api/tasks/confirm
GET  /api/tasks/:id
GET  /api/tasks
```

### Task Estimate Request

```json
{
  "taskType": "image",
  "tool": "image",
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
  "estimatedCredits": 8,
  "costLevel": "medium",
  "requiresConfirmation": true,
  "message": "This image task may use about 8 credits."
}
```

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

## Task Marketplace Handoff

```text
POST /api/marketplace/leads
GET  /api/marketplace/leads/:id
```

Purpose:

- let ARABAI users post a custom AI task later
- connect guide readers to a separate paid task platform

