import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://orbisedg.com"),
  title: {
    default: "Orbisedg — Strategy, Creative & Digital Performance",
    template: "%s | Orbisedg",
  },
  description: "Orbisedg is a founder-led digital growth agency in Hyderabad delivering strategy, UI/UX design, web development, SEO, performance marketing, social media, and content.",
  openGraph: {
    title: "Orbisedg — Strategy, Creative & Digital Performance",
    description: "Strategy, design, and execution from the same team. Nothing handed off. Nothing watered down.",
    type: "website",
    images: [{ url: "/images/editorial-home-hero.jpg", width: 1600, height: 1000 }],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
