// Shared site chrome and building blocks for the landing and products pages.
import logo from "@/assets/logo.webp";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { aiHelpers, products } from "@/data/products";

export const CONTACT_EMAIL = "hello@codingroof.com";
export const DEMO_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Demo request")}`;
export const demoHrefFor = (product: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${product} demo`)}`;

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/#ai-helpers", label: "AI Helpers" },
  { href: "/#industries", label: "Industries" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];


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

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {navLinks.map((l) => (
            <Link key={l.href} to={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/login" className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium hover:bg-muted">
            Sign in
          </Link>
          <a
            href="#contact"
            className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Book a demo
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <Container className="flex flex-col gap-1 py-3 text-sm">
            {navLinks.map((l) => (
              <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="rounded-md px-2 py-2.5 hover:bg-muted">
                {l.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link to="/login" className="inline-flex h-10 items-center justify-center rounded-md border border-border font-medium">
                Sign in
              </Link>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary font-medium text-primary-foreground"
              >
                Book a demo
              </a>
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

export const Cta = ({ title, desc }: { title: string; desc: string }) => (
  <section id="contact" className="pb-20 md:pb-28">
    <Container>
      <div className="rounded-3xl bg-primary px-6 py-14 text-center md:px-16 md:py-20">
        <h2 className="mx-auto max-w-2xl text-3xl md:text-[44px] font-semibold tracking-[-0.025em] leading-[1.1] text-white text-balance">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base md:text-lg leading-relaxed text-white/80">{desc}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={DEMO_HREF}
            className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-medium text-primary hover:bg-white/90"
          >
            Book a demo <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-md border border-white/30 px-6 text-sm font-medium text-white hover:bg-white/10"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </Container>
  </section>
);

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
          <li><Link to="/#faq" className="hover:text-foreground">FAQ</Link></li>
        </ul>
      </div>
      <div className="md:col-span-3">
        <p className="text-sm font-semibold">Contact</p>
        <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
          <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground">{CONTACT_EMAIL}</a></li>
          <li><a href={DEMO_HREF} className="hover:text-foreground">Book a demo</a></li>
          <li><Link to="/login" className="hover:text-foreground">Sign in</Link></li>
        </ul>
      </div>
    </Container>
    <Container className="border-t border-border py-6 text-xs text-muted-foreground">
      © {new Date().getFullYear()} CodingRoof. All rights reserved.
    </Container>
  </footer>
);
