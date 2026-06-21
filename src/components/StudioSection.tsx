import studioHtml from "./studio.html?raw";
import { HtmlSection } from "./HtmlSection";

export const StudioSection = () => (
  <HtmlSection html={studioHtml} className="cr-hero-root cr-html-section" />
);

export default StudioSection;
