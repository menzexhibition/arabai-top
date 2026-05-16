# Payment Provider Plan

ARABAI Credits needs a payment provider before real recharge can launch.

## Recommended First Version

Use test mode first.

Suggested provider:

- Airwallex for the first global card / Apple Pay capable payment route if the merchant account supports it.
- Later add a regional provider for Saudi/Middle East if Mada and STC Pay are needed.
- Keep Stripe as a backup option for global card payments if Airwallex setup is delayed.

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
10 SAR Starter = 100 credits
$5 Starter = about 185 credits
25 SAR Regular = 250 credits
$10 Regular = about 370 credits
50 SAR Creative = 500 credits
$20 Creative = about 740 credits
```

These are product examples, not final legal pricing.

Provider/API cost target:

```text
maximum provider cost = about 50% of user payment value
```

Payment fees, chargeback risk, retries, server cost, storage, and support come from the remaining 50%.

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
- Do not enable real recharge until refund, privacy, terms, and support pages match the live product.

## Saudi Payment Notes

If ARABAI later needs Mada and STC Pay, evaluate Tap Payments, PayTabs, HyperPay, Moyasar, or another licensed/regional provider.

The payment provider must confirm whether it can onboard the business entity and support digital AI credits. Do not promise Mada/STC Pay publicly until the provider account is approved.
