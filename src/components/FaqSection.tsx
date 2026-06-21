import { useEffect, useRef } from "react";
import faqHtml from "./faq.html?raw";
import { HtmlSection } from "./HtmlSection";

export const FaqSection = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const closeAll = () => {
      root.querySelectorAll("[data-faq-item]").forEach((it) => {
        it.setAttribute("data-open", "0");
        const answer = it.querySelector<HTMLElement>("[data-faq-answer]");
        if (answer) answer.style.maxHeight = "0px";
        const icon = it.querySelector<HTMLElement>("[data-faq-icon]");
        if (icon) icon.style.transform = "rotate(0deg)";
      });
    };

    const handlers: Array<{ btn: Element; fn: () => void }> = [];
    root.querySelectorAll("[data-faq]").forEach((btn) => {
      const fn = () => {
        const item = btn.closest("[data-faq-item]");
        if (!item) return;
        const open = item.getAttribute("data-open") === "1";
        closeAll();
        if (!open) {
          item.setAttribute("data-open", "1");
          const answer = item.querySelector<HTMLElement>("[data-faq-answer]");
          if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
          const icon = item.querySelector<HTMLElement>("[data-faq-icon]");
          if (icon) icon.style.transform = "rotate(45deg)";
        }
      };
      btn.addEventListener("click", fn);
      handlers.push({ btn, fn });
    });

    root.querySelector<HTMLButtonElement>("[data-faq-item] [data-faq]")?.click();

    return () => {
      handlers.forEach(({ btn, fn }) => btn.removeEventListener("click", fn));
    };
  }, []);

  return (
    <div ref={rootRef}>
      <HtmlSection html={faqHtml} className="cr-hero-root cr-html-section" />
    </div>
  );
};

export default FaqSection;
