# ARABAI New API Deployment Pack

This folder keeps the New API gateway separate from the existing ARABAI static site and Vercel/Supabase app code.

## Recommended target

Use a Docker-capable host for `api.arabai.top`.

Good options:

1. Small VPS with Docker Compose and Caddy/Nginx.
2. Render/Railway/Fly.io style container platform with persistent Postgres + Redis.
3. Existing server that can run long-lived containers.

Do not deploy New API to Vercel Serverless. New API is a long-running Go service with web UI, database, Redis cache, logs, and persistent runtime state.

## Required DNS

`api.arabai.top` currently needs a DNS record in Cloudflare.

For a VPS:

```text
Type: A
Name: api
Value: <server IPv4>
Proxy: DNS only during first setup, then Cloudflare proxy can be enabled after HTTPS works
```

For a managed container platform:

```text
Type: CNAME
Name: api
Value: <platform-provided hostname>
Proxy: DNS only during first setup unless the platform supports proxied custom domains
```

## First admin setup

After deployment:

1. Open `https://api.arabai.top`.
2. Complete the New API initial administrator setup.
3. Change default passwords and secrets immediately.
4. Add one upstream model channel for testing only.
5. Create one internal test API token.
6. Test an OpenAI-compatible request against the gateway before linking it to ARABAI.

## Arabic UX plan

New API does not currently ship Arabic as a default language. ARABAI should therefore use this split:

- Public Arabic explanation page: `ar-developer-api.html` on `arabai.top`.
- Technical gateway: `api.arabai.top`, initially used by admin/test users.
- Later customization: add/maintain Arabic translations or build an ARABAI wrapper page after the gateway works.

## Security notes

- Never expose upstream provider API keys in the static site.
- Keep New API admin registration closed after setup if public registration is not ready.
- Use a strong `SESSION_SECRET`.
- Use strong PostgreSQL and Redis passwords.
- Keep regular backups of PostgreSQL data before opening paid access.
