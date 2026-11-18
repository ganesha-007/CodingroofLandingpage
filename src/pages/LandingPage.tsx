import { Link } from "react-router-dom";
import { ArrowRight, Check, Compass, Layers, LineChart, Minus, Plus, Rocket, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { categories, products, productBySlug, type Product } from "@/data/products";
import { HeroShowcase } from "@/components/HeroShowcase";
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

/** Soft blue marker stroke behind a word (restyled from the original yellow scribble). */
const Highlight = ({ children }: { children: ReactNode }) => (
  <span className="relative inline-block whitespace-nowrap">
    <svg
      aria-hidden
      viewBox="0 0 300 40"
      preserveAspectRatio="none"
      className="absolute -left-[0.06em] bottom-[0.1em] h-[0.46em] w-[calc(100%+0.12em)] -rotate-[0.6deg]"
    >
      <defs>
        <linearGradient id="hl-blue" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="hsl(218 90% 86%)" />
          <stop offset="1" stopColor="hsl(205 90% 86%)" />
        </linearGradient>
      </defs>
      <path
        d="M8 24 C 90 17, 200 15, 292 20"
        fill="none"
        stroke="url(#hl-blue)"
        strokeWidth="28"
        strokeLinecap="round"
      />
    </svg>
    <span className="relative">{children}</span>
  </span>
);

// ===== Hero =====
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
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white py-1 pl-1 pr-3 text-xs font-medium text-muted-foreground shadow-sm hover:text-foreground"
        >
          <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">New</span>
          Funnello CRM and Vector are now part of the suite
          <ArrowRight className="h-3 w-3" />
        </Link>
        <h1 className="mt-7 text-[40px] md:text-[68px] font-semibold tracking-[-0.04em] leading-[1.02] text-foreground text-balance">
          The software your <Highlight>business</Highlight> runs on.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground text-balance">
          {products.length} ready-to-run products for sales, projects, lending, retail and more, with AI built in. Plus
          custom builds when you need something of your own.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/products"
            className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_8px_20px_-8px_rgba(36,99,209,0.6)] hover:bg-primary/90"
          >
            Explore products <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#contact"
            className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-md border border-border bg-white px-6 text-sm font-medium hover:bg-muted"
          >
            Book a demo
          </a>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-5xl md:mt-16">
        <HeroShowcase />
      </div>
    </Container>
  </section>
);

// ===== Stats =====
const stats = [
  { stat: "3.4×", label: "Average ROI within 12 months" },
  { stat: "12+", label: "SaaS products shipped" },
  { stat: "14+", label: "Countries served" },
  { stat: "6 weeks", label: "From kickoff to MVP" },
];

const Stats = () => (
  <section className="py-16 md:py-20">
    <Container>
      <dl className="grid grid-cols-2 md:grid-cols-4 overflow-hidden rounded-2xl border border-border">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`p-6 md:p-8 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""} ${
              i === 2 ? "md:border-l" : ""
            } border-border`}
          >
            <dt className="text-sm text-muted-foreground">{s.label}</dt>
            <dd className="mt-2 text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-foreground">{s.stat}</dd>
          </div>
        ))}
      </dl>
    </Container>
  </section>
);

