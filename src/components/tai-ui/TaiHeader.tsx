"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { WipeButton } from "./WipeButton";
import { ButtonTextRoll } from "./ButtonTextRoll";
import { ArrowRoll } from "./ArrowRoll";

interface TaiHeaderProps {
  onOpenAbout: () => void;
  onOpenContact?: () => void;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function TaiHeader({ onOpenAbout, onOpenContact }: TaiHeaderProps) {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide header when scrolling into the CTA section (#contact) or Footer
  useEffect(() => {
    const handleScroll = () => {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top <= 120) {
          setIsHeaderHidden(true);
          return;
        }
      }
      setIsHeaderHidden(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (anchorId?: string) => {
    setIsMobileMenuOpen(false);
    if (anchorId) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
      if (window.location.hash) {
        window.location.replace(window.location.pathname);
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        animate={
          isHeaderHidden && !isMobileMenuOpen
            ? {
                opacity: 0,
                filter: "blur(12px)",
                y: -14,
                transition: { duration: 0.4, ease: LUXURY_EASE },
              }
            : {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: { duration: 0.45, ease: LUXURY_EASE },
              }
        }
        className="fixed top-0 inset-x-0 z-50 bg-transparent px-5 sm:px-10 lg:px-12 py-4 sm:py-6 flex items-center justify-between pointer-events-none select-none"
      >
        {/* Left: Pure Floating Logo Icon (Authentic Studio Style) */}
        <button
          type="button"
          onClick={handleLogoClick}
          className={`group cursor-pointer flex items-center justify-center p-1 select-none transition-transform hover:scale-105 active:scale-95 ${
            isHeaderHidden && !isMobileMenuOpen ? "pointer-events-none" : "pointer-events-auto"
          }`}
          aria-label="ThinkAI Studio"
        >
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 shrink-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            <Image
              src="/images/thinkai_studio_logo.png"
              alt="ThinkAI Studio"
              fill
              sizes="28px"
              className="object-contain"
              priority
            />
          </div>
        </button>

        {/* Center: Floating Navigation Links with Signature Directional Wipe Motion */}
        <nav
          className={`hidden sm:flex items-center gap-1.5 lg:gap-2.5 ${
            isHeaderHidden ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <WipeButton
            onClick={onOpenAbout}
            wipeColor="#1e2026"
            textColor="#ffffff"
            hoverTextColor="#ffffff"
            borderColor="transparent"
            hoverBorderColor="transparent"
            className="group h-8.5 sm:h-9 inline-flex items-center justify-center px-3.5 sm:px-4 rounded-none text-sm sm:text-[15px] font-bold tracking-tight cursor-pointer select-none bg-transparent border-0 active:scale-[0.96] transition-transform duration-150 leading-none shadow-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            About
          </WipeButton>
          <WipeButton
            as="a"
            href="#products"
            wipeColor="#1e2026"
            textColor="#ffffff"
            hoverTextColor="#ffffff"
            borderColor="transparent"
            hoverBorderColor="transparent"
            className="group h-8.5 sm:h-9 inline-flex items-center justify-center px-3.5 sm:px-4 rounded-none text-sm sm:text-[15px] font-bold tracking-tight cursor-pointer select-none bg-transparent border-0 active:scale-[0.96] transition-transform duration-150 leading-none shadow-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            Products
          </WipeButton>
          <WipeButton
            as="a"
            href="#work"
            wipeColor="#1e2026"
            textColor="#ffffff"
            hoverTextColor="#ffffff"
            borderColor="transparent"
            hoverBorderColor="transparent"
            className="group h-8.5 sm:h-9 inline-flex items-center justify-center px-3.5 sm:px-4 rounded-none text-sm sm:text-[15px] font-bold tracking-tight cursor-pointer select-none bg-transparent border-0 active:scale-[0.96] transition-transform duration-150 leading-none shadow-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            Work
          </WipeButton>
          <WipeButton
            as="a"
            href="#contact"
            wipeColor="#1e2026"
            textColor="#ffffff"
            hoverTextColor="#ffffff"
            borderColor="transparent"
            hoverBorderColor="transparent"
            className="group h-8.5 sm:h-9 inline-flex items-center justify-center px-3.5 sm:px-4 rounded-none text-sm sm:text-[15px] font-bold tracking-tight cursor-pointer select-none bg-transparent border-0 active:scale-[0.96] transition-transform duration-150 leading-none shadow-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            Contact
          </WipeButton>
        </nav>

        {/* Right: Start a project Button + Mobile Close / Menu Toggle */}
        <div
          className={`flex items-center gap-3 sm:gap-4 ${
            isHeaderHidden && !isMobileMenuOpen ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <WipeButton
            onClick={onOpenContact}
            wipeColor="#05070a"
            textColor="#05070a"
            hoverTextColor="#ffffff"
            borderColor="#ffffff"
            hoverBorderColor="rgba(255, 255, 255, 0.4)"
            className="group h-8.5 sm:h-9.5 inline-flex items-center justify-center gap-2 sm:gap-2.5 px-3 sm:px-4 rounded-none text-xs sm:text-[13.5px] font-bold cursor-pointer shadow-lg select-none bg-white border border-white active:scale-[0.94] transition-transform duration-150 leading-none shrink-0"
          >
            <ButtonTextRoll
              text="Start a project"
              className="font-bold text-xs sm:text-[13.5px] tracking-tight leading-none"
            />
            <ArrowRoll size="sm" />
          </WipeButton>

          {/* Mobile Menu / Close Text Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden text-white hover:text-neutral-300 font-medium text-sm tracking-tight cursor-pointer px-1 py-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] select-none"
            aria-label="Toggle navigation menu"
          >
            <div className="relative h-[1.2em] w-11 overflow-hidden text-right flex items-center justify-end">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={isMobileMenuOpen ? "Close" : "Menu"}
                  initial={{ y: isMobileMenuOpen ? 14 : -14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: isMobileMenuOpen ? -14 : 14, opacity: 0 }}
                  transition={{ duration: 0.28, ease: LUXURY_EASE }}
                  className="block text-sm font-medium leading-none"
                >
                  {isMobileMenuOpen ? "Close" : "Menu"}
                </motion.span>
              </AnimatePresence>
            </div>
          </button>
        </div>
      </motion.header>

      {/* ─── AUTHENTIC THINKAI MOBILE NAVIGATION DRAWER (Upper Curtain with Grab Handle) ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: LUXURY_EASE }}
            className="fixed top-0 inset-x-0 z-40 bg-[#09090b]/98 backdrop-blur-3xl pt-24 pb-4 px-6 border-b border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.95)] sm:hidden flex flex-col justify-between"
          >
            {/* Big Bold Vertical Links */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.1,
                  },
                },
                closed: {
                  transition: {
                    staggerChildren: 0.03,
                    staggerDirection: -1,
                  },
                },
              }}
              className="flex flex-col gap-4 text-4xl font-bold tracking-tight text-white pt-2"
            >
              {[
                { label: "About", action: () => onOpenAbout() },
                { label: "Products", action: () => handleNavClick("products") },
                { label: "Work", action: () => handleNavClick("work") },
                { label: "Contact", action: () => handleNavClick("contact") },
                {
                  label: "DevOps CV ↗",
                  action: () => window.open("/NguyenBinhMinh-DevOpsEngineer-2026.pdf", "_blank"),
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    open: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: LUXURY_EASE },
                    },
                    closed: {
                      opacity: 0,
                      y: 16,
                      transition: { duration: 0.2, ease: LUXURY_EASE },
                    },
                  }}
                >
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      item.action();
                    }}
                    className="text-left text-white hover:text-neutral-300 active:scale-[0.98] transition-all cursor-pointer font-bold"
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom Featured Live Product Callout Card */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.28, ease: LUXURY_EASE }}
              className="mt-8 mb-4"
            >
              <a
                href="https://hostdeck.thinkai.id.vn"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-none bg-white/[0.04] border border-white/[0.08] flex items-center justify-between gap-3 group hover:bg-white/[0.08] transition-all"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="relative w-12 h-10 rounded-none overflow-hidden border border-white/10 shrink-0 bg-[#161619]">
                    <Image
                      src="/images/products/hostdeck-screen.png"
                      alt="HostDeck Console"
                      fill
                      sizes="48px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <div className="text-xs font-bold text-white tracking-tight truncate">
                      HostDeck is live — Bare-Metal CLI
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      AUGUST 2026
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white shrink-0 transition-colors" />
              </a>
            </motion.div>

            {/* Bottom Grab Bar Handle */}
            <div className="flex justify-center items-center py-2">
              <div className="flex flex-col gap-1 items-center">
                <div className="w-8 h-[2px] rounded-none bg-neutral-600/80" />
                <div className="w-8 h-[2px] rounded-none bg-neutral-600/80" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
