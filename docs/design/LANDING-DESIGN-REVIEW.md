# codingroof.com landing page: design review

Reviewed live on 2026-11-18 at 1440px desktop and 375px mobile, against the 60 SaaS home pages studied for the copy work (Jobber, Fresha, Mindbody, Xero, Zoho, Odoo, Stripe, Linear, Vyapar, myBillBook and others) and against WCAG 2.2 and Core Web Vitals.
Nothing has been changed yet. Each item says what's wrong, why it matters, and the fix.

**Overall:** the visual system is clean and modern (white and blue, consistent cards, a strong headline with the brush stroke, fast load, no layout jumps). The gaps are mostly not visual. They are **conversion and trust**: how a visitor books a demo, why they should believe us, and whether the page reads as a product company or an agency.

---

## Critical: costs leads or trust today

### 1. "Book a demo" is only an email link
- **Now:** every "Book a demo" button ends in `mailto:hello@codingroof.com`. The header button first jumps to the bottom of the page, then the visitor has to click again.
- **Why it matters:** on most office computers (no mail app set up), a mailto link does nothing or opens a blank app. Every product company reviewed uses an on-page form or a calendar booking. This is the single biggest leak on the page.
- **Fix:** a short demo form (name, phone, business type, city) that sends to our inbox or CRM, and/or calendar booking (Cal.com or Calendly). Add a **WhatsApp** button, which Indian SMB buyers expect.

### 2. No social proof anywhere
- **Now:** no customer logos, testimonials, case studies, ratings or "used by" numbers. (The old fake ones were rightly removed.)
- **Why it matters:** proof is one of the first things on every page reviewed, usually right under the hero. Without it, a first-time visitor has no reason to trust a company they've never heard of.
- **Fix (needs real material from you):** 4 to 8 customer logos (with permission), 2 or 3 short quotes with name, role and business, and one case study with real numbers.

### 3. The stats look unbacked
- **Now:** "3.4× average ROI within 12 months" sits right under the hero with no source.
- **Why it matters:** a skeptical buyer reads an unexplained ROI number as made up, which hurts trust instead of building it.
- **Fix:** link it to a case study or add a one-line source ("across N customers, 2024-2025"), or swap it for a number that needs no explanation (businesses using our software, bills generated, branches live).

### 4. The footer has no legal or company details
- **Now:** no Privacy Policy, no Terms, no registered company name or address, no phone number, no social links.
- **Why it matters:** India's DPDP Act 2023 requires a privacy notice wherever personal data is collected (demo requests, partner applications, job applications). Buyers and payment and ad platforms also look for these as basic legitimacy signals.
- **Fix:** add Privacy Policy and Terms pages, the registered business name and address, a phone/WhatsApp number, and LinkedIn (plus any other active channels).

---

## High: clarity and structure

### 5. The "Pricing" nav link has no pricing
- **Now:** "Pricing" scrolls to the custom-build engagements (Sprint, Product pod, Fractional CTO), and none of them show a price.
- **Fix:** rename it to **"Custom builds"**, or add real product pricing (even "plans from ₹X/month"). AI assistants and buyers both look for price.

### 6. The page reads half product company, half agency
- **Now:** after "12 products, one platform", the page spends its second half on "How we build" (six engineering principles) and agency services (Fractional CTO, product pods).
- **Why it matters:** product companies (Zoho, Odoo, Jobber) keep services on a separate page. Mixing them makes a store owner unsure whether they're buying software or hiring developers.
- **Fix:** keep one short "Need something custom?" band on the home page and move the engagements and principles to a **/custom-builds** page.

### 7. "How we build" is the longest section for the least content
- **Now:** six one-line principles take **1,875px on desktop (20% of the whole page)** and 1,537px on mobile, mostly empty space around a thin zig-zag line.
- **Fix:** a compact 3×2 grid (about 500px), or move it to /custom-builds (see 6).

### 8. Two different primary buttons
- **Now:** the header's main button is "Book a demo", but in the hero the blue main button is "Explore products" and "Book a demo" is the secondary one.
- **Fix:** one primary action everywhere. For B2B software that's **Book a demo** (blue); "Explore products" becomes the secondary button.

