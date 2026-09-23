import type { Metadata } from "next";
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import { getSettings } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getSettings();

  const shortName = company.shortName ?? "NEAW";
  const name =
    company.name ?? "Nepal Energy and Water Resources Pvt. Ltd.";
  const tagline =
    company.tagline ?? "Sustainable solutions for a brighter Nepal";

  return {
    title: {
      default: `${shortName} — ${name}`,
      template: `%s — ${shortName}`,
    },
    description: tagline,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <SmoothScroll />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-blue focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        {children}
      </body>
    </html>
  );
}