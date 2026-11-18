import { useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { aiHelpers, categories, products, type Product } from "@/data/products";
import {
  AiHelperGrid,
  Container,
  Cta,
  Footer,
  Navbar,
  ProductTile,
  SectionHeader,
  demoHrefFor,
  usePageTitle,
  useHashScroll,
} from "@/components/site";

const sections = [...categories.map((c) => ({ id: c.id, label: c.label })), { id: "ai-helpers", label: "AI helpers" }];

// ===== Hero =====
const IconWall = () => (
  <div className="relative">
    <div aria-hidden className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(60%_60%_at_50%_45%,hsl(216_90%_94%),transparent)]" />
    <div className="relative grid grid-cols-4 gap-3 sm:gap-4">
      {products.map((p) => (
        <a
          key={p.slug}
          href={`#${p.slug}`}
          title={p.name}
          className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.3)] transition-all hover:-translate-y-0.5 hover:border-primary/30"
        >
          <img src={p.logo} alt="" className="h-8 w-8 sm:h-9 sm:w-9 object-contain" />
          <span className="hidden sm:block max-w-full truncate px-1 text-[11px] font-medium text-muted-foreground group-hover:text-foreground">
            {p.name}
          </span>
        </a>
      ))}
      <a
        href="#ai-helpers"
        title="AI helpers"
        className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl bg-primary text-primary-foreground shadow-[0_8px_24px_-12px_rgba(36,99,209,0.6)] transition-transform hover:-translate-y-0.5"
      >
        <Sparkles className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.6} />
        <span className="hidden sm:block text-[11px] font-medium">AI helpers</span>
      </a>
    </div>
  </div>
);

const Hero = () => (
  <section className="relative overflow-x-clip border-b border-border">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,hsl(216_80%_97%)_0%,#fff_75%)]"
    />
    <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-6">
        <p className="text-sm font-semibold text-primary">Products</p>
        <h1 className="mt-3 text-[38px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.04] text-balance">
          Software for every part of your business.
        </h1>
        <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
          {products.length} production-grade products and {aiHelpers.length} AI helpers. Start with the one you need
          today and add more as you grow.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Book a demo <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#essentials"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-white px-6 text-sm font-medium hover:bg-muted"
          >
            Browse products
          </a>
        </div>
      </div>
      <div className="lg:col-span-6">
        <IconWall />
      </div>
    </Container>
  </section>
);

// ===== Section bar =====
const SectionBar = () => (
  <nav aria-label="Product sections" className="sticky top-16 z-40 border-b border-border bg-white/90 backdrop-blur">
    <Container className="flex items-center gap-1 overflow-x-auto py-2.5 [scrollbar-width:none]">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {s.label}
        </a>
      ))}
      <span className="ml-auto hidden shrink-0 pl-4 text-xs text-muted-foreground md:block">
        {products.length} products · {aiHelpers.length} AI helpers
      </span>
    </Container>
  </nav>
);

// ===== Product card =====
const ProductCard = ({ p, active }: { p: Product; active: boolean }) => (
  <article
    id={p.slug}
    className={`group flex scroll-mt-32 flex-col rounded-2xl border bg-white p-6 md:p-7 transition-[box-shadow,border-color] duration-500 hover:shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)] ${
      active ? "border-primary/50 ring-4 ring-primary/10" : "border-border"
    }`}
  >
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        <ProductTile src={p.logo} name={p.name} size="lg" />
        <div>
          <h3 className="text-xl font-semibold tracking-[-0.02em]">{p.name}</h3>
          <p className="text-sm text-muted-foreground">{p.tag}</p>
        </div>
      </div>
      {p.url && (
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      )}
    </div>

    <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{p.desc}</p>

    <ul className="mt-5 mb-6 flex flex-wrap gap-2">
      {p.features.map((f) => (
        <li key={f} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-[13px]">
          <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.25} />
          {f}
        </li>
      ))}
    </ul>

    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5">
      <a
        href={demoHrefFor(p.name)}
        className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Request a demo
      </a>
      {p.url && (
        <a
          href={p.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Open {p.name} <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  </article>
);

// ===== Page =====
const ProductsPage = () => {
  useHashScroll();
  usePageTitle("Products");
  const { hash } = useLocation();
  const activeSlug = hash.slice(1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <SectionBar />

        {categories.map((c, i) => {
          const items = products.filter((p) => p.category === c.id);
          return (
            <section
              key={c.id}
              id={c.id}
              className={`scroll-mt-28 py-16 md:py-24 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <Container>
                <SectionHeader eyebrow={`${items.length} products`} title={c.label} desc={c.desc} />
                <div className={`mt-10 grid gap-5 md:grid-cols-2 ${items.length === 3 ? "lg:grid-cols-3" : ""}`}>
                  {items.map((p) => (
                    <ProductCard key={p.slug} p={p} active={p.slug === activeSlug} />
                  ))}
                </div>
              </Container>
            </section>
          );
        })}

        <section id="ai-helpers" className="scroll-mt-28 border-y border-border bg-muted py-16 md:py-24">
          <Container>
            <SectionHeader
              eyebrow={`${aiHelpers.length} AI helpers`}
              title="AI that works inside every product."
              desc="Lightweight helpers that plug into any CodingRoof product, taking over the busywork and surfacing what needs attention."
            />
            <div className="mt-10">
              <AiHelperGrid />
            </div>
          </Container>
        </section>

        <div className="pt-20 md:pt-28">
          <Cta
            title="Not sure which product fits?"
            desc="Tell us what you run and we'll map the right products and AI helpers to your workflows, with a timeline and an ROI estimate."
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
