import { ArrowRight, BrainCircuit, Bug, Code, Headphones, Layers, PenTool, Rocket, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import { aiHelpers, products } from "@/data/products";
import { CONTACT_EMAIL, Container, FaqList, Footer, Navbar, SectionHeader, useHashScroll } from "@/components/site";

const applyHref = (team: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Application: ${team}`)}&body=${encodeURIComponent(
    "Name:\nRole you're interested in:\nLinks (CV, GitHub, portfolio, anything you've built):\n\nWhy CodingRoof:\n",
  )}`;
const GENERAL_APPLY = applyHref("Open application");

// ===== Hero =====
const WorkCard = () => (
  <div className="relative">
    <div aria-hidden className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(60%_60%_at_50%_45%,hsl(216_90%_94%),transparent)]" />
    <div className="relative rounded-2xl border border-border bg-white p-6 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)] md:p-8">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">What you'd work on</p>
        <span className="text-xs text-muted-foreground">{products.length} products · {aiHelpers.length} AI helpers</span>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-3">
        {products.map((p) => (
          <div
            key={p.slug}
            title={p.name}
            className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-white"
          >
            <img src={p.logo} alt="" className="h-7 w-7 object-contain" />
            <span className="hidden sm:block max-w-full truncate px-1 text-[10px] font-medium text-muted-foreground">{p.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3 rounded-xl bg-accent p-4">
        <Sparkles className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} />
        <p className="text-sm">
          <span className="font-medium">AI in every product:</span>{" "}
          <span className="text-muted-foreground">OCR billing, voice to billing, risk scoring and more.</span>
        </p>
      </div>
    </div>
  </div>
);

const Hero = () => (
  <section className="relative overflow-x-clip border-b border-border">
    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,hsl(216_80%_97%)_0%,#fff_75%)]" />
    <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-6">
        <p className="text-sm font-semibold text-primary">Careers</p>
        <h1 className="mt-3 text-[38px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.04] text-balance">
          Build software real businesses open every morning.
        </h1>
        <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
          Lenders, retailers, salons, factories and sales teams in 14+ countries run on what we make. Small teams, real
          users, and work that ships in weeks, not quarters.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#teams"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_8px_20px_-8px_rgba(36,99,209,0.6)] hover:bg-primary/90"
          >
            See open teams <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={GENERAL_APPLY}
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-white px-6 text-sm font-medium hover:bg-muted"
          >
            Send us your work
          </a>
        </div>
      </div>
      <div className="lg:col-span-6">
        <WorkCard />
      </div>
    </Container>
  </section>
);

// ===== Why join =====
const reasons: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Rocket, title: "Ship to real customers", desc: "What you build this month is used at a shop counter or a loan desk next month." },
  { icon: Layers, title: "Own a whole product", desc: "Small teams own a product end to end. You'll shape what gets built, not just close tickets." },
  { icon: TrendingUp, title: "Learn how businesses work", desc: "Gold loans, textiles, salons, field service. Every product teaches you a new industry." },
  { icon: BrainCircuit, title: "Put AI to real use", desc: "We build AI helpers into everyday workflows, from reading invoices to scoring risk." },
];

const Reasons = () => (
  <section className="py-20 md:py-28">
    <Container>
      <SectionHeader eyebrow="Why CodingRoof" title="Your work goes live. People use it. You see the difference." />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-border bg-white p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <h3 className="mt-4 text-base font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// ===== How we work =====
const principles = [
  { title: "Customers over opinions", desc: "We settle debates by watching how people actually use the product." },
  { title: "Small teams, full ownership", desc: "Fewer handoffs, faster decisions, and clear credit for the work." },
  { title: "Simple beats clever", desc: "The best feature is the one a busy shop owner gets without training." },
  { title: "Ship, then polish", desc: "Get it in front of users early, then make it great with what we learn." },
  { title: "Write it down", desc: "Decisions, specs and gotchas live in writing, so nobody waits on a meeting." },
  { title: "Kind and direct", desc: "Honest feedback, given with care. We disagree on ideas, never on people." },
];

const Principles = () => (
  <section className="border-y border-border bg-[hsl(216_60%_98%)] py-20 md:py-24">
    <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4">
        <SectionHeader eyebrow="How we work" title="Six habits we hire for." desc="If these sound like you, you'll fit right in." />
      </div>
      <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
        {principles.map((p, i) => (
          <li key={p.title} className="border-t border-border pt-5">
            <span className="text-sm font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 text-base font-semibold">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          </li>
        ))}
      </ol>
    </Container>
  </section>
);

// ===== Teams =====
const teams: { icon: LucideIcon; name: string; desc: string; skills: string[] }[] = [
  { icon: Code, name: "Engineering", desc: "Build web and mobile apps that handle real money, stock and customers.", skills: ["React", "TypeScript", "Node.js", "React Native", "MongoDB"] },
  { icon: BrainCircuit, name: "AI and machine learning", desc: "Turn invoices, voice and history into features people use every day.", skills: ["Python", "LLMs", "OCR", "Forecasting"] },
  { icon: PenTool, name: "Product design", desc: "Design screens a cashier or loan officer can use without a manual.", skills: ["Figma", "UX research", "Design systems"] },
  { icon: Bug, name: "Quality and automation", desc: "Catch problems before customers do, with tests that run on every release.", skills: ["Playwright", "API testing", "CI/CD"] },
  { icon: TrendingUp, name: "Sales and partnerships", desc: "Bring our products to new industries, cities and partner networks.", skills: ["B2B sales", "Demos", "Channel partners"] },
  { icon: Headphones, name: "Customer success", desc: "Onboard new customers, migrate their data and keep them happy.", skills: ["Implementation", "Training", "Support"] },
];

const Teams = () => (
  <section id="teams" className="py-20 md:py-28">
    <Container>
      <SectionHeader
        eyebrow="Teams"
        title="Where you could fit."
        desc="We hire all year round. Pick a team and send us your work. Don't see your role? Tell us what you'd build."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams.map(({ icon: Icon, name, desc, skills }) => (
          <div key={name} className="flex flex-col rounded-xl border border-border bg-white p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <h3 className="mt-4 text-base font-semibold">{name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <li key={s} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">{s}</li>
              ))}
            </ul>
            <a href={applyHref(name)} className="mt-6 inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-primary hover:underline md:mt-auto">
              Apply to {name.toLowerCase()} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// ===== Hiring process =====
const process = [
  { title: "Apply", desc: "Send your CV, GitHub, portfolio or anything you've built. No cover letter needed." },
  { title: "Intro call", desc: "A 30-minute chat about you, the role and what you want to learn next." },
  { title: "Practical round", desc: "A small, real-world problem we talk through together. No trick puzzles." },
  { title: "Meet the team", desc: "Meet the people you'd work with, ask anything, and get your offer." },
];

const Process = () => (
  <section className="border-y border-border bg-[hsl(216_60%_98%)] py-20 md:py-24">
    <Container>
      <SectionHeader eyebrow="Hiring process" title="Four steps. No surprises." />
      <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
        {process.map((s, i) => (
          <li key={s.title}>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {i + 1}
              </span>
              {i < process.length - 1 && <span aria-hidden className="hidden h-px flex-1 bg-border md:block" />}
            </div>
            <h3 className="mt-5 text-base font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </li>
        ))}
      </ol>
    </Container>
  </section>
);

// ===== FAQ =====
const faqs = [
  { q: "Do I need a degree?", a: "No. We hire for skill and curiosity. Show us what you've built and how you think." },
  { q: "Do you hire freshers and interns?", a: "Yes. If you've built projects on your own and want to learn fast, apply. Mention that you're a fresher or looking for an internship." },
  { q: "What happens in the practical round?", a: "We pick a small problem close to the real work, like a screen, an API or a sales pitch, and talk it through with you. It's a conversation, not an exam." },
  { q: "I don't see a role that fits. Can I still apply?", a: "Yes. Send an open application with your work and tell us where you think you'd make a difference." },
];

const Faq = () => (
  <section className="py-20 md:py-28">
    <Container className="grid gap-10 md:grid-cols-12 md:gap-16">
      <div className="md:col-span-4">
        <SectionHeader eyebrow="FAQ" title="Before you apply." />
      </div>
      <div className="md:col-span-8">
        <FaqList items={faqs} />
      </div>
    </Container>
  </section>
);

// ===== Closing CTA =====
const Closing = () => (
  <section className="pb-20 md:pb-28">
    <Container>
      <div className="rounded-3xl bg-primary px-6 py-14 text-center md:px-16 md:py-20">
        <h2 className="mx-auto max-w-2xl text-3xl md:text-[44px] font-semibold tracking-[-0.025em] leading-[1.1] text-white text-balance">
          Show us what you've built.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base md:text-lg leading-relaxed text-white/80">
          A repo, a design, a side project, a sales story. Send it over and tell us what you want to build next.
        </p>
        <a
          href={GENERAL_APPLY}
          className="mt-8 inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-medium text-primary hover:bg-white/90"
        >
          Send your application <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </Container>
  </section>
);

// ===== Page =====
const CareersPage = () => {
  useHashScroll();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Reasons />
        <Principles />
        <Teams />
        <Process />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;
