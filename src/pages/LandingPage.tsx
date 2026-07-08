import callIllustration from "@/assets/cr-illustration-call.png";
import logo from "@/assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Banknote, BarChart3, Check, Cloud, Compass, CreditCard, Database, Factory, GraduationCap, Heart, Layers, LineChart, Menu, Rocket, ShieldCheck, ShoppingCart, Sparkles, Truck, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode, useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { BlurFade } from "@/components/ui/blur-fade";
import { Hero } from "@/components/Hero";
import { SuiteSection } from "@/components/SuiteSection";
import { RoiSection } from "@/components/RoiSection";
import { LovedSection } from "@/components/LovedSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { StudioSection } from "@/components/StudioSection";
import { FaqSection } from "@/components/FaqSection";
import { useLenis } from "lenis/react";

const NAV_OFFSET = -80;

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#industries", label: "Industries" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

function scrollToHash(href: string, lenis: ReturnType<typeof useLenis>) {
  const id = href.replace(/^#/, "");
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  if (lenis) {
    lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.1 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
  window.history.pushState(null, "", href);
  return true;
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    scrollToHash(href, lenis);
    setOpen(false);
  };

  useLenis((lenis) => {
    const next = lenis.scroll > 8;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 8;
      setScrolled((prev) => (prev === next ? prev : next));
    };
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
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="CodingRoof" className="h-8 w-auto object-contain" />
          <span className="text-base font-semibold tracking-[-0.02em]">CodingRoof</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
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
                onClick={(e) => handleNavClick(e, l.href)}
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

/** Scroll to hash target on load and when the hash changes (e.g. codingroof.com/#work). */
const ScrollToHash = () => {
  const lenis = useLenis();

  useEffect(() => {
    const scroll = () => {
      const hash = window.location.hash;
      if (!hash) return;
      window.setTimeout(() => scrollToHash(hash, lenis), 120);
    };

    scroll();
    window.addEventListener("hashchange", scroll);
    return () => window.removeEventListener("hashchange", scroll);
  }, [lenis]);

  return null;
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
    itemRefs.current.forEach((el) => {
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
  const barRef = useRef<HTMLDivElement>(null);

  useLenis((lenis) => {
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${lenis.progress})`;
    }
  });

  useEffect(() => {
    const update = () => {
      if (!barRef.current) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      barRef.current.style.transform = `scaleX(${max > 0 ? (h.scrollTop || window.scrollY) / max : 0})`;
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
        ref={barRef}
        className="h-full bg-foreground origin-left will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
};

// ===== LandingPage =====
const stats = [
  { stat: "3.4×", label: "Avg. ROI within 12 months" },
  { stat: "12+", label: "SaaS Products" },
  { stat: "14+", label: "Countries served" },
  { stat: "6 wks", label: "From kickoff to MVP" },
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

const LandingPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <ScrollToHash />
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

      <SuiteSection />

      <RoiSection />
      <LovedSection />

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

      <TestimonialsSection />

      <div className="bg-white">
      {/* Industries — hand-drawn + swipeable */}
      <section id="industries" className="relative pt-10 pb-24 overflow-hidden scroll-mt-[88px]">
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
      <CapabilitiesSection />
      <div className="bg-white">

      {/* Principles — sticky-left manifesto */}
      <PrinciplesSection />

      <StudioSection />

      <FaqSection />

      {/* Final CTA with call illustration */}
      <section id="pricing" className="mx-auto max-w-5xl px-6 pb-24 scroll-mt-[88px]">
        <div id="contact" className="bg-neutral-100 rounded-2xl p-10 md:p-14 flex flex-col md:flex-row md:items-center gap-10 md:gap-12">
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
          <div className="flex items-center gap-2 text-foreground">
            <img src={logo} alt="CodingRoof" className="h-7 w-auto object-contain" />
            <span className="text-sm font-semibold tracking-[-0.02em]">CodingRoof</span>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#services" className="hover:text-foreground">Services</a>
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
