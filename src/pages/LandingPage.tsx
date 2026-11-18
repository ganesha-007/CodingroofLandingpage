import { Link } from "react-router-dom";
import { ArrowRight, Check, Compass, Layers, LineChart, Minus, Plus, Rocket, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { categories, products, productBySlug, type Product } from "@/data/products";
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
      viewBox="0 0 300 60"
      preserveAspectRatio="none"
      className="absolute -left-[2%] bottom-[0.08em] h-[0.42em] w-[104%]"
    >
      <path
        d="M6 34 C 80 24, 200 22, 294 28 C 210 36, 110 44, 10 46"
        fill="none"
        stroke="hsl(218 85% 88%)"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="relative">{children}</span>
  </span>
);

// ===== Hero =====
const sampleLoans = [
  { id: "GL-1042", name: "R. Kumar", weight: "24.5 g", amount: "₹1,20,000", status: "Active" },
  { id: "GL-1041", name: "S. Priya", weight: "12.0 g", amount: "₹58,500", status: "Renewal due" },
  { id: "GL-1040", name: "M. Joseph", weight: "40.2 g", amount: "₹1,96,000", status: "Active" },
  { id: "GL-1039", name: "A. Fathima", weight: "8.8 g", amount: "₹42,000", status: "Closed" },
];

const statusClass: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  "Renewal due": "bg-amber-50 text-amber-700",
  Closed: "bg-slate-100 text-slate-600",
};

