# CodingRoof SEO Master Suite

The single reference for how codingroof.com is set up for search, what is already implemented, and what to do next.
Owner: CodingRoof marketing + engineering. Last updated: 2026-11-18.

---

## 1. Goal and positioning

**What we want to rank for:** buyers in India looking for ready-to-run software for a specific business type (gold loan, retail billing, salon, gym, textile, print, field service, surgical distribution), plus general SMB software (CRM, project tracking, ERP).

**Brand promise used in every title and snippet:** "Software your business runs on." Ready-to-run products, AI built in, custom builds on request.

**Rules**
- Only real claims. No invented testimonials, client logos, ratings, review stars or job openings. The only approved stats are 3.4x ROI, 12+ products, 14+ countries and a 6-week MVP.
- No em dashes or "AI-sounding" filler in titles and descriptions. Use a pipe `|` before the brand.
- One topic per page, one H1 per page, one canonical URL per page.

---

## 2. Keyword map

| Page | Primary keyword | Secondary keywords | Search intent |
|---|---|---|---|
| `/` | business software India | ready-made business software, SaaS for small business, AI business software | Brand + discovery |
| `/products` | business software products | gold loan software, retail billing software, salon software, gym management software, CRM software, ERP software, textile ERP, print shop software, field service software, surgical distributor software | Compare / choose |
| `/partners` (nav label "Partner with us") | software reseller program India | SaaS partner program, software referral program, become a software reseller | Partner acquisition |
| `/careers` | software jobs for freshers | CodingRoof careers, software internship, React developer jobs | Hiring |

**Future product pages (highest-value keywords, one page each, see section 7):**

| Planned URL | Primary keyword |
|---|---|
| `/products/gold-loan` | gold loan software |
| `/products/retail` | retail billing software |
| `/products/salon` | salon management software |
| `/products/fitforge` | gym management software |
| `/products/textile` | textile ERP software |
| `/products/print` | printing press management software |
| `/products/field-service` | field service management software |
| `/products/surgicals` | surgical distributor software |
| `/products/banking` | banking software |
| `/products/funnello` | CRM software for small business |
| `/products/vector` | project management software |
| `/products/erp` | ERP software for SMEs |

---

## 3. Technical SEO: implemented

| Item | Status | Where |
|---|---|---|
| Prerendered HTML for every page (real content in the HTML, not an empty `<div id="root">`) | Done | `scripts/prerender.mjs`, `src/entry-server.tsx`, build script in `package.json` |
| Per-page title, description, canonical, robots, Open Graph, Twitter tags | Done | `src/seo/pages.ts` (single source of truth) |
| Head tags kept in sync on client-side navigation | Done | `src/seo/RouteSeo.tsx` |
| Structured data (JSON-LD `@graph`): Organization + logo, WebSite (site name), WebPage, CollectionPage, BreadcrumbList, ItemList of SoftwareApplication | Done | `src/seo/pages.ts` |
| `sitemap.xml` generated at build time from the page list | Done | `scripts/prerender.mjs` |
| `robots.txt` with sitemap reference | Done | `public/robots.txt` |
| Real 404 status for unknown URLs (no soft 404s) + "Page not found" page | Done | `nginx.conf` (prod repo), `src/App.tsx` |
| One URL per page: `/index.html` to `/`, `/careers/` to `/careers`, `/careers.html` to `/careers` (301) | Done | `nginx.conf` (prod repo) |
| Favicons Google accepts: square, multiples of 48px, `/favicon.ico` at root, SVG, apple-touch-icon, web manifest | Done | `public/favicon.*`, `public/site.webmanifest` |
| Share image 1200x630 | Done | `public/og-image.png` |
| `noindex` on Sign in, Dashboard, 404 | Done | `src/seo/pages.ts` |
| `lang="en-IN"`, `og:locale en_IN` | Done | `index.html` |
| HTML never cached, hashed assets cached 1 year | Done | `nginx.conf` |
| All images have `alt`; one H1 per page | Verified | `dist/*.html` audit, 2026-11-18 |

### Title and description lengths (current)

