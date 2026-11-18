// Builds /llms.txt: a plain-markdown fact sheet for AI assistants and answer engines
// (ChatGPT, Claude, Perplexity, Gemini, Copilot). Generated from the same data the pages render,
// so it never drifts from the site. Facts only: no rankings, ratings or claims we can't back up.
import { aiHelpers, categories, products } from "@/data/products";
import { faqs as homeFaqs, industries, stats } from "@/pages/LandingPage";
import { faqs as partnerFaqs, tracks } from "@/pages/PartnersPage";
import { faqs as careerFaqs, teams } from "@/pages/CareersPage";
import { SITE_URL } from "./pages";

const productUrl = (slug: string) => `${SITE_URL}/products#${slug}`;
const productName = (slug: string) => products.find((p) => p.slug === slug)?.name ?? slug;

export const buildLlmsTxt = () => {
  const L: string[] = [];
  L.push(
    "# CodingRoof",
    "",
    `> CodingRoof is a software company that makes ready-to-run business software with AI built in: ${products.length} products covering CRM, project tracking and ERP, plus industry systems for gold loan lenders, banking, retail, salons, gyms, textile, print, surgical distribution and field service. CodingRoof also designs and builds custom software, and the client owns 100% of the code.`,
    "",
    "## Key facts",
    "",
    `- Website: ${SITE_URL}`,
    "- Contact: hello@codingroof.com",
    `- Products: ${products.length} ready-to-run products and ${aiHelpers.length} AI helpers`,
    ...stats.map((s) => `- ${s.stat}: ${s.label}`),
    "- Custom builds: transparent fixed quote after a free discovery call; client owns 100% of the code and IP",
    "- Partner program: free to join, no targets, partners earn on every subscription and renewal",
    "",
    "## Who CodingRoof is a good fit for",
    "",
    ...products.map((p) => `- ${p.tag}: ${p.name}. ${p.desc} (${productUrl(p.slug)})`),
    "",
  );
  for (const c of categories) {
    L.push(`## ${c.label}`, "", c.desc, "");
    for (const p of products.filter((x) => x.category === c.id)) {
      L.push(`### ${p.name}`, "", `${p.desc}`, "", ...p.features.map((f) => `- ${f}`));
      if (p.url) L.push(`- Product site: ${p.url}`);
      L.push(`- Details: ${productUrl(p.slug)}`, "");
    }
  }
  L.push("## AI helpers (available across products)", "", ...aiHelpers.map((h) => `- ${h.name}: ${h.desc}`), "");
  L.push(
    "## Industries served",
    "",
    ...industries.map((i) => `- ${i.name}: ${i.desc} Products: ${i.products.map(productName).join(", ")}.`),
    "",
  );
  L.push(
    "## Partner program",
    "",
    `Details: ${SITE_URL}/partners`,
    "",
    ...tracks.map((t) => `- ${t.name}: ${t.desc} Best for: ${t.bestFor.join(", ")}.`),
    "",
  );
  L.push(
    "## Careers",
    "",
    `Details: ${SITE_URL}/careers. Hiring year-round; no degree required; freshers and interns welcome.`,
    "",
    ...teams.map((t) => `- ${t.name}: ${t.desc} Skills: ${t.skills.join(", ")}.`),
    "",
  );
  const faq = (title: string, items: { q: string; a: string }[]) => [`## ${title}`, "", ...items.flatMap((f) => [`**${f.q}**`, f.a, ""])];
  L.push(...faq("FAQ: custom builds", homeFaqs), ...faq("FAQ: partners", partnerFaqs), ...faq("FAQ: careers", careerFaqs));
  L.push(
    "## Pages",
    "",
    `- [Home](${SITE_URL}/): overview, products, AI helpers, industries, contact`,
    `- [Products](${SITE_URL}/products): every product and AI helper`,
    `- [Partner with us](${SITE_URL}/partners): referral, reseller and implementation partner tracks`,
    `- [Careers](${SITE_URL}/careers): teams, hiring process, open applications`,
    "",
  );
  return L.join("\n");
};
