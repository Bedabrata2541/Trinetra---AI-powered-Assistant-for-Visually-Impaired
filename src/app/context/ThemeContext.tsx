import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark" | "cool";

interface ThemeContextValue {
  theme: Theme;
  cycleTheme: () => void;
  ttsEnabled: boolean;
  setTtsEnabled: (v: boolean) => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (v: boolean) => void;
  speak: (text: string) => void;
  lastAnnouncement: string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [lastAnnouncement, setLastAnnouncement] = useState("");

  const speak = useCallback(
    (text: string) => {
      setLastAnnouncement(text);
      if (!ttsEnabled) return;
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1;
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);
      }
    },
    [ttsEnabled]
  );

  const cycleTheme = useCallback(() => {
    setThemeState((prev) => {
      const order: Theme[] = ["light", "dark", "cool"];
      const next = order[(order.indexOf(prev) + 1) % order.length];
      const labels: Record<Theme, string> = {
        light: "Light theme activated",
        dark: "Dark theme activated",
        cool: "Cool theme activated",
      };
      setTimeout(() => speak(labels[next]), 50);
      return next;
    });
  }, [speak]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark", "theme-cool");
    root.classList.add(`theme-${theme}`);
    if (theme === "dark" || theme === "cool") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        cycleTheme,
        ttsEnabled,
        setTtsEnabled,
        voiceEnabled,
        setVoiceEnabled,
        speak,
        lastAnnouncement,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}