| Page | Title | Description |
|---|---|---|
| `/` | CodingRoof \| Software your business runs on | Ready-to-run business software for CRM, projects, ERP, gold loan, retail billing, salons, gyms and more, with AI built in. Custom builds when you need them. |
| `/products` | Business Software Products \| CodingRoof | CRM, project tracking, ERP, gold loan, banking, retail POS, salon, gym, textile, print and field service software, plus AI helpers for billing and forecasting. |
| `/partners` | Partner Program: Earn on Every Renewal \| CodingRoof | Join the CodingRoof partner program. Refer, resell or implement our business software and earn recurring income on every renewal. Free to join, no targets. |
| `/careers` | Careers at CodingRoof \| Jobs and Internships | Careers at CodingRoof. Build business software real companies run every day. Hiring engineers, designers and sales roles year-round. Freshers welcome. |

Limits: title up to 60 characters, description 140 to 160 characters.

---

## 4. How to add or change a page (engineering checklist)

1. Add the route in `src/App.tsx`.
2. Add an entry in `src/seo/pages.ts`: `path`, `title`, `description`, `inSitemap`, `priority`, `jsonLd` (at least `webPage(...)` and `crumbs(...)`).
3. Exactly one `<h1>`; section titles are `<h2>`; every `<img>` has a meaningful `alt` (empty `alt=""` only for decoration).
4. `npm run build`. The page appears as `dist/<path>.html` and in `dist/sitemap.xml`.
5. Deploy (see the deploy section of the project notes), then in Search Console use **URL Inspection, Request indexing** for the new URL.

Never put user data or tracking IDs in URLs. Keep URLs lowercase, hyphenated and short.

---

## 5. Off-site setup: owner actions (need a CodingRoof Google / Cloudflare login)

| # | Action | Why |
|---|---|---|
| 1 | **Google Search Console**: add a *Domain* property `codingroof.com`, verify with the DNS TXT record in Cloudflare | Required to see rankings, errors and request re-crawls |
| 2 | Search Console, **Sitemaps**: submit `https://codingroof.com/sitemap.xml` | Tells Google about all pages |
| 3 | Search Console, **URL Inspection**: request indexing for `/`, `/products`, `/partners`, `/careers` | Replaces the stale old title, snippet and globe icon in results faster (normally takes days to a few weeks) |
| 4 | **Bing Webmaster Tools**: import from Search Console | Bing + ChatGPT search + DuckDuckGo use Bing's index |
| 5 | **Google Business Profile** for CodingRoof (office address, phone, hours, website, logo, category "Software company") | Brand panel and local "software company near me" results |
| 6 | ~~Fix **www.codingroof.com**~~ **Done 2026-11-18**: Cloudflare Redirect Rules "Redirect www to codingroof.com" (https) and "Redirect http www to codingroof.com" (http), 301, path and query kept | One canonical host |
| 7 | Add the same logo, name and URL on LinkedIn, Crunchbase, GitHub org, Clutch/GoodFirms profiles | Consistent entity signals and first backlinks |
| 8 | Link to `codingroof.com/products#<product>` from each product's own app domain (funnello.codingroof.com, vector.codingroof.com, ...) footer | Internal authority flow across subdomains |

---

## 6. Structured data reference

- **Organization** (`/#organization`): name, alternateName "Coding Roof", logo 512x512, email. Drives the logo in the knowledge panel.
- **WebSite** (`/#website`): name "CodingRoof". Drives the site name shown above the result title.
- **WebPage / CollectionPage** per page, linked to the website and organization.
- **BreadcrumbList** on inner pages. Shows "codingroof.com > Products" instead of a raw URL.
- **ItemList of SoftwareApplication** on `/products`.

- **FAQPage** on `/`, `/partners` and `/careers`, built from the FAQs shown on each page. Google rarely shows FAQ rich results for commercial sites now, but AI answer engines read this Q&A structure directly.
- **Organization.description, knowsAbout, contactPoint**: a one-paragraph, factual definition of what CodingRoof is, which AI assistants reuse when asked "What is CodingRoof?".

Do **not** add: `AggregateRating` or `Review` (no verified reviews), `JobPosting` (only with a real, specific opening that has location, salary range and a closing date).

Validate after each change: https://search.google.com/test/rich-results and https://validator.schema.org.

---

## 7. Content roadmap (ranking growth)

Ranked by expected impact.

1. **One page per product** (`/products/<slug>`, list in section 2). Each: H1 with the primary keyword, who it is for, 6 to 8 core features, screenshots with alt text, AI helpers that apply, a "Book a demo" CTA, and FAQs from real sales calls. Add `SoftwareApplication` JSON-LD with `offers` only once pricing is public.
2. **One page per industry** (`/industries/lending`, `/industries/retail`, ...). They mirror the Industries section on the home page and link to the matching products.
3. **Guides** (`/guides/...`), written from real customer questions, for example "How to calculate gold loan interest", "GST billing for retail counters", "Gym membership renewal reminders". Each links to its product page.
4. **Comparison pages**, only with honest, verifiable facts, for example "Spreadsheet vs gold loan software".
5. **Case studies**, only with written customer permission and real numbers.

