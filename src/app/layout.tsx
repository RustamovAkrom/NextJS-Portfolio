import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter } from "next/font/google";
import "flowbite";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundAnimation
 from "@/components/BagroundAnimation";

export const metadata = {
  title: "Jarvis Project",
  description: "Smart assistant system project by Akrom.",
  metadataBase: new URL("https://akrom-omega.vercel.app/"),
  openGraph: {
    title: "Jarvis Project",
    description: "Smart assistant system project by Akrom.",
    url: "https://akrom-omega.vercel.app/",
    siteName: "Jarvis Project",
    images: [
      {
        url: "/banner.png", // 👈 загрузи в public/banner.png
        width: 1200,
        height: 630,
        alt: "Jarvis Project Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jarvis Project",
    description: "Smart assistant system project by Akrom.",
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