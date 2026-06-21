import lovedIllustration from "@/assets/middle_one.png";
import lovedHtml from "./loved.html?raw";
import { HtmlSection } from "./HtmlSection";

const html = lovedHtml.replace("__LOVED_IMAGE__", lovedIllustration);

export const LovedSection = () => (
  <HtmlSection html={html} className="cr-hero-root cr-html-section" />
);

export default LovedSection;
