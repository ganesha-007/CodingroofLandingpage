import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_IMAGE, SITE_URL, ldGraph, seoFor } from "./pages";

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
};

// Keeps <head> in sync on client-side navigation. The prerendered HTML already ships the same tags.
export function RouteSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const p = seoFor(path);
    const url = `${SITE_URL}${p.path === "/404" ? path : p.path}`;
    document.title = p.title;
    setMeta("name", "description", p.description);
    setMeta("name", "robots", p.noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    setMeta("property", "og:title", p.title);
    setMeta("property", "og:description", p.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", DEFAULT_IMAGE);
    setMeta("name", "twitter:title", p.title);
    setMeta("name", "twitter:description", p.description);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    let ld = document.head.querySelector<HTMLScriptElement>("script#ld-json");
    const graph = ldGraph(p);
    if (graph) {
      if (!ld) {
        ld = document.createElement("script");
        ld.type = "application/ld+json";
        ld.id = "ld-json";
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(graph);
    } else ld?.remove();
  }, [pathname]);
  return null;
}
