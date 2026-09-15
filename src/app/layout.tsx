import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const barlowCondensed = localFont({
  src: [
    { path: "./fonts/BarlowCondensed-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/BarlowCondensed-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/BarlowCondensed-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  display: "swap",
  variable: "--font-display-local",
});

const socialImage = "/og-image.png?v=20260901";

export const metadata: Metadata = {
  metadataBase: new URL("https://binhminh.thinkai.id.vn"),
  title: "ThinkAI Studio",
  description: "ThinkAI Studio: Reliable infrastructure as code, rootless container orchestration, and continuous GitOps delivery platforms.",
  icons: {
    icon: [
      { url: "/icon.png?v=20260902", sizes: "512x512", type: "image/png" },
      { url: "/icon.svg?v=20260902", type: "image/svg+xml" },
      { url: "/favicon.ico?v=20260902", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png?v=20260902", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico?v=20260902"],
  },
  openGraph: {
    title: "ThinkAI Studio",
    description: "ThinkAI Studio: Reliable infrastructure as code, rootless container orchestration, and continuous GitOps delivery platforms.",
    url: "/",
    siteName: "ThinkAI Studio",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "ThinkAI Studio: DevOps & Systems Engineer" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThinkAI Studio",
    description: "ThinkAI Studio: Reliable infrastructure as code, rootless container orchestration, and continuous GitOps delivery platforms.",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={barlowCondensed.variable} data-theme="dark" suppressHydrationWarning>
      <body>
        <div className="tai-grain-overlay" aria-hidden="true" />
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
