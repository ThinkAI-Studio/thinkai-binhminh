"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, Download } from "lucide-react";
import { ButtonTextRoll } from "./ButtonTextRoll";
import { WipeButton } from "./WipeButton";
import { TAI_SPRING, TAI_EASE } from "@/lib/motion";
import { profile } from "@/data/portfolio";

interface AboutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "vi" | "en";
}

export function AboutDrawer({ isOpen, onClose, lang }: AboutDrawerProps) {
  const prefersReduced = useReducedMotion();

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

  // Motion variants for each staggered element inside the drawer
  const getRevealProps = (delaySec: number) => ({
    initial: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: prefersReduced
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay: delaySec,
            ease: TAI_EASE.luxury,
          },
        },
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex justify-end">
          {/* Ambient Backdrop Blur with Clean Luxury Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: TAI_EASE.luxury }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Right Sliding Panel with Authentic Studio Paper Feel & Native Scroll */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={TAI_SPRING.default}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="relative w-full max-w-[640px] h-screen max-h-screen bg-[#f4f4f5] text-[#0a0a0c] z-10 overflow-y-auto overscroll-contain px-8 sm:px-14 py-12 shadow-2xl"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              letterSpacing: "-0.018em",
            }}
          >
            <div className="min-h-full flex flex-col justify-between space-y-12">
              <div className="space-y-10">
                {/* Header: Bullet label + Close Button */}
                <motion.div {...getRevealProps(0.18)} className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2.5 text-sm font-extrabold text-[#0a0a0c]">
                    <span className="w-2.5 h-2.5 rounded-none bg-[#52525b]" />
                    <span>About the engineer & studio</span>
                  </div>

                  <button
                    onClick={onClose}
                    className="group flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-none bg-[#0a0a0c] text-white text-xs font-mono font-bold hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm select-none"
                    style={{ backgroundColor: "#0a0a0c", color: "#ffffff" }}
                  >
                    <ButtonTextRoll
                      text="Close"
                      className="font-mono text-xs font-bold leading-none"
                    />
                    <span className="text-[10px] text-neutral-400 font-mono">ESC</span>
                  </button>
                </motion.div>

                {/* Founder Identity Header */}
                <motion.div {...getRevealProps(0.24)} className="flex items-center gap-6">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-none overflow-hidden border-2 border-black/10 shadow-md bg-white shrink-0 group">
                    <Image
                      src="/images/binhminh-sketch.jpg"
                      alt="Nguyen Binh Minh - DevOps & Systems Engineer"
                      fill
                      sizes="(max-width: 640px) 96px, 112px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl font-extrabold text-[#0a0a0c] tracking-tight">
                      Nguyen Binh Minh
                    </div>
                    <div className="text-xs font-mono text-neutral-700 font-bold">
                      DevOps & Systems Engineer · Founder of ThinkAI Studio
                    </div>
                    <div className="text-[11px] font-mono text-neutral-600 flex items-center gap-1.5 pt-0.5 font-medium">
                      <span className="w-2 h-2 rounded-none bg-emerald-600 animate-pulse" />
                      <span>HCMC, Vietnam · Available for Engineering & Projects</span>
                    </div>
                    <div className="pt-2">
                      <WipeButton
                        as="a"
                        href="/NguyenBinhMinh-DevOpsEngineer-2026.pdf"
                        target="_blank"
                        rel="noreferrer"
                        download="NguyenBinhMinh-DevOpsEngineer-2026.pdf"
                        wipeColor="#0a0a0c"
                        textColor="#0a0a0c"
                        hoverTextColor="#ffffff"
                        borderColor="rgba(0, 0, 0, 0.2)"
                        hoverBorderColor="#0a0a0c"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-black/[0.05] border border-black/15 text-xs font-mono font-bold cursor-pointer text-[#0a0a0c] shadow-sm select-none"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{lang === "vi" ? "Tải CV DevOps (PDF)" : "Download DevOps CV"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </WipeButton>
                    </div>
                  </div>
                </motion.div>

                {/* Editorial Bio with Balanced Personal & Studio Philosophy */}
                <div className="space-y-6 text-[#0a0a0c] text-lg sm:text-[19.5px] leading-[1.48] font-bold tracking-tight">
                  <motion.p {...getRevealProps(0.3)}>
                    {lang === "vi"
                      ? "Xin chào, tôi là Bình Minh. Tôi xây dựng các hệ thống hạ tầng tin cậy, quy trình GitOps CI/CD và website hiệu năng cao dưới thương hiệu ThinkAI Studio, tập trung vào cấu hình dạng mã nguồn (IaC), tự động hóa, và quy trình bảo mật Zero-Trust."
                      : "Hey, I'm Binh Minh. I engineer reliable infrastructure, GitOps CI/CD delivery pipelines, and high-performance web systems under ThinkAI Studio, focused on infrastructure as code, automated workflows, and Zero-Trust security primitives."}
                  </motion.p>
                  <motion.p {...getRevealProps(0.36)}>
                    {lang === "vi"
                      ? "Tôi tập trung vào giao điểm giữa kỹ thuật hệ thống, an toàn thông tin và trải nghiệm sản phẩm: từ máy chủ Bare-Metal (HostDeck), cụm K3s Kubernetes đến website mượt mà tối ưu chi phí."
                      : "I focus on the intersection of systems engineering, automated security gating, and craft product experiences: from bare-metal servers (HostDeck) to enterprise K3s pipelines and high-speed web platforms."}
                  </motion.p>
                  <motion.p {...getRevealProps(0.42)}>
                    {lang === "vi"
                      ? "Tôi tin rằng sự kết hợp giữa tư duy hệ thống chặt chẽ và khả năng giám sát toàn diện (Observability) là chìa khóa để giữ cho mọi bản phát hành luôn ổn định, an toàn và dễ phục hồi."
                      : "I believe the mix of disciplined systems thinking and deep observability is what makes software delivery predictable, resilient, and bulletproof."}
                  </motion.p>
                </div>

                {/* Section 1: Flagship Products */}
                <motion.div {...getRevealProps(0.48)} className="border-t-2 border-black/[0.08] pt-7 grid grid-cols-12 gap-6 items-baseline">
                  <div className="col-span-4 flex items-center gap-2.5 text-base font-extrabold text-[#0a0a0c]">
                    <span className="w-2 h-2 rounded-none bg-[#52525b]" />
                    <span>Products</span>
                  </div>
                  <div className="col-span-8 space-y-1.5 text-base font-bold text-[#0a0a0c] tracking-tight">
                    <div>HostDeck Bare-Metal Console (hostdeck.thinkai.id.vn)</div>
                    <div>ThinkAI Delivery Platform (learning.thinkai.id.vn)</div>
                    <div>Hospital SAST Quality Gate Automation</div>
                  </div>
                </motion.div>

                {/* Section 2: Core Stack */}
                <motion.div {...getRevealProps(0.54)} className="border-t-2 border-black/[0.08] pt-7 grid grid-cols-12 gap-6 items-baseline">
                  <div className="col-span-4 flex items-center gap-2.5 text-base font-extrabold text-[#0a0a0c]">
                    <span className="w-2 h-2 rounded-none bg-[#52525b]" />
                    <span>Stack</span>
                  </div>
                  <div className="col-span-8 space-y-1.5 text-base font-bold text-[#0a0a0c] tracking-tight">
                    <div>Go & Kubernetes (K3s)</div>
                    <div>Rootless Podman & Docker</div>
                    <div>Tailscale Zero-Trust Mesh</div>
                    <div>GitHub Actions & Argo CD</div>
                    <div>SonarQube & CodeQL SAST</div>
                    <div>Next.js & Modern Frontend Systems</div>
                  </div>
                </motion.div>

                {/* Section 3: Education & Recognition */}
                <motion.div {...getRevealProps(0.6)} className="border-t-2 border-black/[0.08] pt-7 grid grid-cols-12 gap-6 items-baseline">
                  <div className="col-span-4 flex items-center gap-2.5 text-base font-extrabold text-[#0a0a0c]">
                    <span className="w-2 h-2 rounded-none bg-[#52525b]" />
                    <span>Education</span>
                  </div>
                  <div className="col-span-8 space-y-2 text-base font-bold text-[#0a0a0c] tracking-tight">
                    <div>
                      <div>B.S. in Software Engineering</div>
                      <div className="text-xs font-mono text-neutral-600 font-medium">
                        HUTECH University · 2022-2026 · GPA 3.24 / 4.0 · English B1
                      </div>
                    </div>
                    <div className="pt-1">
                      <div className="text-sm font-extrabold text-black">IT Got Talent 2025 Semifinalist</div>
                      <div className="text-xs font-mono text-neutral-600 font-medium">
                        Top Technical Talent Recognition · Academic Excellence Scholarship
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Section 4: Principles */}
                <motion.div {...getRevealProps(0.66)} className="border-t-2 border-black/[0.08] pt-7 grid grid-cols-12 gap-6 items-baseline">
                  <div className="col-span-4 flex items-center gap-2.5 text-base font-extrabold text-[#0a0a0c]">
                    <span className="w-2 h-2 rounded-none bg-[#52525b]" />
                    <span>Principles</span>
                  </div>
                  <div className="col-span-8 space-y-1.5 text-base font-bold text-[#0a0a0c] tracking-tight">
                    <div>Infrastructure as Code (Declarative Everything)</div>
                    <div>Continuous Observability & Automated SLOs</div>
                    <div>Zero-Trust Security by Default</div>
                    <div>Repeatability over Manual Clicks</div>
                  </div>
                </motion.div>
              </div>

              {/* Footer Direct Contact Links with Forward Wipe & High Contrast */}
              <motion.div
                {...getRevealProps(0.72)}
                className="border-t-2 border-black/[0.08] pt-8 mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono font-bold"
              >
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[#0a0a0c] font-extrabold hover:underline underline-offset-4"
                  style={{ color: "#0a0a0c" }}
                >
                  ↳ {profile.email}
                </a>
                <div className="flex flex-wrap items-center gap-2 text-[#0a0a0c] font-bold">
                  <WipeButton
                    as="a"
                    href="/NguyenBinhMinh-DevOpsEngineer-2026.pdf"
                    target="_blank"
                    rel="noreferrer"
                    download="NguyenBinhMinh-DevOpsEngineer-2026.pdf"
                    wipeColor="#0a0a0c"
                    textColor="#0a0a0c"
                    hoverTextColor="#ffffff"
                    borderColor="rgba(0, 0, 0, 0.15)"
                    hoverBorderColor="#0a0a0c"
                    className="px-3 py-1.5 rounded-none bg-black/[0.05] flex items-center gap-1 text-xs font-mono font-bold cursor-pointer select-none border border-black/15 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CV (PDF)</span>
                  </WipeButton>
                  <WipeButton
                    as="a"
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    wipeColor="#0a0a0c"
                    textColor="#0a0a0c"
                    hoverTextColor="#ffffff"
                    borderColor="rgba(0, 0, 0, 0.15)"
                    hoverBorderColor="#0a0a0c"
                    className="px-3.5 py-1.5 rounded-none bg-black/[0.05] flex items-center gap-1 text-xs font-mono font-bold cursor-pointer select-none border border-black/15 shadow-sm"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </WipeButton>
                  <WipeButton
                    as="a"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    wipeColor="#0a0a0c"
                    textColor="#0a0a0c"
                    hoverTextColor="#ffffff"
                    borderColor="rgba(0, 0, 0, 0.15)"
                    hoverBorderColor="#0a0a0c"
                    className="px-3.5 py-1.5 rounded-none bg-black/[0.05] flex items-center gap-1 text-xs font-mono font-bold cursor-pointer select-none border border-black/15 shadow-sm"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </WipeButton>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
