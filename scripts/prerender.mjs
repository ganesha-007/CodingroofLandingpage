// Build step: renders every route in src/seo/pages.ts to static HTML with its own head tags,
// and writes sitemap.xml. Run after `vite build` and `vite build --ssr`.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";

const dist = resolve("dist");
const { render, buildLlmsTxt, pages, ldGraph, SITE_URL, DEFAULT_IMAGE } = await import(resolve("dist-ssr/entry-server.js"));
const template = readFileSync(`${dist}/index.html`, "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

for (const p of pages) {
  const url = p.path === "/404" ? `${SITE_URL}/404` : `${SITE_URL}${p.path}`;
  const graph = ldGraph(p);
  const head = [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    `<meta name="robots" content="${p.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
    p.noindex ? "" : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${DEFAULT_IMAGE}" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" />`,
    graph ? `<script type="application/ld+json" id="ld-json">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>` : "",
  ].filter(Boolean).join("\n    ");
  const html = template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, head)
    .replace('<div id="root"></div>', `<div id="root">${render(p.path)}</div>`);
  const out = p.path === "/" ? `${dist}/index.html` : `${dist}${p.path}.html`;
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log("prerendered", p.path, "->", out.replace(dist, "dist"));
}

const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter((p) => p.inSitemap).map((p) =>
  `  <url><loc>${SITE_URL}${p.path === "/" ? "/" : p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`);
writeFileSync(`${dist}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
writeFileSync(`${dist}/llms.txt`, buildLlmsTxt());
console.log("llms.txt written");
rmSync(resolve("dist-ssr"), { recursive: true, force: true });
console.log("sitemap.xml:", urls.length, "urls");
