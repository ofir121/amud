# B'nai Israel Synagogue — Website Implementation Plan

**Project codename:** Amud
**Companion doc:** [requirements.md](requirements.md)
**Approach:** Ship a demo-ready POC first (Phase 1), present to the board, then build out the full website (Phase 2) based on their decisions.

---

## Phase 1 — POC (demo-ready site)

**Goal:** A deployed, shareable site that proves the three selling points live: modern mobile-first design, one-tap donations, and a non-technical editing UI. Estimated effort: **~2–3 weeks part-time**.

### Step 1: Project setup & skeleton (Day 1–2)

- [ ] Initialize Next.js project with Tailwind CSS; set up the repo (GitHub).
- [ ] Deploy the empty skeleton to Vercel immediately — get the shareable URL working on day one so every later step is visible.
- [ ] Base layout: header with logo placeholder, nav (About / Davening / Events / Visit Us / Membership), persistent highlighted **Donate** button, footer with address and contact.
- [ ] Global styles: typography, color palette inspired by the reference sites (South Philadelphia Shtiebel warmth, Ahavas Torah structure). Mobile-first from the first component.

### Step 2: CMS foundation (Day 2–4)

Set up the CMS **before** building content pages, so events and announcements are CMS-backed from the start rather than retrofitted.

- [ ] Choose between **Decap CMS** (free, git-based, `/admin` form editor, zero backend) and **Sanity** (free tier, more polished editor, better mobile editing). Recommendation: start with Decap for zero-cost simplicity; switch to Sanity only if the mobile editing experience isn't good enough in testing.
- [ ] Define content models:
  - **Event** — title, date/time, description, image, type (davening / class / community / holiday), optional RSVP link.
  - **Announcement post** — title, week date, rich-text body (schedule changes, kiddush sponsors, mazel tovs), publish date.
  - **Weekly davening schedule** — editable times table.
- [ ] Wire CMS auth so a non-technical editor can log in from a phone.
- [ ] **Verify the demo path early:** add a test event from a phone via the CMS UI and confirm it appears on the deployed site. This is the highest-risk piece of the demo — de-risk it in week one.

### Step 3: Content pages (Day 4–8)

