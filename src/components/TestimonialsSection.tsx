import testimonialsHtml from "./testimonials.html?raw";
import { HtmlSection } from "./HtmlSection";

export const TestimonialsSection = () => (
  <HtmlSection html={testimonialsHtml} className="cr-hero-root cr-html-section" />
);

export default TestimonialsSection;
