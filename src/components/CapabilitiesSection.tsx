import capabilitiesHtml from "./capabilities.html?raw";
import { HtmlSection } from "./HtmlSection";

export const CapabilitiesSection = () => (
  <HtmlSection html={capabilitiesHtml} className="cr-hero-root cr-html-section" />
);

export default CapabilitiesSection;
