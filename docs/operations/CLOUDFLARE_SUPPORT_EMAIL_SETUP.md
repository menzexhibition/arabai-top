# Cloudflare Support Email Setup

Goal: receive messages sent to `support@arabai.top` and forward them to your real inbox.

Main support address:

- `support@arabai.top`

Recommended forwarding inbox:

- your existing Gmail inbox
- example: `menzexhibition@gmail.com`

Do not turn this on until Cloudflare nameservers are fully active.

## Before you start

You should wait until Cloudflare no longer shows the domain as `pending`.

The good sign is:

- the domain becomes active in Cloudflare
- email routing is available without setup errors

## What we are trying to do

We are not buying a separate mailbox now.

We are doing the simple version:

1. someone emails `support@arabai.top`
2. Cloudflare receives it
3. Cloudflare forwards it to your real inbox

This is enough for:

- support messages
- policy questions
- Lemon Squeezy review
- contact requests

## Best forwarding target

Use one real inbox you already check often.

Recommended:

- `menzexhibition@gmail.com`

If you want, you can change the final destination later.

## Step-by-step after Cloudflare becomes active

### Step 1. Open Email Routing

In Cloudflare:

- open the `arabai.top` zone
- go to `Email`
- open `Email Routing`

### Step 2. Start Email Routing

If Cloudflare asks to enable Email Routing:

- click the setup / get started button

Cloudflare will usually prepare the required DNS records for you.

### Step 3. Add the destination inbox

Add the real email address that should receive forwarded mail.

Recommended:

- `menzexhibition@gmail.com`

Cloudflare may send a verification email to that inbox.

### Step 4. Verify the destination inbox

Open the destination inbox and click the verification link from Cloudflare.

Until this is verified, forwarding may not work.

### Step 5. Create the custom address

Create a routing rule:

- Custom address: `support`
- Domain: `arabai.top`
- Forward to: your verified destination inbox

This creates:

- `support@arabai.top` -> your real inbox

### Step 6. Check DNS records Cloudflare adds

Cloudflare may add or request:

- MX records
- SPF-related TXT records
- sometimes DKIM / DMARC guidance

Usually the easiest path is:

- let Cloudflare auto-add the records it suggests

### Step 7. Send a real test email

After setup:

1. send a test email from another address
2. send it to `support@arabai.top`
3. confirm it arrives in your real inbox
4. reply once if needed to check the workflow

## Minimum success standard

This is considered done only when:

- `support@arabai.top` exists
- Cloudflare shows routing enabled
- destination inbox is verified
- a test email arrives successfully

## What to do after it works

Once forwarding works:

1. keep `support@arabai.top` on the website
2. use it in Lemon Squeezy review
3. use it in payment/provider applications
4. use it in policy pages and support replies

## Suggested next actions after mailbox setup

After email routing is confirmed, the next order should be:

1. test `support@arabai.top`
2. submit Lemon Squeezy onboarding
3. wait for payment approval
4. only then open real checkout

## Important note

This setup gives you forwarding, not a full mailbox interface inside Cloudflare.

That is fine for now.

For the current ARABAI stage, forwarding is enough.
