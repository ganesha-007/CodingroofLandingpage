import heroHtml from "./hero.html?raw";

export const Hero = () => (
  <div
    className="cr-hero-root"
    dangerouslySetInnerHTML={{ __html: heroHtml }}
  />
);

export default Hero;
