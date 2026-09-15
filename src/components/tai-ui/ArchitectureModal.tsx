"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ShieldCheck,
  ArrowRight,
  Layers,
  Lock,
  Cpu,
  Activity,
  GitBranch,
  CheckCircle2,
  ExternalLink,
  Code,
  Copy,
  Check,
  FileCode,
} from "lucide-react";
import { projects } from "@/data/portfolio";
import { TaiLogoMark } from "./HalftoneBanner";
import { TAI_EASE } from "@/lib/motion";

interface ArchitectureModalProps {
  projectId: "thinkai-ui" | "homelab" | "thinkai" | null;
  onClose: () => void;
  lang: "en" | "vi";
}

export function ArchitectureModal({ projectId, onClose, lang }: ArchitectureModalProps) {
  const [activeTab, setActiveTab] = useState<"narrative" | "diagram" | "security" | "provenance">("narrative");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "1") {
        setActiveTab("narrative");
      } else if (e.key === "2") {
        setActiveTab("diagram");
      } else if (e.key === "3") {
        setActiveTab("security");
      } else if (e.key === "4") {
        setActiveTab("provenance");
      }
    };
    if (projectId) {
      document.addEventListener("keydown", handleGlobalKeyDown, true);
    }
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown, true);
    };
  }, [projectId, onClose]);

  if (!project) return null;

  const arch = project.architecture;

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <AnimatePresence>
      {projectId && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md cursor-pointer"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 16 }}
            transition={{ duration: 0.25, ease: TAI_EASE.luxury }}
            className="w-full max-w-5xl bg-[#08080a] border border-white/[0.12] rounded-none shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_24px_60px_-15px_rgba(0,0,0,0.98)] overflow-hidden flex flex-col max-h-[92vh] cursor-default"
          >
            {/* ─── MODAL HEADER ─── */}
            <div className="px-5 py-4 bg-[#121216] border-b border-white/[0.1] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <TaiLogoMark className="w-5 h-5 shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {project.content[lang].title}
                    </h3>
                    {arch?.specId && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{arch.specId}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 font-mono truncate mt-0.5">
                    {project.content[lang].category} · {project.period}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {/* Minimalist Navigation Tabs */}
                <div className="flex items-center bg-black/70 p-1 rounded-none border border-white/[0.1] text-xs font-mono">
                  <button
                    onClick={() => setActiveTab("narrative")}
                    className={`px-3 py-1.5 rounded-none transition-all ${
                      activeTab === "narrative"
                        ? "bg-white text-black font-bold shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {lang === "vi" ? "Báo cáo giải pháp" : "Case Study"}
                  </button>
                  <button
                    onClick={() => setActiveTab("diagram")}
                    className={`px-3 py-1.5 rounded-none transition-all ${
                      activeTab === "diagram"
                        ? "bg-white text-black font-bold shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {lang === "vi" ? "Kiến trúc luồng" : "Architecture"}
                  </button>
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`px-3 py-1.5 rounded-none transition-all ${
                      activeTab === "security"
                        ? "bg-white text-black font-bold shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {lang === "vi" ? "Bảo mật & QA" : "Security"}
                  </button>
                  <button
                    onClick={() => setActiveTab("provenance")}
                    className={`px-3 py-1.5 rounded-none transition-all ${
                      activeTab === "provenance"
                        ? "bg-white text-black font-bold shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {lang === "vi" ? "Bằng chứng Git" : "Claims"}
                  </button>
                </div>

                <button
                  data-testid="arch-close-button"
                  onClick={onClose}
                  aria-label="Close Architecture Modal"
                  className="p-1.5 rounded-none bg-white/[0.05] hover:bg-white/[0.15] text-neutral-400 hover:text-white transition-colors cursor-pointer border border-white/[0.08]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* ─── TAB 1: NARRATIVE (CHALLENGE, APPROACH, OUTCOME) ─── */}
              {activeTab === "narrative" && (
                <div className="space-y-6">
                  {/* Top Metadata Strip */}
                  {arch && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 bg-[#101014] border border-white/[0.08] text-[11px] font-mono">
                      <div className="text-neutral-300">
                        <span className="text-neutral-400 block font-semibold mb-0.5">
                          {lang === "vi" ? "Ràng buộc hệ thống" : "System Constraint"}
                        </span>
                        <span>{arch.constraint[lang]}</span>
                      </div>
                      <div className="text-neutral-300">
                        <span className="text-neutral-400 block font-semibold mb-0.5">
                          {lang === "vi" ? "Cơ chế kiến trúc" : "Core Mechanism"}
                        </span>
                        <span>{arch.mechanism[lang]}</span>
                      </div>
                      <div className="text-neutral-300">
                        <span className="text-neutral-400 block font-semibold mb-0.5">
                          {lang === "vi" ? "Tiêu chuẩn nghiệm thu" : "Quality Standard"}
                        </span>
                        <span className="text-emerald-400">{arch.standard[lang]}</span>
                      </div>
                    </div>
                  )}

                  {/* 3 Sections: 01. Challenge, 02. Approach, 03. Outcome */}
                  <div className="space-y-4">
                    {/* Section 01: Challenge */}
                    <div className="p-5 bg-[#101014] border border-white/[0.08] rounded-none space-y-2.5 transition-all hover:border-white/[0.18]">
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-none bg-red-400" />
                          <span className="font-mono font-bold text-white text-xs uppercase tracking-wider">
                            {lang === "vi" ? "01. Thách thức kỹ thuật" : "01. The Challenge"}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">
                          {lang === "vi" ? "Bài toán & Rào cản" : "Root Constraint"}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm">
                        {lang === "vi" ? "Bài toán cốt lõi cần giải quyết" : "Core Engineering Problem"}
                      </h4>
                      <p className="text-neutral-300 text-xs leading-relaxed font-light">
                        {project.content[lang].story.problem}
                      </p>
                    </div>

                    {/* Section 02: Approach */}
                    <div className="p-5 bg-[#101014] border border-white/[0.08] rounded-none space-y-2.5 transition-all hover:border-white/[0.18]">
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-none bg-amber-400" />
                          <span className="font-mono font-bold text-white text-xs uppercase tracking-wider">
                            {lang === "vi" ? "02. Giải pháp kiến trúc" : "02. Technical Approach"}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">
                          {lang === "vi" ? "Thiết kế & Triển khai" : "Architectural Strategy"}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm">
                        {lang === "vi" ? "Quyết định và cơ chế kỹ thuật" : "Engineering Decision & Implementation"}
                      </h4>
                      <p className="text-neutral-300 text-xs leading-relaxed font-light">
                        {project.content[lang].story.approach}
                      </p>
                    </div>

                    {/* Section 03: Outcome */}
                    <div className="p-5 bg-[#101014] border border-white/[0.08] rounded-none space-y-2.5 transition-all hover:border-white/[0.18]">
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-none bg-emerald-400" />
                          <span className="font-mono font-bold text-white text-xs uppercase tracking-wider">
                            {lang === "vi" ? "03. Kết quả nghiệm thu" : "03. Delivered Outcome"}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">
                          {lang === "vi" ? "Chỉ số xác thực" : "Verified Telemetry"}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm">
                        {lang === "vi" ? "Giá trị đo lường và nghiệm thu" : "Production Impact & Metrics"}
                      </h4>
                      <p className="text-neutral-300 text-xs leading-relaxed font-light">
                        {project.content[lang].story.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Telemetry Strip */}
                  <div className="p-4 bg-[#0d0d10] border border-white/[0.08] rounded-none flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <span className="text-white font-bold">{project.metric.value}</span>
                      <span className="text-neutral-400">· {project.metric.label[lang]}</span>
                    </div>
                    <div className="text-neutral-400 text-[11px]">
                      {lang === "vi" ? "Đã nghiệm thu trên môi trường Production" : "Verified on Production Environment"}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── TAB 2: DIAGRAM & CONNECTED PIPELINE FLOW ─── */}
              {activeTab === "diagram" && (
                <div className="space-y-6">
                  <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-neutral-300" />
                    <span>
                      {lang === "vi"
                        ? "Sơ đồ luồng phân phối & Kiến trúc hệ thống"
                        : "Connected Architecture & Delivery Flow"}
                    </span>
                  </div>

                  {/* Connected Horizontal Flow Pipeline */}
                  {arch?.flowSteps && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      {arch.flowSteps.map((step, idx) => (
                        <div
                          key={step.step}
                          className="relative p-4 bg-[#101014] border border-white/[0.08] rounded-none space-y-2.5 flex flex-col justify-between group hover:border-white/[0.2] transition-colors"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                              <span className="font-mono text-[11px] font-bold text-white">
                                {lang === "vi" ? `Bước ${step.step}` : `Step ${step.step}`}
                              </span>
                              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-none bg-white/[0.06] border border-white/[0.08] text-neutral-300 uppercase">
                                {step.status}
                              </span>
                            </div>
                            <div className="font-bold text-white font-mono text-xs pt-1">
                              {step.title}
                            </div>
                            <div className="font-mono text-[10px] text-neutral-400">
                              {step.protocol}
                            </div>
                            <p className="text-neutral-300 text-[11px] font-light leading-relaxed pt-1">
                              {step.subtitle[lang]}
                            </p>
                          </div>

                          {idx < arch.flowSteps.length - 1 && (
                            <div className="hidden md:flex items-center justify-center pt-2 text-neutral-500">
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Code Spec Viewer */}
                  {arch?.specSnippet && (
                    <div className="p-4 bg-[#0c0c0f] border border-white/[0.08] rounded-none space-y-3">
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 font-mono text-xs">
                        <div className="flex items-center gap-2 text-neutral-300">
                          <FileCode className="w-3.5 h-3.5 text-neutral-400" />
                          <span className="font-bold text-white">{arch.specSnippet.filename}</span>
                          <span className="text-neutral-500 text-[10px] uppercase">
                            ({arch.specSnippet.language})
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(arch.specSnippet.code)}
                          className="px-2.5 py-1 rounded-none bg-white/[0.06] hover:bg-white/[0.12] text-[11px] font-mono text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer border border-white/[0.08]"
                        >
                          {copiedCode ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">
                                {lang === "vi" ? "Đã chép" : "Copied"}
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{lang === "vi" ? "Sao chép mã" : "Copy spec"}</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-3 bg-black/60 border border-white/[0.04] text-[11px] font-mono text-neutral-300 overflow-x-auto leading-relaxed">
                        <code>{arch.specSnippet.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* ─── TAB 3: SECURITY & QUALITY ASSURANCE ─── */}
              {activeTab === "security" && (
                <div className="space-y-4">
                  <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {lang === "vi"
                        ? "Hồ sơ bảo mật đặc thù & Tiêu chuẩn chất lượng"
                        : "Domain Security Profile & Quality Verification"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {arch?.securityCards.map((card, idx) => {
                      const IconComponent =
                        card.icon === "shield"
                          ? ShieldCheck
                          : card.icon === "lock"
                          ? Lock
                          : card.icon === "check"
                          ? CheckCircle2
                          : card.icon === "code"
                          ? Code
                          : card.icon === "cpu"
                          ? Cpu
                          : GitBranch;

                      return (
                        <div
                          key={idx}
                          className="p-5 bg-[#101014] border border-white/[0.08] rounded-none space-y-3 transition-all hover:border-white/[0.18]"
                        >
                          <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                            <div className="flex items-center gap-2 text-white font-bold font-mono">
                              <IconComponent className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span className="text-xs">{card.title[lang]}</span>
                            </div>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-none bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase">
                              {card.tag}
                            </span>
                          </div>
                          <p className="text-neutral-300 font-light leading-relaxed text-xs">
                            {card.description[lang]}
                          </p>
                          <div className="text-[10px] font-mono text-neutral-400 flex items-center gap-1.5 pt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>
                              {lang === "vi" ? "Trạng thái: Hoạt động & Đã kiểm tra" : "Status: Active & Verified"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ─── TAB 4: CLAIMS & GIT PROVENANCE ─── */}
              {activeTab === "provenance" && (
                <div className="space-y-4">
                  <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                    <GitBranch className="w-3.5 h-3.5 text-neutral-300" />
                    <span>
                      {lang === "vi"
                        ? "Bằng chứng Git & Nhật ký xác thực commit"
                        : "Verifiable Git Provenance & Commit Ledger"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {arch?.provenance.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-[#101014] border border-white/[0.08] rounded-none flex flex-wrap items-center justify-between gap-4 hover:border-white/[0.18] transition-colors"
                      >
                        <div className="space-y-1.5 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap font-mono text-[11px]">
                            <button
                              onClick={() => handleCopyHash(item.hash)}
                              className="px-2 py-0.5 rounded-none bg-white/[0.08] hover:bg-white/[0.16] text-white font-bold flex items-center gap-1 transition-colors cursor-pointer border border-white/[0.1]"
                            >
                              <span>{item.hash}</span>
                              {copiedHash === item.hash ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3 text-neutral-400" />
                              )}
                            </button>
                            <span className="px-2 py-0.5 rounded-none bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
                              branch: {item.branch}
                            </span>
                            {item.verified && (
                              <span className="px-2 py-0.5 rounded-none bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                                {lang === "vi" ? "Đã xác thực" : "Verified"}
                              </span>
                            )}
                          </div>
                          <p className="text-white text-xs font-light leading-relaxed">
                            {item.message[lang]}
                          </p>
                        </div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 rounded-none bg-white/[0.06] hover:bg-white/[0.14] text-xs font-mono text-white flex items-center gap-1.5 transition-colors whitespace-nowrap border border-white/[0.1]"
                        >
                          <span>{lang === "vi" ? "Kiểm tra commit" : "Inspect Diff"}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ─── MODAL FOOTER ─── */}
            <div className="px-5 py-3 bg-[#0d0d10] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-3">
                <span className="truncate max-w-xs sm:max-w-md">{project.repo}</span>
                <span className="hidden sm:inline text-neutral-600">·</span>
                <span className="hidden sm:inline text-[11px] text-neutral-500">
                  {lang === "vi" ? "Nhấn 1-4 để đổi tab · Esc để đóng" : "Keys 1-4: Switch tab · Esc: Close"}
                </span>
              </div>
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:underline flex items-center gap-1 font-semibold"
              >
                <span>{lang === "vi" ? "Mở mã nguồn repository" : "Open repository"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
