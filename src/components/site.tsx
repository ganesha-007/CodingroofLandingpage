// Shared site chrome and building blocks for the landing and products pages.
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check, Loader2, Menu, Minus, Plus, X } from "lucide-react";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { aiHelpers, products } from "@/data/products";

export const CONTACT_EMAIL = "hello@codingroof.com";
/** Vector CR mark (crisp at any size; same file as the favicon). */
const LOGO = "/favicon.svg";
/** Opens the on-page demo form with this product preselected. */
export const demoHrefFor = (product: string) => `?product=${encodeURIComponent(product)}#contact`;

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/#ai-helpers", label: "AI Helpers" },
  { href: "/#industries", label: "Industries" },
  { href: "/partners", label: "Partner with us" },
  { href: "/careers", label: "Careers" },
  { href: "/#faq", label: "FAQ" },
];

/** Pages that render the shared <Cta id="contact">; elsewhere "Book a demo" goes home. */
const pagesWithContact = ["/", "/products"];



/** Scrolls to the URL hash after client-side navigation (e.g. /products -> /#faq). */
export const useHashScroll = () => {
  const { hash, pathname } = useLocation();
  const prevPath = useRef<string | null>(null);
  useEffect(() => {
    // New page: jump instantly. Same page: let it glide.
    const behavior: ScrollBehavior = prevPath.current === pathname ? "smooth" : "instant";
    prevPath.current = pathname;
    if (!hash) {
      if (behavior === "instant") window.scrollTo({ top: 0, behavior });
      return;
    }
    const el = document.getElementById(hash.slice(1));
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior }));
  }, [hash, pathname]);
};

