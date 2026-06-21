import suiteHtml from "./suite.html?raw";
import { HtmlSection } from "./HtmlSection";

const html = suiteHtml.replaceAll("all-products.dc.html", "/products");

export const SuiteSection = () => (
  <HtmlSection html={html} className="cr-hero-root cr-html-section" />
);

export default SuiteSection;
