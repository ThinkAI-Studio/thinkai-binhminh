"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Copy,
  Check,
  GraduationCap,
  Award,
  Sparkles,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import { projects, profile } from "@/data/portfolio";
import { ThreeHalftoneCanvas } from "@/components/tai-ui/ThreeHalftoneCanvas";
import { TaiHeader } from "@/components/tai-ui/TaiHeader";
import { MaskedTextReveal } from "@/components/tai-ui/MaskedTextReveal";
import { TextRoll } from "@/components/tai-ui/TextRoll";
import { ButtonTextRoll } from "@/components/tai-ui/ButtonTextRoll";
import { ProductMockup } from "@/components/tai-ui/ProductMockup";
import { ParallaxProductCover } from "@/components/tai-ui/ParallaxProductCover";
import { ArchitectureModal } from "@/components/tai-ui/ArchitectureModal";
import { AboutDrawer } from "@/components/tai-ui/AboutDrawer";
import { ContactModal } from "@/components/tai-ui/ContactModal";
import { ArrowRoll } from "@/components/tai-ui/ArrowRoll";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { SmoothScroll } from "@/components/tai-ui/SmoothScroll";
import { WipeButton } from "@/components/tai-ui/WipeButton";
import {
  OpenAiIcon,
  GeminiIcon,
  ClaudeIcon,
  PerplexityIcon,
  ManusIcon,
} from "@/components/tai-ui/AiBrandIcons";
import "./studio.css";

const CHAPTER_SLIDES = [
  {
    tag: "01/03",
    title: "CLI & REPEATABILITY",
    desc: "Every application and infrastructure configuration is provisioned predictably through CLI and GitOps automation, with zero unreproducible manual clicks.",
  },
  {
    tag: "02/03",
    title: "GITOPS & ZERO-TRUST",
    desc: "Continuous reconciliation with Argo CD, rootless Podman execution, and strict Zero-Trust Tailscale mesh networking for all interconnected host nodes.",
  },
  {
    tag: "03/03",
    title: "OBSERVABILITY & RECOVERY",
    desc: "Real-time metrics, automated SLO tracking, instant alerting with n8n webhooks, and sub-second automated recovery baselines.",
  },
];

const AI_RESEARCH_PROMPT = `Please analyze and summarize the background, engineering skills, and portfolio of Binh Minh (Nguyen Binh Minh), a DevOps & Systems Engineer based in Vietnam and the creator of ThinkAI Studio.

Key information & resources:
- Portfolio & Studio: https://binhminh.thinkai.id.vn
- GitHub: https://github.com/bnhminh1010
- Key Production Projects & Systems:
  1. HostDeck Bare-Metal Console (https://hostdeck.thinkai.id.vn) - Homelab multi-node observability, rootless Podman container orchestration, automated backups, and 1-line CLI installer.
  2. ThinkAI Delivery Platform (https://learning.thinkai.id.vn) - Continuous GitOps CI/CD delivery platform with Argo CD, Tailscale Zero-Trust mesh networking, and automated recovery baselines.
  3. Enterprise SAST Quality Gates & Security Hardening (Healthcare Web & API Infrastructure at Ho Chi Minh City Oncology Hospital with SonarQube & CodeQL).
- Core Technical Stack: Go, Kubernetes (K3s), Linux Administration, Docker, Podman, Argo CD, SonarQube SAST Security Gates, PostgreSQL, Tailscale Zero-Trust, Next.js.
- Academic Background & Honors: Bachelor of Software Engineering from HUTECH University (GPA 3.24/4.0), IT Got Talent 2025 Semifinalist, Academic Excellence Scholarship.

Provide a comprehensive technical assessment of his architectural expertise, DevOps & systems engineering capabilities, and craft web delivery standards.`;

const AI_PLATFORMS = [
  {
    name: "ChatGPT",
    icon: OpenAiIcon,
    url: `https://chatgpt.com/?q=${encodeURIComponent(AI_RESEARCH_PROMPT)}`,
  },
  {
    name: "Gemini",
    icon: GeminiIcon,
    url: `https://gemini.google.com/app?prompt=${encodeURIComponent(AI_RESEARCH_PROMPT)}`,
  },
  {
    name: "Claude",
    icon: ClaudeIcon,
    url: `https://claude.ai/new?q=${encodeURIComponent(AI_RESEARCH_PROMPT)}`,
  },
  {
    name: "Perplexity",
    icon: PerplexityIcon,
    url: `https://www.perplexity.ai/search?q=${encodeURIComponent(AI_RESEARCH_PROMPT)}`,
  },
  {
    name: "Manus",
    icon: ManusIcon,
    url: `https://manus.im/?q=${encodeURIComponent(AI_RESEARCH_PROMPT)}`,
  },
];

