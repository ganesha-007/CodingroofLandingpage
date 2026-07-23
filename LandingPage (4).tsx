import roiIllustration from "@/assets/ROI_photo.png";
import lovedIllustration from "@/assets/middle_one.png";
import callIllustration from "@/assets/cr-illustration-call.png";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Banknote, BarChart3, Check, Cloud, Code2, Compass, CreditCard, Database, Factory, Globe, GraduationCap, Heart, Home, Layers, LineChart, Menu, Minus, Plus, Quote, Rocket, ShieldCheck, ShoppingCart, Sparkles, Truck, Users, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { BlurFade } from "@/components/ui/blur-fade";


// ===== Hero =====
const lineOne = ["Software", "infrastructure"];
const lineTwo = ["for", "modern", "businesses."];

const brands = [
  "Northwind",
  "Helio Labs",
  "Cargotrace",
  "Beacon Health",
  "Finchly",
  "Vellum & Co",
  "Lumen Health",
  "Northgate",
  "Foundry OS",
  "Plume",
];

const edgeFadeMask =
  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";

const Hero = () => (
  <section className="relative overflow-hidden border-b border-border bg-background">
    {/* refined backdrop: soft top wash + faint dotted grid */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage:
          "radial-gradient(hsl(var(--foreground) / 0.06) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
      }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh]"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--secondary)) 0%, transparent 100%)",
      }}
    />

    <div className="mx-auto max-w-6xl px-6 pt-24 md:pt-36 pb-28 md:pb-36 text-center">
      {/* animated headline — two-line hierarchy */}
      <h1 className="text-[clamp(2.75rem,8.5vw,6.75rem)] font-bold leading-[0.95] tracking-[-0.06em] text-foreground">
        <span className="block">
          {lineOne.map((word, i) => (
            <span
              key={`l1-${i}`}
              className="inline-block motion-safe:animate-fade-up"
              style={{ animationDelay: `${120 + i * 90}ms`, marginRight: "0.22em" }}
            >
              {word}
            </span>
          ))}
        </span>
        <span className="block text-foreground/55 font-semibold tracking-[-0.055em]">
          {lineTwo.map((word, i) => (
            <span
              key={`l2-${i}`}
              className="inline-block motion-safe:animate-fade-up"
              style={{ animationDelay: `${120 + (lineOne.length + i) * 90}ms`, marginRight: "0.22em" }}
            >
              {word}
            </span>
          ))}
        </span>
      </h1>

      {/* subhead */}
      <p
        className="mt-8 max-w-xl mx-auto text-[15px] md:text-[17px] text-muted-foreground leading-[1.65] motion-safe:animate-fade-up"
        style={{ animationDelay: "900ms" }}
      >
        We design, build, and operate systems that support critical operations —
        reliably, securely, and at scale.
      </p>

      {/* CTAs */}
      <div
        className="mt-10 flex flex-wrap justify-center gap-3 motion-safe:animate-fade-up"
        style={{ animationDelay: "1000ms" }}
      >
        <Button asChild size="lg" className="rounded-md h-12 px-7 text-sm font-medium gap-1.5">
          <a href="#work">View work <ArrowRight className="h-3.5 w-3.5" /></a>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-md h-12 px-7 text-sm font-medium bg-background">
          <Link to="/login">Start a conversation</Link>
        </Button>
      </div>

      {/* micro-proof line */}
      <div
        className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground motion-safe:animate-fade-up"
        style={{ animationDelay: "1080ms" }}
      >
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
          Built for reliability
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
          Designed for scale
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
          Used across industries
        </span>
      </div>

      {/* trusted by — animated logo marquee */}
      <div
        className="mt-20 md:mt-24 motion-safe:animate-fade-up"
        style={{ animationDelay: "1100ms" }}
      >
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground text-center">
          Trusted by teams shipping in 20+ countries
        </p>
        <div
          className="mt-5 mx-auto max-w-6xl border-y border-border py-6 overflow-hidden"
          style={{
            WebkitMaskImage: edgeFadeMask,
            maskImage: edgeFadeMask,
          }}
        >
          <div className="flex w-max gap-12 motion-safe:animate-marquee">
            {[...brands, ...brands].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap text-base font-semibold tracking-[-0.02em] text-foreground/55"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ===== Navbar =====
const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#industries", label: "Industries" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-background/85 backdrop-blur border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-1.5">
          <Home className="h-4 w-4 text-foreground" />
          <span className="text-base font-semibold tracking-[-0.02em]">CodingRoof</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="rounded-md h-9 text-sm font-medium">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="rounded-md h-9 px-4 text-sm font-medium gap-1.5">
            <Link to="/login">Book a call</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-border bg-background"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-3 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <Button asChild variant="outline" size="sm" className="flex-1 rounded-md h-9">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm" className="flex-1 rounded-md h-9">
                <Link to="/login">Book a call</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// ===== Section =====
interface SectionProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

const Section = ({ eyebrow, title, description, children, align = "left", className = "" }: SectionProps) => {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <section className={`mx-auto max-w-5xl px-6 ${className}`}>
      <div className={`max-w-2xl ${alignCls}`}>
        {eyebrow && <p className="text-sm font-medium text-muted-foreground mb-3">{eyebrow}</p>}
        <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.04em] leading-[1.05] text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
};

