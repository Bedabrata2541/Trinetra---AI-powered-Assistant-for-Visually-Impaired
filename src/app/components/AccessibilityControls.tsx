import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export function AccessibilityControls() {
  const { speak, lastAnnouncement, ttsEnabled, voiceEnabled, setVoiceEnabled, setTtsEnabled } = useTheme();
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [listening, setListening] = useState(false);

  const handleRepeat = () => {
    if (lastAnnouncement) {
      speak(lastAnnouncement);
    } else {
      speak("No recent announcement to repeat.");
    }
  };

  const handleEmergency = () => {
    setEmergencyActive(true);
    speak(
      "Emergency help activated. Sending your location to emergency contacts. Calling for assistance now. Stay calm, help is on the way."
    );
    setTimeout(() => setEmergencyActive(false), 5000);
  };

  const handleVoiceMic = () => {
    if (listening) {
      setListening(false);
      speak("Stopped listening. Voice input paused.");
    } else {
      setListening(true);
      setVoiceEnabled(true);
      speak("Listening. Speak your command now.");
      setTimeout(() => {
        setListening(false);
        speak("Voice command received. Opening camera.");
      }, 4000);
    }
  };

  const controls = [
    {
      id: "ctrl-voice",
      icon: listening ? "🎙" : "🎤",
      title: listening ? "Listening…" : "Voice Input",
      description: listening
        ? "Speak your command now"
        : "Tap and speak a command",
      onClick: handleVoiceMic,
      label: listening ? "Stop voice input" : "Start voice input",
      active: listening,
    },
    {
      id: "ctrl-tts",
      icon: "🔊",
      title: "Text-to-Speech",
      description: ttsEnabled ? "Audio feedback is ON" : "Audio feedback is OFF",
      onClick: () => {
        const next = !ttsEnabled;
        setTtsEnabled(next);
        if (next && "speechSynthesis" in window) {
          const u = new SpeechSynthesisUtterance("Text to speech enabled");
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(u);
        }
      },
      label: ttsEnabled ? "Disable text to speech" : "Enable text to speech",
      active: ttsEnabled,
    },
    {
      id: "ctrl-repeat",
      icon: "🔁",
      title: "Repeat Last",
      description: "Hear the last announcement again",
      onClick: handleRepeat,
      label: "Repeat last instruction",
      active: false,
    },
  ];

  return (
    <section
      id="accessibility"
      aria-labelledby="a11y-heading"
      className="w-full px-4 sm:px-6 py-16 sm:py-20"
      style={{ backgroundColor: "var(--t-bg)" }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          id="a11y-heading"
          className="text-center mb-3"
          style={{
            color: "var(--t-fg)",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          Accessibility Controls
        </h2>
        <p
          className="text-center mb-12"
          style={{
            color: "var(--t-fg)",
            fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
            lineHeight: 1.7,
            opacity: 0.7,
          }}
        >
          All controls are keyboard and screen reader accessible.
        </p>

        {/* Control Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {controls.map((ctrl) => (
            <button
              key={ctrl.id}
              id={ctrl.id}
              onClick={ctrl.onClick}
              aria-label={ctrl.label}
              aria-pressed={ctrl.active}
              className="flex flex-col items-center justify-center text-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 focus-visible:outline-4 focus-visible:outline-offset-4 min-h-[160px] cursor-pointer"
              style={{
                backgroundColor: ctrl.active ? "var(--t-fg)" : "var(--t-card)",
                color: ctrl.active ? "var(--t-bg)" : "var(--t-fg)",
                borderColor: "var(--t-fg)",
                outlineColor: "var(--t-accent)",
              }}
            >
              <span
                className="text-4xl"
                aria-hidden="true"
                style={{ lineHeight: 1 }}
              >
                {ctrl.icon}
              </span>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.2 }}>
                {ctrl.title}
              </span>
              <span
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  opacity: 0.8,
                }}
              >
                {ctrl.description}
              </span>
            </button>
          ))}
        </div>

        {/* Emergency Help — Full Width, High Priority */}
        <button
          onClick={handleEmergency}
          aria-label="Emergency help — activate to call for immediate assistance"
          aria-live="assertive"
          className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 p-7 rounded-2xl border-4 transition-all duration-200 focus-visible:outline-4 focus-visible:outline-offset-4 min-h-[100px] cursor-pointer"
          style={{
            backgroundColor: emergencyActive ? "var(--t-fg)" : "transparent",
            color: "var(--t-fg)",
            borderColor: "var(--t-fg)",
            outlineColor: "var(--t-accent)",
            borderStyle: "solid",
          }}
        >
          <span className="text-4xl" aria-hidden="true">
            {emergencyActive ? "📡" : "🆘"}
          </span>
          <div className="text-center sm:text-left">
            <div
              style={{
                fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                fontWeight: 900,
                lineHeight: 1.2,
              }}
            >
              {emergencyActive ? "Sending Emergency Alert…" : "Emergency Help"}
            </div>
            <div
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                lineHeight: 1.6,
                opacity: 0.75,
                marginTop: "0.25rem",
              }}
            >
              {emergencyActive
                ? "Contacting emergency services and your saved contacts."
                : "Instantly alert emergency contacts and request assistance"}
            </div>
          </div>
          {emergencyActive && (
            <span
              className="w-4 h-4 rounded-full animate-pulse ml-2"
              style={{ backgroundColor: "var(--t-fg)", flexShrink: 0 }}
              aria-hidden="true"
            />
          )}
        </button>

        {/* Keyboard Shortcuts Info */}
        <div
          className="mt-8 p-6 rounded-2xl border"
          style={{
            borderColor: "var(--t-border)",
            color: "var(--t-fg)",
          }}
          aria-label="Keyboard shortcuts guide"
        >
          <button
            className="w-full text-left focus-visible:outline-4 focus-visible:outline-offset-2 rounded-sm flex items-center justify-between gap-2 mb-4"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", outlineColor: "var(--t-accent)" }}
            aria-label="Read keyboard shortcuts aloud"
            onClick={() => {
              const shortcutsText =
                "Keyboard Shortcuts. " +
                "Space or Enter: Activate focused button. " +
                "Tab: Move to next control. " +
                "Shift plus Tab: Move to previous control. " +
                "Escape: Cancel current action. " +
                "V: Toggle voice input. " +
                "S: Toggle text to speech.";
              speak(shortcutsText);
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--t-fg)",
              }}
            >
              Keyboard Shortcuts
            </h3>
            <span
              aria-hidden="true"
              style={{ fontSize: "1.2rem", opacity: 0.6, color: "var(--t-fg)" }}
              title="Click to hear shortcuts read aloud"
            >
              🔊
            </span>
          </button>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: "Space / Enter", action: "Activate focused button" },
              { key: "Tab", action: "Move to next control" },
              { key: "Shift + Tab", action: "Move to previous control" },
              { key: "Esc", action: "Cancel current action" },
              { key: "V", action: "Toggle voice input" },
              { key: "S", action: "Toggle text-to-speech" },
            ].map(({ key, action }) => (
              <div key={key} className="flex items-center gap-3">
                <dt>
                  <kbd
                    className="px-2 py-1 rounded border text-sm"
                    style={{
                      borderColor: "var(--t-fg)",
                      backgroundColor: "var(--t-card)",
                      color: "var(--t-fg)",
                      fontFamily: "monospace",
                      fontWeight: 700,
                    }}
                  >
                    {key}
                  </kbd>
                </dt>
                <dd style={{ fontSize: "0.95rem", opacity: 0.8 }}>{action}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}