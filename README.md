# Amud — B'nai Israel Synagogue Website (POC)

A modern, mobile-first website POC for [B'nai Israel Congregation](https://www.jewishdowntown.org/) (27 Lloyd Street, Baltimore — davening in the same historic sanctuary since 1876), built to replace the current ShulCloud site.

**Docs:** [requirements.md](requirements.md) · [implementation-plan.md](implementation-plan.md)

## Stack

- **Next.js** (App Router) + **Tailwind CSS** — static-first, fast
- **Decap CMS** at `/admin` — non-technical editing of events, weekly announcements, davening schedule, and contact info (content lives in `content/` as Markdown/JSON in this repo)
- **Hebcal API** — live candle lighting, havdalah, parsha, and Hebrew date for Baltimore (cached 1 hour)
- **Stripe** (test mode) — donation checkout; runs in a simulated "demo mode" when no Stripe keys are configured

## Local development

```bash
npm install
npm run dev            # site at http://localhost:3000
npm run cms            # (second terminal) Decap local backend — then edit at http://localhost:3000/admin
```

With `npm run cms` running, `/admin` works locally with **no login** and writes straight to the files in `content/`.

## Deploy to Vercel

1. Import `ofir121/amud` at [vercel.com/new](https://vercel.com/new) — the defaults work as-is; you'll get a shareable URL immediately.
2. (Optional, for real Stripe test checkout) Add an environment variable:
   - `STRIPE_SECRET_KEY` — a Stripe **test** secret key (`sk_test_…`). Without it, the donate flow completes in demo mode with a simulated confirmation, which is fine for the board demo.

## CMS login in production (the phone demo)

Decap uses the GitHub backend (`public/admin/config.yml`), so an editor logs in with a GitHub account that has write access to this repo. GitHub OAuth needs a small token-exchange service — two easy options:

1. **Netlify OAuth (no code):** create a free Netlify site pointed at this repo (it doesn't need to serve traffic), enable a GitHub OAuth app under Site settings → Access control → OAuth, and add `base_url: https://api.netlify.com` under `backend:` in `config.yml`.
2. **Self-hosted OAuth proxy:** deploy a tiny [decap OAuth provider](https://decapcms.org/docs/external-oauth-clients/) (one-click Vercel templates exist) and set `base_url` to it.

Once configured, editing works from a phone browser at `https://<your-url>/admin`: add an event or publish the weekly announcements post, and Vercel redeploys the site automatically (~1 min) with the change live.

> If the mobile editing experience isn't smooth enough for the live demo, the fallback plan (see implementation-plan.md, Risks) is switching to Sanity — the content models are small, so the swap is cheap.

## Content editing (what the demo shows)

| What | Where | Who |
|------|-------|-----|
| Events | `/admin` → Events | Any editor, from a phone |
| Weekly announcements ("This Week at B'nai Israel") | `/admin` → Weekly Announcements | Designated shul member |
| Davening schedule times | `/admin` → Site Settings & Schedule | Office/gabbai |
| Contact info, Venmo/Zelle details | `/admin` → Site Settings & Schedule | Office |

## Notes for the POC demo

- Venmo handle, Zelle address, membership dues, and sample events/announcements are **placeholders** — clearly labeled on the site.
- Donation data → ShulCloud sync is intentionally out of POC scope; the three options are laid out in requirements.md §7.1 for the board to choose from.