// ===== SectionDivider =====
interface SectionDividerProps {
  /** "down" = top band swoops down into bottom band (smile). "up" = the inverse (frown). */
  direction?: "down" | "up";
  /** Top-band background color (CSS color). */
  from?: string;
  /** Bottom-band background color (CSS color, this is what the curve fills with). */
  to?: string;
  /** Curve depth in px on desktop. */
  height?: number;
  className?: string;
}

/**
 * Slack-style curved section divider.
 * Sits at the boundary between two color bands. Animates the curve into view
 * with a path-draw + gentle rise once per scroll.
 */
const SectionDivider = ({
  direction = "down",
  from = "hsl(var(--background))",
  to = "hsl(0 0% 98%)",
  height = 64,
  className = "",
}: SectionDividerProps) => {
  const reduce = useReducedMotion();

  // ONE single seamless arc dividing FROM (top) and TO (bottom).
  // The SVG fills the entire strip. The top half is painted with `from`,
  // the bottom half with `to`, and the boundary between them is a single
  // smooth bezier curve. No flat color bands above/below the curve.
  //
  // "down" = curve dips down in the middle (smile shape on top edge of `to`).
  // "up"   = curve rises up in the middle (frown shape on top edge of `to`).
  const topFill =
    direction === "down"
      ? // FROM occupies the top, dipping down into the strip.
        "M0,0 L1440,0 L1440,20 C1080,90 360,90 0,20 Z"
      : // FROM occupies the top, bulging down only at the edges.
        "M0,0 L1440,0 L1440,80 C1080,10 360,10 0,80 Z";

  return (
    <div
      aria-hidden
      className={`relative w-full overflow-hidden ${className}`}
      style={{ background: from, height }}
    >
      <motion.svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full block"
        initial={reduce ? false : { opacity: 0, y: direction === "down" ? -6 : 6 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Bottom band fills entire SVG */}
        <rect x="0" y="0" width="1440" height="100" fill={to} />
        {/* Top band carves a single smooth arc into the bottom band */}
        <path d={topFill} fill={from} />
      </motion.svg>
    </div>
  );
};

// ===== HandDrawnConnector =====
interface HandDrawnConnectorProps {
  /** Refs to each card wrapper inside the right column. */
  itemRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
  /** Container to measure against (the right column). */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Section element used to drive scroll-linked draw progress. */
  sectionRef: React.RefObject<HTMLElement | null>;
  /** Index of currently active card (for dot reveal). */
  active: number;
}

interface Anchor {
  xIn: number;
  xOut: number;
  y: number;
}

/**
 * A hand-drawn ink ribbon that snakes between alternating sticker cards.
 * Self-measures card positions and re-builds the path on resize.
 */
const HandDrawnConnector = ({
  itemRefs,
  containerRef,
  sectionRef,
  active,
}: HandDrawnConnectorProps) => {
  const reduce = useReducedMotion();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [anchors, setAnchors] = useState<Anchor[]>([]);
  const rafRef = useRef<number | null>(null);

  const measure = () => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const next: Anchor[] = [];
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const card = el.querySelector<HTMLElement>("[data-sticker-card]") ?? el;
      const r = card.getBoundingClientRect();
      // Line always enters from the LEFT edge and exits from the RIGHT edge of every card.
      const xIn = r.left - cRect.left;
      const xOut = r.right - cRect.left;
      const y = r.top - cRect.top + r.height / 2;
      next.push({ xIn, xOut, y });
    });
    setSize({ w: container.clientWidth, h: container.clientHeight });
    setAnchors(next);
  };

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 30%", "end 80%"],
  });
  // Build separate wobbly cubic-bezier segments: card[i].right → card[i+1].left.
  // Keeping segments separate preserves the hidden jump across each card while allowing sequential scroll reveal.
  const buildSegments = (pts: Anchor[]) => {
    if (pts.length < 2) return [];
    const phi = 0.61803398875;
    const jitter = (i: number, seed: number) =>
      ((((i + 1) * phi + seed) % 1) - 0.5) * 14; // ±7px
    const segments: string[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      // Start: right edge of current card. End: left edge of next card.
      const ax = a.xOut;
      const ay = a.y;
      const bx = b.xIn;
      const by = b.y;
      const dx = bx - ax;
      const dy = by - ay;
      const horiz = Math.max(60, Math.abs(dx) * 0.55);
      // Always leave to the right, arrive from the left → preserves the curvy zig-zag.
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
    return (
      <div
        ref={(node) => {
          // expose nothing — measurement uses containerRef
        }}
        className="hidden md:block absolute inset-0 pointer-events-none"
        aria-hidden
      />
    );
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
        <ConnectorSegment
          key={d}
          d={d}
          index={i}
          total={segments.length}
          progress={scrollYProgress}
          reduce={reduce}
        />
      ))}

      {anchors.map((a, i) => (
        <g key={i}>
          {i < anchors.length - 1 && (
            <motion.circle
              cx={a.xOut}
              cy={a.y}
              r={3}
              fill="hsl(var(--foreground))"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: i <= active ? 1 : 0,
                scale: i <= active ? 1 : 0.4,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ transformOrigin: `${a.xOut}px ${a.y}px` }}
            />
          )}
          {i > 0 && (
            <motion.circle
              cx={a.xIn}
              cy={a.y}
              r={3}
              fill="hsl(var(--foreground))"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: i <= active ? 1 : 0,
                scale: i <= active ? 1 : 0.4,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ transformOrigin: `${a.xIn}px ${a.y}px` }}
            />
          )}
        </g>
      ))}
    </svg>
  );
};

