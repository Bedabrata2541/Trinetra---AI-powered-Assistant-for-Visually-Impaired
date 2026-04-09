import React from "react";
import { useTheme } from "../context/ThemeContext";
import logoImg from "../../assets/91a068d1019dac46f1b47403ec1777afef6f822d.png";

export function HeroSection() {
  const { speak } = useTheme();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-24"
      style={{ backgroundColor: "var(--t-bg)" }}
    >
      {/* Logo Image */}
      <div
        className="mb-8 flex items-center justify-center"
        aria-hidden="true"
      >
        <img
          src={logoImg}
          alt=""
          style={{
            width: "clamp(160px, 28vw, 240px)",
            height: "clamp(160px, 28vw, 240px)",
            objectFit: "contain",
            filter: "var(--t-logo-filter)",
            transition: "filter 0.3s ease",
          }}
        />
      </div>

      {/* Main Heading */}
      <h1
        id="hero-heading"
        className="mb-4 tracking-widest uppercase"
        style={{
          color: "var(--t-fg)",
          fontSize: "clamp(2.5rem, 8vw, 6rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: "0.15em",
        }}
      >
        TRINETRA
      </h1>

      {/* Tagline */}
      <p
        className="max-w-2xl mb-3"
        style={{
          color: "var(--t-fg)",
          fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
          lineHeight: 1.7,
          opacity: 0.85,
          fontWeight: 500,
        }}
      >
        The Third Eye — AI Assistance for the Visually Impaired
      </p>

      {/* Sub-description */}
      <p
        className="max-w-xl mb-10"
        style={{
          color: "var(--t-fg)",
          fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
          lineHeight: 1.8,
          opacity: 0.7,
        }}
      >
        AI-powered assistant for visually impaired users with voice guidance,
        object detection, and real-time assistance.
      </p>

      {/* Feature Badges */}
      <div
        className="flex flex-wrap items-center justify-center gap-3 mb-10"
        aria-label="Key features"
      >
        {[
          { icon: "🎙", label: "Voice Commands", href: "#accessibility", tts: "Voice Commands. Tap to explore voice input and text to speech controls." },
          { icon: "📷", label: "Object Detection", href: "#btn-camera", tts: "Object Detection. Tap to open the camera and start detecting objects around you." },
          { icon: "🔊", label: "Text-to-Speech", href: "#accessibility", tts: "Text to Speech. Tap to access audio guidance and speech controls." },
          { icon: "⌚", label: "Wearable Ready", href: "#btn-wearable", tts: "Wearable Ready. Tap to connect your smartwatch or haptic wearable device." },
        ].map(({ icon, label, href, tts }) => (
          <a
            key={label}
            href={href}
            onClick={() => speak(tts)}
            aria-label={`${label} — ${tts}`}
            className="flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-200 focus-visible:outline-4 focus-visible:outline-offset-2 no-underline cursor-pointer"
            style={{
              borderColor: "var(--t-border)",
              color: "var(--t-fg)",
              fontSize: "0.95rem",
              fontWeight: 600,
              outlineColor: "var(--t-accent)",
            }}
          >
            <span aria-hidden="true">{icon}</span>
            {label}
          </a>
        ))}
      </div>

      {/* Hero CTA */}
      <a
        href="#actions"
        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 transition-all duration-200 focus-visible:outline-4 focus-visible:outline-offset-4 min-h-[56px]"
        style={{
          backgroundColor: "var(--t-fg)",
          color: "var(--t-bg)",
          borderColor: "var(--t-fg)",
          outlineColor: "var(--t-accent)",
          fontSize: "1.15rem",
          fontWeight: 700,
        }}
        onClick={() => speak("Getting started. Navigating to main controls.")}
        aria-label="Get started with TRINETRA"
      >
        Get Started
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}