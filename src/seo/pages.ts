// Single source of truth for per-page SEO. Used by the app at runtime (RouteSeo) and by
// scripts/prerender.mjs at build time. See docs/seo/SEO-MASTER-SUITE.md for the rules behind it.
import { aiHelpers, products } from "@/data/products";
import { faqs as homeFaqs } from "@/pages/LandingPage";
import { faqs as partnerFaqs } from "@/pages/PartnersPage";
import { faqs as careerFaqs } from "@/pages/CareersPage";

export const SITE_URL = "https://codingroof.com";
export const SITE_NAME = "CodingRoof";
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export type PageSeo = {
  path: string;
  title: string; // <= 60 chars, brand last
  description: string; // 140-160 chars
  noindex?: boolean;
  inSitemap?: boolean;
  priority?: number;
  jsonLd?: object[];
};

const org = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Coding Roof",
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
  email: "hello@codingroof.com",
  description:
    "CodingRoof makes ready-to-run business software with AI built in, for CRM, project tracking, ERP, gold loan, banking, retail, salons, gyms, textile, print, surgical distribution and field service, and builds custom software.",
  knowsAbout: [...products.map((p) => `${p.tag} software`), ...aiHelpers.map((h) => h.name)],
  contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "hello@codingroof.com", availableLanguage: ["English"] },
};

const faqPage = (path: string, items: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  "@id": `${SITE_URL}${path}#faq`,
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: "Coding Roof",
  url: `${SITE_URL}/`,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
};

const crumbs = (name: string, path: string) => ({
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
  ],
});

const webPage = (path: string, name: string, description: string, type = "WebPage") => ({
  "@type": type,
  "@id": `${SITE_URL}${path}#webpage`,
  url: `${SITE_URL}${path}`,
  name,
  description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
});

const productList = {
  "@type": "ItemList",
  name: "CodingRoof business software",
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: `${p.name} by CodingRoof`,
      description: p.desc,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${SITE_URL}/products#${p.slug}`,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  })),
};

const HOME_DESC =
  "Ready-to-run business software for CRM, projects, ERP, gold loan, retail billing, salons, gyms and more, with AI built in. Custom builds when you need them.";
const PRODUCTS_DESC =
  "CRM, project tracking, ERP, gold loan, banking, retail POS, salon, gym, textile, print and field service software, plus AI helpers for billing and forecasting.";
const PARTNERS_DESC =
  "Join the CodingRoof partner program. Refer, resell or implement our business software and earn recurring income on every renewal. Free to join, no targets.";
const CAREERS_DESC =
  "Careers at CodingRoof. Build business software real companies run every day. Hiring engineers, designers and sales roles year-round. Freshers welcome.";

export const pages: PageSeo[] = [
  {
    path: "/",
    title: "CodingRoof | Software your business runs on",
    description: HOME_DESC,
    inSitemap: true,
    priority: 1,
    jsonLd: [org, website, webPage("/", "CodingRoof | Software your business runs on", HOME_DESC), faqPage("/", homeFaqs)],
  },
  {
    path: "/products",
    title: "Business Software Products | CodingRoof",
    description: PRODUCTS_DESC,
    inSitemap: true,
    priority: 0.9,
    jsonLd: [webPage("/products", "Business Software Products", PRODUCTS_DESC, "CollectionPage"), crumbs("Products", "/products"), productList],
  },
  {
    path: "/partners",
    title: "Partner Program: Earn on Every Renewal | CodingRoof",
    description: PARTNERS_DESC,
    inSitemap: true,
    priority: 0.7,
    jsonLd: [webPage("/partners", "CodingRoof Partner Program", PARTNERS_DESC), crumbs("Partner with us", "/partners"), faqPage("/partners", partnerFaqs)],
  },
  {
    path: "/careers",
    title: "Careers at CodingRoof | Jobs and Internships",
    description: CAREERS_DESC,
    inSitemap: true,
    priority: 0.6,
    jsonLd: [webPage("/careers", "Careers at CodingRoof", CAREERS_DESC), crumbs("Careers", "/careers"), faqPage("/careers", careerFaqs)],
  },
  {
    path: "/privacy",
    title: "Privacy Policy | CodingRoof",
    description: "How CodingRoof collects, uses and protects personal data sent through codingroof.com, and your rights under India's DPDP Act, 2023.",
    inSitemap: true,
    priority: 0.3,
    jsonLd: [webPage("/privacy", "Privacy Policy", "CodingRoof website privacy policy."), crumbs("Privacy Policy", "/privacy")],
  },
  {
    path: "/terms",
    title: "Terms of Use | CodingRoof",
    description: "The terms that apply to your use of the codingroof.com website.",
    inSitemap: true,
    priority: 0.3,
    jsonLd: [webPage("/terms", "Terms of Use", "CodingRoof website terms of use."), crumbs("Terms of Use", "/terms")],
  },
  { path: "/login", title: "Sign in | CodingRoof", description: "Sign in to your CodingRoof account.", noindex: true },
  { path: "/dashboard", title: "Dashboard | CodingRoof", description: "Your CodingRoof dashboard.", noindex: true },
  { path: "/404", title: "Page not found | CodingRoof", description: "This page does not exist.", noindex: true },
];

export const seoFor = (path: string): PageSeo =>
  pages.find((p) => p.path === path) ?? pages.find((p) => p.path === "/404")!;

export const ldGraph = (p: PageSeo) => (p.jsonLd?.length ? { "@context": "https://schema.org", "@graph": p.jsonLd } : null);
