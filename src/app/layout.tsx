import type { Metadata } from "next";
// import { ThemeProvider } from "next-themes";
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