interface ConnectorSegmentProps {
  d: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}

const ConnectorSegment = ({ d, index, total, progress, reduce }: ConnectorSegmentProps) => {
  const start = index / total;
  const end = (index + 1) / total;
  const pathLength = useTransform(progress, [start, end], [0, 1], { clamp: true });

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="hsl(var(--foreground))"
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

// ===== ScrollProgress =====
/** 2px progress bar fixed to the very top of the viewport. */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop || window.scrollY) / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-foreground origin-left"
        style={{ transform: `scaleX(${progress})`, transition: "transform 80ms linear" }}
      />
    </div>
  );
};

// ===== LandingPage =====
const services = [
  { icon: Cloud, title: "Custom SaaS development", desc: "End-to-end web platforms — auth, billing, dashboards, integrations — built on a modern, scalable stack." },
  { icon: LineChart, title: "Growth engineering", desc: "Analytics, A/B testing and conversion tooling so every release is tied to a number that matters." },
  { icon: Users, title: "Dedicated product pods", desc: "Designers, engineers and a PM working as an extension of your team — no agency hand-offs." },
  { icon: ShieldCheck, title: "Enterprise-ready foundations", desc: "Security, compliance and observability baked in from day one, so you can sell to bigger customers." },
  { icon: Sparkles, title: "AI features & automation", desc: "Embed intelligence into your product — copilots, smart workflows, content generation, and beyond." },
  { icon: Layers, title: "Legacy modernization", desc: "Migrate creaking internal tools into modern SaaS that your team and customers actually love using." },
];

const process = [
  { icon: Compass, title: "Discover & strategize", desc: "We map your business goals, users and revenue model — then scope a SaaS that drives measurable ROI.", headerBg: "bg-amber-200", cardBg: "bg-amber-50", border: "border-amber-200/60" },
  { icon: Code2, title: "Design & build", desc: "Our engineering pod ships production-grade software in weekly sprints — clean code, modern stack, your IP.", headerBg: "bg-blue-200", cardBg: "bg-blue-50", border: "border-blue-200/60" },
  { icon: Rocket, title: "Launch & scale", desc: "We ship to production, monitor performance and iterate on what moves the metrics that matter.", headerBg: "bg-emerald-200", cardBg: "bg-emerald-50", border: "border-emerald-200/60" },
];

const stats = [
  { stat: "3.4×", label: "Avg. ROI within 12 months" },
  { stat: "60+", label: "SaaS products shipped" },
  { stat: "20+", label: "Countries served" },
  { stat: "6 wks", label: "From kickoff to MVP" },
];

const testimonials = [
  { quote: "CodingRoof rebuilt our internal billing tool as a SaaS in 8 weeks. Revenue from it tripled in the next quarter.", name: "Priya N.", role: "COO, Fintech scale-up" },
  { quote: "They felt like part of our team. Pragmatic, fast, and the code quality is the cleanest we've ever inherited.", name: "Marcus L.", role: "CTO, Logistics SaaS" },
  { quote: "We went from concept to paying customers in under three months. Couldn't have done it without them.", name: "Sara K.", role: "Founder, HealthTech" },
];

const faqs = [
  { q: "How do you charge for projects?", a: "Most engagements are fixed-scope sprints with a clear deliverable, or monthly product pods for ongoing work. We share a transparent quote after the discovery call." },
  { q: "Do we own the code and IP?", a: "Yes — 100%. Everything is delivered into your repository under your name, with full documentation and handover support." },
  { q: "What stack do you build on?", a: "TypeScript, React, Node, Postgres, and modern cloud infra (AWS, GCP, or managed platforms). We pick the boring, proven tools that scale." },
  { q: "Can you take over an existing product?", a: "Absolutely. We routinely audit, stabilize and modernize existing codebases before adding new capabilities on top." },
  { q: "How quickly can we start?", a: "Usually within 1–2 weeks of the discovery call, depending on team availability. Urgent projects can sometimes start sooner." },
];

const industries = [
  { icon: ShoppingCart, name: "E‑commerce & Retail", tag: "Storefronts · Checkout · Loyalty", accent: "bg-amber-100" },
  { icon: Banknote, name: "Fintech & Banking", tag: "Payments · KYC · Ledgers", accent: "bg-emerald-100" },
  { icon: Heart, name: "Health & Wellness", tag: "Patient apps · HIPAA · Telehealth", accent: "bg-rose-100" },
  { icon: GraduationCap, name: "EdTech & Learning", tag: "LMS · Cohorts · AI tutors", accent: "bg-sky-100" },
  { icon: Factory, name: "Manufacturing & B2B", tag: "ERP · Inventory · Portals", accent: "bg-violet-100" },
  { icon: Truck, name: "Logistics & SaaS Ops", tag: "Routing · Tracking · Ops dashboards", accent: "bg-orange-100" },
];

