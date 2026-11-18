import { ArrowRight, Check } from "lucide-react";
import { aiHelpers, products } from "@/data/products";
import {
  AiHelperGrid,
  Container,
  Cta,
  Footer,
  Navbar,
  ProductTile,
  SectionHeader,
  demoHrefFor,
  useHashScroll,
} from "@/components/site";

const ProductsPage = () => {
  useHashScroll();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,hsl(216_80%_97%)_0%,#fff_100%)]"
          />
          <Container className="relative py-16 md:py-24">
            <p className="text-sm font-semibold text-primary">Product catalog</p>
            <h1 className="mt-3 max-w-3xl text-[36px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-balance">
              Every product and AI helper, in one place.
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
              Industry-grade software your team can run from day one, with AI helpers that plug straight into your
              workflows. One platform, one login, one source of truth.
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {[
                [String(products.length), "Products"],
                [String(aiHelpers.length), "AI helpers"],
                ["1", "Connected platform"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dd className="text-2xl font-semibold tracking-[-0.02em]">{v}</dd>
                  <dt className="text-sm text-muted-foreground">{l}</dt>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* Jump bar */}
        <nav aria-label="Products" className="sticky top-16 z-40 border-b border-border bg-white/90 backdrop-blur">
          <Container className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
            {products.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:border-primary/40 hover:bg-accent"
              >
                <img src={p.logo} alt="" className="h-4 w-4" />
                {p.name}
              </a>
            ))}
          </Container>
        </nav>

        {/* Products */}
        <section className="py-16 md:py-24">
          <Container>
            <SectionHeader
              eyebrow="Products"
              title="Software for the industries we know."
              desc="Each product is a complete, production-grade system, not a template. Run one, or several on the same platform."
            />
            <div className="mt-12 space-y-4">
              {products.map((p) => (
                <article
                  key={p.slug}
                  id={p.slug}
                  className="scroll-mt-36 grid gap-6 rounded-2xl border border-border p-6 md:grid-cols-12 md:gap-10 md:p-8"
                >
                  <div className="md:col-span-7">
                    <div className="flex items-center gap-4">
                      <ProductTile src={p.logo} name={p.name} size="lg" />
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em]">{p.name}</h3>
                        <p className="text-sm text-muted-foreground">{p.tag}</p>
                      </div>
                    </div>
                    <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground">{p.desc}</p>
                    <a
                      href={demoHrefFor(p.name)}
                      className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Request a demo <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="md:col-span-5 md:border-l md:border-border md:pl-10">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What's inside</p>
                    <ul className="mt-4 space-y-3 text-sm">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* AI Helpers */}
        <section id="ai-helpers" className="scroll-mt-36 border-y border-border bg-muted py-16 md:py-24">
          <Container>
            <SectionHeader
              eyebrow="AI Helpers"
              title="AI that works inside every product."
              desc="Lightweight helpers that plug into any CodingRoof product, taking over the busywork and surfacing what needs attention."
            />
            <div className="mt-12">
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
