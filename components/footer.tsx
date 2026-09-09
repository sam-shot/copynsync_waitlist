"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full max-w-4xl mx-auto flex flex-col items-center justify-end text-center mt-12 md:mt-24 pb-10 md:pb-16 px-6 select-none">
      <div className="flex flex-col items-center gap-2.5 sm:gap-3">
        {/* Main Display Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white leading-snug">
          The unified peer-to-peer ecosystem{" "}
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-b from-[#6ca8ff] to-[#256beb] bg-clip-text text-transparent">
            for all your devices.
          </span>
        </h2>

        {/* Comprehensive supporting info text */}
        <p className="max-w-2xl text-sm sm:text-base text-[#8f9296] font-normal leading-relaxed">
          Copynsync connects Android, macOS, Windows, and Linux into a single local workspace. Sync your clipboard instantly, stream files at full router speeds, mirror phone notifications to your desktop, and share your mouse and keyboard across screens, completely private, encrypted, over the Local network.
        </p>

        {/* Built with ❤️ attribution */}
        <div className="pt-5 sm:pt-6">
          <p className="text-xs sm:text-sm text-[#5a5d63]">
            Built with ❤️ by{" "}
            <Link
              href="https://x.com/samshot_01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8f9296] hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white">
              samshot_01
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
