# ARABAI Mock App

This is a runnable local mock for the future `app.arabai.top` product.

It uses only Node.js built-in modules and the existing prototype business rules. It does not use a real database, payment provider, or AI provider.

## What It Demonstrates

- wallet summary
- credit packages
- task pricing
- task estimate
- task confirm
- credit reservation
- mock AI task completion
- wallet deduction
- failed task refund behavior through the shared service layer

## Run

From the repository root:

```bash
node app-framework/mock-app/server.mjs
```

Then open:

```text
http://127.0.0.1:8890
```

## Test

```bash
node app-framework/mock-app/tests/mock-app.test.mjs
```

## Important

This mock app is not production code. It is a bridge between product rules and real engineering.

Production still needs:

- Supabase or another real database
- real auth
- Airwallex test mode
- verified payment webhook
- server-side provider API keys
- task queue
- admin panel
- privacy and refund rules review

