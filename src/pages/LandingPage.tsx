import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Camera, Compass, Layers, LineChart, Minus, Pause, Play, Plus, Rocket, ShieldCheck, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { type MouseEvent, ReactNode, useEffect, useId, useRef, useState } from "react";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { categories, products, productBySlug, type Product } from "@/data/products";
import heroFilmMp4 from "@/assets/hero/hero-film.mp4";
import heroFilmWebm from "@/assets/hero/hero-film.webm";
import heroFilmPoster from "@/assets/hero/hero-film-poster.jpg";
import {
  AiHelperGrid,
  CONTACT_EMAIL,
  Container,
  Cta,
  Footer,
  Navbar,
  ProductTile,
  SectionHeader,
  useHashScroll,
} from "@/components/site";

/**
 * Paint-brush band painted behind the whole word (full width and height). Loaded where the brush lands,
 * bristle streaks and torn edges from SVG noise, split dry bristles at the tail. Painted in left to
 * right along the stroke. (Version 1: git tag version-1.)
 */
const BAND = "M16 22 C 14 10, 30 6, 60 8 C 150 4, 250 9, 340 5 C 362 4, 378 8, 386 14 C 392 34, 391 64, 387 84 C 380 93, 362 95, 340 94 C 250 97, 150 92, 60 96 C 32 97, 14 92, 12 76 C 10 58, 12 40, 16 22 Z";
// Bristles running out of paint past the end: [x1, y1, x2, y2, width, opacity]
const BAND_BRISTLES: [number, number, number, number, number, number][] = [
  [350, 12, 392, 10, 7, 0.8], [356, 24, 398, 23, 8, 0.85], [350, 36, 388, 36, 6, 0.7], [354, 48, 399, 49, 9, 0.85],
  [350, 60, 384, 61, 6, 0.65], [356, 72, 396, 73, 8, 0.8], [350, 84, 386, 86, 6, 0.7], [354, 93, 376, 94, 5, 0.55],
];
const Highlight = ({ children }: { children: ReactNode }) => {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const texture = `band-tex-${uid}`;
  const reveal = `band-rev-${uid}`;
  const paint = `band-paint-${uid}`;
  return (
    <span className="relative inline-block whitespace-nowrap px-[0.06em]">
      <svg
        aria-hidden
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        className="absolute -left-[0.12em] -top-[0.02em] h-[calc(100%+0.1em)] w-[calc(100%+0.32em)] -rotate-[1deg] overflow-visible"
      >
        <defs>
          <filter id={texture} x="-3%" y="-15%" width="106%" height="130%">
            {/* Bristle streaks: solid paint with fine lighter lines along the stroke */}
            <feTurbulence type="fractalNoise" baseFrequency="0.004 0.32" numOctaves="2" seed="11" result="streaks" />
            <feColorMatrix in="streaks" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.6 0 0 0 -0.4" result="streakMask" />
            <feComposite in="SourceGraphic" in2="streakMask" operator="in" result="streaked" />
            {/* Torn edges */}
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.08" numOctaves="3" seed="5" result="grain" />
            <feDisplacementMap in="streaked" in2="grain" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          {/* Deeper gold where the brush is loaded, brighter and drier toward the tail */}
          <linearGradient id={paint} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#F2B01E" />
            <stop offset="0.4" stopColor="#F6C23E" />
            <stop offset="0.85" stopColor="#F9CC52" />
            <stop offset="1" stopColor="#FBD466" stopOpacity="0.7" />
          </linearGradient>
          <mask id={reveal} maskUnits="userSpaceOnUse" x="-30" y="-30" width="460" height="160">
            <motion.path
              d="M-10 50 L 410 50"
              stroke="#fff"
              strokeWidth="160"
              fill="none"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              // Human pace: the brush presses down, travels steadily, then eases off as it lifts
              transition={{ delay: 0.5, duration: 1.6, ease: [0.45, 0.05, 0.3, 1] }}
            />
          </mask>
        </defs>
        <g filter={`url(#${texture})`} mask={`url(#${reveal})`}>
          <path d={BAND} fill={`url(#${paint})`} />
          {/* Loaded blob where the brush first touches */}
          <ellipse cx="26" cy="52" rx="18" ry="45" fill="#F2B01E" />
          <g stroke="#F8C848" strokeLinecap="round">
            {BAND_BRISTLES.map(([x1, y1, x2, y2, w, o], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={w} opacity={o} />
            ))}
          </g>
          {/* Ridges of thicker paint, and a wet sheen near the top */}
          <g fill="none" strokeLinecap="round">
            <path d="M30 14 C 130 10, 250 14, 372 10" stroke="#E6A314" strokeWidth="4" opacity="0.5" />
            <path d="M28 88 C 140 91, 250 86, 366 89" stroke="#E09A0E" strokeWidth="4" opacity="0.5" />
            <path d="M40 62 C 150 65, 250 60, 360 63" stroke="#E9AB22" strokeWidth="2.5" opacity="0.35" />
            <path d="M44 30 C 150 27, 250 31, 356 28" stroke="#FFDD7A" strokeWidth="4" opacity="0.55" />
          </g>
        </g>
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
};

// ===== Hero =====
/**
 * Hero brand film (made with Higgsfield Higgsedit). Autoplays muted, pauses while off screen, never preloads the full file,
 * and shows the poster for reduced motion or data-saver connections. On phones it zooms into the assistant
 * panel (the centre of the frame) so the UI text stays readable instead of shrinking the whole desktop scene.
 */
const HERO_ALT = "CodingRoof assistant answering across Gold Loan, Retail and FitForge";
const heroMedia =
  "block aspect-video max-w-none w-[249%] -ml-[95.4%] -mt-[33%] object-cover sm:m-0 sm:w-full sm:max-w-full";

const HeroFilm = () => {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterOnly, setPosterOnly] = useState(false);

  useEffect(() => {
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (c?.saveData || /(^|-)2g$/.test(c?.effectiveType ?? "")) setPosterOnly(true);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduceMotion, posterOnly]);

  return (
    <div className="aspect-[8/5] overflow-hidden rounded-2xl border border-border bg-[#F1EEFB] shadow-[0_30px_80px_-30px_rgba(40,30,120,0.35)] sm:aspect-auto">
      {reduceMotion || posterOnly ? (
        <img src={heroFilmPoster} alt={HERO_ALT} className={heroMedia} />
      ) : (
        <video ref={videoRef} className={heroMedia} autoPlay muted loop playsInline preload="metadata" poster={heroFilmPoster} aria-label={HERO_ALT}>
          <source src={heroFilmWebm} type="video/webm" />
          <source src={heroFilmMp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

const Hero = () => (
  <section className="relative overflow-x-clip">
    {/* Faint grid that fades out, plus a soft blue wash */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[linear-gradient(to_right,hsl(218_40%_92%)_1px,transparent_1px),linear-gradient(to_bottom,hsl(218_40%_92%)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_70%_at_50%_0%,hsl(216_90%_96%),transparent)]"
    />
    <Container className="relative pt-14 pb-6 md:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <span className="flex -space-x-1">
            {["funnello", "vector", "gold-loan"].map((s) => (
              <img key={s} src={productBySlug[s].logo} alt="" className="h-4 w-4 rounded-full bg-white object-contain ring-2 ring-white" />
            ))}
          </span>
          {products.length} products, one platform
          <ArrowRight className="h-3 w-3" />
        </Link>
        <h1 className="mt-7 text-[40px] md:text-[68px] font-semibold tracking-[-0.04em] leading-[1.02] text-foreground text-balance">
          The software your <Highlight>business</Highlight> runs on.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground text-balance">
          From the first enquiry to the final payment, CodingRoof runs your billing, stock, customers and staff on one
          platform built for your industry.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#contact"
            className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-primary px-6 text-[15px] font-medium text-primary-foreground shadow-[0_8px_20px_-8px_rgba(36,99,209,0.6)] hover:bg-primary/90"
          >
            Book a demo <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/products"
            className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-md border border-border bg-white px-6 text-[15px] font-medium hover:bg-muted"
          >
            Explore products
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-5xl md:mt-16">
        <HeroFilm />
      </div>
    </Container>
  </section>
);

// ===== Stats =====
export const stats = [
  { stat: "12+", label: "SaaS products shipped" },
  { stat: "14+", label: "Countries served" },
  { stat: "6 weeks", label: "From kickoff to MVP" },
];

const Stats = () => (
  <section className="py-16 md:py-20">
    <Container>
      <dl className="grid grid-cols-3 overflow-hidden rounded-2xl border border-border">
        {stats.map((s, i) => (
          <div key={s.label} className={`flex flex-col p-4 sm:p-6 md:p-8 ${i > 0 ? "border-l" : ""} border-border`}>
            <dt className="text-xs leading-snug text-muted-foreground sm:text-sm">{s.label}</dt>
            <dd className="mt-auto whitespace-nowrap pt-2 text-xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-foreground">{s.stat}</dd>
          </div>
        ))}
      </dl>
    </Container>
  </section>
);

// ===== Products =====
/** Phones: compact one-line rows. md+: full cards in a 3-column grid (no orphan cards: 3 and 9 products). */
const HomeProductCard = ({ p }: { p: Product }) => {
  const cls =
    "group flex items-center gap-3.5 rounded-xl border border-border bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_30px_-18px_rgba(36,99,209,0.45)] md:flex-col md:items-stretch md:gap-0 md:rounded-2xl md:p-6";
  const Arrow = p.landing ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <div className="flex min-w-0 flex-1 items-center gap-3.5 md:flex-none">
        <ProductTile src={p.logo} name={p.name} />
        <div className="min-w-0">
          <h3 className="text-base md:text-[17px] font-semibold tracking-[-0.01em]">{p.name}</h3>
          <p className="text-[13px] leading-snug text-muted-foreground">{p.tag}</p>
        </div>
      </div>
      <p className="mt-4 hidden flex-1 text-[15px] leading-relaxed text-muted-foreground md:block">{p.desc}</p>
      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary md:mt-5">
        <span className="hidden md:inline">Learn more</span>
        <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </>
  );
  return p.landing ? (
    <a href={p.landing} target="_blank" rel="noopener" className={cls} aria-label={`${p.name}: learn more (opens product site)`}>
      {inner}
    </a>
  ) : (
    <Link to={`/products#${p.slug}`} className={cls}>
      {inner}
    </Link>
  );
};

const Products = () => (
  <section id="products" className="py-20 md:py-28">
    <Container>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="Products"
          title="One suite for the businesses that keep things running."
          desc="Each product is a complete, production-grade system, not a template. Run one, or several together."
        />
        <Link
          to="/products"
          className="inline-flex h-10 shrink-0 items-center gap-2 self-start rounded-md border border-border px-4 text-sm font-medium hover:bg-muted md:self-auto"
        >
          View all products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {categories.map((c) => {
        const items = products.filter((p) => p.category === c.id);
        return (
          <div key={c.id} className="mt-12">
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
              <h3 className="text-sm font-semibold">{c.label}</h3>
              <span className="text-xs text-muted-foreground">{items.length} products</span>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3 md:gap-4">
              {items.map((p) => (
                <HomeProductCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        );
      })}
    </Container>
  </section>
);

// ===== AI Helpers =====
/** Illustrative "photo of a bill -> structured bill" panel for OCR billing (sample data). */
const billLines = [
  { item: "Basmati rice 25 kg", short: "Rice 25kg", qty: 2, amount: "2,900" },
  { item: "Sunflower oil 15 L", short: "Oil 15L", qty: 1, amount: "2,150" },
  { item: "Toor dal 5 kg", short: "Dal 5kg", qty: 3, amount: "1,980" },
];
const OcrVisual = () => (
  <div className="relative grid items-center gap-4 sm:grid-cols-[minmax(0,0.85fr)_auto_minmax(250px,1.15fr)]">
    <div className="relative mx-auto w-full max-w-[240px] -rotate-2 rounded-lg border border-[#E7DFC9] bg-[#FFFBF0] p-4 font-mono text-[12px] leading-6 text-[#5B4A2E] shadow-[0_12px_30px_-16px_rgba(60,40,10,0.35)]">
      <span className="absolute -top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 font-sans text-[11px] font-medium text-muted-foreground ring-1 ring-border">
        <Camera className="h-3 w-3" /> Photo of a paper bill
      </span>
      <p className="mt-1 italic">Sri Murugan Stores</p>
      {billLines.map((l) => (
        <p key={l.item} className="flex justify-between italic">
          <span className="truncate pr-2">{l.qty} × {l.short}</span>
          <span>{l.amount}</span>
        </p>
      ))}
      <p className="mt-1 flex justify-between border-t border-dashed border-[#D9CDA9] pt-1 italic">
        <span>Total</span>
        <span>7,030</span>
      </p>
    </div>
    <div className="flex justify-center">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm">
        <Sparkles className="h-3.5 w-3.5" /> OCR billing
      </span>
    </div>
    <div className="rounded-xl border border-border bg-white p-4 shadow-[0_16px_40px_-24px_rgba(36,99,209,0.45)]">
      <div className="flex items-center justify-between border-b border-border pb-2.5">
        <p className="whitespace-nowrap text-sm font-semibold">Bill #1042</p>
        <span className="whitespace-nowrap rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-primary">Created automatically</span>
      </div>
      <table className="mt-2 w-full text-[13px]">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="py-1 font-medium">Item</th>
            <th className="py-1 text-right font-medium">Qty</th>
            <th className="py-1 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {billLines.map((l) => (
            <tr key={l.item} className="border-t border-border">
              <td className="py-1.5 pr-2">{l.item}</td>
              <td className="py-1.5 text-right tabular-nums">{l.qty}</td>
              <td className="py-1.5 text-right tabular-nums">₹{l.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 flex justify-between border-t border-border pt-2 text-sm font-semibold">
        <span>Total</span>
        <span className="tabular-nums">₹7,030</span>
      </p>
    </div>
  </div>
);

const AiHelpers = () => (
  <section id="ai-helpers" className="border-y border-border bg-muted py-20 md:py-28">
    <Container>
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
        <SectionHeader
          eyebrow="AI Helpers"
          title="AI that works inside the products you already use."
          desc="Lightweight helpers that plug into any CodingRoof product, taking over the busywork and surfacing what needs attention."
        />
        </div>
        <div className="lg:col-span-7">
          <OcrVisual />
        </div>
      </div>
      <div className="mt-14">
        <AiHelperGrid />
      </div>
    </Container>
  </section>
);

// ===== Industries =====
// Photos are picked up automatically from src/assets/industries/<slug>.(jpg|jpeg|png|webp).
const industryPhotos = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>("../assets/industries/*.{jpg,jpeg,png,webp}", { eager: true, import: "default" })
  ).map(([path, url]) => [path.split("/").pop()!.replace(/\.\w+$/, ""), url])
) as Record<string, string>;

export const industries = [
  { slug: "lending", name: "Lending & finance", desc: "Pledges, deposits, loans and ledgers with full audit trails.", products: ["gold-loan", "banking"] },
  { slug: "healthcare", name: "Healthcare supply", desc: "Batch, expiry and reorder control for medical distributors.", products: ["surgicals"] },
  { slug: "retail", name: "Retail", desc: "Counter billing, stock and repeat customers for stores of every size.", products: ["retail"] },
  { slug: "personal-care", name: "Personal care", desc: "Salon appointments, gym memberships, trainers and repeat clients.", products: ["salon", "fitforge"] },
  { slug: "manufacturing", name: "Manufacturing & textiles", desc: "Orders, production stages, inventory and accounts.", products: ["textile", "erp"] },
  { slug: "print", name: "Print & packaging", desc: "Quote-to-delivery for print shops and converters.", products: ["print"] },
  { slug: "field", name: "Field operations", desc: "Jobs, technicians and on-site service, tracked end to end.", products: ["field-service"] },
];

const ProductChips = ({ slugs, onPhoto = false }: { slugs: string[]; onPhoto?: boolean }) => (
  <div className="flex flex-wrap gap-2">
    {slugs.map((slug) => {
      const p = productBySlug[slug];
      return (
        <Link
          key={slug}
          to={`/products#${slug}`}
          className={`inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            onPhoto ? "bg-white/95 shadow-sm hover:bg-white" : "border border-border hover:border-primary/40 hover:bg-accent"
          }`}
        >
          <img src={p.logo} alt="" className="h-3.5 w-3.5 object-contain" />
          {p.name}
        </Link>
      );
    })}
  </div>
);

// Auto-scrolling strip: keeps drifting under the mouse; a click toggles stop/resume. Swipeable, static when reduced motion is on.
const Industries = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [stopped, setStopped] = useState(false);
  const stoppedRef = useRef(false);
  stoppedRef.current = stopped;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = trackRef.current;
    if (!el || reduceMotion) return;
    let raf = 0;
    let last = performance.now();
    let pos = el.scrollLeft;
    const step = (t: number) => {
      const dt = Math.min(t - last, 50);
      last = t;
      if (stoppedRef.current || dragging.current) {
        pos = el.scrollLeft;
      } else {
        if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft; // user scrolled the strip
        pos += dt * 0.035; // ~35px per second
        const loop = el.scrollWidth / 2; // items are rendered twice
        if (pos >= loop) pos -= loop;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const toggle = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) return; // product chips navigate instead
    setStopped((s) => !s);
  };

  const items = reduceMotion ? industries : [...industries, ...industries];

  return (
    <section id="industries" className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Industries"
          title="Built around how your industry actually works."
          desc="Every product starts from the day-to-day of a real business, so your team recognises the workflow on day one."
        />
      </Container>
      <div
        ref={trackRef}
        onClick={toggle}
        onTouchStart={() => (dragging.current = true)}
        onTouchEnd={() => (dragging.current = false)}
        title={stopped ? "Click to resume scrolling" : "Click to stop scrolling"}
        className="mt-12 flex cursor-pointer gap-5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-8 [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]"
      >
        {items.map((it, i) => {
          const photo = industryPhotos[it.slug];
          const copy = i >= industries.length;
          return (
            <article
              key={`${it.slug}-${i}`}
              aria-hidden={copy || undefined}
              inert={copy || undefined}
              className="group flex w-[280px] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-white sm:w-[320px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                {photo && (
                  <img
                    src={photo}
                    alt={copy ? "" : it.name}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                )}
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4">
                  <ProductChips slugs={it.products} onPhoto />
                </div>
              </div>
              <div className="flex-1 p-6">
                <h3 className="text-base font-semibold">{it.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{it.desc}</p>
              </div>
            </article>
          );
        })}
      </div>
      {!reduceMotion && (
        <Container className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => setStopped((s) => !s)}
            aria-pressed={stopped}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            {stopped ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            {stopped ? "Play" : "Pause"}
          </button>
        </Container>
      )}
    </section>
  );
};

// ===== Principles (kept: sticker cards + ink connector, restyled in blue) =====

const principles: { title: string; desc: string; icon: LucideIcon }[] = [
  { title: "Architecture-led development", desc: "Systems designed for scale before complexity appears.", icon: Layers },
  { title: "Predictable execution", desc: "Clear inputs, controlled outputs and measurable progress.", icon: Zap },
  { title: "Reliability by design", desc: "Failure is accounted for at the system level, not handled later.", icon: ShieldCheck },
  { title: "Continuous evolution", desc: "Software is iterated and improved as a system, not delivered once.", icon: Rocket },
  { title: "Operational clarity", desc: "System behaviour, changes and decisions stay visible and structured.", icon: Compass },
  { title: "Measurable outcomes", desc: "Built to reduce friction, raise throughput and show the business impact.", icon: LineChart },
];

interface Anchor {
  xIn: number;
  xOut: number;
  y: number;
}

/**
 * Original hand-drawn ink ribbon (restored): wobbly bezier segments from the
 * right edge of each card to the left edge of the next, drawn in on scroll.
 * Only the colour changed (blue instead of black).
 */
/** Six principles in a compact 3×2 grid (was a tall zig-zag; now about a quarter of the height). */
const Principles = () => (
  <section className="border-t border-border py-20 md:py-28">
    <Container>
      <SectionHeader
        eyebrow="How we build"
        title="Six principles behind every system we ship."
        desc="The same engineering standards apply whether you run one of our products or we build one for you."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((p, i) => (
          <StickerCard key={p.title} index={i + 1} {...p} />
        ))}
      </div>
    </Container>
  </section>
);

const StickerCard = ({ index, title, desc, icon: Icon }: { index: number; title: string; desc: string; icon: LucideIcon }) => (
  <div
    data-sticker-card
    className="relative h-full w-full rounded-2xl border border-[hsl(218_40%_84%)] bg-white p-6 md:p-7 shadow-[5px_5px_0_0_hsl(218_80%_92%)] transition-shadow hover:shadow-[3px_3px_0_0_hsl(218_80%_88%)]"
  >
    <span className="absolute -top-3 right-6 rounded-full border border-[hsl(218_40%_84%)] bg-white px-2.5 py-0.5 font-mono text-[11px] tracking-[0.14em] text-primary">
      {String(index).padStart(2, "0")}
    </span>
    <div className="flex items-start gap-4">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <div>
        <h3 className="text-lg md:text-xl font-semibold tracking-[-0.015em] leading-snug">{title}</h3>
        <svg width="56" height="6" viewBox="0 0 64 6" fill="none" className="mt-2 text-primary/50" aria-hidden>
          <path d="M1 3 Q 8 0.5, 16 3 T 32 3 T 48 3 T 63 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </div>
  </div>
);

// ===== Custom builds =====
const CustomBuilds = () => (
  <section id="custom" className="border-t border-border bg-muted py-16 md:py-20">
    <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <SectionHeader
        eyebrow="Custom builds"
        title="Need something of your own? We build that too."
        desc="Tell us what you need. You get a transparent, fixed quote after a free discovery call, and you own 100% of the code."
      />
      <a
        href="#contact"
        className="inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start rounded-md bg-primary px-6 text-[15px] font-medium text-primary-foreground hover:bg-primary/90 md:self-auto"
      >
        Tell us what you need <ArrowRight className="h-4 w-4" />
      </a>
    </Container>
  </section>
);

// ===== FAQ =====
export const faqs = [
  {
    q: "How much does it cost?",
    a: "It depends on the product and the size of your business, such as the number of users or branches. Book a demo and we'll share a clear quote for your setup.",
  },
  {
    q: "Can you move our existing data?",
    a: "Yes. Our team moves your data from spreadsheets or your old software as part of getting you set up.",
  },
  {
    q: "Who handles hosting, updates and support?",
    a: "We do. Hosting, updates and day-to-day support stay with CodingRoof, so your team can focus on running the business.",
  },
  {
    q: "Can we use more than one product?",
    a: "Yes. Start with the product you need most and add others as you grow.",
  },
  {
    q: "Do you build custom software?",
    a: "Yes. Tell us what you need and we'll share a transparent, fixed quote after a free discovery call. You own 100% of the code, delivered with full documentation and handover support.",
  },
  {
    q: "Can you take over an existing product?",
    a: "Yes. We routinely audit, stabilise and modernise existing codebases before adding new capabilities on top.",
  },
];

const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 md:py-28">
      <Container className="grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <SectionHeader eyebrow="FAQ" title="Questions people usually ask." />
          <p className="mt-4 text-sm text-muted-foreground">
            Something else?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary hover:underline">
              Email us
            </a>
            .
          </p>
        </div>
        <div className="md:col-span-8 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-base font-medium">{f.q}</span>
                  {isOpen ? (
                    <Minus className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                </button>
                {isOpen && <p className="-mt-1 pb-5 pr-10 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

// ===== Page =====
const LandingPage = () => {
  useHashScroll();
  return (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main>
      <Hero />
      <Stats />
      <Products />
      <AiHelpers />
      <Industries />
      <Principles />
      <CustomBuilds />
      <Faq />
      <Cta
        title="See how CodingRoof fits your business."
        desc="Tell us a little about how you work today and we'll set up a demo of the product that fits, or scope a custom build."
      />
    </main>
    <Footer />
  </div>
  );
};

export default LandingPage;
