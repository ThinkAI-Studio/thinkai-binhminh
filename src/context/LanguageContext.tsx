"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import type { Language } from "@/data/portfolio";

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const storageKey = "portfolio-language";

function detectSystemLanguage(): Language {
  if (typeof navigator === "undefined") return "en";
  const preferred = [
    navigator.language,
    ...(Array.isArray(navigator.languages) ? navigator.languages : []),
  ];
  for (const lang of preferred) {
    if (typeof lang === "string" && lang.toLowerCase().startsWith("vi")) {
      return "vi";
    }
  }
  return "en";
}

function readLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "vi" || saved === "en") {
      return saved;
    }
  } catch {
    // LocalStorage might be unavailable in restricted contexts
  }
  return detectSystemLanguage();
}

function subscribeToLanguage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("portfolio-language-change", onStoreChange);
  window.addEventListener("languagechange", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("portfolio-language-change", onStoreChange);
    window.removeEventListener("languagechange", onStoreChange);
  };
}

function getServerLanguage(): Language {
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const storeLanguage = useSyncExternalStore(subscribeToLanguage, readLanguage, getServerLanguage);

  useEffect(() => {
    setMounted(true);
  }, []);

  const language = mounted ? storeLanguage : "en";

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const setLanguage = (targetLang: Language) => {
    try {
      window.localStorage.setItem(storageKey, targetLang);
    } catch {
      // LocalStorage might be unavailable in restricted contexts
    }
    window.dispatchEvent(new Event("portfolio-language-change"));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage: () => {
          setLanguage(language === "en" ? "vi" : "en");
        },
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
