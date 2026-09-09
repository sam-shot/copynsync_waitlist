import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const FigtreeFont = Figtree({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Copynsync v2 — Testing Waitlist",
  description:
    "Join the 14-day closed testing cohort for Copynsync v2. Cross-platform universal clipboard and input sync for Android and Desktop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <meta property="og:image" content="/opengraph-image.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="832" />
      <meta
        property="og:site_name"
        content="Copynsync — Closed Testing Cohort"
      />
      <meta
        property="og:url"
        content="https://copynsync.com"
      />
      <meta name="twitter:image" content="/twitter-image.png" />
      <meta name="twitter:image:type" content="image/png" />
      <meta name="twitter:image:width" content="1280" />
      <meta name="twitter:image:height" content="832" />
      <body className={FigtreeFont.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
