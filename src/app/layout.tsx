import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter } from "next/font/google";
import "flowbite";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundAnimation
 from "@/components/BagroundAnimation";

export const metadata: Metadata = {
  title: "Portfolio - Akrom Rustamov",
  description: "Akrom Rustamov - Next.JS application",
  keywords: ["Akrom Rustamov", "Portfolio", "Next.JS", "React", "JavaScript", "TypeScript", "Web Developer"],
  authors: [{ name: "Akrom Rustamov", url: "https://akrom-omega.vercel.app" }],
  creator: "Akrom Rustamov",
  openGraph: {
    title: "Portfolio - Akrom Rustamov",
    description: "Akrom Rustamov - Next.JS application",
    url: "https://akrom-omega.vercel.app",
    siteName: "Akrom Rustamov Portfolio",
    images: [
      {
        url: "/image1200-630.png",
        width: 1200,
        height: 630,
        alt: "Akrom Rustamov Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Akrom Rustamov",
    description: "Akrom Rustamov - Next.JS application",
    images: ["https://akrom-omega.vercel.app/image1200-600.png"],
    creator: "@akromrustamov",
  },
  icons: {
    icon: "/web/favicon.ico",
    shortcut: "/web/icons8-96.png",
    apple: "/web/icons8-120.png",
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const inter = Inter({ subsets: ["greek"], display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <BackgroundAnimation>
          <Header />
          <main className="container mx-auto px-4 py-8">
          {children}
          </main>
          </BackgroundAnimation>
          <Footer />
        </ThemeProvider>
       </body>
    </html>
  );
}