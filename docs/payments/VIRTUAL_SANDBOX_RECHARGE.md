# ARABAI Virtual Sandbox Recharge

This document records the safe test-payment mode for ARABAI Credits recharge. It is for local or staging verification only and must not be described as real payment collection.

## Purpose

Use virtual sandbox recharge to verify the full business loop before connecting Lemon Squeezy or any real payment provider:

1. Signed-in user selects a credits package.
2. Backend creates a virtual checkout.
3. Frontend simulates the sandbox webhook.
4. Backend credits the wallet after a successful sandbox event.
5. Duplicate webhook events do not add credits twice.
6. Failed or cancelled sandbox events do not add credits.

## Required Environment

```text
PAYMENT_PROVIDER=virtual
PAYMENT_MODE=sandbox
ENABLE_REAL_RECHARGE=false
```

Keep real recharge disabled while using the sandbox. Do not set `ENABLE_REAL_RECHARGE=true` until the real merchant account, webhook secret, package variant IDs, refund rules, and support email are ready.

## User-Facing Safety Copy

Every sandbox recharge UI must clearly say that this is only a test payment and no real money will be charged.

English:

```text
Sandbox payment only. No real money will be charged.
```

Arabic:

```text
دفع تجريبي فقط. لن يتم خصم أي مبلغ حقيقي.
```

## API Behavior

`POST /api/wallet/top-up/create-checkout` should return a virtual checkout payload when the sandbox is enabled:

```json
{
  "status": "checkout_ready",
  "provider": "virtual",
  "mode": "sandbox",
  "checkoutId": "virtual_checkout_...",
  "sandbox": true
}
```

`POST /api/wallet/top-up/webhook` should accept sandbox events:

```json
{
  "provider": "virtual",
  "checkoutId": "virtual_checkout_...",
  "event": "success"
}
```

Supported sandbox events:

- `success` credits the wallet once.
- `failure` does not credit the wallet.
- `cancel` does not credit the wallet.
- duplicate `success` events must be idempotent.

## Verification Commands

Run these before deploying or handing off sandbox recharge work:

```bash
node --test tests/api-handler.test.mjs
node --check server/app.js
node --check app/app.js
node --check tests/api-handler.test.mjs
```

For broader verification:

```bash
node --test tests/*.mjs app-framework/prototype/tests/*.mjs app-framework/mock-app/tests/*.mjs
node --check server/supabase-store.js
```

## Rollback

To hide recharge behavior again, use the safe closed state:

```text
PAYMENT_PROVIDER=lemon_squeezy
PAYMENT_MODE=test
ENABLE_REAL_RECHARGE=false
```

With real recharge disabled, unavailable packages should remain blocked or marked as not ready instead of opening a checkout.

## Do Not Do Yet

- Do not connect live Lemon Squeezy checkout from the sandbox path.
- Do not mark real payment as available before merchant approval.
- Do not credit wallets from browser-only state.
- Do not remove webhook idempotency checks.
- Do not use sandbox transactions as proof of real paid orders.