- [ ] **Homepage:** hero with sanctuary photography, at-a-glance strip (next service, candle lighting/havdalah, next event), three CTAs above the fold (Donate · Visit · This Week's Schedule), upcoming events preview (next 3–4 from CMS), newsletter signup form (capture-only for POC).
- [ ] **About / Our History:** feature the 1876 landmark building; Rabbi & Leadership; Contact & Directions with embedded map.
- [ ] **Visit Us:** what to expect, parking, kosher food nearby, Shabbat hospitality.
- [ ] **Davening:** weekly schedule (from CMS) + live zmanim via **Hebcal API** — candle lighting, havdalah, parsha, Hebrew date for Baltimore. Cache/revalidate so the page stays fast.
- [ ] **Events:** calendar with list and month views, filter by type, individual shareable event pages with Open Graph tags. Seed with 4–6 real sample events.
- [ ] **Weekly announcements:** "This Week at B'nai Israel" page rendering the latest CMS post, with a browsable archive of recent weeks. Seed with one realistic sample post.
- [ ] **Membership:** info page with tiers/dues; join/renew as a lead-capture form (emails the office) or a link into existing ShulCloud membership.
- [ ] Pull real content and photos from jewishdowntown.org where possible.

### Step 4: Donation flow (Day 8–11)

- [ ] One-page donate flow: preset amounts + custom, one-time or monthly, dedication options (general, yahrzeit, in honor of, kiddush sponsorship, building fund), cover-the-fees checkbox.
- [ ] **Stripe test mode** integrated checkout — card, Apple Pay, Google Pay, PayPal — with automatic email receipt.
- [ ] **Venmo & Zelle** as clearly labeled "other ways to give" cards on the same page: Venmo handle + QR code, Zelle address + instructions (placeholder details for POC).
- [ ] Test the full flow on a real phone: target ≤ 60 seconds from homepage to completed test donation.

### Step 5: Polish & non-functional pass (Day 11–13)

- [ ] Lighthouse audit — target ≥ 90 on mobile (performance, accessibility, SEO).
- [ ] WCAG 2.1 AA pass: contrast, keyboard navigation, alt text, semantic HTML.
- [ ] SEO: metadata, Open Graph for event/donate links, local-business (synagogue) schema.
- [ ] Hebrew/RTL rendering check on names, dates, and mixed-direction text.
- [ ] Cross-device testing: iPhone, Android, tablet, desktop.

### Step 6: Demo prep (Day 13–14)

- [ ] Rehearse the live demo script:
  1. Homepage → this Shabbat's schedule in ≤ 2 taps.
  2. Test donation on a phone in ≤ 60 seconds.
  3. **Live from a phone:** add a new event through the CMS UI in ≤ 2 minutes — watch it appear on the site.
  4. Publish a weekly announcements post through the same UI in ≤ 5 minutes.
  5. Side-by-side with jewishdowntown.org.
- [ ] Prepare the **three donation-data → ShulCloud sync options** as a one-slide decision for the board (hosted form handoff / periodic CSV import / automated webhook sync).
- [ ] Bring the open questions from requirements §11 to the board (ShulCloud long-term, content ownership, photography, branding, domain).

### POC exit criteria (from requirements §10)

- Shabbat schedule reachable in ≤ 2 taps; test donation ≤ 60s on a phone; event added live via CMS in ≤ 2 min; announcements post published in ≤ 5 min; site visibly more modern than the current one side-by-side.

---

## Phase 2 — Full Website (post-POC)

**Trigger:** Board approval of the POC and decisions on the §11 open questions (especially ShulCloud strategy and domain). Sequenced so each milestone is independently shippable.

### Milestone 1: Production launch (~2–3 weeks)

- [ ] **Real payment credentials:** Stripe live mode, real Venmo handle/QR, real Zelle address; confirm receipt emails and tax language with the office.
- [ ] **Donation → ShulCloud sync:** implement whichever option the board picked. Start with the simplest that satisfies bookkeeping (likely periodic Stripe CSV import), with the automated webhook sync as a follow-up if volume justifies it.
- [ ] **Content completion:** all real photography (schedule a photo session if needed), finalized copy for every page, real branding assets (logo, colors).
- [ ] **Domain & cutover:** point jewishdowntown.org (or new domain) at the new site; 301 redirects from old ShulCloud URLs for key pages (donate, calendar, contact); keep ShulCloud reachable for member login.
- [ ] Analytics (privacy-friendly, e.g. Plausible/Vercel Analytics) to measure donation funnel and popular content.

### Milestone 2: Email & newsletter delivery (~1–2 weeks)

- [ ] Connect the newsletter signup to a real list (Mailchimp / Buttondown, or ShulCloud's email tool per board preference).
- [ ] Weekly announcements post → email blast workflow: publishing in the CMS optionally triggers/feeds the email, so the volunteer publishes once.
- [ ] Migrate any existing subscriber list from ShulCloud.

### Milestone 3: Events & engagement upgrades (~2 weeks)

- [ ] RSVP and ticket purchase on event pages (Stripe checkout reuse for paid events like High Holidays).
- [ ] Calendar subscription: ICS feed / "Add to Google Calendar."
- [ ] High Holidays section: seat reservations, schedule, appeals.
- [ ] Kiddush sponsorship flow: pick a date, sponsor, pay — tied into the donation dedication system.
- [ ] Photo galleries (community events, historic building).

### Milestone 4: Membership & member portal (scope depends on ShulCloud decision)

- **If keeping ShulCloud** (front-end strategy, requirements §7 option 1):
  - [ ] Online join/renew handing off to ShulCloud membership forms.
  - [ ] "My Account" links deep-linking into ShulCloud login for statements and account actions.
- **If replacing ShulCloud** (§7 option 2 — larger scope, only if the board chooses it):
  - [ ] Membership database + dues billing on Stripe subscriptions.
  - [ ] Member data migration from ShulCloud; giving-history import.
  - [ ] Year-end tax letter generation.
  - [ ] Member login/portal.

### Milestone 5: Operations & governance (ongoing)

- [ ] Multi-admin CMS roles (office staff, rabbi, volunteers) with appropriate permissions.
- [ ] A one-page "how to update the site" guide with screenshots for volunteers; a 30-minute training session.
- [ ] Content ownership rota per the board's §11 answer (who posts the weekly announcements).
- [ ] Backup/export story: content lives in git (Decap) or Sanity's export — document the recovery process.
- [ ] Facility-rental booking page (if the shul wants it — was explicitly out of POC scope).

---

## Dependencies & decision points

| Decision | Needed by | Owner |
|----------|-----------|-------|
| Decap vs. Sanity | Phase 1, Step 2 | Developer (recommend Decap, validate mobile editing) |
| Donation → ShulCloud sync option | Phase 2, Milestone 1 | Board (presented at POC demo) |
| Keep vs. replace ShulCloud | Phase 2, Milestone 4 | Board |
| Domain (keep jewishdowntown.org?) | Phase 2, Milestone 1 | Board |
| Branding refresh vs. preserve | Phase 2, Milestone 1 | Board |
| Photography source | Phase 2, Milestone 1 | Shul (photo session if no assets exist) |

## Risks

- **CMS mobile editing UX** — the live "add an event from a phone" demo is the centerpiece; validate it in week one (Phase 1, Step 2), and switch Decap → Sanity early if it falls short.
- **Stripe account ownership** — the shul needs its own Stripe account for launch; start the application during the POC to avoid blocking Milestone 1.
- **ShulCloud API access** — the automated sync option depends on what ShulCloud's API/import actually supports; verify before promising it to the board.
- **Content bottleneck** — real photos and copy are usually the slowest part of launch; assign owners at the POC presentation.