export const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-6xl px-5 md:px-8 ${className}`}>{children}</div>
);

export const SectionHeader = ({
  eyebrow,
  title,
  desc,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: ReactNode;
  center?: boolean;
}) => (
  <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
    <p className="text-sm font-semibold text-primary">{eyebrow}</p>
    <h2 className="mt-3 text-3xl md:text-[40px] font-semibold tracking-[-0.025em] leading-[1.1] text-foreground text-balance">
      {title}
    </h2>
    {desc && <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">{desc}</p>}
  </div>
);

export const ProductTile = ({ src, name, size = "md" }: { src: string; name: string; size?: "sm" | "md" | "lg" }) => {
  const box = { sm: "h-8 w-8 rounded-lg", md: "h-12 w-12 rounded-xl", lg: "h-16 w-16 rounded-2xl" }[size];
  const img = { sm: "h-5 w-5", md: "h-7 w-7", lg: "h-9 w-9" }[size];
  return (
    <span className={`inline-flex shrink-0 items-center justify-center border border-border bg-white ${box}`}>
      <img src={src} alt={`${name} logo`} className={img} />
    </span>
  );
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const demoTo = pagesWithContact.includes(pathname) ? "#contact" : "/#contact";
  const linkClass = (href: string) =>
    `transition-colors hover:text-foreground ${href === pathname ? "text-foreground font-medium" : ""}`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        // No backdrop-blur while the menu is open: it would trap the fixed full-screen menu inside the header.
        open ? "border-border bg-white" : scrolled ? "border-border bg-white/90 backdrop-blur" : "border-transparent bg-white"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={LOGO} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">CodingRoof</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm text-muted-foreground">
          {navLinks.map((l) => (
            <Link key={l.href} to={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            to={demoTo}
            className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Book a demo
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="lg:hidden -mr-1 inline-flex h-11 w-11 items-center justify-center rounded-md border border-border"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-border bg-white">
          <Container className="flex flex-col py-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-border text-base font-medium text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to={demoTo}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-primary text-base font-medium text-primary-foreground"
            >
              Book a demo
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
};

export const AiHelperGrid = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {aiHelpers.map(({ icon: Icon, name, desc }) => (
      <div key={name} className="rounded-xl border border-border bg-white p-6">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <h3 className="mt-4 text-base font-semibold">{name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    ))}
  </div>
);

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
const fieldClass =
  "h-11 w-full rounded-md border border-border bg-white px-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

/** Demo request form. Sends to hello@codingroof.com via Web3Forms; without a key it falls back to the visitor's mail app. */
export const DemoForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [product, setProduct] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("product");
    if (p) setProduct(p);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (data.botcheck) return;
    const subject = `Demo request: ${data.name}${data.business ? ` (${data.business})` : ""}`;
    if (!WEB3FORMS_KEY) {
      const body = Object.entries(data)
        .filter(([k, v]) => v && k !== "botcheck")
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, from_name: "codingroof.com", ...data }),
      });
      const json = await res.json();
      setStatus(json.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent")
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl bg-white p-8 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
          <Check className="h-6 w-6" />
        </span>
        <p className="mt-4 text-lg font-semibold text-foreground">Thanks, we've got your request.</p>
        <p className="mt-2 text-[15px] text-muted-foreground">We'll get back to you by email to set up your demo.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl bg-white p-6 text-left md:p-8">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          Name
          <input name="name" required autoComplete="name" className={fieldClass} placeholder="Your name" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          Work email
          <input name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@company.com" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          <span>
            Phone <span className="font-normal text-muted-foreground">(optional)</span>
          </span>
          <input name="phone" type="tel" autoComplete="tel" className={fieldClass} placeholder="+91" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-foreground">
          Interested in
          <select name="business" value={product} onChange={(e) => setProduct(e.target.value)} className={fieldClass}>
            <option value="">Choose a product</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name} ({p.tag})
              </option>
            ))}
            <option value="Custom software">Custom software</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium text-foreground">
        <span>
          Tell us about your business <span className="font-normal text-muted-foreground">(optional)</span>
        </span>
        <textarea
          name="message"
          rows={3}
          className={`${fieldClass} h-auto py-2.5`}
          placeholder="What you do, how many branches or users, what you use today"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-[15px] font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
      >
        {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Book my demo
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
      <p className="text-xs leading-relaxed text-muted-foreground">
        By submitting, you agree to our{" "}
        <Link to="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
        . We only use your details to reply to this request.
      </p>
    </form>
  );
};

export const Cta = ({ title, desc }: { title: string; desc: string }) => (
  <section id="contact" className="scroll-mt-20 pb-20 md:pb-28">
    <Container>
      <div className="grid gap-10 rounded-3xl bg-primary px-6 py-12 md:grid-cols-2 md:items-center md:gap-14 md:px-14 md:py-16">
        <div className="text-white">
          <h2 className="max-w-md text-3xl md:text-[44px] font-semibold tracking-[-0.025em] leading-[1.1] text-balance">{title}</h2>
          <p className="mt-4 max-w-md text-base md:text-lg leading-relaxed text-white">{desc}</p>
          <ul className="mt-8 space-y-3 text-[15px]">
            {["A walkthrough of the product that fits your business", "Answers on setup, data migration and support", "A clear quote for your setup"].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px] text-white">
            Prefer email?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline underline-offset-4">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
        <DemoForm />
      </div>
    </Container>
  </section>
);

/** Accordion FAQ list used by the partner and careers pages. */
export const FaqList = ({ items }: { items: { q: string; a: string }[] }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((f, i) => {
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
  );
};

export const Footer = () => (
  <footer className="border-t border-border">
    <Container className="grid gap-10 py-14 md:grid-cols-12">
      <div className="md:col-span-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={LOGO} alt="" width={28} height={28} className="h-7 w-7" />
          <span className="text-[15px] font-semibold">CodingRoof</span>
        </Link>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Ready-to-run business software and custom builds for growing companies.
        </p>
      </div>
      <div className="md:col-span-3">
        <p className="text-sm font-semibold">Products</p>
        <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 whitespace-nowrap text-sm text-muted-foreground">
          {products.map((p) => (
            <li key={p.slug}>
              <Link to={`/products#${p.slug}`} className="hover:text-foreground">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-2">
        <p className="text-sm font-semibold">Company</p>
        <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
          <li><Link to="/#ai-helpers" className="hover:text-foreground">AI Helpers</Link></li>
          <li><Link to="/#industries" className="hover:text-foreground">Industries</Link></li>
          <li><Link to="/#custom" className="hover:text-foreground">Custom builds</Link></li>
          <li><Link to="/partners" className="hover:text-foreground">Partner with us</Link></li>
          <li><Link to="/careers" className="hover:text-foreground">Careers</Link></li>
          <li><Link to="/#faq" className="hover:text-foreground">FAQ</Link></li>
        </ul>
      </div>
      <div className="md:col-span-3">
        <p className="text-sm font-semibold">Contact</p>
        <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
          <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground">{CONTACT_EMAIL}</a></li>
          <li><Link to="/#contact" className="hover:text-foreground">Book a demo</Link></li>
        </ul>
      </div>
    </Container>
    <Container className="flex flex-col gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <span>© {new Date().getFullYear()} CodingRoof. All rights reserved.</span>
      <span className="flex gap-5">
        <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-foreground">Terms of Use</Link>
        <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground">Contact</a>
      </span>
    </Container>
  </footer>
);
