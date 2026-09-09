"use client";

import ParticleWordmark from "@/components/ui/particle-wordmark";

export default function ParticleWordmarkDemo() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0c0c0d] p-10">
      <ParticleWordmark
        mode="dark"
        className="w-full max-w-3xl rounded-lg"
        style={{ aspectRatio: "16 / 3" }}
      />
    </div>
  );
}
