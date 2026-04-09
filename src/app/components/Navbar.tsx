import React from "react";
import { useTheme, Theme } from "../context/ThemeContext";
import logoImg from "../../assets/91a068d1019dac46f1b47403ec1777afef6f822d.png";
import { Sun, Moon, Snowflake, Mic, MicOff, Volume2, VolumeX, Download } from "lucide-react";

export function Navbar() {
  const { theme, cycleTheme, ttsEnabled, setTtsEnabled, voiceEnabled, setVoiceEnabled, speak } = useTheme();

  const handleTtsToggle = () => {
    const next = !ttsEnabled;
    setTtsEnabled(next);
    if (next && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance("Text to speech enabled");
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceToggle = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    speak(next ? "Voice input enabled. Speak your command." : "Voice input disabled.");
  };

  const handleDownload = () => {
    speak("Download App. Redirecting to app download page.");
  };

  const themeLabel: Record<Theme, string> = {
    light: "Light",
    dark: "Dark",
    cool: "Cool",
  };

  const ThemeIcon = ({ t }: { t: Theme }) => {
    const size = 18;
    const strokeWidth = 2;
    if (t === "light") return <Sun size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
    if (t === "dark") return <Moon size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
    return <Snowflake size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
  };

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 w-full border-b-2"
      style={{ backgroundColor: "var(--t-bg)", borderColor: "var(--t-border)" }}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4"
      >
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 focus-visible:outline-4 focus-visible:outline-offset-2 rounded-sm"
          style={{ outlineColor: "var(--t-accent)" }}
          aria-label="TRINETRA - Go to home"
          onClick={() => speak("TRINETRA. Home.")}
        >
          <img
            src={logoImg}
            alt="TRINETRA logo — stylised eye symbol"
            style={{
              height: "44px",
              width: "44px",
              objectFit: "contain",
              filter: "var(--t-logo-filter)",
              transition: "filter 0.3s ease",
            }}
          />
          <span
            className="hidden sm:inline text-xl tracking-widest select-none"
            style={{ color: "var(--t-fg)", fontWeight: 800, letterSpacing: "0.18em" }}
          >
            TRINETRA
          </span>
        </a>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-3" role="toolbar" aria-label="Accessibility controls">

          {/* Voice Input */}
          <button
            onClick={handleVoiceToggle}
            aria-pressed={voiceEnabled}
            aria-label={voiceEnabled ? "Disable voice input" : "Enable voice input"}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 transition-all duration-200 focus-visible:outline-4 focus-visible:outline-offset-2 min-h-[44px] min-w-[44px]"
            style={{
              backgroundColor: voiceEnabled ? "var(--t-fg)" : "transparent",
              color: voiceEnabled ? "var(--t-bg)" : "var(--t-fg)",
              borderColor: "var(--t-fg)",
              outlineColor: "var(--t-accent)",
            }}
          >
            {voiceEnabled
              ? <Mic size={18} strokeWidth={2} aria-hidden="true" />
              : <MicOff size={18} strokeWidth={2} aria-hidden="true" />
            }
            <span className="hidden sm:inline text-sm" style={{ fontWeight: 600 }}>
              {voiceEnabled ? "Mic On" : "Mic"}
            </span>
            {voiceEnabled && (
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--t-bg)" }}
                aria-hidden="true"
              />
            )}
          </button>

          {/* TTS Toggle */}
          <button
            onClick={handleTtsToggle}
            aria-pressed={ttsEnabled}
            aria-label={ttsEnabled ? "Disable text to speech" : "Enable text to speech"}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 transition-all duration-200 focus-visible:outline-4 focus-visible:outline-offset-2 min-h-[44px] min-w-[44px]"
            style={{
              backgroundColor: ttsEnabled ? "var(--t-fg)" : "transparent",
              color: ttsEnabled ? "var(--t-bg)" : "var(--t-fg)",
              borderColor: "var(--t-fg)",
              outlineColor: "var(--t-accent)",
            }}
          >
            {ttsEnabled
              ? <Volume2 size={18} strokeWidth={2} aria-hidden="true" />
              : <VolumeX size={18} strokeWidth={2} aria-hidden="true" />
            }
            <span className="hidden sm:inline text-sm" style={{ fontWeight: 600 }}>
              {ttsEnabled ? "TTS On" : "TTS"}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={cycleTheme}
            aria-label={`Switch theme. Current: ${themeLabel[theme]}. Click to change.`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 transition-all duration-200 focus-visible:outline-4 focus-visible:outline-offset-2 min-h-[44px] min-w-[44px]"
            style={{
              backgroundColor: "transparent",
              color: "var(--t-fg)",
              borderColor: "var(--t-fg)",
              outlineColor: "var(--t-accent)",
            }}
          >
            <ThemeIcon t={theme} />
            <span className="hidden sm:inline text-sm" style={{ fontWeight: 600 }}>
              {themeLabel[theme]}
            </span>
          </button>

          {/* Download CTA */}
          <a
            href="#download"
            onClick={handleDownload}
            aria-label="Download TRINETRA App"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 focus-visible:outline-4 focus-visible:outline-offset-2 min-h-[44px] whitespace-nowrap"
            style={{
              backgroundColor: "var(--t-fg)",
              color: "var(--t-bg)",
              outlineColor: "var(--t-accent)",
              fontWeight: 700,
            }}
          >
            <Download size={17} strokeWidth={2.5} aria-hidden="true" />
            <span className="text-sm sm:text-base">Download</span>
          </a>
        </div>
      </nav>
    </header>
  );
}