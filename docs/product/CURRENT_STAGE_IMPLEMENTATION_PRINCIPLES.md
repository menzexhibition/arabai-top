# ARABAI Current Stage Implementation Principles

## Product Definition

ARABAI is not only an Arabic AI guide site.

At this stage it is:

1. an Arabic-first beginner education layer
2. a unified in-site AI usage entry
3. a future credits-based paid AI access platform

The front-end experience must feel simple, guided, and non-technical.
The back-end may use aggregated AI routing, credits accounting, and gateway logic, but normal users should not need to understand API keys, token pricing, or model routing.

## What We Are Building Now

Build these first:

1. free Arabic beginner content that explains AI, large models, prompts, prices, and everyday use in simple language
2. in-site signup and account persistence
3. credits wallet and transaction history
4. guided AI task entry inside ARABAI
5. one-task-at-a-time user experience for text, image, slides, and simple video-prep use cases
6. backend task routing through a single AI gateway
7. free trial / reward / referral credits logic

## What We Are Not Prioritizing Now

Do not prioritize these yet:

1. chasing every new AI tool release
2. turning ARABAI into a developer-facing API platform
3. forcing users to leave ARABAI for another product page
4. real Arabic payment checkout before the payment gateway is approved
5. large-scale upstream token procurement before user demand is proven

## Current Commercial Reality

Right now the business path is staged:

1. content builds trust
2. signup builds retention
3. free credits build first usage
4. in-site AI tasks prove demand
5. recharge opens later when payment is ready

Until Arabic payment methods are available, ARABAI can still launch and operate as:

- a free guide
- a registered experience flow
- a controlled trial wallet
- a real AI task entry backed by a temporary provider

## Temporary AI Supply Strategy

For now, ARABAI may use `api.mytokenland.com` as the temporary upstream gateway.

This is acceptable because the current goal is not maximum margin. The current goal is to validate:

- whether Arabic users register
- which task types they actually use
- whether they understand the credits model
- whether they stay inside ARABAI instead of leaving for official tools

When traffic and usage volume become stable, ARABAI can later move to a cheaper upstream supplier.

## Front-End Experience Rules

The user should see:

- task types
- simple pricing in credits
- guided prompts
- clear expected outcome
- wallet balance
- usage history

The user should not need to see:

- raw model IDs
- provider routing details
- token billing formulas
- API gateway terminology

## Task Selection Principle

Users should choose by intent, not by model.

Examples:

- write something
- improve a prompt
- create an image
- build a slide outline
- prepare a short video script

The platform chooses the suitable model route in the background.

## Payment Principle

Real recharge is delayed, not cancelled.

Before payment is opened:

- show packages
- show credits logic
- show recharge as coming soon or sandbox mode
- keep the wallet and records real

This allows ARABAI to validate the product flow without blocking on payment approvals.

## Team Rule

Whenever there is a conflict between:

- adding more tools
- adding more news
- adding more technical detail
- improving beginner clarity and in-site usage flow

choose beginner clarity and in-site usage flow first.
