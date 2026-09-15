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
  ArrowUpRight,
} from "lucide-react";
import { projects, profile, copy } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { ThreeHalftoneCanvas } from "@/components/tai-ui/ThreeHalftoneCanvas";
import { TaiHeader } from "@/components/tai-ui/TaiHeader";
import { MaskedTextReveal } from "@/components/tai-ui/MaskedTextReveal";
import { TextRoll } from "@/components/tai-ui/TextRoll";
import { ButtonTextRoll } from "@/components/tai-ui/ButtonTextRoll";
import { ParallaxProductCover } from "@/components/tai-ui/ParallaxProductCover";
import { ArchitectureModal } from "@/components/tai-ui/ArchitectureModal";
import { AboutDrawer } from "@/components/tai-ui/AboutDrawer";
import { ContactModal } from "@/components/tai-ui/ContactModal";
import { ArrowRoll } from "@/components/tai-ui/ArrowRoll";
import { TechLogo } from "@/components/tai-ui/TechLogos";
import { SmoothScroll } from "@/components/tai-ui/SmoothScroll";
import { WipeButton } from "@/components/tai-ui/WipeButton";
import { LanguageTransition } from "@/components/tai-ui/LanguageTransition";
import {
  OpenAiIcon,
  GeminiIcon,
  ClaudeIcon,
  PerplexityIcon,
  ManusIcon,
} from "@/components/tai-ui/AiBrandIcons";
import "./studio.css";