const stack = [
  ["Frontend", "React, Next.js, TypeScript, Tailwind"],
  ["Backend", "Node.js, Python, Postgres, Redis"],
  ["Cloud & DevOps", "AWS, GCP, Vercel, Docker, Terraform"],
  ["Data & AI", "OpenAI, LangChain, dbt, Snowflake"],
  ["Mobile", "React Native, Expo, Swift, Kotlin"],
  ["Quality", "Playwright, Vitest, Sentry, CI/CD"],
];

const principles = [
  {
    title: "Architecture-led development",
    desc: "Systems designed for scale before complexity appears.",
    icon: Layers,
    chip: "hsl(150 40% 92%)",
    tilt: -1.2,
  },
  {
    title: "Predictable execution",
    desc: "Clear inputs, controlled outputs, and measurable progress.",
    icon: Zap,
    chip: "hsl(28 70% 92%)",
    tilt: 0.9,
  },
  {
    title: "Reliability by design",
    desc: "Failure is accounted for at the system level, not handled later.",
    icon: ShieldCheck,
    chip: "hsl(350 60% 94%)",
    tilt: -0.6,
  },
  {
    title: "Continuous evolution",
    desc: "Software is iterated and improved as a system, not delivered once.",
    icon: Rocket,
    chip: "hsl(265 50% 94%)",
    tilt: 1.1,
  },
  {
    title: "Operational clarity",
    desc: "System behavior, changes, and decisions remain visible and structured.",
    icon: Compass,
    chip: "hsl(205 60% 93%)",
    tilt: -0.8,
  },
  {
    title: "Operational efficiency",
    desc: "Systems are built to reduce friction, improve throughput, and drive measurable business outcomes.",
    icon: LineChart,
    chip: "hsl(48 80% 92%)",
    tilt: 0.7,
  },
];

const engagements = [
  {
    name: "Sprint",
    tagline: "Fixed scope, fixed price",
    desc: "Perfect for MVPs, audits, or focused launches with a defined outcome in 2–8 weeks.",
    features: ["Discovery + roadmap", "Design + build", "Production launch"],
    highlight: false,
  },
  {
    name: "Product pod",
    tagline: "Most popular",
    desc: "A senior, embedded squad shipping continuously alongside your team. Monthly retainer.",
    features: ["Designer + 2–3 engineers + PM", "Weekly demos & roadmap", "Direct Slack channel", "ROI reporting"],
    highlight: true,
  },
  {
    name: "Fractional CTO",
    tagline: "Strategy & oversight",
    desc: "Senior tech leadership for founders and teams that need direction more than hands.",
    features: ["Architecture review", "Hiring & process", "Vendor management"],
    highlight: false,
  },
];

const insights = [
  { tag: "Playbook", title: "How we ship a SaaS MVP in 6 weeks (and what we cut)", time: "8 min read" },
  { tag: "Engineering", title: "Boring tech wins: our 2026 production stack", time: "6 min read" },
  { tag: "Growth", title: "Instrumenting ROI from day one — the metrics we always track", time: "5 min read" },
];

const LandingPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (!loading && user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <Hero />

      {/* Big stat strip */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold tracking-[-0.045em]">{s.stat}</div>
              <div className="mt-1 text-xs md:text-sm text-muted-foreground leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider into tinted band: Services + Process */}
      <SectionDivider direction="down" from="#ffffff" to="#f5f5f4" />
      <div className="bg-[#f5f5f4]">

      {/* Services grid */}
      <Section
        className="pt-14 pb-20"
        eyebrow="What we do"
        title={<span id="services">Services built around your business outcomes.</span>}
        description="Every engagement is scoped to a real metric — revenue, retention, activation, cost saved. Not lines of code shipped."
      >
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <BlurFade key={s.title} delay={0.04 * i} inView>
              <div className="bg-white rounded-xl border border-border h-full p-6 hover:border-foreground/30 transition-colors">
                <div className="w-9 h-9 rounded-md bg-neutral-100 flex items-center justify-center mb-5">
                  <s.icon className="w-[18px] h-[18px] text-foreground" />
                </div>
                <h3 className="text-base font-semibold tracking-[-0.02em] mb-1.5">{s.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section
        className="pt-6 pb-20"
        eyebrow="How we work"
        title={<span id="process">Three steps. From idea to revenue.</span>}
      >
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {process.map((item, i) => (
            <BlurFade key={item.title} delay={0.05 * i} inView>
              <div className={`${item.cardBg} rounded-xl border ${item.border} h-full flex flex-col overflow-hidden`}>
                <div className={`${item.headerBg} h-16 relative`}>
                  <div className="absolute -bottom-5 left-6 w-10 h-10 rounded-lg bg-white border border-border/40 flex items-center justify-center shadow-sm">
                    <item.icon className="w-[18px] h-[18px] text-foreground" />
                  </div>
                </div>
                <div className={`${item.cardBg} p-7 pt-9 flex-1`}>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] mb-2">{item.title}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </Section>

      </div>
      {/* Divider back to white: ROI + Build */}
      <SectionDivider direction="up" from="#f5f5f4" to="#ffffff" />
      <div className="bg-white">

      {/* ROI alternating section */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="bg-neutral-100 rounded-2xl p-10 md:p-14 flex flex-col-reverse md:flex-row md:items-center gap-10 md:gap-12">
          <div className="flex-1 mix-blend-multiply">
            <img src={roiIllustration} alt="ROI growth illustration" className="w-full h-auto" />
          </div>
          <div className="flex-1">
            <BlurFade delay={0} inView>
              <p className="text-sm font-medium text-muted-foreground mb-3">Built for ROI</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.04em] leading-[1.05]">
                Software that earns its keep.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-md">
                We instrument every product we ship so the impact is visible — conversions tracked, revenue attributed, costs saved. No guesswork.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-bold tracking-[-0.04em]">{s.stat}</div>
                    <div className="mt-1 text-sm text-muted-foreground leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Designed to be loved — alternating section under ROI */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="bg-neutral-100 rounded-2xl p-10 md:p-14 flex flex-col md:flex-row md:items-center gap-10 md:gap-12">
          <div className="flex-1">
            <BlurFade delay={0} inView>
              <p className="text-sm font-medium text-muted-foreground mb-3">Designed to be loved</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.04em] leading-[1.05]">
                Products people actually want to open.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-md">
                Great ROI starts with retention. We obsess over the small moments — the first 30 seconds, the empty states, the micro-interactions — so your users keep coming back without being nudged.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-foreground" />
                    <div className="text-3xl font-bold tracking-[-0.04em]">62</div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground leading-snug">Avg. NPS across shipped products</div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-foreground" />
                    <div className="text-3xl font-bold tracking-[-0.04em]">&lt;1.5s</div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground leading-snug">LCP — buttery on every device</div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-foreground" />
                    <div className="text-3xl font-bold tracking-[-0.04em]">3×</div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground leading-snug">Retention vs. industry baseline</div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-foreground" />
                    <div className="text-3xl font-bold tracking-[-0.04em]">AA</div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground leading-snug">WCAG 2.2 — accessible by default</div>
                </div>
              </div>
            </BlurFade>
          </div>
          <div className="flex-1 mix-blend-multiply">
            <img src={lovedIllustration} alt="People loving the product illustration" loading="lazy" width={1024} height={1024} className="w-full h-auto" />
          </div>
        </div>
      </section>

      </div>
      {/* Divider into tinted band: Global reach */}
      <SectionDivider direction="down" from="#ffffff" to="#f5f5f4" />
      <div className="bg-[#f5f5f4]">

      {/* Global reach — light, hand-drawn product mock */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div className="md:order-1">
            <BlurFade delay={0} inView>
              <p className="text-sm font-medium text-muted-foreground mb-4">Global by design</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.05em] leading-[1.02] text-foreground">
                Software so simple,<br />it feels like{" "}
                <span className="relative inline-block">
                  <svg
                    aria-hidden
                    viewBox="0 0 300 120"
                    preserveAspectRatio="none"
                    className="absolute left-[-0.15em] right-[-0.15em] top-[-0.18em] bottom-[-0.15em] -z-0 w-[130%] h-[136%]"
                    style={{ mixBlendMode: "multiply" }}
                  >
                    <g
                      fill="none"
                      stroke="rgb(253,200,48)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="20"
                      strokeOpacity="0.85"
                    >
                      {/* single continuous marker scribble snaking back and forth */}
                      <path d="M6,32 C 70,28 150,36 296,30 C 240,38 140,44 4,48 C 80,52 180,58 294,54 C 220,60 110,66 8,68 C 90,72 200,78 296,74 C 230,80 120,86 6,90" />
                    </g>
                  </svg>
                  <span className="relative z-10">magic</span>
                </span>.
              </h2>
              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
                From founders in São Paulo to enterprise teams in Berlin, we ship products that just work — no training needed, no friction, no flag required.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/login" className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
                  Try for free
                </Link>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
                  Request a demo <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </BlurFade>
          </div>

          <BlurFade delay={0.15} inView className="md:order-2">
            <div className="relative mx-auto max-w-md">
              {/* sparkle marks */}
              <div className="absolute -top-6 -left-2 text-foreground/60 text-xl font-bold rotate-[-20deg] select-none">✦</div>
              <div className="absolute -top-3 left-6 text-foreground/40 text-sm font-bold rotate-[15deg] select-none">✦</div>

              {/* floating pill label */}
              <div className="absolute -top-5 right-6 z-10 bg-secondary border-2 border-foreground rounded-2xl px-4 py-2 shadow-[4px_4px_0_0_hsl(var(--foreground))] flex items-center gap-2">
                <Layers className="h-4 w-4 text-foreground" strokeWidth={2.5} />
                <span className="text-sm font-bold tracking-[-0.02em] text-foreground">Platform</span>
              </div>
              <div className="absolute -top-2 right-1 text-foreground select-none">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M2 2l8 6-3 1 5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>

              {/* main card */}
              <div className="bg-card border-2 border-foreground rounded-2xl shadow-[6px_6px_0_0_hsl(var(--foreground))] overflow-hidden">
                <div className="px-6 pt-8 pb-6">
                  <h3 className="text-2xl font-bold tracking-[-0.03em] text-foreground">Capabilities</h3>
                  <div className="mt-1 h-1.5 w-20 rounded-full bg-primary/70" />
                </div>
                <div className="px-6 pb-6 grid grid-cols-2 gap-x-4 gap-y-3.5">
                  {[
                    { icon: CreditCard, label: "Payments Infrastructure" },
                    { icon: BarChart3, label: "Real-time Analytics" },
                    { icon: Layers, label: "Scalable Architecture" },
                    { icon: Database, label: "Secure Data Systems" },
                    { icon: Sparkles, label: "AI Integrations" },
                    { icon: Cloud, label: "Cloud Deployment" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5 py-1.5">
                      <Icon className="h-4 w-4 text-foreground/70 shrink-0" strokeWidth={1.75} />
                      <span className="text-[13px] font-medium text-foreground leading-snug">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 px-6 pb-6">
                  <div className="border-2 border-foreground rounded-lg bg-emerald-100 py-2.5 text-center text-sm font-bold text-foreground">Enterprise Ready</div>
                  <div className="border-2 border-foreground rounded-lg bg-rose-100 py-2.5 text-center text-sm font-bold text-foreground">High Scalability</div>
                </div>
              </div>

              {/* hand-drawn arrow */}
              <div className="absolute -bottom-8 -right-2 text-foreground select-none">
                <svg width="60" height="50" viewBox="0 0 60 50" fill="none">
                  <path d="M5 5 C 20 25, 40 35, 50 30 M50 30 l-8 -2 M50 30 l-3 -8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      </div>
      {/* Divider back to white: Testimonials + Industries */}
      <SectionDivider direction="up" from="#f5f5f4" to="#ffffff" />
      <div className="bg-white">

      {/* Testimonials */}
      <Section className="pt-20 pb-16" eyebrow="What clients say" title="Quietly proud of the words below.">
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <BlurFade key={t.name} delay={0.05 * i} inView>
              <figure className="bg-white rounded-xl border border-border p-6 h-full flex flex-col">
                <Quote className="w-4 h-4 text-foreground/40 mb-3" />
                <blockquote className="text-[15px] text-foreground leading-relaxed flex-1">"{t.quote}"</blockquote>
                <figcaption className="mt-5 pt-5 border-t border-border">
                  <div className="text-sm font-semibold tracking-[-0.02em]">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
                </figcaption>
              </figure>
            </BlurFade>
          ))}
        </div>
      </Section>

      {/* Industries — hand-drawn + swipeable */}
      <section id="industries" className="relative pt-10 pb-24 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="max-w-2xl">
            <BlurFade inView>
              <p className="text-sm font-medium text-muted-foreground mb-3">Who we serve</p>
            </BlurFade>
            <BlurFade inView delay={0.05}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.05em] leading-[1.02] text-foreground">
                Industries we know <em className="not-italic relative inline-block">inside out
                  <svg aria-hidden viewBox="0 0 220 14" className="absolute left-0 -bottom-2 w-full h-3 text-amber-300" preserveAspectRatio="none">
                    <path d="M2 9 C 60 2, 130 14, 218 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </svg>
                </em>.
              </h2>
            </BlurFade>
            <BlurFade inView delay={0.1}>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Six verticals where we've shipped revenue-moving software. Drag the cards to explore — each one is a real playbook, not a promise.
              </p>
            </BlurFade>
          </div>

          {/* Swipe carousel */}
          <BlurFade inView delay={0.2}>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-2">
                <span className="inline-block w-6 h-px bg-foreground/30" />
                Drag to swipe
              </p>
              <span className="text-xs text-muted-foreground hidden md:inline">{industries.length} industries</span>
            </div>
          </BlurFade>
        </div>

        {/* full-bleed swipe row */}
        <div className="mt-6 cursor-grab active:cursor-grabbing">
          <motion.div
            drag="x"
            dragConstraints={{ left: -((industries.length - 2) * 320), right: 0 }}
            dragElastic={0.12}
            className="flex gap-5 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2))] w-max"
          >
            {industries.map((it, i) => (
              <motion.figure
                key={it.name}
                initial={{ opacity: 0, y: 16, rotate: i % 2 === 0 ? -1.2 : 1.2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, rotate: 0 }}
                className="relative w-[280px] md:w-[320px] shrink-0 select-none"
                style={{ rotate: `${i % 2 === 0 ? -1.2 : 1.2}deg` }}
              >
                {/* offset paper shadow card */}
                <div className="relative">
                  <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-foreground/90" aria-hidden />
                  <div className="relative bg-white border-2 border-foreground rounded-2xl p-6 h-[220px] flex flex-col justify-between">
                    {/* accent splotch */}
                    <div className={`absolute -top-3 -right-3 w-16 h-16 ${it.accent} rounded-full blur-[2px] opacity-80`} aria-hidden />
                    <div className="relative flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl border-2 border-foreground bg-background flex items-center justify-center">
                        <it.icon className="w-5 h-5 text-foreground" strokeWidth={1.75} />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground pt-1">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="relative">
                      <h3 className="text-xl font-bold tracking-[-0.03em] text-foreground leading-tight">
                        {it.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-snug">
                        {it.tag}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      </div>
      {/* Divider into tinted band: Tech stack + Case study */}
      <SectionDivider direction="down" from="#ffffff" to="#f5f5f4" />
      <div className="bg-[#f5f5f4]">

      {/* Systems we build */}
      <section className="mx-auto max-w-[1180px] px-6 pt-32 md:pt-40 pb-32 md:pb-40">
        <div className="max-w-3xl">
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Capabilities
          </p>
          <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-[-0.05em] leading-[1.02] text-foreground">
            Systems we <span className="relative inline-block">build
              <svg aria-hidden viewBox="0 0 220 14" className="absolute left-0 -bottom-2 w-full h-3 text-amber-300" preserveAspectRatio="none">
                <path d="M2 9 C 60 2, 130 14, 218 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </span>.
          </h2>
          <p className="mt-7 max-w-[640px] text-[16px] md:text-[17px] text-muted-foreground leading-[1.65]">
            Engineered for real-world operations — where reliability, performance,
            and scale are not optional.
          </p>
        </div>

        <div className="mt-24 md:mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-20">
          {[
            { title: "Internal Platforms", desc: "Systems that coordinate operations, workflows, and internal processes across teams." },
            { title: "Customer Applications", desc: "High-performance products designed for real users, usage spikes, and long-term growth." },
            { title: "Automation Systems", desc: "Event-driven systems that reduce manual work and ensure consistency at scale." },
            { title: "Payment Infrastructure", desc: "Secure transaction systems built for reliability, compliance, and financial accuracy." },
            { title: "Data & Analytics Systems", desc: "Pipelines and reporting layers that turn raw data into operational intelligence." },
            { title: "AI-driven Workflows", desc: "Intelligent systems that enhance decision-making and automate complex processes." },
          ].map((item, i) => (
            <BlurFade key={item.title} delay={0.04 * i} inView>
              <div className="group transition-transform duration-300 ease-out hover:-translate-y-[3px]">
                <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                    {item.title}
                  </span>
                </h3>
                <p className="mt-2.5 text-[14.5px] text-muted-foreground leading-[1.65] max-w-[340px]">
                  {item.desc}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      </div>
      {/* Divider back to white: Why us through Final CTA */}
      <SectionDivider direction="up" from="#f5f5f4" to="#ffffff" />
      <div className="bg-white">

      {/* Principles — sticky-left manifesto */}
      <PrinciplesSection />

      {/* Insights / blog teaser */}
      <Section className="pt-10 pb-20" eyebrow="From the studio" title="Notes, playbooks & engineering reads.">
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {insights.map((p, i) => (
            <BlurFade key={p.title} delay={0.05 * i} inView>
              <a href="#" className="block bg-white border border-border rounded-xl p-6 h-full hover:border-foreground/30 transition-colors group">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span className="uppercase tracking-[0.12em]">{p.tag}</span>
                  <span>{p.time}</span>
                </div>
                <h3 className="text-base font-semibold tracking-[-0.02em] leading-snug">{p.title}</h3>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                  Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
            </BlurFade>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="pt-10 pb-20" eyebrow="Questions" title={<span id="faq">Things people usually ask.</span>}>
        <div className="mt-10 max-w-3xl mx-auto divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <button
                key={f.q}
                onClick={() => setOpenFaq(open ? null : i)}
                className="w-full text-left py-5 flex gap-6 items-start group"
              >
                <span className="flex-1">
                  <span className="block text-base font-semibold tracking-[-0.02em] text-foreground">{f.q}</span>
                  {open && <span className="block mt-2 text-[15px] text-muted-foreground leading-relaxed">{f.a}</span>}
                </span>
                <span className="mt-0.5 w-7 h-7 rounded-md border border-border flex items-center justify-center flex-shrink-0 group-hover:bg-neutral-100 transition-colors">
                  {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Final CTA with call illustration */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="bg-neutral-100 rounded-2xl p-10 md:p-14 flex flex-col md:flex-row md:items-center gap-10 md:gap-12">
          <div className="flex-1 mix-blend-multiply md:max-w-sm">
            <img src={callIllustration} alt="Discovery call illustration" className="w-full h-auto" />
          </div>
          <div className="flex-1">
            <BlurFade delay={0} inView>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.04em] leading-[1.05]">
                Let's build the SaaS<br />your business deserves.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-md">
                Tell us about your goals. We'll come back with a roadmap, a timeline, and an ROI projection — no obligation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-md h-11 px-6 text-sm font-medium gap-2">
                  <Link to="/login">Start your project <ArrowRight className="h-3.5 w-3.5" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-md h-11 px-6 text-sm font-medium bg-white">
                  <a href="mailto:hello@codingroof.com">hello@codingroof.com</a>
                </Button>
              </div>
            </BlurFade>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center gap-1.5 text-foreground">
            <Home className="h-3.5 w-3.5" />
            <span className="text-sm font-semibold tracking-[-0.02em]">CodingRoof</span>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#services" className="hover:text-foreground">Services</a>
            <a href="#process" className="hover:text-foreground">Process</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
            <a href="mailto:hello@codingroof.com" className="hover:text-foreground">Contact</a>
          </div>
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} CodingRoof</span>
        </div>
      </section>
      </div>
    </div>
  );
};


const PrinciplesSection = () => {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} className="mx-auto max-w-5xl px-6 pt-20 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-1/2 md:-translate-y-1/2">
            <p className="text-sm font-medium text-muted-foreground mb-3 inline-flex items-center gap-2">
              <Sparkle className="w-3 h-3 text-foreground/40" />
              Principles
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.04em] leading-[1.05] text-foreground">
              How we build.
            </h2>
            <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-sm">
              Six principles that shape every system we ship.
            </p>
            <div className="mt-8 flex items-center gap-1.5">
              {principles.map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 transition-all duration-300 border border-foreground/70 ${
                    i === active
                      ? "w-7 bg-foreground"
                      : i < active
                      ? "w-2.5 bg-foreground/60 border-foreground/60"
                      : "w-2.5 bg-transparent"
                  }`}
                />
              ))}
            </div>
            <p className="mt-4 font-mono text-xs text-muted-foreground tracking-wider">
              {String(active + 1).padStart(2, "0")} / {String(principles.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        <div ref={rightColRef} className="md:col-span-7 relative flex flex-col gap-24 md:gap-36">
          <HandDrawnConnector
            itemRefs={itemRefs}
            containerRef={rightColRef}
            sectionRef={sectionRef}
            active={active}
          />
          {principles.map((p, i) => {
            const Icon = p.icon;
            const alignRight = i % 2 === 1;
            return (
              <div
                key={p.title}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`relative z-10 w-full flex ${alignRight ? "justify-end" : "justify-start"}`}
              >
                <StickerCard
                  index={i + 1}
                  title={p.title}
                  desc={p.desc}
                  Icon={Icon}
                  chip={p.chip}
                  tilt={p.tilt}
                  alignRight={alignRight}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Sticker card + decorative SVGs (Principles section) ---

interface StickerCardProps {
  index: number;
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
  chip: string;
  tilt: number;
  alignRight: boolean;
}

const StickerCard = ({ index, title, desc, Icon, chip, tilt, alignRight }: StickerCardProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: tilt }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? { rotate: 0, x: 4, y: 4 } : { rotate: tilt, x: 0, y: 0 }}
      className="relative w-full max-w-[460px]"
      style={{ transformOrigin: "center" }}
      data-sticker-card
    >
      {/* Decorative sparkles */}
      <Sparkle className={`absolute ${alignRight ? "-left-5 -top-5" : "-right-5 -top-6"} w-4 h-4 text-foreground/40`} twinkle />
      <Sparkle className={`absolute ${alignRight ? "-left-2 top-2" : "-right-2 top-3"} w-2.5 h-2.5 text-foreground/30`} twinkle delay={0.4} />
      <Sparkle className={`absolute ${alignRight ? "right-6 -bottom-5" : "left-6 -bottom-5"} w-3 h-3 text-foreground/30`} twinkle delay={0.8} />

      {/* Tab badge */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, type: "spring", stiffness: 260, damping: 18 }}
        className="absolute -top-4 right-6 z-10 px-3 py-1.5 bg-background border-[1.5px] border-foreground rounded-full font-mono text-[11px] tracking-[0.18em] text-foreground"
        style={{ boxShadow: "3px 3px 0 hsl(var(--foreground))" }}
      >
        {String(index).padStart(2, "0")}
      </motion.div>

      {/* Card body */}
      <motion.div
        initial={{ boxShadow: "0px 0px 0 hsl(var(--foreground))" }}
        whileInView={{ boxShadow: "6px 6px 0 hsl(var(--foreground))" }}
        viewport={{ once: true }}
        transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}
        animate={hovered ? { boxShadow: "2px 2px 0 hsl(var(--foreground))" } : undefined}
        className="relative bg-background border-[1.5px] border-foreground rounded-2xl p-7 md:p-8"
      >
        <div className="flex items-start gap-4">
          <motion.div
            animate={hovered ? { rotate: -8 } : { rotate: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border border-foreground/15"
            style={{ background: chip }}
          >
            <Icon className="w-5 h-5 text-foreground" />
          </motion.div>
          <div className="min-w-0">
            <h3 className="text-[22px] md:text-[26px] font-bold tracking-[-0.03em] leading-[1.15] text-foreground">
              {title}
            </h3>
            <Squiggle className="mt-2 text-foreground/70" />
            <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
              {desc}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Sparkle = ({
  className = "",
  twinkle = false,
  delay = 0,
}: {
  className?: string;
  twinkle?: boolean;
  delay?: number;
}) => {
  const star = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" aria-hidden>
      <path d="M12 2 L13.6 9.2 L21 12 L13.6 14.8 L12 22 L10.4 14.8 L3 12 L10.4 9.2 Z" />
    </svg>
  );
  if (!twinkle) return <span className={className}>{star}</span>;
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 + delay, duration: 0.4 }}
    >
      <motion.span
        className="block w-full h-full"
        animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity, delay, ease: "easeInOut" }}
      >
        {star}
      </motion.span>
    </motion.span>
  );
};

const Squiggle = ({ className = "" }: { className?: string }) => (
  <motion.svg
    width="64"
    height="6"
    viewBox="0 0 64 6"
    fill="none"
    className={className}
    aria-hidden
  >
    <motion.path
      d="M1 3 Q 8 0.5, 16 3 T 32 3 T 48 3 T 63 3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
    />
  </motion.svg>
);

export default LandingPage;
