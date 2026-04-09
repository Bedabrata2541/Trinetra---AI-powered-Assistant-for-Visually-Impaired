import React, { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ActionsSection } from "./components/ActionsSection";
import { AccessibilityControls } from "./components/AccessibilityControls";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import logoImg from "../assets/91a068d1019dac46f1b47403ec1777afef6f822d.png";

function AppContent({ ready }: { ready: boolean }) {
  const { speak, voiceEnabled, ttsEnabled } = useTheme();

  // Set logo as favicon
  useEffect(() => {
    const link: HTMLLinkElement =
      document.querySelector("link[rel~='icon']") ||
      (() => {
        const el = document.createElement("link");
        el.rel = "icon";
        document.head.appendChild(el);
        return el;
      })();
    link.type = "image/png";
    link.href = logoImg;
  }, []);

  // Welcome announcement — fires only after loading screen has exited
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      speak(
        "Welcome to TRINETRA. AI-powered assistant for visually impaired users. Use Tab to navigate, Enter to activate buttons, and voice commands for hands-free control."
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [ready]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "v" || e.key === "V") {
        e.preventDefault();
        document.getElementById("ctrl-voice")?.click();
      }
      if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        document.getElementById("ctrl-tts")?.click();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--t-bg)",
        color: "var(--t-fg)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Skip to main content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Screen reader live region */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col">
        <HeroSection />

        <div className="w-full h-px" style={{ backgroundColor: "var(--t-border)" }} aria-hidden="true" />

        <ActionsSection />

        <div className="w-full h-px" style={{ backgroundColor: "var(--t-border)" }} aria-hidden="true" />

        <AccessibilityControls />

        <div className="w-full h-px" style={{ backgroundColor: "var(--t-border)" }} aria-hidden="true" />

        <AboutSection />

        <div className="w-full h-px" style={{ backgroundColor: "var(--t-border)" }} aria-hidden="true" />

        <ContactSection />
      </main>

      <Footer />

      {/* Voice status badge */}
      {voiceEnabled && (
        <div
          role="status"
          aria-live="assertive"
          className="fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3 rounded-full border-2 shadow-lg z-50"
          style={{
            backgroundColor: "var(--t-fg)",
            color: "var(--t-bg)",
            borderColor: "var(--t-fg)",
          }}
          aria-label="Voice input is active"
        >
          <span
            className="w-3 h-3 rounded-full voice-pulse"
            style={{ backgroundColor: "var(--t-bg)" }}
            aria-hidden="true"
          />
          <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Voice Active</span>
        </div>
      )}

      {/* TTS muted badge */}
      {!ttsEnabled && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-6 flex items-center gap-2 px-4 py-3 rounded-full border-2 z-50"
          style={{
            backgroundColor: "var(--t-card)",
            color: "var(--t-fg)",
            borderColor: "var(--t-fg)",
            fontSize: "0.9rem",
          }}
          aria-label="Text-to-speech is disabled"
        >
          <span aria-hidden="true">🔇</span>
          <span style={{ fontWeight: 600 }}>TTS Off</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [appReady, setAppReady] = useState(false);

  return (
    <>
      {/* Loading screen renders on top (z-9999). App renders behind it instantly. */}
      <LoadingScreen onComplete={() => setAppReady(true)} />

      <ThemeProvider>
        <AppContent ready={appReady} />
      </ThemeProvider>
    </>
  );
}