export default function PortfolioPage() {
  const [lang, setLang] = useState<"vi" | "en">("en");
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedCli, setCopiedCli] = useState<string | null>(null);
  const [liveTime, setLiveTime] = useState<string>("");
  const [liveDate, setLiveDate] = useState<string>("");

  // Set Browser Title to ThinkAI Studio
  useEffect(() => {
    document.title = "ThinkAI Studio";
  }, []);

  const [selectedArchProject, setSelectedArchProject] = useState<"thinkai-ui" | "homelab" | "thinkai" | null>(null);

  // Chapter 01 Carousel State & Progress Bar
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  // Bottom Ocean Interactive "Hold to create waves" State
  const [isOceanHovered, setIsOceanHovered] = useState(false);
  const [isOceanHolding, setIsOceanHolding] = useState(false);
  const [isEquilibrium, setIsEquilibrium] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const oceanZoneRef = useRef<HTMLDivElement>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCli(cmd);
    setTimeout(() => setCopiedCli(null), 2000);
  };

  // Auto-advancing Carousel with Progress Bar Timer
  useEffect(() => {
    const duration = 5000;
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSlide((curr) => (curr + 1) % CHAPTER_SLIDES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeSlide]);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + CHAPTER_SLIDES.length) % CHAPTER_SLIDES.length);
    setProgress(0);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % CHAPTER_SLIDES.length);
    setProgress(0);
  };

  // Update Vietnam Live Time & Date (Asia/Ho_Chi_Minh)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setLiveDate(
        now
          .toLocaleDateString("en-US", {
            timeZone: "Asia/Ho_Chi_Minh",
            weekday: "short",
            month: "short",
            day: "2-digit",
          })
          .toUpperCase()
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // ─── BOTTOM OCEAN INTERACTIVE HOLD LOGIC ───
  const updateStirBridge = useCallback((stir: number, clientX?: number, clientY?: number) => {
    const bridge = (window as unknown as { __setOceanStir?: (s: number, x?: number, y?: number) => void }).__setOceanStir;
    if (bridge) {
      if (typeof clientX === "number" && typeof clientY === "number") {
        const nx = clientX / window.innerWidth;
        const ny = clientY / window.innerHeight;
        bridge(stir, nx, ny);
      } else {
        bridge(stir);
      }
    }
  }, []);

  const handleOceanMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    if (isOceanHolding) {
      updateStirBridge(0.75, e.clientX, e.clientY);
    }
  };

  const startHolding = (clientX: number, clientY: number) => {
    setIsOceanHolding(true);
    setIsEquilibrium(false);
    setCursorPos({ x: clientX, y: clientY });
    updateStirBridge(0.25, clientX, clientY);

    let p = 0;
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    holdTimerRef.current = setInterval(() => {
      p += 3;
      if (p >= 100) {
        p = 100;
        setIsEquilibrium(true);
        updateStirBridge(0.85, clientX, clientY);
      } else {
        updateStirBridge(0.25 + (p / 100) * 0.5, clientX, clientY);
      }
      setHoldProgress(p);
    }, 30);
  };

  const stopHolding = () => {
    setIsOceanHolding(false);
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    updateStirBridge(0.0);
    setTimeout(() => {
      setHoldProgress(0);
      setIsEquilibrium(false);
    }, 900);
  };

  return (
    <div className="tai-studio-root selection:bg-white selection:text-black relative min-h-screen">
      {/* ─── 120HZ ULTRA-SMOOTH MOMENTUM SCROLLING ENGINE (LENIS) ─── */}
      <SmoothScroll isLocked={isAboutOpen || isContactOpen} />

      {/* ─── UNIFIED GLOBAL THREE.JS CANVAS FIXED BACKGROUND (Venice Adriatic Caustics) ─── */}
      <ThreeHalftoneCanvas />

      {/* ─── 01. AUTHENTIC TRANSPARENT HEADER ─── */}
      <TaiHeader
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* ─── 02. HERO SECTION (High-Contrast View-Only Window Over Ocean Canvas) ─── */}
      <section
        id="top"
        className="relative z-10 min-h-screen h-screen min-h-[100dvh] flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 bg-transparent pointer-events-none"
      >
        {/* Subtle Atmospheric Radial Spotlight for High-Contrast Hero Separation */}
        <div className="absolute inset-0 max-w-5xl mx-auto -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(4,6,10,0.68)_0%,rgba(4,6,10,0.32)_50%,transparent_78%)] blur-2xl" />

        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-7 pointer-events-auto relative z-10">
          {/* ThinkAI Authentic Floating Eyebrow */}
          <div className="text-xs sm:text-[13.5px] font-mono font-bold tracking-[0.24em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] uppercase select-none">
            A SYSTEMS STUDIO
          </div>

          {/* ThinkAI Grotesque Masked Headline with High-Contrast Optical Shadow */}
          <div className="py-1 sm:py-2">
            <MaskedTextReveal
              as="h1"
              text={"RELIABLE\nDELIVERY"}
              className="tai-heading-hero text-white tracking-[-0.026em] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_12px_36px_rgba(0,0,0,0.90)] drop-shadow-[0_24px_64px_rgba(0,0,0,0.80)]"
            />
          </div>

          {/* ThinkAI Floating Subline */}
          <div className="text-xs sm:text-[13.5px] font-mono font-medium tracking-[0.20em] text-neutral-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] uppercase max-w-2xl mx-auto leading-relaxed select-none px-4">
            INFRASTRUCTURE AS CODE · GITOPS PLATFORMS · CRAFT WEB SYSTEMS
          </div>
        </div>
      </section>

      {/* ─── 03. TRANSITION SHEET & INTERACTIVE CHAPTER 01 CAROUSEL (Edge-to-Edge Wide) ─── */}
      <section className="relative z-20 bg-[#121215] py-28 sm:py-36 border-t border-white/[0.08] shadow-2xl">
        <div className="max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Col (1-4): Carousel Controls with Directional Forward Wipe */}
            <div className="lg:col-span-4 space-y-6">
              {/* Header with Navigation Arrows & Tag */}
              <div className="flex items-center justify-between text-neutral-400 text-sm font-mono pb-3 border-b border-white/[0.08] relative">
                <div className="flex items-center gap-2">
                  <WipeButton
                    onClick={handlePrevSlide}
                    className="w-8 h-8 rounded-none flex items-center justify-center cursor-pointer text-sm font-mono"
                    wipeColor="#ffffff"
                    textColor="#ffffff"
                    hoverTextColor="#05070a"
                    ariaLabel="Previous slide"
                  >
                    ←
                  </WipeButton>
                  <WipeButton
                    onClick={handleNextSlide}
                    className="w-8 h-8 rounded-none flex items-center justify-center cursor-pointer text-sm font-mono"
                    wipeColor="#ffffff"
                    textColor="#ffffff"
                    hoverTextColor="#05070a"
                    ariaLabel="Next slide"
                  >
                    →
                  </WipeButton>
                </div>
                <div className="px-2.5 py-1 rounded-none bg-white/[0.06] text-xs font-mono font-bold text-neutral-200">
                  {CHAPTER_SLIDES[activeSlide].tag}
                </div>

                {/* Working Progress Bar */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Animated Carousel Slide Content */}
              <div className="min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                      {CHAPTER_SLIDES[activeSlide].title}
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                      {CHAPTER_SLIDES[activeSlide].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Col (5-12): Massive Editorial Headline & Narrative */}
            <div className="lg:col-span-8 space-y-8">
              <h3 className="text-2xl sm:text-4xl lg:text-6xl font-medium tracking-tight text-white leading-[1.16]">
                I build delivery systems that are easier to ship, operate and recover, spanning self-hosted
                homelabs, GitOps CI/CD pipelines, and high-performance web platforms. Every release is
                repeatable, observable, and fully under your control.
              </h3>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light max-w-4xl">
                Software Engineering graduate from HUTECH University (GPA 3.24/4.0), founder of ThinkAI Studio.
                Grounded in real-world DevOps practices: rootless Podman container orchestration, SAST
                security quality gates at Ung Buou Hospital, and zero-trust mesh networking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04. PRODUCT SHOWCASE (Progressive Disclosure Split Grid) ─── */}
      <section id="products" className="relative z-20 bg-[#08080a] py-24 sm:py-32 border-t border-white/[0.08] shadow-2xl">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left 2 Cols: Sticky Section Label */}
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-neutral-200">
                <span className="w-2.5 h-2.5 rounded-none bg-emerald-400" />
                <span className="uppercase tracking-wider">Products</span>
              </div>
              <span className="block text-xs font-mono text-neutral-500 mt-1">
                03 Systems Live
              </span>
            </div>

            {/* Right 10 Cols: Asymmetric Split Grid Collection */}
            <div className="lg:col-span-10 divide-y divide-dotted divide-white/20">
              {projects.map((project, index) => {
                const indexStr = String(index + 1).padStart(2, "0");
                const totalStr = String(projects.length).padStart(2, "0");
                return (
                  <div key={project.id} className="py-14 sm:py-16 first:pt-0 last:pb-0">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      
                      {/* Left: 16:10 Monolithic Media Cover with Scroll Parallax Scrub (Span 7) */}
                      <div className="lg:col-span-7">
                        <ParallaxProductCover
                          image={project.preview.image}
                          title={project.content[lang].title}
                          liveUrl={project.liveUrl}
                          mark={project.mark}
                          status="LIVE"
                          priority={index === 0}
                        />
                      </div>

                      {/* Right: Editorial & Telemetry Column (Span 5) */}
                      <div className="lg:col-span-5 space-y-6">
                        {/* Micrographic Header: [MARK] ─── ● ─── 01/03 */}
                        <div className="flex items-center gap-3 font-mono text-xs">
                          <span className="px-2.5 py-1 rounded-none bg-white/10 text-white border border-white/20 font-bold tracking-wider">
                            {project.mark}
                          </span>
                          <div className="flex-1 flex items-center gap-2">
                            <div className="h-[1px] flex-1 bg-white/25" />
                            <div className="w-1.5 h-1.5 rounded-none bg-emerald-400" />
                            <div className="h-[1px] flex-1 bg-white/25" />
                          </div>
                          <span className="px-2.5 py-1 rounded-none border border-white/20 text-neutral-300 font-mono font-semibold bg-white/[0.04]">
                            {indexStr} / {totalStr}
                          </span>
                        </div>

                        {/* Title & Category Eyebrow */}
                        <div className="space-y-2">
                          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
                            {project.content[lang].title}
                          </h3>
                          <p className="text-xs sm:text-sm font-mono text-neutral-300 uppercase tracking-wider font-semibold">
                            {project.content[lang].category}
                          </p>
                        </div>

                        {/* Punchy 2-line Value Proposition Summary */}
                        <p className="text-neutral-200 text-sm sm:text-base leading-relaxed">
                          {project.content[lang].summary}
                        </p>

                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.stack.map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 rounded-none font-mono text-xs bg-[#141418] text-neutral-200 border border-white/15 hover:border-white/30 transition-colors"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        {/* Telemetry Result Block */}
                        <div className="p-4 rounded-none bg-[#0f0f13] border border-white/15 space-y-3 shadow-inner">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-none bg-white text-black font-mono text-xs font-bold">
                                {project.metric.value}
                              </span>
                              <span className="font-mono text-xs sm:text-sm font-bold text-emerald-400">
                                {project.metric.label[lang].split("•")[0]?.trim()}
                              </span>
                            </div>
                            {project.cliCommand && (
                              <button
                                type="button"
                                onClick={() => handleCopy(project.cliCommand!)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-white/10 hover:bg-white/20 text-neutral-100 hover:text-white border border-white/20 hover:border-white/40 font-mono text-xs font-semibold transition-colors cursor-pointer shrink-0"
                              >
                                {copiedCli === project.cliCommand ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400 font-bold">COPIED</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 text-neutral-300" />
                                    <span>COPY CLI</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                          <p className="font-mono text-xs text-neutral-300 truncate">
                            {project.metric.label[lang]}
                          </p>
                        </div>

                        {/* Dual Action CTAs: Open System + Architecture Deep Dive */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-lg"
                            >
                              <span>{lang === "vi" ? "Mở Hệ Thống" : "Open System"}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => setSelectedArchProject(project.id)}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-[#16161b] hover:bg-[#222228] border border-white/25 hover:border-white/50 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            <span>{lang === "vi" ? "Kiến trúc & Báo cáo" : "Architecture & Case Study"}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 05. EXPERIENCE & SECURITY CREDENTIALS (Edge-to-Edge Wide) ─── */}
      <section id="work" className="relative z-20 bg-[#16161a] py-28 sm:py-36 border-t border-white/[0.08] shadow-2xl">
        <div className="max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 space-y-24">
          {/* Subsection 1: Real Security Experience at Ung Buou Hospital */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-neutral-200">
                <span className="w-2.5 h-2.5 rounded-none bg-neutral-300" />
                <span>Experience</span>
              </div>
            </div>

            <div className="lg:col-span-10 space-y-12">
              <div className="border-t border-white/[0.08] pt-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <span className="tai-label text-neutral-400 font-mono font-bold text-xs">
                      HOSPITAL SAST SECURITY GATES
                    </span>
                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mt-2">
                      Information Security & Operations Intern
                    </h3>
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-neutral-400 shrink-0">
                    Ho Chi Minh City Oncology Hospital · 05/2026 – 07/2026
                  </div>
                </div>

                {/* 3-Pillar Clean Hairline Columns with Scaled Font */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs border-y border-white/[0.08] py-8">
                  <div>
                    <span className="text-neutral-400 font-mono text-xs font-bold uppercase tracking-wider block">
                      PROBLEM
                    </span>
                    <p className="text-sm sm:text-base text-neutral-200 mt-2.5 leading-relaxed font-light">
                      Hospital Web & API systems faced CSRF risks, legacy packages, and lacked automated security gating.
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-mono text-xs font-bold uppercase tracking-wider block">
                      APPROACH
                    </span>
                    <p className="text-sm sm:text-base text-neutral-200 mt-2.5 leading-relaxed font-light">
                      Integrated SAST (SonarQube & CodeQL) into GitHub Actions; resolved vulnerabilities and standardized secure FTP baselines.
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-mono text-xs font-bold uppercase tracking-wider block">
                      OUTCOME
                    </span>
                    <p className="text-sm sm:text-base text-neutral-200 mt-2.5 leading-relaxed font-light">
                      100% of High/Medium SAST vulnerabilities remediated before release; established continuous automated security gates.
                    </p>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[".NET 8", "CodeQL SAST", "SonarQube Gates", "CSRF Remediation", "Package Fixes", "FTP Secure Baseline"].map((tag) => (
                    <span
                      key={tag}
                      className="tai-tag-pill px-3 py-1.5 rounded-none text-xs sm:text-[13px] font-mono cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Subsection 2: Education & Awards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pt-20 border-t border-white/[0.08]">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-neutral-200">
                <span className="w-2.5 h-2.5 rounded-none bg-neutral-300" />
                <span>Education</span>
              </div>
            </div>

            <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Education Block */}
              <div className="border-t border-white/[0.08] pt-8 space-y-5">
                <span className="tai-label text-neutral-400 font-mono font-bold text-xs flex items-center gap-2 tracking-widest">
                  <GraduationCap className="w-4 h-4 text-neutral-400" /> EDUCATION
                </span>
                <div>
                  <h4 className="text-2xl sm:text-4xl lg:text-4xl font-bold text-white tracking-tight">
                    Bachelor of Software Engineering
                  </h4>
                  <div className="text-xs sm:text-sm font-mono text-neutral-400 mt-1.5">
                    HUTECH University · 2022 - 2026
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-white font-mono mt-2.5">
                    GPA: 3.24 / 4.0 · English Proficiency: B1
                  </div>
                </div>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-light">
                  Focused coursework on Cloud Computing, Distributed Systems, Network Security, Linux Administration, and Software Architecture.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["GPA 3.24", "Software Engineering", "HUTECH 2022-2026", "English B1"].map((tag) => (
                    <span
                      key={tag}
                      className="tai-tag-pill px-3 py-1 rounded-none text-xs sm:text-[13px] font-mono cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Awards & Recognition Block */}
              <div className="border-t border-white/[0.08] pt-8 space-y-5">
                <span className="tai-label text-neutral-400 font-mono font-bold text-xs flex items-center gap-2 tracking-widest">
                  <Award className="w-4 h-4 text-neutral-400" /> RECOGNITION
                </span>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-white tracking-tight">
                      IT Got Talent 2025
                    </h4>
                    <div className="text-xs sm:text-sm font-mono text-neutral-400 mt-1">
                      Semifinalist Award · Top Technical Talent Competition
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl sm:text-2xl lg:text-2xl font-bold text-white tracking-tight">
                      Academic Excellence Scholarship
                    </h4>
                    <div className="text-xs sm:text-sm font-mono text-neutral-400 mt-1">
                      HUTECH University · High Academic Achievement
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["IT Got Talent 2025", "Semifinalist", "Academic Scholarship", "DevOps Focus"].map((tag) => (
                    <span
                      key={tag}
                      className="tai-tag-pill px-3 py-1 rounded-none text-xs sm:text-[13px] font-mono cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 06. MODERN TECH STACK (Edge-to-Edge Wide & Enlarged Tiles) ─── */}
      <section id="stack" className="py-28 sm:py-36 relative z-20 bg-[#111113] border-t border-white/[0.08] shadow-2xl">
        <div className="max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16">
          {/* Top Banner Link with Forward Wipe */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-6 sm:pb-8 text-white gap-4 sm:gap-0">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-neutral-400">
              <span className="w-2 h-2 rounded-none bg-neutral-400" />
              <span>CLI</span>
            </div>
            <WipeButton
              as="a"
              href="#products"
              wipeColor="#ffffff"
              textColor="#ffffff"
              hoverTextColor="#05070a"
              className="px-4 sm:px-5 py-2.5 rounded-none flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base font-bold bg-white/[0.05] border border-white/15 cursor-pointer w-full sm:w-auto text-center"
            >
              <span>Browse Architecture Blueprint</span>
              <span className="sm:hidden font-mono text-xs">→</span>
            </WipeButton>
            <div className="hidden sm:block text-2xl font-mono text-neutral-400">(→)</div>
          </div>

          {/* Clean Masked Rolling Headline - Rolls 2 times on hover */}
          <div className="text-center py-6">
            <div className="tai-heading-xl text-white tracking-tighter block leading-[0.88]">
              <div className="overflow-hidden">
                <TextRoll text="MODERN" rolls={2} />
              </div>
              <div className="overflow-hidden mt-1">
                <TextRoll text="TECH STACK" rolls={2} stagger={0.02} />
              </div>
            </div>
          </div>

          {/* Tech Stack Tiles Grid (Enlarged Height & Icons) */}
          <div className="pt-8 space-y-4">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">
              PROFESSIONAL AT
            </div>

            {/* Top 3 Core Foundation Cards */}
            <div className="tai-tech-grid-top">
              <div className="tai-stack-tile-lg group">
                <TechLogo name="Go" className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 transition-colors duration-300" />
              </div>
              <div className="tai-stack-tile-lg group">
                <TechLogo name="Kubernetes" className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 transition-colors duration-300" />
              </div>
              <div className="tai-stack-tile-lg group">
                <TechLogo name="Linux" className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 transition-colors duration-300" />
              </div>
            </div>

            {/* Bottom 8 Tooling Cards (4x2 on Mobile/Tablet, 8x1 on Desktop) */}
            <div className="tai-tech-grid-bottom">
              {[
                { name: "Docker" },
                { name: "Podman" },
                { name: "Tailscale" },
                { name: "GitHub Actions" },
                { name: "Argo CD" },
                { name: "K3s" },
                { name: "PostgreSQL" },
                { name: "SonarQube" },
              ].map((item) => (
                <div key={item.name} className="tai-stack-tile-sm group">
                  <TechLogo name={item.name} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-11 lg:h-11 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 07. CALL TO ACTION CLOSURE ─── */}
      <section id="contact" className="relative z-10 min-h-[92vh] flex items-center justify-center py-28 px-6 bg-transparent pointer-events-none">
        <div className="space-y-10 max-w-5xl text-center flex flex-col items-center justify-center pointer-events-auto">
          {/* Massive Heading */}
          <MaskedTextReveal
            as="h2"
            text={"RELIABLE\nSYSTEMS\nYOU OWN\n→ SHIP"}
            className="tai-heading-xl text-white tracking-tighter drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
          />

          {/* Start a project Button with Forward Directional Wipe, Arrow Roll & Bounce */}
          <div className="pt-6">
            <WipeButton
              onClick={() => setIsContactOpen(true)}
              wipeColor="#05070a"
              textColor="#05070a"
              hoverTextColor="#ffffff"
              borderColor="#ffffff"
              hoverBorderColor="rgba(255, 255, 255, 0.4)"
              className="group h-16 sm:h-20 inline-flex items-center justify-center gap-4 sm:gap-5 px-8 sm:px-12 rounded-none text-xl sm:text-[26px] font-extrabold cursor-pointer shadow-2xl select-none bg-white border border-white active:scale-[0.94] transition-transform duration-150 leading-none"
            >
              <ButtonTextRoll
                text="Start a project"
                className="font-extrabold text-xl sm:text-[26px] tracking-tight leading-none"
              />
              <ArrowRoll size="lg" />
            </WipeButton>
          </div>
        </div>
      </section>

      {/* ─── 08. STUDIO FOOTER & INTERACTIVE OCEAN ZONE (Balanced & Refined Proportion) ─── */}
      <footer className="relative z-20 bg-transparent pt-0 pb-0">
        {/* Upper Footer Sheet */}
        <div className="bg-[#111113] pt-20 sm:pt-24 pb-14 sm:pb-16 border-t border-white/[0.08] shadow-2xl">
          <div className="max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 space-y-14 sm:space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Col 1: Navigation Label */}
              <div className="md:col-span-2 flex items-start gap-2 text-sm font-bold text-neutral-300">
                <span className="w-2.5 h-2.5 rounded-none bg-neutral-400 mt-1" />
                <span>Navigation</span>
              </div>

              {/* Col 2: Vertical Navigation Links with Balanced Scale & Forward Wipe */}
              <div className="md:col-span-4 flex flex-col gap-1.5 font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.0]">
                <WipeButton
                  onClick={() => setIsAboutOpen(true)}
                  wipeColor="#ffffff"
                  textColor="#ffffff"
                  hoverTextColor="#05070a"
                  className="text-left px-3 py-1 -ml-3 rounded-none cursor-pointer w-fit text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans normal-case"
                >
                  About
                </WipeButton>
                <WipeButton
                  as="a"
                  href="#products"
                  wipeColor="#ffffff"
                  textColor="#ffffff"
                  hoverTextColor="#05070a"
                  className="text-left px-3 py-1 -ml-3 rounded-none w-fit text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans normal-case"
                >
                  Products
                </WipeButton>
                <WipeButton
                  as="a"
                  href="#work"
                  wipeColor="#ffffff"
                  textColor="#ffffff"
                  hoverTextColor="#05070a"
                  className="text-left px-3 py-1 -ml-3 rounded-none w-fit text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans normal-case"
                >
                  Work
                </WipeButton>
                <WipeButton
                  as="a"
                  href="#contact"
                  wipeColor="#ffffff"
                  textColor="#ffffff"
                  hoverTextColor="#05070a"
                  className="text-left px-3 py-1 -ml-3 rounded-none w-fit text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans normal-case"
                >
                  Contact
                </WipeButton>
              </div>

              {/* Col 3: Studio Details & AI Glyphs */}
              <div className="md:col-span-3 space-y-8 text-sm">
                <div className="space-y-2">
                  <div className="text-neutral-500 uppercase tracking-widest font-mono text-xs font-bold">
                    (STUDIO DETAILS)
                  </div>
                  <div>
                    <WipeButton
                      as="a"
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      wipeColor="#ffffff"
                      textColor="#ffffff"
                      hoverTextColor="#05070a"
                      className="inline-block px-2.5 py-1 -ml-2.5 rounded-none font-mono font-bold text-sm"
                    >
                      bnhminh1010 / ops ↗
                    </WipeButton>
                  </div>
                  <div>
                    <WipeButton
                      as="a"
                      href={`mailto:${profile.email}`}
                      wipeColor="#ffffff"
                      textColor="#ffffff"
                      hoverTextColor="#05070a"
                      className="inline-block px-2.5 py-1 -ml-2.5 rounded-none font-mono text-sm"
                    >
                      ↳ {profile.email}
                    </WipeButton>
                  </div>
                  <div className="text-neutral-400 leading-relaxed pt-2 text-xs font-light">
                    Based in Vietnam.<br />
                    Remote-first. Working worldwide.
                  </div>
                </div>

                {/* Ask AI Section with Direct Deep-Links to ChatGPT, Gemini, Claude, Perplexity, Manus */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <div className="text-neutral-500 uppercase tracking-widest font-mono text-xs font-bold">
                      (ASK AI ABOUT BINH MINH · THINKAI STUDIO)
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 text-white">
                    {AI_PLATFORMS.map((platform) => {
                      const IconComponent = platform.icon;
                      return (
                        <WipeButton
                          key={platform.name}
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(AI_RESEARCH_PROMPT);
                            }
                            window.open(platform.url, "_blank", "noopener,noreferrer");
                          }}
                          wipeColor="#ffffff"
                          textColor="#ffffff"
                          hoverTextColor="#05070a"
                          ariaLabel={`Ask ${platform.name} about Binh Minh and ThinkAI Studio`}
                          className="w-9 h-9 rounded-none flex items-center justify-center cursor-pointer select-none border border-white/15 bg-white/[0.04] shadow-md"
                        >
                          <IconComponent className="w-4 h-4" />
                        </WipeButton>
                      );
                    })}
                  </div>
                  <div className="text-xs font-mono text-neutral-400 leading-relaxed max-w-xs">
                    Click to query ChatGPT, Gemini, Claude, Perplexity or Manus with engineering background & studio products.
                  </div>
                </div>
              </div>

              {/* Col 4: Socials with Forward Wipe */}
              <div className="md:col-span-3 space-y-2 text-sm font-semibold text-white">
                <div className="text-neutral-500 uppercase tracking-widest font-mono text-xs font-bold mb-3">
                  (CONNECT)
                </div>
                <div>
                  <WipeButton
                    as="a"
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    wipeColor="#ffffff"
                    textColor="#ffffff"
                    hoverTextColor="#05070a"
                    className="inline-block px-2.5 py-1 -ml-2.5 rounded-none text-sm"
                  >
                    GitHub ↗
                  </WipeButton>
                </div>
                <div>
                  <WipeButton
                    as="a"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    wipeColor="#ffffff"
                    textColor="#ffffff"
                    hoverTextColor="#05070a"
                    className="inline-block px-2.5 py-1 -ml-2.5 rounded-none text-sm"
                  >
                    LinkedIn ↗
                  </WipeButton>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-8 sm:pt-10 text-xs font-mono text-neutral-400 border-t border-white/[0.08] gap-4">
              <div>
                Vietnam {liveTime || "02:35:57 PM"} <br />
                {liveDate || "MON, AUG 31"}
              </div>
              <div className="text-center">
                <WipeButton
                  as="a"
                  href="#top"
                  wipeColor="#ffffff"
                  textColor="#ffffff"
                  hoverTextColor="#05070a"
                  className="px-2.5 py-1 rounded-none inline-block text-xs"
                >
                  Back to top ↑
                </WipeButton>{" "}
                <br />
                <span className="text-white mt-0.5 inline-block">Open for DevOps, Systems & Web Engineering</span>
              </div>
              <div className="text-right">
                ©{new Date().getFullYear()} ThinkAI Studio · Binh Minh
              </div>
            </div>
          </div>
        </div>

        {/* ─── 09. FULL-BLEED BOTTOM INTERACTIVE OCEAN WINDOW (Polished Minimalist Design) ─── */}
        <div
          id="interactive-ocean-zone"
          ref={oceanZoneRef}
          onMouseEnter={() => setIsOceanHovered(true)}
          onMouseLeave={() => {
            setIsOceanHovered(false);
            stopHolding();
          }}
          onMouseMove={handleOceanMouseMove}
          onMouseDown={(e) => startHolding(e.clientX, e.clientY)}
          onMouseUp={stopHolding}
          onTouchStart={(e) => {
            if (e.touches[0]) startHolding(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchEnd={stopHolding}
          className="tai-ocean-interactive-zone relative w-full min-h-[13rem] sm:h-72 lg:h-80 bg-transparent border-t border-b border-white/[0.08] flex flex-col sm:flex-row items-center justify-center sm:justify-between px-4 sm:px-12 lg:px-20 xl:px-24 gap-4 py-8 sm:py-0 overflow-hidden"
        >
          {/* Studio Brand Mark & Glyph with Glassmorphic Badge (Click to Reload to Top) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
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
            }}
            className="relative z-10 inline-flex items-center justify-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-none bg-black/50 border border-white/20 backdrop-blur-md text-white font-bold text-xs sm:text-sm tracking-wider uppercase font-mono shadow-2xl pointer-events-auto cursor-pointer hover:bg-black/70 transition-all leading-none shrink-0"
            aria-label="Reload and return to top"
          >
            <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-none overflow-hidden shrink-0 flex items-center justify-center">
              <Image
                src="/images/thinkai_studio_logo.png"
                alt="ThinkAI Studio"
                fill
                sizes="24px"
                className="object-contain"
              />
            </div>
            <span className="whitespace-nowrap inline-flex items-center leading-none select-none text-[11px] sm:text-xs md:text-sm">
              THINKAI STUDIO / BINH MINH
            </span>
          </button>

          <div className="relative z-10 hidden md:inline-flex items-center justify-center px-4 py-2.5 rounded-none bg-black/50 border border-white/20 backdrop-blur-md text-white font-mono text-xs sm:text-sm tracking-wide shadow-2xl leading-none pointer-events-none whitespace-nowrap">
            <span className="leading-none">『Reliable Infrastructure for Production.』</span>
          </div>

          {/* Polished Floating Interactive Hold Pill (ThinkAI Studio) */}
          <AnimatePresence>
            {isOceanHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "fixed",
                  left: cursorPos.x + 18,
                  top: cursorPos.y + 18,
                  zIndex: 9999,
                  pointerEvents: "none",
                }}
                className={`tai-hold-pill ${isOceanHolding ? "is-holding" : ""}`}
              >
                {/* SVG Circular Progress Ring */}
                <svg className="tai-hold-ring" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    strokeWidth="2.5"
                    strokeDasharray={56.54}
                    strokeDashoffset={56.54 - (56.54 * holdProgress) / 100}
                    strokeLinecap="round"
                    className="tai-hold-ring-circle"
                  />
                </svg>

                <span className="flex items-center gap-2 font-mono text-[11px] sm:text-xs">
                  {holdProgress >= 100 || isEquilibrium ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-emerald-300 font-bold tracking-wide">
                        EQUILIBRIUM REACHED · WAVES SURGING
                      </span>
                    </>
                  ) : isOceanHolding ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-white animate-spin shrink-0" />
                      <span>STIRRING OCEAN TIDES {holdProgress}%</span>
                    </>
                  ) : (
                    <span>HOLD TO CREATE WAVES (PRESS & HOLD)</span>
                  )}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </footer>

      {/* ─── 10. ABOUT THE STUDIO DRAWER ─── */}
      <AboutDrawer
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        lang={lang}
      />

      {/* ─── 11. CONTACT & PROJECT INQUIRY MODAL ─── */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* ─── 12. ARCHITECTURE & DEEP DIVE MODAL ─── */}
      <ArchitectureModal
        projectId={selectedArchProject}
        onClose={() => setSelectedArchProject(null)}
        lang={lang}
      />
    </div>
  );
}