/** Illustrative product UI built in code (no screenshots yet). Sample data only. */
const ProductPreview = () => (
  <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.28)]">
    <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
      <span className="ml-3 text-xs text-muted-foreground">app.codingroof.com / gold-loan</span>
    </div>
    <div className="grid md:grid-cols-[200px_1fr]">
      <aside className="hidden md:block border-r border-border bg-muted/40 p-3">
        <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Products</p>
        <ul className="space-y-0.5">
          {products.map((p) => (
            <li
              key={p.slug}
              className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] ${
                p.slug === "gold-loan" ? "bg-white font-medium text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground"
              }`}
            >
              <img src={p.logo} alt="" className="h-4 w-4" />
              {p.name}
            </li>
          ))}
        </ul>
      </aside>
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-3">
          <ProductTile src={productBySlug["gold-loan"].logo} name="Gold Loan" size="sm" />
          <div>
            <p className="text-sm font-semibold">Gold Loan</p>
            <p className="text-xs text-muted-foreground">Branch overview · Today</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 md:gap-3">
          {[
            ["Active loans", "1,284"],
            ["Gold pledged", "18.6 kg"],
            ["Interest due", "₹3.4 L"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-border p-2.5 md:p-3">
              <p className="text-[11px] text-muted-foreground">{k}</p>
              <p className="mt-1 text-base md:text-lg font-semibold tracking-tight">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <div className="grid grid-cols-[1fr_1fr_auto] md:grid-cols-[80px_1fr_70px_1fr_auto] gap-3 bg-muted/60 px-3 py-2 text-[11px] font-medium text-muted-foreground">
            <span className="hidden md:block">Loan</span>
            <span>Customer</span>
            <span className="hidden md:block">Weight</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          {sampleLoans.map((l) => (
            <div
              key={l.id}
              className="grid grid-cols-[1fr_1fr_auto] md:grid-cols-[80px_1fr_70px_1fr_auto] items-center gap-3 border-t border-border px-3 py-2.5 text-[12.5px]"
            >
              <span className="hidden md:block font-mono text-[11.5px] text-muted-foreground">{l.id}</span>
              <span className="font-medium">{l.name}</span>
              <span className="hidden md:block text-muted-foreground">{l.weight}</span>
              <span>{l.amount}</span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${statusClass[l.status]}`}>{l.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Hero = () => (
  <section className="relative">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(180deg,hsl(216_80%_97%)_0%,#fff_100%)]"
    />
    <Container className="relative pt-16 md:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <span className="flex -space-x-1">
            {["funnello", "vector", "gold-loan"].map((s) => (
              <img key={s} src={productBySlug[s].logo} alt="" className="h-4 w-4 rounded-full bg-white ring-2 ring-white" />
            ))}
          </span>
          {products.length} products, one platform
          <ArrowRight className="h-3 w-3" />
        </Link>
        <h1 className="mt-6 text-[40px] md:text-[64px] font-semibold tracking-[-0.035em] leading-[1.04] text-foreground text-balance">
          The software your <Highlight>business</Highlight> runs on.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground text-balance">
          Ready-to-run products for lending, banking, retail, healthcare supply, print and more, plus custom
          builds when you need something of your own.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/products"
            className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
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
      <div className="mx-auto mt-14 md:mt-16 max-w-5xl">
        <ProductPreview />
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
const industries = [
  { name: "Lending & finance", desc: "Pledges, deposits, loans and ledgers with full audit trails.", products: ["gold-loan", "banking"] },
  { name: "Healthcare supply", desc: "Batch, expiry and reorder control for medical distributors.", products: ["surgicals"] },
  { name: "Retail & personal care", desc: "Counters, appointments, stock and repeat customers.", products: ["retail", "salon"] },
  { name: "Manufacturing & textiles", desc: "Orders, production stages, inventory and accounts.", products: ["textile", "erp"] },
  { name: "Print & packaging", desc: "Quote-to-delivery for print shops and converters.", products: ["print"] },
  { name: "Field operations", desc: "Jobs, technicians and on-site service, tracked end to end.", products: ["field-service"] },
];

const Industries = () => (
  <section id="industries" className="py-20 md:py-28">
    <Container>
      <SectionHeader
        eyebrow="Industries"
        title="Built around how your industry actually works."
        desc="Every product starts from the day-to-day of a real business, so your team recognises the workflow on day one."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((it) => (
          <div key={it.name} className="flex flex-col rounded-xl border border-border p-6">
            <h3 className="text-base font-semibold">{it.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {it.products.map((slug) => {
                const p = productBySlug[slug];
                return (
                  <span key={slug} className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium">
                    <img src={p.logo} alt="" className="h-3.5 w-3.5" />
                    {p.name}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
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
  x: number;
  top: number;
  bottom: number;
}

const InkConnector = ({
  itemRefs,
  containerRef,
  sectionRef,
}: {
  itemRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  sectionRef: React.RefObject<HTMLElement | null>;
}) => {
  const reduce = useReducedMotion();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [anchors, setAnchors] = useState<Anchor[]>([]);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const c = container.getBoundingClientRect();
      const next: Anchor[] = [];
      itemRefs.current.forEach((el) => {
        const card = el?.querySelector<HTMLElement>("[data-sticker-card]");
        if (!card) return;
        const r = card.getBoundingClientRect();
        next.push({ x: r.left - c.left + r.width / 2, top: r.top - c.top, bottom: r.bottom - c.top });
      });
      setSize({ w: container.clientWidth, h: container.clientHeight });
      setAnchors(next);
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [containerRef, itemRefs]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 40%", "end 80%"] });

  if (!size.w || anchors.length < 2) return null;

  // Bottom-centre of each card to top-centre of the next: a soft S-curve.
  const segments = anchors.slice(0, -1).map((a, i) => {
    const b = anchors[i + 1];
    const y1 = a.bottom + 6;
    const y2 = b.top - 6;
    const mid = (y2 - y1) * 0.55;
    return `M ${a.x} ${y1} C ${a.x} ${y1 + mid}, ${b.x} ${y2 - mid}, ${b.x} ${y2}`;
  });

  return (
    <svg
      width={size.w}
      height={size.h}
      className="pointer-events-none absolute inset-0 hidden md:block"
      style={{ overflow: "visible" }}
      aria-hidden
    >
      {segments.map((d, i) => (
        <InkSegment key={i} d={d} index={i} total={segments.length} progress={scrollYProgress} reduce={reduce} />
      ))}
      {anchors.map((a, i) => (
        <g key={i} fill={BLUE_LINE}>
          {i < anchors.length - 1 && <circle cx={a.x} cy={a.bottom + 6} r={3} />}
          {i > 0 && <circle cx={a.x} cy={a.top - 6} r={3} />}
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
      strokeOpacity={0.55}
      strokeWidth={1.5}
      strokeLinecap="round"
      style={{ pathLength: reduce ? 1 : pathLength }}
    />
  );
};

const Principles = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

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
          <div ref={colRef} className="relative flex flex-col gap-10 md:col-span-7 md:gap-20">
            <InkConnector itemRefs={itemRefs} containerRef={colRef} sectionRef={sectionRef} />
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
