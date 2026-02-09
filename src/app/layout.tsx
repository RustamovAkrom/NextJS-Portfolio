import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.deployed_url),

  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.deployed_url,
    siteName: "Akrom Rustamov Portfolio",
    images: [
      {
        url: "https://akrom-omega.vercel.app/banner.png",
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
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["https://akrom-omega.vercel.app/banner.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-black`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
