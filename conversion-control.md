# ARABAI 5% Recharge Exposure Control

ARABAI should feel like a useful guide first, not a sales page.

All ARABAI content stays free. The recharge entry is only for users who may want to run AI tools through ARABAI Credits.

ARABAI does not use paid tutorial membership as the business model.

The recharge entry should only appear to a small group of users who are already showing strong intent. The target is not "convert 5% of all visitors by force"; the target is:

```text
Expose the gentle ARABAI Credits entry to no more than 5% of eligible visitors.
```

## Why This Matters

Most visitors should leave with a good feeling:

```text
I learned what AI can do.
I know which tool to try.
I can come back when I need more.
```

Only a small group should see the quiet paid path:

```text
I use AI often.
I compare tools and prices.
I need one place to access many AI tools.
ARABAI Credits may save me time.
```

## Eligibility Score

A visitor becomes eligible only when their behavior suggests real need.

| Signal | Points |
|---|---:|
| Reads an Advanced article | +1 |
| Reads an Expert article | +2 |
| Reads price, subscription, API, gateway, video, image, slides, or music article | +2 |
| Opens 3 or more article pages in one browser | +2 |
| Returns to the site another time | +2 |

Minimum score:

```text
5 points
```

This avoids showing recharge prompts to casual readers.

## 5% Bucket

Every browser gets a stable random bucket from 0 to 99.

Only buckets 0-4 can see the recharge entry.

```text
bucket < 5
```

This keeps exposure near 5% on the front end.

## Safety Rules

The recharge entry should not appear:

- on Beginner articles
- on the first article view
- more than once per session
- as a pop-up
- as a forced checkout
- with urgent or pushy language

## Tone

Use gentle wording:

```text
Want one wallet for multiple AI tools?
ARABAI Credits is being designed for people who use AI often.
```

Avoid direct sales wording:

```text
Buy now
Recharge now
Upgrade today
Limited time
```

Also avoid suggesting that users must pay to read better content.

## Current Implementation

The current static-site implementation lives in:

```text
script.js
```

It is only a front-end exposure-control prototype. It does not process payment.

For real production, the 5% cap must be enforced on the server, because browser-side code can be bypassed.
