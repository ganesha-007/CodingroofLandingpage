import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  inView?: boolean;
}

export function BlurFade({ children, className, delay = 0, inView = false }: BlurFadeProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      {...(inView
        ? {
            whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
            viewport: { once: true, margin: "-40px" },
          }
        : {
            animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          })}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