export default function PortfolioPage() {
  const { language } = useLanguage();
  const t = copy[language];
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
          setActiveSlide((curr) => (curr + 1) % t.carousel.slides.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeSlide, t.carousel.slides.length]);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + t.carousel.slides.length) % t.carousel.slides.length);
    setProgress(0);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % t.carousel.slides.length);
    setProgress(0);
  };

  // Update Vietnam Live Time & Date (Asia/Ho_Chi_Minh)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveTime(
        now.toLocaleTimeString(language === "vi" ? "vi-VN" : "en-US", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setLiveDate(
        now
          .toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
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
  }, [language]);

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

  const aiPlatforms = [
    {
      name: "ChatGPT",
      icon: OpenAiIcon,
      url: `https://chatgpt.com/?q=${encodeURIComponent(t.footer.askAiPrompt)}`,
    },
    {
      name: "Gemini",
      icon: GeminiIcon,
      url: `https://gemini.google.com/app?prompt=${encodeURIComponent(t.footer.askAiPrompt)}`,
    },
    {
      name: "Claude",
      icon: ClaudeIcon,
      url: `https://claude.ai/new?q=${encodeURIComponent(t.footer.askAiPrompt)}`,
    },
    {
      name: "Perplexity",
      icon: PerplexityIcon,
      url: `https://www.perplexity.ai/search?q=${encodeURIComponent(t.footer.askAiPrompt)}`,
    },
    {
      name: "Manus",
      icon: ManusIcon,
      url: `https://manus.im/?q=${encodeURIComponent(t.footer.askAiPrompt)}`,
    },
  ];

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
          <LanguageTransition langKey={language} className="text-xs sm:text-[13.5px] font-mono font-bold tracking-[0.24em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] uppercase select-none">
            {t.hero.eyebrow}
          </LanguageTransition>

          {/* ThinkAI Grotesque Masked Headline with High-Contrast Optical Shadow */}
          <LanguageTransition langKey={language} className="py-1 sm:py-2">
            <MaskedTextReveal
              as="h1"
              text={t.hero.headline}
              className="tai-heading-hero text-white tracking-[-0.026em] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_12px_36px_rgba(0,0,0,0.90)] drop-shadow-[0_24px_64px_rgba(0,0,0,0.80)]"
            />
          </LanguageTransition>

          {/* ThinkAI Floating Subline */}
          <LanguageTransition langKey={language} className="text-xs sm:text-[13.5px] font-mono font-medium tracking-[0.20em] text-neutral-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] uppercase max-w-2xl mx-auto leading-relaxed select-none px-4">
            {t.hero.subline}
          </LanguageTransition>
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
                    ariaLabel={t.carousel.prevSlide}
                  >
                    ←
                  </WipeButton>
                  <WipeButton
                    onClick={handleNextSlide}
                    className="w-8 h-8 rounded-none flex items-center justify-center cursor-pointer text-sm font-mono"
                    wipeColor="#ffffff"
                    textColor="#ffffff"
                    hoverTextColor="#05070a"
                    ariaLabel={t.carousel.nextSlide}
                  >
                    →
                  </WipeButton>
                </div>
                <div className="px-2.5 py-1 rounded-none bg-white/[0.06] text-xs font-mono font-bold text-neutral-200">
                  {t.carousel.slides[activeSlide].tag}
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
                    key={`${activeSlide}-${language}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                      {t.carousel.slides[activeSlide].title}
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                      {t.carousel.slides[activeSlide].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Col (5-12): Massive Editorial Headline & Narrative */}
            <div className="lg:col-span-8 space-y-8">
              <LanguageTransition
                langKey={language}
                as="h3"
                className="text-2xl sm:text-4xl lg:text-6xl font-medium tracking-tight text-white leading-[1.16]"
              >
                {t.carousel.narrativeHeadline}
              </LanguageTransition>

              <LanguageTransition
                langKey={language}
                as="p"
                className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light max-w-4xl"
              >
                {t.carousel.narrativeBody}
              </LanguageTransition>
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
                <LanguageTransition langKey={language} as="span" className="uppercase tracking-wider">
                  {t.work.sectionLabel}
                </LanguageTransition>
              </div>
              <LanguageTransition langKey={language} as="span" className="block text-xs font-mono text-neutral-500 mt-1">
                {t.work.systemsLive}
              </LanguageTransition>
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
                          title={project.content[language].title}
                          liveUrl={project.liveUrl}
                          mark={project.mark}
                          status={t.work.statusLive}
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
                        <LanguageTransition langKey={language} className="space-y-2">
                          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
                            {project.content[language].title}
                          </h3>
                          <p className="text-xs sm:text-sm font-mono text-neutral-300 uppercase tracking-wider font-semibold">
                            {project.content[language].category}
                          </p>
                        </LanguageTransition>

                        {/* Punchy 2-line Value Proposition Summary */}
                        <LanguageTransition langKey={language} as="p" className="text-neutral-200 text-sm sm:text-base leading-relaxed">
                          {project.content[language].summary}
                        </LanguageTransition>

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
                                <LanguageTransition langKey={language} as="span">
                                  {project.metric.label[language].split("•")[0]?.trim()}
                                </LanguageTransition>
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
                                    <span className="text-emerald-400 font-bold">{t.work.copied}</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 text-neutral-300" />
                                    <span>{t.work.copyCli}</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                          <p className="font-mono text-xs text-neutral-300 truncate">
                            <LanguageTransition langKey={language} as="span">
                              {project.metric.label[language]}
                            </LanguageTransition>
                          </p>
                        </div>

                        {/* Dual Action CTAs: Open System + Architecture Deep Dive */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-none bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-lg w-full sm:w-auto"
                            >
                              <LanguageTransition langKey={language} as="span">
                                {t.work.openSystem}
                              </LanguageTransition>
                              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => setSelectedArchProject(project.id)}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-none bg-[#16161b] hover:bg-[#222228] border border-white/25 hover:border-white/50 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer w-full sm:w-auto"
                          >
                            <LanguageTransition langKey={language} as="span">
                              {t.work.architecture}
                            </LanguageTransition>
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
                <LanguageTransition langKey={language} as="span">
                  {t.experience.sectionLabel}
                </LanguageTransition>
              </div>
            </div>

            <div className="lg:col-span-10 space-y-12">
              <div className="border-t border-white/[0.08] pt-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <LanguageTransition langKey={language}>
                    <span className="tai-label text-neutral-400 font-mono font-bold text-xs">
                      {t.experience.eyebrow}
                    </span>
                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mt-2">
                      {t.experience.title}
                    </h3>
                  </LanguageTransition>
                  <LanguageTransition langKey={language} as="div" className="text-xs sm:text-sm font-mono text-neutral-400 shrink-0">
                    {t.experience.period}
                  </LanguageTransition>
                </div>

                {/* 3-Pillar Clean Hairline Columns with Scaled Font */}
                <LanguageTransition langKey={language} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs border-y border-white/[0.08] py-8">
                  <div>
                    <span className="text-neutral-400 font-mono text-xs font-bold uppercase tracking-wider block">
                      {t.experience.columns.problemLabel}
                    </span>
                    <p className="text-sm sm:text-base text-neutral-200 mt-2.5 leading-relaxed font-light">
                      {t.experience.columns.problemDesc}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-mono text-xs font-bold uppercase tracking-wider block">
                      {t.experience.columns.approachLabel}
                    </span>
                    <p className="text-sm sm:text-base text-neutral-200 mt-2.5 leading-relaxed font-light">
                      {t.experience.columns.approachDesc}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-mono text-xs font-bold uppercase tracking-wider block">
                      {t.experience.columns.outcomeLabel}
                    </span>
                    <p className="text-sm sm:text-base text-neutral-200 mt-2.5 leading-relaxed font-light">
                      {t.experience.columns.outcomeDesc}
                    </p>
                  </div>
                </LanguageTransition>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {t.experience.tags.map((tag) => (
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
                <LanguageTransition langKey={language} as="span">
                  {t.education.sectionLabel}
                </LanguageTransition>
              </div>
            </div>

            <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Education Block */}
              <LanguageTransition langKey={language} className="border-t border-white/[0.08] pt-8 space-y-5">
                <span className="tai-label text-neutral-400 font-mono font-bold text-xs flex items-center gap-2 tracking-widest">
                  <GraduationCap className="w-4 h-4 text-neutral-400" /> {t.education.eyebrow}
                </span>
                <div>
                  <h4 className="text-2xl sm:text-4xl lg:text-4xl font-bold text-white tracking-tight">
                    {t.education.degree}
                  </h4>
                  <div className="text-xs sm:text-sm font-mono text-neutral-400 mt-1.5">
                    {t.education.school}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-white font-mono mt-2.5">
                    {t.education.gpaText}
                  </div>
                </div>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-light">
                  {t.education.coursework}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {t.education.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tai-tag-pill px-3 py-1 rounded-none text-xs sm:text-[13px] font-mono cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </LanguageTransition>

              {/* Awards & Recognition Block */}
              <LanguageTransition langKey={language} className="border-t border-white/[0.08] pt-8 space-y-5">
                <span className="tai-label text-neutral-400 font-mono font-bold text-xs flex items-center gap-2 tracking-widest">
                  <Award className="w-4 h-4 text-neutral-400" /> {t.education.recognitionEyebrow}
                </span>
                <div className="space-y-6">
                  {t.education.recognitions.map((rec) => (
                    <div key={rec.title}>
                      <h4 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-white tracking-tight">
                        {rec.title}
                      </h4>
                      <div className="text-xs sm:text-sm font-mono text-neutral-400 mt-1">
                        {rec.subtitle}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {t.education.recognitions.flatMap((r) => r.tags).map((tag) => (
                    <span
                      key={tag}
                      className="tai-tag-pill px-3 py-1 rounded-none text-xs sm:text-[13px] font-mono cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </LanguageTransition>
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
              <LanguageTransition langKey={language} as="span">
                {t.stack.cliLabel}
              </LanguageTransition>
            </div>
            <WipeButton
              as="a"
              href="#products"
              wipeColor="#ffffff"
              textColor="#ffffff"
              hoverTextColor="#05070a"
              className="px-4 sm:px-5 py-2.5 rounded-none flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base font-bold bg-white/[0.05] border border-white/15 cursor-pointer w-full sm:w-auto text-center"
            >
              <LanguageTransition langKey={language} as="span">
                {t.stack.browseBlueprint}
              </LanguageTransition>
              <span className="sm:hidden font-mono text-xs">→</span>
            </WipeButton>
            <div className="hidden sm:block text-2xl font-mono text-neutral-400">(→)</div>
          </div>

          {/* Clean Masked Rolling Headline - Rolls 2 times on hover */}
          <LanguageTransition langKey={language} className="text-center py-6">
            <div className="tai-heading-xl text-white tracking-tighter block leading-[0.88]">
              <div className="overflow-hidden">
                <TextRoll key={`line1-${language}`} text={t.stack.modernTechStack.line1} rolls={2} />
              </div>
              <div className="overflow-hidden mt-1">
                <TextRoll key={`line2-${language}`} text={t.stack.modernTechStack.line2} rolls={2} stagger={0.02} />
              </div>
            </div>
          </LanguageTransition>

          {/* Tech Stack Tiles Grid (Enlarged Height & Icons) */}
          <div className="pt-8 space-y-4">
            <LanguageTransition langKey={language} as="div" className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">
              {t.stack.professionalAt}
            </LanguageTransition>

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
          <LanguageTransition langKey={language}>
            <MaskedTextReveal
              as="h2"
              text={t.cta.headline}
              className="tai-heading-xl text-white tracking-tighter drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
            />
          </LanguageTransition>

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
              <LanguageTransition langKey={language} as="span">
                <ButtonTextRoll
                  text={t.cta.startProject}
                  className="font-extrabold text-xl sm:text-[26px] tracking-tight leading-none"
                />
              </LanguageTransition>
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
                <LanguageTransition langKey={language} as="span">
                  {t.footer.navigation}
                </LanguageTransition>
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
                  <LanguageTransition langKey={language} as="span">
                    {t.nav.about}
                  </LanguageTransition>
                </WipeButton>
                <WipeButton
                  as="a"
                  href="#products"
                  wipeColor="#ffffff"
                  textColor="#ffffff"
                  hoverTextColor="#05070a"
                  className="text-left px-3 py-1 -ml-3 rounded-none w-fit text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans normal-case"
                >
                  <LanguageTransition langKey={language} as="span">
                    {t.nav.work}
                  </LanguageTransition>
                </WipeButton>
                <WipeButton
                  as="a"
                  href="#work"
                  wipeColor="#ffffff"
                  textColor="#ffffff"
                  hoverTextColor="#05070a"
                  className="text-left px-3 py-1 -ml-3 rounded-none w-fit text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans normal-case"
                >
                  <LanguageTransition langKey={language} as="span">
                    {t.nav.experience}
                  </LanguageTransition>
                </WipeButton>
                <WipeButton
                  as="a"
                  href="#contact"
                  wipeColor="#ffffff"
                  textColor="#ffffff"
                  hoverTextColor="#05070a"
                  className="text-left px-3 py-1 -ml-3 rounded-none w-fit text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans normal-case"
                >
                  <LanguageTransition langKey={language} as="span">
                    {t.nav.contact}
                  </LanguageTransition>
                </WipeButton>
              </div>

              {/* Col 3: Studio Details & AI Glyphs */}
              <div className="md:col-span-3 space-y-8 text-sm">
                <div className="space-y-2">
                  <LanguageTransition langKey={language} as="div" className="text-neutral-500 uppercase tracking-widest font-mono text-xs font-bold">
                    {t.footer.studioDetails}
                  </LanguageTransition>
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
                  <LanguageTransition langKey={language} as="div" className="text-neutral-400 leading-relaxed pt-2 text-xs font-light">
                    {t.footer.location.based}<br />
                    {t.footer.location.mode}
                  </LanguageTransition>
                </div>

                {/* Ask AI Section with Direct Deep-Links to ChatGPT, Gemini, Claude, Perplexity, Manus */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <LanguageTransition langKey={language} as="div" className="text-neutral-500 uppercase tracking-widest font-mono text-xs font-bold">
                      {t.footer.askAiTitle}
                    </LanguageTransition>
                  </div>
                  <div className="flex items-center gap-2.5 text-white">
                    {aiPlatforms.map((platform) => {
                      const IconComponent = platform.icon;
                      return (
                        <WipeButton
                          key={platform.name}
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(t.footer.askAiPrompt);
                            }
                            window.open(platform.url, "_blank", "noopener,noreferrer");
                          }}
                          wipeColor="#ffffff"
                          textColor="#ffffff"
                          hoverTextColor="#05070a"
                          ariaLabel={t.footer.askAiAria.replace("{name}", platform.name)}
                          className="w-9 h-9 rounded-none flex items-center justify-center cursor-pointer select-none border border-white/15 bg-white/[0.04] shadow-md"
                        >
                          <IconComponent className="w-4 h-4" />
                        </WipeButton>
                      );
                    })}
                  </div>
                  <LanguageTransition langKey={language} as="div" className="text-xs font-mono text-neutral-400 leading-relaxed max-w-xs">
                    {t.footer.askAiHint}
                  </LanguageTransition>
                </div>
              </div>

              {/* Col 4: Socials with Forward Wipe */}
              <div className="md:col-span-3 space-y-2 text-sm font-semibold text-white">
                <LanguageTransition langKey={language} as="div" className="text-neutral-500 uppercase tracking-widest font-mono text-xs font-bold mb-3">
                  {t.footer.connect}
                </LanguageTransition>
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
                {language === "vi" ? "Việt Nam" : "Vietnam"} {liveTime || "02:35:57 PM"} <br />
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
                  <LanguageTransition langKey={language} as="span">
                    {t.footer.backToTop}
                  </LanguageTransition>
                </WipeButton>{" "}
                <br />
                <LanguageTransition langKey={language} as="span" className="text-white mt-0.5 inline-block">
                  {t.footer.availability}
                </LanguageTransition>
              </div>
              <div className="text-right">
                <LanguageTransition langKey={language} as="span">
                  ©{new Date().getFullYear()} {t.footer.copyright}
                </LanguageTransition>
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
            aria-label={t.ocean.reloadAria}
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
            <LanguageTransition langKey={language} as="span" className="leading-none">
              {t.ocean.quote}
            </LanguageTransition>
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
                        {t.ocean.equilibrium}
                      </span>
                    </>
                  ) : isOceanHolding ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-white animate-spin shrink-0" />
                      <span>{t.ocean.stirring} {holdProgress}%</span>
                    </>
                  ) : (
                    <span>{t.ocean.holdPrompt}</span>
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
        lang={language}
      />

      {/* ─── 11. CONTACT & PROJECT INQUIRY MODAL ─── */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        lang={language}
      />

      {/* ─── 12. ARCHITECTURE & DEEP DIVE MODAL ─── */}
      <ArchitectureModal
        projectId={selectedArchProject}
        onClose={() => setSelectedArchProject(null)}
        lang={language}
      />
    </div>
  );
}
