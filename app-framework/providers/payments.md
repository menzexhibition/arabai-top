# Payment Provider Plan

ARABAI Credits needs a payment provider before real recharge can launch.

## Recommended First Version

Use test mode first.

Suggested provider:

- Stripe for global card payments
- later add a regional provider for Saudi/Middle East if needed

## Checkout Flow

1. User chooses top-up amount.
2. Backend creates checkout session.
3. User completes payment.
4. Payment provider sends webhook.
5. Backend verifies webhook signature.
6. Backend adds credits.
7. Backend records transaction.

## Top-Up Packages

Draft packages:

```text
$10 Starter
$20 Regular
$50 Creative
```

These are product examples, not final legal pricing.

## Refund Rules To Define

Before accepting money, define:

- whether unused credits can be refunded
- whether failed AI tasks refund credits automatically
- credit expiration rules
- country-specific tax/VAT handling
- chargeback handling

## Safety

- Never update wallet balance from the browser.
- Only trust verified payment webhooks.
- Keep full transaction history.
- Admin adjustments must be logged.

