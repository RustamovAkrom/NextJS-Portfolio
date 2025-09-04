import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import LocalFont from "next/font/local";
import { Inter } from "next/font/google";
import "flowbite";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundAnimation from "@/components/BagroundAnimation";


export const metadata = {
  title: "Portfolio - Akrom Rustamov",
  description:
    "My personal portfolio website built with Next.js, showcasing my projects, blog, and skills. Created by Akrom Rustamov.",
  metadataBase: new URL("https://akrom-omega.vercel.app/"),
  openGraph: {
    title: "Akrom Rustamov - Portfolio",
    description:
      "Explore my Next.js portfolio website: projects, blog, dark/light mode, and modern design.",
    url: "https://akrom-omega.vercel.app/",
    siteName: "Akrom Rustamov Portfolio",
    images: [
      {
        url: "/banner.png", // 👈 файл должен быть в /public/banner.png
        width: 1200,
        height: 630,
        alt: "Akrom Rustamov Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akrom Rustamov - Portfolio",
    description:
      "My personal portfolio website built with Next.js, showing my projects, blog, and skills.",
    images: ["/banner.png"],
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