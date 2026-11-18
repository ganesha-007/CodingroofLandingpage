// Shared site chrome and building blocks for the landing and products pages.
import logo from "@/assets/logo.webp";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, Loader2, Menu, MessagesSquare, Minus, Plus, Sparkles, X } from "lucide-react";
import { FormEvent, KeyboardEvent, ReactNode, useEffect, useId, useRef, useState } from "react";
import { aiHelpers, categories, products } from "@/data/products";

export const CONTACT_EMAIL = "hello@codingroof.com";
/** Opens the on-page demo form with this product preselected. */
export const demoHrefFor = (product: string) => `?product=${encodeURIComponent(product)}#contact`;

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/#ai-helpers", label: "AI Helpers" },
  { href: "/#industries", label: "Industries" },
  { href: "/#pricing", label: "Pricing" },
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

  const demoTo = pagesWithContact.includes(pathname) ? "#contact" : "/#contact";
  const linkClass = (href: string) =>
    `transition-colors hover:text-foreground ${href === pathname ? "text-foreground font-medium" : ""}`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? "border-border bg-white/90 backdrop-blur" : "border-transparent bg-white"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="" className="h-8 w-auto" />
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
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </Container>

      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <Container className="flex flex-col gap-1 py-3 text-sm">
            {navLinks.map((l) => (
              <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="rounded-md px-2 py-2.5 hover:bg-muted">
                {l.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2">
              <Link
                to={demoTo}
                onClick={() => setOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary font-medium text-primary-foreground"
              >
                Book a demo
              </Link>
            </div>
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
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    ))}
  </div>
);

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
const fieldClass =
  "h-11 w-full rounded-md border border-border bg-white px-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

type PickerOption = { value: string; label: string; hint?: string; logo?: string; icon?: typeof Sparkles };
const pickerGroups: { label: string; options: PickerOption[] }[] = [
  ...categories.map((c) => ({
    label: c.label,
    options: products
      .filter((p) => p.category === c.id)
      .map((p) => ({ value: p.name, label: p.name, hint: p.tag, logo: p.logo })),
  })),
  {
    label: "Something else",
    options: [
      { value: "Custom software", label: "Custom software", hint: "Built for you", icon: Sparkles },
      { value: "Not sure yet", label: "Not sure yet", hint: "Help me choose", icon: MessagesSquare },
    ],
  },
];
const pickerOptions = pickerGroups.flatMap((g) => g.options);

/** Styled replacement for <select>: logos, grouped options, keyboard support. Posts as name="business". */
const ProductPicker = ({ value, onChange, labelledBy }: { value: string; onChange: (v: string) => void; labelledBy: string }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = pickerOptions.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !rootRef.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openList = () => {
    setActive(Math.max(0, pickerOptions.findIndex((o) => o.value === value)));
    setOpen(true);
  };
  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open && ["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openList();
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") (e.preventDefault(), setActive((a) => Math.min(a + 1, pickerOptions.length - 1)));
    else if (e.key === "ArrowUp") (e.preventDefault(), setActive((a) => Math.max(a - 1, 0)));
    else if (e.key === "Enter" || e.key === " ") (e.preventDefault(), choose(pickerOptions[active].value));
    else if (e.key === "Escape" || e.key === "Tab") setOpen(false);
  };

  const Visual = ({ o, size = "h-5 w-5" }: { o: PickerOption; size?: string }) =>
    o.logo ? (
      <img src={o.logo} alt="" className={`${size} object-contain`} />
    ) : o.icon ? (
      <o.icon className={`${size} text-primary`} strokeWidth={1.75} />
    ) : null;

  let index = -1;
  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name="business" value={value} />
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelledBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`${fieldClass} flex items-center gap-2.5 text-left font-normal ${open ? "border-primary ring-2 ring-primary/20" : ""}`}
      >
        {selected ? (
          <>
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-white">
              <Visual o={selected} size="h-4 w-4" />
            </span>
            <span className="truncate">{selected.label}</span>
          </>
        ) : (
          <span className="truncate text-muted-foreground/70">Choose a product</span>
        )}
        <ChevronDown className={`ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={labelledBy}
          className="absolute right-0 top-full z-30 mt-2 w-full sm:min-w-[17.5rem] max-h-80 overflow-y-auto overscroll-contain rounded-xl border border-border bg-white p-1.5 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)]"
        >
          {pickerGroups.map((g) => (
            <div key={g.label} role="group" aria-label={g.label} className="py-1">
              <p className="px-2.5 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{g.label}</p>
              {g.options.map((o) => {
                index += 1;
                const i = index;
                const isSel = o.value === value;
                return (
                  <div
                    key={o.value}
                    role="option"
                    aria-selected={isSel}
                    data-index={i}
                    onMouseEnter={() => setActive(i)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => choose(o.value)}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 ${i === active ? "bg-accent" : ""}`}
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-white">
                      <Visual o={o} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">{o.label}</span>
                      {o.hint && <span className="block truncate text-xs text-muted-foreground">{o.hint}</span>}
                    </span>
                    {isSel && <Check className="h-4 w-4 shrink-0 text-primary" />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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
        <div className="grid gap-1.5 text-sm font-medium text-foreground">
          <span id="business-label">Interested in</span>
          <ProductPicker value={product} onChange={setProduct} labelledBy="business-label" />
        </div>
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
          <img src={logo} alt="" className="h-7 w-auto" />
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
          <li><Link to="/#pricing" className="hover:text-foreground">Custom builds</Link></li>
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
