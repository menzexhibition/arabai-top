# ARABAI Tester Account Runbook

## Purpose

Use tester accounts before the Arabic payment gateway goes live.

This lets us verify:

- registration works
- credits appear correctly
- daily reward logic works
- task usage works
- paid-style AI routes can be tested without real checkout

## Where to configure

Edit:

`/Users/benny/Documents/New project/app-framework/.env.example`

The real deployment should use the same variable names in Vercel or the production server environment.

## Tester tiers

### `tester_basic`

- good for normal front-end flow testing
- receives a larger balance
- still follows normal daily limits

### `tester_pro`

- good for repeated task testing
- receives a bigger balance
- can bypass normal daily cap logic used for ordinary users

### `internal_admin`

- good for full internal verification
- receives the largest balance
- should be reserved for operator-level testing only

## Required variables

```env
ARABAI_TESTER_BASIC_ACCOUNTS=test1@example.com,+966500001111
ARABAI_TESTER_BASIC_CREDITS=1000

ARABAI_TESTER_PRO_ACCOUNTS=test2@example.com,+966500002222
ARABAI_TESTER_PRO_CREDITS=5000

ARABAI_TESTER_ADMIN_ACCOUNTS=test3@example.com,+966500003333
ARABAI_TESTER_ADMIN_CREDITS=20000
```

## Matching rule

An account becomes a tester account when the signup email or phone matches one of the configured values.

Recommended formatting:

- email: lowercase
- Saudi mobile: use one consistent format, preferably `+9665xxxxxxxx`

## Recommended first testing set

```env
ARABAI_TESTER_BASIC_ACCOUNTS=preview-basic@arabai.top,+966500001111
ARABAI_TESTER_PRO_ACCOUNTS=preview-pro@arabai.top,+966500002222
ARABAI_TESTER_ADMIN_ACCOUNTS=preview-admin@arabai.top,+966500003333
```

## Safe launch sequence before payment

1. Keep `ENABLE_REAL_RECHARGE=false`
2. Set `USE_REAL_AI_GATEWAY=true` only after the upstream key is verified
3. Set `ENABLE_AI_REDEMPTION=true` after checking pricing rules and caps
4. Register all tester accounts from the public site once
5. Confirm wallet, reward, and task history behavior

## What to test

### Basic tester

- register account
- receive tester balance
- claim daily reward
- run one chat task
- run one image-related task

### Pro tester

- run repeated text tasks
- run prompt improvement
- run PPT outline
- run video script task

### Internal admin

- stress internal task flow
- verify task history and balance deductions
- verify launch-enabled premium routes

## Important note

Tester balances are for internal verification only.

Do not present these balances to public users as real paid entitlement, and do not mix tester accounts with future payment reconciliation.