### 9. Product cards lead nowhere deeper
- **Now:** "Learn more" on each card opens the Products page, which repeats the same one-line description. There are no screenshots, and Funnello and Vector don't link to their live sites.
- **Fix:** a page per product (screenshots, 6 to 8 features, who it's for, demo button), or at least link Funnello and Vector to their own sites. This is also the biggest SEO growth lever (see the SEO master suite).

### 10. A lone card on the last row
- **Now:** the 9 industry products sit in a 4-column grid, which leaves **Field Service alone** on the last row.
- **Fix:** a 3-column grid (a clean 3×3) for industry products.

### 11. The hero product film is unreadable on phones
- **Now:** on a 375px phone the app film shrinks so far that its text is about 4px high, so it reads as a grey box.
- **Fix:** on mobile, show one cropped, zoomed screen (or a phone-frame version) instead of the full desktop app.

---

## Medium: polish

| # | Issue | Fix |
|---|---|---|
| 12 | Mobile page is **12,570px** (about 15 phone screens). The 12 product cards alone stack to about 2,900px. | 2-column compact tiles or a horizontal swipe row for products on mobile. |
| 13 | The **nav logo is blurry on retina screens**: it uses the 46×48px raster shown at 32px (needs 64px on 2× screens). | Use the new vector `favicon.svg` mark in the header and footer. |
| 14 | **Contrast:** the final call-to-action paragraph (80% white on blue) measures **3.77:1**, below the WCAG AA minimum of 4.5:1. | Use solid white or 90% white text. |
| 15 | The **hero film downloads 1.6 MB right away** (`preload="auto"`) on every visit, including mobile data. That's about 85% of the page's 1.9 MB. | `preload="metadata"`, start it only when visible, and show only the poster image for Save-Data or slow connections. |
| 16 | **Unused fonts:** Bricolage Grotesque and Hanken Grotesk are requested in `index.html`, but only Inter is used. Using a single font also makes headlines look generic. | Either drop the two unused families, or use Bricolage for H1/H2 to give the brand a distinctive look (most premium SaaS pair a display face with a text face). |
| 17 | **Card text is 14px.** Small for SMB owners reading on phones. | 15 to 16px for card descriptions. |
| 18 | **The FAQ only covers custom builds.** Nothing on price, setup time, data migration, support hours, mobile app, GST, offline use or data security, which are a product buyer's first questions. | Add 5 or 6 product FAQs (we already have the answers on migration and support). |
| 19 | **Small tap targets on mobile:** the product chips on industry photos are 24px tall and the menu button is 36px. | 44 to 48px touch targets (Google's guideline). |
| 20 | **The mobile menu pushes the page down** instead of opening as an overlay. | A full-height sheet with a backdrop (the standard pattern). |
| 21 | **The AI helpers are text-only cards**, so the most exciting feature is the least visual. | A small "before → after" visual, e.g. a photo of a paper bill becoming a GST invoice, or voice turning into line items. |
| 22 | **No phone number and no WhatsApp** anywhere on the site. | Add them to the header or contact band and the footer. |

---

## What's already at a world-class level (keep)

- A clean, consistent visual system: one blue, one radius, one border style and calm shadows.
- A strong, short headline with a memorable brush-stroke detail.
- Layout stability: CLS **0.006** (the target is under 0.1). The page is interactive in about 0.2s on desktop.
- No horizontal scrolling on mobile, one H1 per page, alt text on every image, and pre-rendered HTML for search and AI.
- Real industry photography: no stock people, consistent and clean.

---

## Suggested order of work

1. Demo form + WhatsApp (item 1), a primary-button fix (8), a "Pricing" label fix (5) and a contrast fix (14). Quick, and directly lifts conversions.
2. Footer legal and company details (4). Needs your registered name, address, phone and the policy wording.
3. Restructure: move principles and engagements to /custom-builds, put a 3-column industry grid on the home page, and fix the mobile hero film (6, 7, 10, 11).
4. Polish: crisp logo, video loading, fonts, card text size, mobile product tiles, product FAQs (12-20).
5. Social proof and stats (2, 3), as soon as you can share real customer names, quotes or numbers.
