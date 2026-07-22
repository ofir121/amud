# B'nai Israel Synagogue — Website Redesign Requirements

**Project codename:** Amud
**Current site:** [jewishdowntown.org](https://www.jewishdowntown.org/) (ShulCloud)
**Goal:** A modern, mobile-first shul website POC with frictionless donations and easy community event updates.

---

## 1. Background & Problem Statement

B'nai Israel is a historic Orthodox synagogue at 27 Lloyd Street, Baltimore, MD. The current website runs on ShulCloud and suffers from:

- **Hard navigation** — promotional imagery mixed with administrative functions; visitors can't quickly find davening times, upcoming events, or how to donate.
- **Dated design** — not mobile-first, cluttered layout, weak visual hierarchy.
- **Donation friction** — giving is buried behind ShulCloud forms instead of being one tap away.
- **Stale content** — updating events requires navigating ShulCloud admin, so the site lags behind the community's actual schedule.

The POC should demonstrate a site that a first-time visitor, a regular member, and a potential donor can each use in under 30 seconds to accomplish their goal.

## 2. Reference Sites (what to borrow)

| Site | What works | Borrow |
|------|-----------|--------|
| [South Philadelphia Shtiebel](https://www.southphiladelphiashtiebel.org/) | Clean modular sections, warm photography, prominent "Ways to Give" with named giving programs, inclusive welcoming tone | Visual style, donation UX, homepage layout |
| [Ahavas Torah](https://www.ahavastorah.org/) | Excellent information architecture (Davening / Learning / Community / Visitors / Donate), card-based quick navigation, serves both members and visitors | Navigation structure, davening-times treatment, visitor-oriented content |

## 3. Target Users

1. **First-time visitor / tourist** — wants service times, address, what to expect, historic-building info. B'nai Israel's landmark 1876 building is a draw; the site should sell the visit.
2. **Regular member** — wants this week's schedule, event signups, kiddush sponsorship, account/membership actions.
3. **Donor** — wants to give in as few taps as possible, including one-off, recurring, and dedicated (yahrzeit, kiddush, honor of) gifts.
4. **Shul admin / gabbai** — wants to post an event or update a time in under 2 minutes from a phone.

## 4. Site Structure (proposed)

```
Home
├── About
│   ├── Our History & Building (1876 landmark — a differentiator, feature it)
│   ├── Rabbi & Leadership
│   └── Contact & Directions
├── Davening
│   ├── Shabbat & Weekday Schedule
│   └── Zmanim (auto-calculated for Baltimore)
├── Events & Programs
│   ├── Calendar
│   ├── High Holidays
│   └── Classes & Learning
├── Visit Us  (what to expect, parking, kosher food nearby, Shabbat hospitality)
├── Membership  (join / renew)
└── Donate  (always visible in header as a highlighted button)
```

## 5. Functional Requirements

### 5.1 Homepage
- Hero section with photography of the historic sanctuary and a clear tagline.
- **At-a-glance strip:** next service time, candle lighting / havdalah this week, next upcoming event.
- Three primary calls to action above the fold: **Donate · Visit · This Week's Schedule**.
- Upcoming events preview (next 3–4) pulled from the calendar.
- Newsletter signup.

### 5.2 Donations (highest priority)
- Persistent **Donate** button in the header on every page.
- One-page donation flow: preset amounts + custom, one-time or monthly recurring.
- Dedication options: general, yahrzeit/memorial, in honor of, kiddush sponsorship, building fund.
- **Multiple payment methods, each one tap from the donate page:**
  - *Integrated checkout:* card, Apple Pay, Google Pay, and PayPal via a modern processor (Stripe supports all four; or a ShulCloud-compatible gateway).
  - *Direct methods:* Venmo (handle + QR code) and Zelle (shul's Zelle address + instructions). Zelle has no web checkout API, so these appear as clearly labeled "other ways to give" buttons/cards on the same page.
- Optional cover-the-fees checkbox; automatic email receipt for tax purposes (integrated methods).
- POC: Stripe test mode demonstrates the integrated flow end-to-end; Venmo/Zelle shown as static buttons with placeholder details.

### 5.3 Events & Calendar
- Public calendar with list and month views; each event has its own shareable page.
- Event page: date/time, description, image, optional RSVP or ticket purchase.
- Filter by type (davening, class, community event, holiday).
- **Admin can add/edit an event from a simple form or CMS — no ShulCloud navigation.** This is the core "easy updates" requirement.
- Optional: subscribe to calendar (ICS feed / Google Calendar).

### 5.4 Davening Times & Zmanim
- Weekly schedule displayed prominently, editable by admin.
- Auto-calculated zmanim for Baltimore (e.g., via Hebcal API): candle lighting, havdalah, parsha of the week — zero-maintenance content that keeps the site feeling alive.

### 5.5 Membership
- Membership info page with tiers/dues and benefits.
- Join/renew form. For the POC this can link into existing ShulCloud membership, or be a lead-capture form emailed to the office.

### 5.6 Content Management
- Non-technical admin can edit pages, schedule, and events (headless CMS, or simple admin UI).
- Changes publish immediately; editable from mobile.

### 5.7 Weekly Newsletter / Announcements
- A designated shul member (not necessarily staff) can publish a **weekly announcements post** ("This Week at B'nai Israel"): schedule changes, kiddush sponsors, mazel tovs, upcoming events.
- Published to a page on the site and archived (recent weeks browsable).
- Newsletter signup on the homepage feeds an email list; the weekly post can be sent as an email blast (POC: page + signup only; email delivery via Mailchimp/Buttondown or ShulCloud's email tool post-POC).
- Same editing bar as events: publishable from a phone in a few minutes, no ShulCloud navigation.

## 6. Non-Functional Requirements

- **Mobile-first responsive** — majority of event/donation traffic will be phones.
- **Performance** — Lighthouse ≥ 90; largely static pages, fast loads.
- **Accessibility** — WCAG 2.1 AA: semantic HTML, contrast, keyboard navigation, alt text.
- **SEO** — proper metadata, Open Graph for shared event/donation links, local-business schema (synagogue, address, service times).
- **Hebrew/mixed text** — correct rendering of Hebrew names, dates, and RTL snippets.
- **Hebrew calendar awareness** — display Hebrew date alongside Gregorian where relevant.

## 7. ShulCloud Strategy

ShulCloud remains the system of record for member data and can stay for back-office use. Options, in order of preference for the POC:

1. **New front-end, ShulCloud behind the scenes** — modern public site; deep-link into ShulCloud only for member login/account actions. Lowest risk, fastest to ship.
2. **Full replacement** — migrate donations to Stripe and membership to a new backend. Larger scope; decide after POC feedback.

The POC should not require any ShulCloud integration to demo — mock or link out where needed.

### 7.1 Donation Data → ShulCloud (required)

Donations taken on the new site must end up in ShulCloud, which remains the bookkeeping system of record (member giving history, year-end tax letters). Options, simplest first:

1. **ShulCloud-hosted payment form behind the new front-end** — the donate page collects amount/dedication, then hands off to ShulCloud's payment form. Data lands in ShulCloud natively; trade-off is less control over checkout UX.
2. **Periodic export/import** — donations run through Stripe; office imports Stripe's CSV export into ShulCloud weekly/monthly. Low tech, small manual step.
3. **Automated sync** — Stripe webhooks push each donation into ShulCloud via its API/import endpoint. Best long-term, most build effort.

Venmo/Zelle gifts arrive in the shul's bank account regardless of website choice and are entered into ShulCloud manually today; that process is unchanged.

**POC:** demonstrate the checkout flow in Stripe test mode and present these three sync options for the board to choose; no live sync required to demo.

## 8. POC Scope

**In scope (demo-ready):**
- Homepage, About/History, Visit Us, Davening (with live Hebcal zmanim), Events calendar with 4–6 sample events, Donation flow (Stripe test mode + Venmo/Zelle placeholder buttons), Weekly announcements page with sample post, Membership info page.
- **Working CMS with a non-technical editing UI** — live demo of adding an event and publishing a weekly announcements post through a simple form (from a phone), with the change appearing on the site. This is the "easy updates" proof point vs. ShulCloud.
- Real content and photos pulled from the current site where possible.
- Deployed to a shareable URL (e.g., Vercel/Netlify) for board presentation.

**Out of scope (post-POC):**
- ShulCloud data migration, member login/portal, facility-rental booking, email blast system, photo galleries, multi-admin roles.

## 9. Suggested Stack (POC)

- **Framework:** Next.js (static-first, fast, easy Vercel deploy).
- **Styling:** Tailwind CSS — clean modern look matching the reference sites.
- **CMS:** Headless CMS with a friendly editing UI from day one — **Decap CMS** (free, git-based, simple form editor at `/admin`) or **Sanity** (free tier, more polished editor, better mobile editing). Static pages can stay as Markdown, but events and weekly announcements must be editable through the CMS UI for the demo.
- **Zmanim/Hebrew dates:** Hebcal API.
- **Payments:** Stripe (test mode).

## 10. Success Criteria for the POC Presentation

- A board member can find this Shabbat's schedule from the homepage in ≤ 2 taps.
- A test donation completes on a phone in ≤ 60 seconds.
- Adding a new event takes an admin ≤ 2 minutes — demonstrated live in the CMS UI during the presentation.
- Publishing a weekly announcements post through the same UI takes ≤ 5 minutes.
- The site is visibly more modern and welcoming than jewishdowntown.org side-by-side.

## 11. Open Questions

- Does the shul want to keep ShulCloud long-term, or is full replacement on the table?
- Who owns content updates day-to-day (office staff, rabbi, volunteer)?
- Is there existing photography of the building/community we can use, or do we need a photo session?
- Are there branding assets (logo, colors) to preserve, or is a refresh welcome?
- Domain: keep jewishdowntown.org or move to a new domain?
