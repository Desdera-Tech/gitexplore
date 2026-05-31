import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { APP_NAME, BASE_URL } from "@/constants/env";
import { cn } from "@/lib/utils";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import QueryProvider from "@/components/layout/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Discover GitHub repositories, developers, organizations, and trending projects with a fast, developer-focused interface powered by the GitHub API.",
  keywords: [
    "GitHub",
    "GitHub Explorer",
    "Repository Search",
    "Developer Search",
    "Open Source",
    "GitHub API",
    "Trending Repositories",
    "Software Development",
    "Developers",
    "Programming",
  ],
  applicationName: APP_NAME,
  authors: [{ name: "DESDERA TECHNOLOGIES" }],
  creator: "DESDERA TECHNOLOGIES",
  publisher: "DESDERA TECHNOLOGIES",
  metadataBase: new URL(BASE_URL), // replace with your actual domain
  openGraph: {
    title: APP_NAME,
    description:
      "Explore repositories, developers, organizations, and trending projects on GitHub.",
    siteName: APP_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description:
      "Explore repositories, developers, organizations, and trending projects on GitHub.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <body className="min-h-full flex flex-col">
            <Navbar />
            <main className="flex justify-center py-12 px-6 sm:px-10">
              <div className="flex-1 max-w-7xl">{children}</div>
            </main>
            <Footer />
            <Toaster />
          </body>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>
    </html>
  );
}
