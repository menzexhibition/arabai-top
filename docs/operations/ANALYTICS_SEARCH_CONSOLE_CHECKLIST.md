# Analytics And Search Console Checklist

## Google Analytics

Measurement ID:

```text
G-BMDCV1V9Q4
```

Current status:

- Tracking code has been added to public HTML pages.
- Engineer or owner still needs to verify live data inside the Google Analytics dashboard.

Verification steps:

1. Open Google Analytics.
2. Choose the ARABAI property.
3. Open **Reports -> Realtime**.
4. Visit `https://arabai.top/` in a browser.
5. Confirm that at least one realtime user appears.
6. After traffic starts, check country, pages, referral source, and device reports.

## Google Search Console

Current status:

- `robots.txt` exists.
- `sitemap.xml` exists.
- Arabic and English static article URLs are in the sitemap.
- Search Console domain verification still requires owner action.

Setup steps:

1. Open Google Search Console.
2. Add property for `arabai.top`.
3. Prefer domain property if DNS verification is convenient.
4. Verify ownership.
5. Submit:

```text
https://arabai.top/sitemap.xml
```

6. Monitor:
   - Page indexing.
   - Sitemap read status.
   - Arabic article impressions.
   - Query terms in Arabic.
   - Mobile usability.

## Not Done By Code Alone

These cannot be confirmed only from source files:

- Whether GA receives live users.
- Whether Search Console accepts ownership verification.
- Whether Google indexes each Arabic article.
- Which Arabic keywords actually bring traffic.