// ===== Products =====
const HomeProductCard = ({ p, compact = false }: { p: Product; compact?: boolean }) => (
  <Link
    to={`/products#${p.slug}`}
    className="group flex flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_30px_-18px_rgba(36,99,209,0.45)]"
  >
    <div className="flex items-center gap-3.5">
      <ProductTile src={p.logo} name={p.name} />
      <div className="min-w-0">
        <h3 className="text-[17px] font-semibold tracking-[-0.01em]">{p.name}</h3>
        <p className="text-[13px] leading-snug text-muted-foreground">{p.tag}</p>
      </div>
    </div>
    <p className={`mt-4 flex-1 text-sm leading-relaxed text-muted-foreground ${compact ? "line-clamp-3" : ""}`}>{p.desc}</p>
    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
      Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
    </span>
  </Link>
);

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
            <div className={`mt-6 grid gap-4 sm:grid-cols-2 ${items.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
              {items.map((p) => (
                <HomeProductCard key={p.slug} p={p} compact={items.length > 3} />
              ))}
            </div>
          </div>
        );
      })}
    </Container>
  </section>
);

// ===== AI Helpers =====
const AiHelpers = () => (
  <section id="ai-helpers" className="border-y border-border bg-muted py-20 md:py-28">
    <Container>
      <SectionHeader
        eyebrow="AI Helpers"
        title="AI that works inside the products you already use."
        desc="Lightweight helpers that plug into any CodingRoof product, taking over the busywork and surfacing what needs attention."
      />
      <div className="mt-12">
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

const industries = [
  { slug: "lending", name: "Lending & finance", desc: "Pledges, deposits, loans and ledgers with full audit trails.", products: ["gold-loan", "banking"] },
  { slug: "healthcare", name: "Healthcare supply", desc: "Batch, expiry and reorder control for medical distributors.", products: ["surgicals"] },
  { slug: "retail", name: "Retail & personal care", desc: "Counters, appointments, stock and repeat customers.", products: ["retail", "salon"] },
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
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
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

const Industries = () => (
  <section id="industries" className="py-20 md:py-28">
    <Container>
      <SectionHeader
        eyebrow="Industries"
        title="Built around how your industry actually works."
        desc="Every product starts from the day-to-day of a real business, so your team recognises the workflow on day one."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((it) => {
          const photo = industryPhotos[it.slug];
          return photo ? (
            <article key={it.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={photo}
                  alt={it.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4">
                  <ProductChips slugs={it.products} onPhoto />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-base font-semibold">{it.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              </div>
            </article>
          ) : (
            <article key={it.slug} className="flex flex-col rounded-2xl border border-border p-6">
              <h3 className="text-base font-semibold">{it.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              <div className="mt-5">
                <ProductChips slugs={it.products} />
              </div>
            </article>
          );
        })}
      </div>
    </Container>
  </section>
);

// ===== Principles (kept: sticker cards + ink connector, restyled in blue) =====
const BLUE_LINE = "hsl(218 71% 48%)";

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
const InkConnector = ({
  itemRefs,
  containerRef,
  sectionRef,
  active,
}: {
  itemRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  sectionRef: React.RefObject<HTMLElement | null>;
  active: number;
}) => {
  const reduce = useReducedMotion();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [anchors, setAnchors] = useState<Anchor[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();
      const next: Anchor[] = [];
      itemRefs.current.forEach((el) => {
        if (!el) return;
        const card = el.querySelector<HTMLElement>("[data-sticker-card]") ?? el;
        const r = card.getBoundingClientRect();
        // Line always enters from the LEFT edge and exits from the RIGHT edge of every card.
        next.push({ xIn: r.left - cRect.left, xOut: r.right - cRect.left, y: r.top - cRect.top + r.height / 2 });
      });
      setSize({ w: container.clientWidth, h: container.clientHeight });
      setAnchors(next);
    };
    const schedule = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(measure);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    if (containerRef.current) ro.observe(containerRef.current);
    itemRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", schedule);
    // re-measure once fonts/images settle
    const t = window.setTimeout(schedule, 250);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      window.clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, itemRefs]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 30%", "end 80%"] });

  // Separate wobbly cubic-bezier segments: card[i].right -> card[i+1].left.
  const buildSegments = (pts: Anchor[]) => {
    if (pts.length < 2) return [];
    const phi = 0.61803398875;
    const jitter = (i: number, seed: number) => ((((i + 1) * phi + seed) % 1) - 0.5) * 14; // ±7px
    const segments: string[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      const ax = a.xOut;
      const ay = a.y;
      const bx = b.xIn;
      const by = b.y;
      const dy = by - ay;
      const horiz = Math.max(60, Math.abs(bx - ax) * 0.55);
      // Always leave to the right, arrive from the left -> preserves the curvy zig-zag.
      const c1x = ax + horiz + jitter(i, 0.13);
      const c1y = ay + dy * 0.15 + jitter(i, 0.41);
      const c2x = bx - horiz + jitter(i, 0.77);
      const c2y = by - dy * 0.15 + jitter(i, 0.29);
      segments.push(
        `M ${ax.toFixed(1)} ${ay.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${bx.toFixed(1)} ${by.toFixed(1)}`
      );
    }
    return segments;
  };

  const segments = buildSegments(anchors);

  if (!size.w || !size.h || anchors.length < 2) {
    return <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden />;
  }

  return (
    <svg
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
      className="hidden md:block absolute inset-0 pointer-events-none"
      aria-hidden
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="rough-ink" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="1.2" />
        </filter>
      </defs>

      {segments.map((d, i) => (
        <InkSegment key={d} d={d} index={i} total={segments.length} progress={scrollYProgress} reduce={reduce} />
      ))}

      {anchors.map((a, i) => (
        <g key={i}>
          {i < anchors.length - 1 && (
            <motion.circle
              cx={a.xOut}
              cy={a.y}
              r={3}
              fill={BLUE_LINE}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: i <= active ? 1 : 0, scale: i <= active ? 1 : 0.4 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ transformOrigin: `${a.xOut}px ${a.y}px` }}
            />
          )}
          {i > 0 && (
            <motion.circle
              cx={a.xIn}
              cy={a.y}
              r={3}
              fill={BLUE_LINE}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: i <= active ? 1 : 0, scale: i <= active ? 1 : 0.4 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ transformOrigin: `${a.xIn}px ${a.y}px` }}
            />
          )}
        </g>
      ))}
    </svg>
  );
};

const InkSegment = ({
  d,
  index,
  total,
  progress,
  reduce,
}: {
  d: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) => {
  const pathLength = useTransform(progress, [index / total, (index + 1) / total], [0, 1], { clamp: true });
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={BLUE_LINE}
      strokeOpacity={0.6}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#rough-ink)"
      style={reduce ? { pathLength: 1 } : { pathLength }}
      initial={reduce ? false : { pathLength: 0 }}
    />
  );
};

const Principles = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section ref={sectionRef} className="overflow-x-clip border-t border-border py-20 md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <SectionHeader
                eyebrow="How we build"
                title="Six principles behind every system we ship."
                desc="The same engineering standards apply whether you run one of our products or we build one for you."
              />
            </div>
          </div>
          <div ref={colRef} className="relative flex flex-col gap-10 md:col-span-7 md:gap-36">
            <InkConnector itemRefs={itemRefs} containerRef={colRef} sectionRef={sectionRef} active={active} />
            {principles.map((p, i) => (
              <div
                key={p.title}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`relative z-10 flex ${i % 2 === 1 ? "md:justify-end" : ""}`}
              >
                <StickerCard index={i + 1} {...p} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

const StickerCard = ({ index, title, desc, icon: Icon }: { index: number; title: string; desc: string; icon: LucideIcon }) => (
  <div
    data-sticker-card
    className="relative w-full max-w-[440px] rounded-2xl border border-[hsl(218_40%_84%)] bg-white p-6 md:p-7 shadow-[5px_5px_0_0_hsl(218_80%_92%)] transition-shadow hover:shadow-[3px_3px_0_0_hsl(218_80%_88%)]"
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
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </div>
  </div>
);

// ===== Engagements =====
const engagements = [
  {
    name: "Sprint",
    tagline: "Fixed scope, fixed price",
    desc: "For MVPs, audits or focused launches with a defined outcome in 2–8 weeks.",
    features: ["Discovery and roadmap", "Design and build", "Production launch"],
    highlight: false,
  },
  {
    name: "Product pod",
    tagline: "Monthly retainer",
    desc: "A senior, embedded squad shipping continuously alongside your team.",
    features: ["Designer, 2–3 engineers and a PM", "Weekly demos and roadmap", "Direct Slack channel", "ROI reporting"],
    highlight: true,
  },
  {
    name: "Fractional CTO",
    tagline: "Strategy and oversight",
    desc: "Senior technical leadership for teams that need direction more than hands.",
    features: ["Architecture review", "Hiring and process", "Vendor management"],
    highlight: false,
  },
];

const Engagements = () => (
  <section id="pricing" className="border-t border-border bg-muted py-20 md:py-28">
    <Container>
      <SectionHeader
        eyebrow="Custom builds"
        title="Need something of your own? We build that too."
        desc="Pick the engagement that fits. You get a transparent, fixed quote after a free discovery call, and you own 100% of the code."
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {engagements.map((e) => (
          <div
            key={e.name}
            className={`flex flex-col rounded-2xl bg-white p-7 ${
              e.highlight ? "border-2 border-primary" : "border border-border"
            }`}
          >
            <p className="text-sm font-medium text-primary">{e.tagline}</p>
            <h3 className="mt-1 text-xl font-semibold tracking-[-0.015em]">{e.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
            <ul className="mt-6 flex-1 space-y-2.5 border-t border-border pt-6 text-sm">
              {e.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`mt-7 inline-flex h-10 items-center justify-center rounded-md text-sm font-medium ${
                e.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border hover:bg-muted"
              }`}
            >
              Get a quote
            </a>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// ===== FAQ =====
const faqs = [
  {
    q: "How do you charge for projects?",
    a: "Most engagements are fixed-scope sprints with a clear deliverable, or monthly product pods for ongoing work. We share a transparent quote after the discovery call.",
  },
  {
    q: "Do we own the code and IP?",
    a: "Yes, 100%. Everything is delivered into your repository under your name, with full documentation and handover support.",
  },
  {
    q: "What stack do you build on?",
    a: "TypeScript, React, Node, Postgres and modern cloud infrastructure (AWS, GCP or managed platforms). We pick proven tools that scale.",
  },
  {
    q: "Can you take over an existing product?",
    a: "Yes. We routinely audit, stabilise and modernise existing codebases before adding new capabilities on top.",
  },
  {
    q: "How quickly can we start?",
    a: "Usually within 1–2 weeks of the discovery call, depending on team availability. Urgent projects can sometimes start sooner.",
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
                {isOpen && <p className="-mt-1 pb-5 pr-10 text-sm leading-relaxed text-muted-foreground">{f.a}</p>}
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
      <Engagements />
      <Faq />
      <Cta
        title="See how CodingRoof fits your business."
        desc="Tell us how you work today. We'll walk you through the right product, or come back with a roadmap, timeline and ROI estimate for a custom build."
      />
    </main>
    <Footer />
  </div>
  );
};

export default LandingPage;
