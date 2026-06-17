import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import { ReactNode, useEffect, useState } from "react";

const lenisOptions: LenisOptions = {
  autoRaf: true,
  lerp: 0.085,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.35,
  anchors: {
    offset: 72,
  },
};

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
