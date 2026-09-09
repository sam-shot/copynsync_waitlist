"use client";

import { useState, useRef, useEffect } from "react";
import CTA from "@/components/cta";
import Form, { FormErrors } from "@/components/form";
import Footer from "@/components/footer";
import Particles from "@/components/ui/particles";
import Header from "@/components/header";
import SuccessDialog from "@/components/success-dialog";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [joinWhatsApp, setJoinWhatsApp] = useState<boolean>(true);
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [scrollY, setScrollY] = useState<number>(0);
  const [headerIconVisible, setHeaderIconVisible] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Muse AI style Success Dialog state
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

  // Completely prevent pinch-zoom and gesture-zoom on mobile devices
  useEffect(() => {
    const preventZoom = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("gesturestart", preventZoom);
    document.addEventListener("gesturechange", preventZoom);
    document.addEventListener("gestureend", preventZoom);

    return () => {
      document.removeEventListener("gesturestart", preventZoom);
      document.removeEventListener("gesturechange", preventZoom);
      document.removeEventListener("gestureend", preventZoom);
    };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setScrollY(scrollTop);

    const heroIcon = document.getElementById("hero-app-icon");
    if (heroIcon) {
      const rect = heroIcon.getBoundingClientRect();
      // Show navbar icon ONLY when the hero icon has completely entered under the 60px navbar
      setHeaderIconVisible(rect.bottom <= 60);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleWhatsAppChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWhatsappNumber(event.target.value);
    if (errors.whatsappNumber) {
      setErrors((prev) => ({ ...prev, whatsappNumber: undefined }));
    }
  };

  const togglePlatform = (id: string) => {
    setPlatforms((prev) => {
      const next = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
      if (next.length > 0 && errors.platforms) {
        setErrors((e) => ({ ...e, platforms: undefined }));
      }
      return next;
    });
  };

  const isValidEmail = (emailStr: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr.trim());
  };

  const handleSubmit = async () => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (platforms.length === 0) {
      newErrors.platforms = "Please select at least one platform to test";
    }

    if (joinWhatsApp && !whatsappNumber.trim()) {
      newErrors.whatsappNumber = "Please enter your WhatsApp phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // Simulate network wait / API submission
      await new Promise((r) => setTimeout(r, 800));

      // Launch Muse AI celebration dialog
      setSuccessDialogOpen(true);

      // Reset form fields
      setName("");
      setEmail("");
      setWhatsappNumber("");
    } catch {
      // If server error occurs
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("apply-form");
    const container = scrollContainerRef.current;
    if (!formElement || !container) return;

    const targetY = formElement.offsetTop;
    const startY = container.scrollTop;
    const distance = targetY - startY;
    const duration = 750; // 750ms luxurious easing
    let startTime: number | null = null;

    const step = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeInOutCubic easing curve
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      container.scrollTop = startY + distance * ease;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <main className="fixed inset-0 h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-[#181819] text-white">
      <Header scrolled={headerIconVisible} />

      {/* Internal 100dvh Scroll Container: Browser window never scrolls, so address bar never hides or causes jumping */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden"
        style={{ WebkitOverflowScrolling: "touch" }}>
        {/* Hero Stage: 100dvh Viewport with App Icon, Title, Subtitle, and Apply Button */}
        <CTA scrolled={scrollY > 15} onApplyClick={scrollToForm} />

        {/* Next Section: Application Form - Title sits directly below navbar */}
        <section
          id="apply-form"
          className="flex min-h-[100dvh] md:min-h-0 w-full flex-col items-center px-5 sm:px-6 lg:px-8 pt-[76px] pb-12 md:pb-16">
          <div className="w-full max-w-4xl flex flex-col items-center">
            <Form
              name={name}
              email={email}
              platforms={platforms}
              togglePlatform={togglePlatform}
              joinWhatsApp={joinWhatsApp}
              setJoinWhatsApp={setJoinWhatsApp}
              whatsappNumber={whatsappNumber}
              handleWhatsAppChange={handleWhatsAppChange}
              handleNameChange={handleNameChange}
              handleEmailChange={handleEmailChange}
              handleSubmit={handleSubmit}
              loading={loading}
              errors={errors}
            />
          </div>
        </section>

        <Footer />
      </div>

      {/* Muse AI Style Success Modal with Confetti */}
      <SuccessDialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
      />

      <Particles
        quantityDesktop={80}
        quantityMobile={30}
        ease={80}
        color={"#8f9296"}
        refresh
      />
    </main>
  );
}
