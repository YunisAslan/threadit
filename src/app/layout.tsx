import { cn } from "@/lib/utils";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threadit",
  description: "A Threads + Reddit clone built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-primary antialiased light", inter.className)}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <Providers>
          <Navbar />

          {modal}

          <main className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
