import { FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Calculator,
  Check,
  FileText,
  GraduationCap,
  Handshake,
  Headphones,
  IndianRupee,
  KeyRound,
  Megaphone,
  Monitor,
  Presentation,
  Repeat,
  Store,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { products } from "@/data/products";
import {
  CONTACT_EMAIL,
  Container,
  FaqList,
  Footer,
  Navbar,
  ProductTile,
  SectionHeader,
  useHashScroll,
} from "@/components/site";

// ===== Hero =====
const referralSteps: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Handshake, title: "You introduce a client", desc: "A call, a visit or a WhatsApp intro" },
  { icon: Presentation, title: "We demo and onboard", desc: "Setup, data migration and training" },
  { icon: IndianRupee, title: "You earn on day one", desc: "A share of the first subscription" },
  { icon: Repeat, title: "And on every renewal", desc: "For as long as your client stays" },
];

const ReferralCard = () => (
  <div className="relative">
    <div aria-hidden className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(60%_60%_at_50%_45%,hsl(216_90%_94%),transparent)]" />
    <div className="relative rounded-2xl border border-border bg-white p-6 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)] md:p-8">
      <p className="text-sm font-semibold">How one referral pays you</p>
      <ol className="mt-6 space-y-5">
        {referralSteps.map(({ icon: Icon, title, desc }, i) => (
          <li key={title} className="relative flex gap-4">
            {i < referralSteps.length - 1 && (
              <span aria-hidden className="absolute left-5 top-11 h-[calc(100%-24px)] w-px bg-border" />
            )}
            <span
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                i >= 2 ? "bg-primary text-primary-foreground" : "bg-accent text-primary"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-[15px] font-medium">{title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-5">
        <span className="text-sm text-muted-foreground">{products.length} products to sell</span>
        <span className="flex -space-x-2">
          {products.slice(0, 6).map((p) => (
            <span key={p.slug} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white ring-2 ring-white">
              <img src={p.logo} alt="" className="h-4 w-4 object-contain" />
            </span>
          ))}
        </span>
      </div>
    </div>
  </div>
);

const Hero = () => (
  <section className="relative overflow-x-clip border-b border-border">
    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,hsl(216_80%_97%)_0%,#fff_75%)]" />
    <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-6">
        <p className="text-sm font-semibold text-primary">Partner program</p>
        <h1 className="mt-3 text-[38px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.04] text-balance">
          Turn your client network into recurring income.
        </h1>
        <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
          Introduce CodingRoof to the businesses that already trust you. We run the demo, set them up and support them.
          You earn on the first subscription and every renewal after.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#apply"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_8px_20px_-8px_rgba(36,99,209,0.6)] hover:bg-primary/90"
          >
            Become a partner <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#how"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-white px-6 text-sm font-medium hover:bg-muted"
          >
            See how it works
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {["Free to join", "No sales targets", "Paid on every renewal"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" strokeWidth={2.25} /> {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-6">
        <ReferralCard />
      </div>
    </Container>
  </section>
);

// ===== Ways to partner =====
export const tracks = [
  {
    name: "Referral partner",
    line: "Make the introduction. We do the rest.",
    desc: "Share a lead and step back. Our team demos, closes, onboards and supports your client.",
    bestFor: ["CAs and tax consultants", "Freelance consultants", "Community and trade leaders"],
  },
  {
    name: "Reseller partner",
    line: "Sell under your name. Earn a bigger share.",
    desc: "You pitch, close and own the relationship, backed by our sales kit and demo accounts.",
    bestFor: ["Billing and accounting software dealers", "IT, computer and POS shops", "Regional distributors"],
  },
  {
    name: "Implementation partner",
    line: "Set up, migrate, train. Bill for your services.",
    desc: "Deliver onboarding and customisation for clients, with certification and priority support from us.",
    bestFor: ["IT consultants", "ERP implementers", "Digital agencies"],
  },
];

const Tracks = () => (
  <section id="ways" className="py-20 md:py-28">
    <Container>
      <SectionHeader
        eyebrow="Ways to partner"
        title="Pick how involved you want to be."
        desc="Start as a referral partner in a day. Move up as your client list grows."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {tracks.map((t) => (
          <div key={t.name} className="flex flex-col rounded-xl border border-border bg-white p-6 md:p-7">
            <p className="text-sm font-semibold text-primary">{t.name}</p>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.015em] leading-snug">{t.line}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Best for</p>
              <ul className="mt-3 space-y-2 text-sm">
                {t.bestFor.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// ===== Who partners with us =====
const profiles: { icon: LucideIcon; label: string }[] = [
  { icon: Calculator, label: "Chartered accountants and tax consultants" },
  { icon: Store, label: "Billing and accounting software dealers" },
  { icon: Monitor, label: "IT, computer and POS hardware shops" },
  { icon: Megaphone, label: "Digital marketing agencies" },
  { icon: Building2, label: "Business and industry associations" },
  { icon: UserRound, label: "Freelance consultants and sales pros" },
];

const Profiles = () => (
  <section className="border-y border-border bg-[hsl(216_60%_98%)] py-20 md:py-24">
    <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4">
        <SectionHeader
          eyebrow="Who it's for"
          title="Made for people businesses already trust."
          desc="If shop owners, clinics, lenders or factories ask you for advice, you're a fit."
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
        {profiles.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-4 rounded-xl border border-border bg-white p-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="text-[15px] font-medium leading-snug">{label}</span>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// ===== Benefits =====
const benefits: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Repeat, title: "Recurring revenue share", desc: "Earn when your client subscribes, and again every time they renew." },
  { icon: KeyRound, title: "Free demo access", desc: "Your own demo login for every product, so you can show instead of tell." },
  { icon: FileText, title: "Ready-made sales kit", desc: "Pitch decks, brochures, demo videos and WhatsApp creatives for each product." },
  { icon: Headphones, title: "A named partner manager", desc: "One person who joins your client calls and answers your questions fast." },
  { icon: GraduationCap, title: "Training and certification", desc: "Learn each product properly and get certified to sell and implement it." },
  { icon: Handshake, title: "We carry the heavy work", desc: "Hosting, updates, migration and support for your clients stay with us." },
];

const Benefits = () => (
  <section className="py-20 md:py-28">
    <Container>
      <SectionHeader eyebrow="What you get" title="Everything you need to sell with confidence." center />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map(({ icon: Icon, title, desc }) => (
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

// ===== What you can sell =====
const Catalog = () => (
  <section className="border-y border-border bg-[hsl(216_60%_98%)] py-20 md:py-24">
    <Container>
      <SectionHeader
        eyebrow="What you can sell"
        title={`${products.length} products. One partnership.`}
        desc="Every client you know needs at least one. Most need two or three."
      />
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <Link
            key={p.slug}
            to={`/products#${p.slug}`}
            className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-colors hover:border-primary/30"
          >
            <ProductTile src={p.logo} name={p.name} size="sm" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{p.name}</span>
              <span className="block truncate text-xs text-muted-foreground">{p.tag}</span>
            </span>
          </Link>
        ))}
      </div>
    </Container>
  </section>
);

// ===== How it works =====
const steps = [
  { title: "Apply", desc: "Fill the two-minute form below. No fee, no paperwork to start." },
  { title: "Onboarding call", desc: "Meet your partner manager, pick your products and get your demo logins." },
  { title: "Introduce clients", desc: "Share leads or bring us into a meeting. We run the demo with you." },
  { title: "Get paid", desc: "Earn on every subscription your clients take, and on every renewal." },
];

const HowItWorks = () => (
  <section id="how" className="py-20 md:py-28">
    <Container>
      <SectionHeader eyebrow="How it works" title="From sign-up to first payout in four steps." />
      <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {i + 1}
              </span>
              {i < steps.length - 1 && <span aria-hidden className="hidden h-px flex-1 bg-border md:block" />}
            </div>
            <h3 className="mt-5 text-base font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </li>
        ))}
      </ol>
    </Container>
  </section>
);

// ===== Apply =====
const partnerTypes = [
  "Chartered accountant / tax consultant",
  "Software dealer / reseller",
  "IT or hardware business",
  "Marketing agency",
  "Consultant / freelancer",
  "Other",
];
const trackOptions = ["Referral", "Reseller", "Implementation", "Not sure yet"];

const inputClass =
  "mt-1.5 h-11 w-full rounded-md border border-border bg-white px-3 text-sm outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-primary/20";

const Apply = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [...f.entries()].map(([k, v]) => `${k}: ${v}`).join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Partner application: ${f.get("Name")}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="apply" className="pb-20 md:pb-28">
      <Container>
        <div className="grid gap-10 rounded-3xl bg-primary p-6 md:p-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-[44px] font-semibold tracking-[-0.025em] leading-[1.1] text-white text-balance">
              Apply in two minutes.
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-white/80">
              Tell us a little about you. Your partner manager will call to get you started.
            </p>
            <ul className="mt-8 space-y-3 text-[15px] text-white">
              {["Free to join, no deposit", "Start with one product or all of them", "Keep your existing business"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} /> {t}
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl bg-white p-6 sm:grid-cols-2 md:p-8 lg:col-span-7">
            <label className="text-sm font-medium">
              Full name
              <input name="Name" required autoComplete="name" className={inputClass} />
            </label>
            <label className="text-sm font-medium">
              Phone (WhatsApp)
              <input name="Phone" type="tel" required autoComplete="tel" className={inputClass} />
            </label>
            <label className="text-sm font-medium">
              Email
              <input name="Email" type="email" required autoComplete="email" className={inputClass} />
            </label>
            <label className="text-sm font-medium">
              City
              <input name="City" required autoComplete="address-level2" className={inputClass} />
            </label>
            <label className="text-sm font-medium">
              You are a
              <select name="Profile" required defaultValue="" className={inputClass}>
                <option value="" disabled>Select one</option>
                {partnerTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium">
              Partnership type
              <select name="Track" defaultValue="Not sure yet" className={inputClass}>
                {trackOptions.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              Who are your clients? <span className="font-normal text-muted-foreground">(optional)</span>
              <textarea
                name="Clients"
                rows={3}
                placeholder="e.g. 40 retail shops and 10 jewellers in Coimbatore"
                className={`${inputClass} h-auto py-2.5`}
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Send application <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                This opens your email app with your details filled in.
              </p>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
};

// ===== FAQ =====
export const faqs = [
  { q: "Does it cost anything to join?", a: "No. The program is free, with no deposit, inventory or minimum target to get started." },
  { q: "Do I need technical knowledge?", a: "No. Referral partners just make introductions. We handle demos, setup and support. Training is there if you want to go deeper." },
  { q: "Which products can I sell?", a: `All ${products.length}, from Funnello CRM and Vector to industry products like Gold Loan, Retail and Salon. Start with the ones your clients need most.` },
  { q: "How do I earn, and when am I paid?", a: "You earn a share of every subscription your clients take, and again on each renewal. Your partner manager shares the exact rates and payout schedule for your partnership type on the onboarding call." },
  { q: "Who supports my clients after they sign up?", a: "We do. Hosting, updates, data migration and day-to-day support stay with CodingRoof, so you're never on the hook for fixing software." },
  { q: "Can I partner from outside India?", a: "Yes. We serve customers in 14+ countries. Apply with your city and country and we'll take it from there." },
];

const Faq = () => (
  <section className="py-20 md:py-28">
    <Container className="grid gap-10 md:grid-cols-12 md:gap-16">
      <div className="md:col-span-4">
        <SectionHeader eyebrow="FAQ" title="Questions partners ask first." />
        <p className="mt-4 text-sm text-muted-foreground">
          Something else?{" "}
          <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Partner program question")}`} className="font-medium text-primary hover:underline">
            Email us
          </a>
          .
        </p>
      </div>
      <div className="md:col-span-8">
        <FaqList items={faqs} />
      </div>
    </Container>
  </section>
);

// ===== Page =====
const PartnersPage = () => {
  useHashScroll();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Tracks />
        <Profiles />
        <Benefits />
        <Catalog />
        <HowItWorks />
        <Faq />
        <Apply />
      </main>
      <Footer />
    </div>
  );
};

export default PartnersPage;
