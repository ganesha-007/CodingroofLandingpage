import { useEffect, useRef } from "react";

interface HtmlSectionProps {
  html: string;
  className?: string;
}

export function HtmlSection({ html, className = "cr-html-section" }: HtmlSectionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reveal = () => {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "none";
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    root.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [html]);

  return (
    <div
      ref={rootRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
