"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { TAI_EASE } from "@/lib/motion";

export interface WipeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  as?: "button" | "a" | "div";
  href?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
  wipeColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  ariaLabel?: string;
}

export const WipeButton = React.forwardRef<HTMLButtonElement, WipeButtonProps>(
  (
    {
      children,
      className,
      asChild = false,
      onClick,
      href,
      target,
      rel,
      download,
      wipeColor = "#ffffff",
      textColor = "#ffffff",
      hoverTextColor = "#05070a",
      borderColor = "rgba(255, 255, 255, 0.12)",
      hoverBorderColor = "#ffffff",
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const [wipeState, setWipeState] = useState<"idle" | "in" | "out">("idle");
    const prefersReduced = useReducedMotion();

    const handleMouseEnter = () => {
      setWipeState("in");
    };

    const handleMouseLeave = () => {
      setWipeState("out");
    };

    if (asChild) {
      return (
        <Slot
          className={cn(
            "relative inline-flex items-center justify-center overflow-hidden rounded-none cursor-pointer select-none transition-all active:scale-[0.98]",
            className
          )}
          ref={ref as any}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    const innerContent = (
      <>
        {/* Sliding Through Forward Wipe Layer */}
        {!prefersReduced && (
          <motion.div
            initial={{ x: "-102%" }}
            animate={
              wipeState === "in"
                ? { x: "0%" }
                : wipeState === "out"
                ? { x: "102%" }
                : { x: "-102%" }
            }
            transition={
              wipeState === "idle"
                ? { duration: 0 }
                : { duration: 0.4, ease: TAI_EASE.luxury }
            }
            onAnimationComplete={() => {
              if (wipeState === "out") {
                setWipeState("idle");
              }
            }}
            className="absolute inset-0 pointer-events-none rounded-none"
            style={{ backgroundColor: wipeColor, zIndex: 0 }}
          />
        )}
        {/* Foreground Content */}
        <span
          className="relative z-10 inline-flex items-center justify-center gap-2.5 sm:gap-3.5 w-full h-full transition-colors duration-250 leading-none"
          style={{
            color: wipeState === "in" && !prefersReduced ? hoverTextColor : textColor,
          }}
        >
          {children}
        </span>
      </>
    );

    const baseClasses = cn(
      "relative inline-flex items-center justify-center overflow-hidden rounded-none transition-all duration-300 cursor-pointer select-none outline-none focus-visible:ring-1 focus-visible:ring-white/50 active:scale-[0.98]",
      className
    );

    const sharedStyles: React.CSSProperties = {
      borderColor: wipeState === "in" ? hoverBorderColor : borderColor,
    };

    if (props.as === "div") {
      return (
        <div
          onClick={onClick as any}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={baseClasses}
          style={sharedStyles}
          aria-label={ariaLabel}
          ref={ref as any}
        >
          {innerContent}
        </div>
      );
    }

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          download={download}
          onClick={onClick as any}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={baseClasses}
          style={sharedStyles}
          aria-label={ariaLabel}
          ref={ref as any}
        >
          {innerContent}
        </a>
      );
    }

    return (
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={baseClasses}
        style={sharedStyles}
        aria-label={ariaLabel}
        ref={ref}
        {...props}
      >
        {innerContent}
      </button>
    );
  }
);

WipeButton.displayName = "WipeButton";
