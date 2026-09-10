"use client";

import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PlatformSelector, { PLATFORMS } from "@/components/platform-selector";
import WhatsAppToggle from "@/components/whatsapp-toggle";

export { PLATFORMS };

export interface FormErrors {
  name?: string;
  email?: string;
  platforms?: string;
  whatsappNumber?: string;
  general?: string;
}

interface FormProps {
  name: string;
  email: string;
  platforms: string[];
  togglePlatform: (id: string) => void;
  joinWhatsApp: boolean;
  setJoinWhatsApp: (join: boolean) => void;
  whatsappNumber: string;
  handleWhatsAppChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  loading: boolean;
  errors: FormErrors;
}

export default function Form({
  name,
  email,
  platforms,
  togglePlatform,
  joinWhatsApp,
  setJoinWhatsApp,
  whatsappNumber,
  handleWhatsAppChange,
  handleNameChange,
  handleEmailChange,
  handleSubmit,
  loading,
  errors,
}: FormProps) {
  return (
    <div className="w-full max-w-xl md:max-w-2xl select-none">
      {/* Section Header */}
      <div className="text-center mb-5 sm:mb-6 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
          Apply for Closed Beta Access
        </h2>
        <p className="mt-2 max-w-xl text-sm sm:text-base text-[#aeb2b8] font-normal leading-relaxed">
          Help us test and refine Copynsync before public release. In exchange for your daily testing and feedback, you&apos;ll receive full Pro privileges.
        </p>
      </div>

      {/* Testing Expectations & Perks - High-Contrast Apple/Muse Style Cards */}
      <div className="mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-left">
        {/* Requirement Card */}
        <div className="bg-[#242528] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between transition-colors duration-200 hover:bg-[#27282c]">
          <div>
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#6ca8ff] mb-2">
              Google Play Requirement
            </span>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white mb-2.5">
              14-Day Daily Testing
            </h3>
            <p className="text-sm sm:text-base text-[#d4d7dc] leading-relaxed">
              Open and test Copynsync daily across your devices for <span className="text-white font-medium">14 continuous days</span> to help us satisfy Google Play closed testing requirements.
            </p>
          </div>
        </div>

        {/* Perks Card */}
        <div className="bg-[#242528] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between transition-colors duration-200 hover:bg-[#27282c]">
          <div>
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#6ca8ff] mb-2">
              Tester Reward
            </span>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white mb-2.5">
              Free Pro Access + License
            </h3>
            <p className="text-sm sm:text-base text-[#d4d7dc] leading-relaxed">
              Enjoy <span className="text-white font-medium">full, unrestricted Pro access</span> throughout the entire testing period, plus a <span className="text-white font-medium">free 1-month Pro license</span> upon public launch.
            </p>
          </div>
        </div>
      </div>


      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        noValidate
        className="flex flex-col gap-6 sm:gap-7">
        {/* Row 1: Name and Email side-by-side with rounded-full pill inputs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <Input
            id="tester-name"
            label="Your Name"
            required
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={handleNameChange}
            autoComplete="name"
            error={errors.name}
          />

          <Input
            id="tester-email"
            label="Email Address"
            required
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={handleEmailChange}
            autoComplete="email"
            inputMode="email"
            error={errors.email}
          />
        </div>

        {/* Row 2: Platform Selection Cards */}
        <PlatformSelector
          selected={platforms}
          onToggle={togglePlatform}
          error={errors.platforms}
        />

        {/* Row 3: WhatsApp Group Row */}
        <WhatsAppToggle
          joinWhatsApp={joinWhatsApp}
          onToggle={setJoinWhatsApp}
          whatsappNumber={whatsappNumber}
          onNumberChange={handleWhatsAppChange}
          error={errors.whatsappNumber}
        />

        {/* Row 4: Submit Pill Button */}
        <div className="pt-2">
          {errors.general && (
            <p
              role="alert"
              className="mb-3 rounded-2xl bg-red-500/10 px-4 py-3 text-center text-xs sm:text-sm text-red-400 font-normal">
              {errors.general}
            </p>
          )}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}>
            Apply for Beta Access
          </Button>
        </div>
      </form>
    </div>
  );
}
