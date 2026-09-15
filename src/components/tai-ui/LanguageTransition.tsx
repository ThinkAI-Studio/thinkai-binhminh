"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface LanguageTransitionProps {
  children: React.ReactNode;
  langKey: string;
  className?: string;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "p";
}

const motionMap = {
  div: motion.div,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
};

export function LanguageTransition({
  children,
  langKey,
  className = "",
  as: Component = "div",
}: LanguageTransitionProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    const PlainTag = Component;
    return <PlainTag className={className}>{children}</PlainTag>;
  }

  const MotionComponent = motionMap[Component] || motion.div;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <MotionComponent
        key={langKey}
        initial={{ opacity: 0, y: 5, filter: "blur(3px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -5, filter: "blur(3px)" }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </MotionComponent>
    </AnimatePresence>
  );
}