Publish rhythm target: 2 product pages per week until all 12 are done, then 2 guides per month.

---

## 8. AI search and answer engines (GEO)

How ChatGPT, Claude, Perplexity, Gemini, Copilot and Google AI Overviews learn about CodingRoof, and what we do for each.

| Lever | Status | Where |
|---|---|---|
| AI crawlers explicitly allowed (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot, DuckAssistBot, Amazonbot, CCBot, meta-externalagent) | Done | `public/robots.txt` |
| `/llms.txt`: a plain-markdown fact sheet (what we are, every product with its features, AI helpers, industries, custom-build options, partner tracks, careers, all FAQs, page links). Generated at build from the same data the pages render, so it never goes stale | Done | `src/seo/llms.ts`, written by `scripts/prerender.mjs` |
| Full page text in raw HTML (many AI crawlers do **not** run JavaScript) | Done | prerendering |
| Entity clarity: one consistent name ("CodingRoof", alt "Coding Roof"), one description, one logo, one URL everywhere | Done on site; repeat on every external profile (section 5, item 7) | `src/seo/pages.ts` |
| Q&A structure (FAQPage + visible FAQs) | Done | pages + JSON-LD |
| Bing index (ChatGPT search and Copilot use it) | Owner action: Bing Webmaster Tools | section 5, item 4 |

**What makes an AI recommend us (and what never to do)**
- AI assistants recommend the vendor whose pages answer the buyer's exact question most clearly, with specifics it can quote: who the product is for, what it does, what it costs, how fast setup is, and proof from third parties. The single biggest lever is the per-product pages in section 7, each answering "best gold loan software for a small NBFC in India"-style questions with concrete facts.
- Third-party mentions weigh heavily: listings and reviews on G2, Capterra, GoodFirms, Clutch, Google Business Profile, LinkedIn posts, YouTube demos, and Reddit/Quora answers by real customers.
- Publish pricing (even "starts at") when the business is ready. AI answers about software almost always include price, and vendors without one are often skipped.
- **Never** add hidden text, "AI instructions", keyword stuffing, fake reviews or claims about competitors. AI systems and Google detect and discount these, and they can get the whole domain demoted. No site can force an AI to always pick it; being the clearest, most specific and best-evidenced answer is what wins.

**Check monthly:** ask ChatGPT, Claude, Perplexity and Gemini "What is CodingRoof?" and "Best gold loan software in India" (and the same for each product). Note whether we appear and whether the facts are right, then fix the source page if not.

---

## 9. Performance (Core Web Vitals)

Measured on the current build (`dist/`):

| Asset | Size | Action |
|---|---|---|
| Hero film MP4 / WebM | 2.3 MB / 1.7 MB | Keep `preload="metadata"` and the poster image; consider a 720p encode under 1 MB for mobile |
| Main JS bundle | 460 KB (about 140 KB gzipped) | Split Partners/Careers/Products routes with `React.lazy` when more pages are added |
| Industry photos | 220 to 390 KB each (JPG) | Convert to WebP/AVIF at 640px wide (target under 80 KB each) |
| Google Fonts (3 families) | network | Self-host or reduce to two families |

Targets: LCP under 2.5 s, CLS under 0.1, INP under 200 ms on mobile. Check with PageSpeed Insights after each deploy.

---

## 10. Verification checklist (run after every deploy)

```bash
curl -s https://codingroof.com/careers | grep -o '<title>[^<]*'          # page-specific title in raw HTML
curl -s -o /dev/null -w '%{http_code}\n' https://codingroof.com/nope       # 404
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://codingroof.com/index.html   # 301 -> /
curl -s https://codingroof.com/sitemap.xml                                  # 4+ URLs
curl -s https://codingroof.com/llms.txt | head -5                           # AI fact sheet
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' https://codingroof.com/favicon.ico  # 200 image/x-icon
curl -sI https://www.codingroof.com | head -3                               # 301 -> https://codingroof.com/
```

Monthly: Search Console **Pages** report (no "Crawled, not indexed" spikes), **Core Web Vitals** report, top queries vs. keyword map, and fix any 404s it reports.
