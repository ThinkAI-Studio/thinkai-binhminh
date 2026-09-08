"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Copy, Check, ExternalLink, Mail, Download, FileText } from "lucide-react";
import { ButtonTextRoll } from "./ButtonTextRoll";
import { WipeButton } from "./WipeButton";
import { profile } from "@/data/portfolio";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const prefersReduced = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const primaryEmail = profile.email; // pata10102004@gmail.com

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopy = (email: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2500);
    }
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    primaryEmail
  )}&su=${encodeURIComponent("Project Inquiry · ThinkAI Studio")}&body=${encodeURIComponent(
    "Hi Binh Minh,\n\nI would like to discuss a project regarding...\n\n- Scope/Needs:\n- Timeline:\n- Budget range:\n\nBest regards,"
  )}`;

  const mailtoUrl = `mailto:${primaryEmail}?subject=${encodeURIComponent(
    "Project Inquiry · ThinkAI Studio"
  )}&body=${encodeURIComponent(
    "Hi Binh Minh,\n\nI would like to discuss a project regarding...\n\n- Scope/Needs:\n- Timeline:\n- Budget range:\n\nBest regards,"
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: LUXURY_EASE }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: 16 }
            }
            animate={
              prefersReduced
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      damping: 28,
                      stiffness: 300,
                      mass: 0.8,
                    },
                  }
            }
            exit={
              prefersReduced
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.96,
                    y: 12,
                    transition: { duration: 0.25, ease: LUXURY_EASE },
                  }
            }
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#141417] text-white border border-white/15 rounded-none p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 space-y-6 overflow-hidden"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            {/* Header: Title + Close Button */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-none bg-emerald-400 animate-pulse" />
                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  Start a Project
                </h3>
              </div>

              <button
                onClick={onClose}
                className="group flex items-center justify-center gap-2 px-3 py-1.5 rounded-none bg-white/10 text-white text-xs font-mono font-bold hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <ButtonTextRoll text="Close" className="font-mono text-xs font-bold leading-none" />
                <span className="text-[10px] text-neutral-400 font-mono">ESC</span>
              </button>
            </div>

            {/* Subtext */}
            <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Have a web platform, self-hosted infrastructure, or systems project in mind? Reach out directly via email or your preferred mail client:
            </div>

            {/* Email Card 1: Primary Studio Mail */}
            <div className="p-4 rounded-none bg-white/[0.04] border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                <span>(PRIMARY CONTACT)</span>
                <span className="text-emerald-400">4-8h Response SLA</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="font-mono text-sm sm:text-base font-bold text-white tracking-tight break-all select-all">
                  {primaryEmail}
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(primaryEmail)}
                  className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
                    copiedEmail === primaryEmail
                      ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30"
                      : "bg-white text-black hover:bg-neutral-200"
                  }`}
                >
                  {copiedEmail === primaryEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Mail Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <WipeButton
                as="a"
                href={gmailComposeUrl}
                target="_blank"
                rel="noreferrer"
                wipeColor="#ffffff"
                textColor="#ffffff"
                hoverTextColor="#05070a"
                borderColor="rgba(255, 255, 255, 0.2)"
                hoverBorderColor="#ffffff"
                className="p-3 rounded-none bg-white/[0.04] flex items-center justify-center gap-2 text-xs font-mono font-bold cursor-pointer"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>Open in Gmail</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </WipeButton>

              <WipeButton
                as="a"
                href={mailtoUrl}
                wipeColor="#ffffff"
                textColor="#ffffff"
                hoverTextColor="#05070a"
                borderColor="rgba(255, 255, 255, 0.2)"
                hoverBorderColor="#ffffff"
                className="p-3 rounded-none bg-white/[0.04] flex items-center justify-center gap-2 text-xs font-mono font-bold cursor-pointer"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>Default Mail App</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </WipeButton>
            </div>

            {/* DevOps CV Download Box */}
            <div className="p-4 rounded-none bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>DevOps Curriculum Vitae</span>
                </div>
                <p className="text-[11px] font-mono text-neutral-400">
                  Nguyen Binh Minh · 2026 Updated · B.S. Software Engineering (PDF)
                </p>
              </div>

              <WipeButton
                as="a"
                href="/NguyenBinhMinh-DevOpsEngineer-2026.pdf"
                target="_blank"
                rel="noreferrer"
                download="NguyenBinhMinh-DevOpsEngineer-2026.pdf"
                wipeColor="#ffffff"
                textColor="#ffffff"
                hoverTextColor="#05070a"
                borderColor="rgba(255, 255, 255, 0.25)"
                hoverBorderColor="#ffffff"
                className="px-3.5 py-2 rounded-none bg-white/10 flex items-center justify-center gap-2 text-xs font-mono font-bold cursor-pointer shrink-0 select-none"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </WipeButton>
            </div>

            {/* Social & Alternative Contact Info */}
            <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <span>Phone / Zalo:</span>
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                  className="text-neutral-200 hover:text-white font-bold transition-colors"
                >
                  {profile.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub ↗
                </a>
                <span>·</span>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
