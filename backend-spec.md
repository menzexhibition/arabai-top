# ARABAI Backend Specification

This document describes the backend needed for ARABAI Credits.

The static website can launch without this backend. Credits and payment cannot.

## Core Objects

### User

```text
id
email
country
language
created_at
```

### Wallet

```text
user_id
credit_balance
currency
updated_at
```

### Transaction

```text
id
user_id
type: top_up | spend | refund | adjustment
credits
money_amount
currency
provider
provider_reference
created_at
```

### AI Task

```text
id
user_id
task_type: chat | image | video | music | slides | document
status: draft | confirmed | running | completed | failed | refunded
estimated_credits
actual_credits
model_provider
model_name
input_summary
output_url
created_at
completed_at
```

## Required User Flow

### Top Up

1. User signs in.
2. User chooses a top-up amount.
3. Payment provider confirms payment.
4. Backend adds credits to wallet.
5. Transaction is recorded.

### Run AI Task

1. User chooses a task.
2. Backend estimates credits.
3. User confirms.
4. Backend reserves credits.
5. Backend calls AI provider.
6. Backend stores result or output URL.
7. Backend deducts actual credits.
8. If task fails, backend refunds reserved credits according to rules.

## Credit Rules

Never run high-cost tasks without confirmation.

High-cost examples:

- video
- 9-grid storyboard
- batch image generation
- long document analysis
- slide generation with images

Show users:

```text
Estimated credits
What they will get
Whether failed attempts may still cost credits
```

## Provider Strategy

Start small.

Phase 1:

- one text model through OpenRouter, SiliconFlow, or official API
- one image provider

Phase 2:

- document summary
- slides
- audio/music

Phase 3:

- video
- batch workflows
- marketplace handoff

## Security Rules

- API keys never go to the browser.
- Wallet deduction must happen server-side.
- 5% recharge exposure control must happen server-side in production.
- Payment webhook must verify provider signature.
- Users must see transaction history.
- Admins need manual refund/adjustment tools.

## Admin Tools

Admin should be able to see:

- users
- wallet balances
- top-ups
- AI tasks
- failed tasks
- provider cost
- revenue margin
- refund requests

## Metrics

Track:

- article views
- outbound official link clicks
- Try this tool clicks
- Credits page views
- top-up conversion
- cost per task
- failed generation rate
- refund rate
- repeat usage

