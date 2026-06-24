import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { LayoutShell } from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: "Grace Community Church",
  description: "Welcome to Grace Community Church - A place of worship, love, and community.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
