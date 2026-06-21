import roiIllustration from "@/assets/ROI_photo.png";
import roiHtml from "./roi.html?raw";
import { HtmlSection } from "./HtmlSection";

const html = roiHtml.replace("__ROI_IMAGE__", roiIllustration);

export const RoiSection = () => (
  <HtmlSection html={html} className="cr-hero-root cr-html-section" />
);

export default RoiSection;
