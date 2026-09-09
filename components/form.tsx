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
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
          Apply for Closed Beta Access
        </h2>
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
            placeholder="Samuel Lefto"
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
            placeholder="samuel@example.com"
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
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}>
            Join the Testing Cohort
          </Button>
        </div>
      </form>
    </div>
  );
}
