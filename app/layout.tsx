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
  themeColor: "#181819",
};

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://copynsync.com";
};

const siteUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Copynsync — Alpha Testing Waitlist",
  description:
    "Join closed alpha testing for Copynsync. Peer-to-peer clipboard sync, router-speed file transfers, notification mirroring, and mouse & keyboard sharing across Android, macOS, Windows, and Linux.",
  applicationName: "Copynsync",
  keywords: [
    "Copynsync",
    "clipboard sync",
    "file transfer",
    "notification mirroring",
    "mouse sharing",
    "cross-platform sync",
    "local network",
    "P2P",
    "Android",
    "macOS",
    "Windows",
    "Linux",
    "alpha testing",
  ],
  authors: [{ name: "Samuel Lefto", url: "https://x.com/samshot_01" }],
  creator: "Samuel Lefto",
  publisher: "Copynsync",
  alternates: {
    canonical: "/alpha-testing",
  },
  icons: {
    icon: [
      { url: "/icons/copynsync-128.png", sizes: "128x128", type: "image/png" },
      { url: "/icons/copynsync-64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/icons/copynsync-128.png", sizes: "128x128", type: "image/png" },
    ],
    shortcut: "/icons/copynsync-128.png",
  },
  openGraph: {
    title: "Copynsync — Alpha Testing Waitlist",
    description:
      "Universal clipboard sync, router-speed file transfers, notification mirroring, and mouse & keyboard sharing across Android, macOS, Windows, and Linux.",
    url: "/alpha-testing",
    siteName: "Copynsync",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Copynsync — Alpha Testing Waitlist",
    description:
      "Universal clipboard sync, router-speed file transfers, notification mirroring, and mouse & keyboard sharing across Android, macOS, Windows, and Linux.",
    creator: "@samshot_01",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="128x128" href="/icons/copynsync-128.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/icons/copynsync-64.png" />
        <link rel="apple-touch-icon" href="/icons/copynsync-128.png" />
      </head>
      <body className={FigtreeFont.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
