import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface ActionCardProps {
  icon: string;
  title: string;
  description: string;
  label: string;
  onClick: () => void;
  primary?: boolean;
  id?: string;
}

function ActionCard({ icon, title, description, label, onClick, primary, id }: ActionCardProps) {
  const { theme } = useTheme();
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed(true);
    onClick();
    setTimeout(() => setPressed(false), 300);
  };

  return (
    <button
      id={id}
      onClick={handleClick}
      aria-label={label}
      aria-pressed={pressed}
      className="w-full flex flex-col items-center justify-center text-center gap-4 p-8 sm:p-10 rounded-2xl border-2 transition-all duration-200 focus-visible:outline-4 focus-visible:outline-offset-4 min-h-[200px] cursor-pointer"
      style={{
        backgroundColor: primary ? "var(--t-fg)" : "var(--t-card)",
        color: primary ? "var(--t-bg)" : "var(--t-fg)",
        borderColor: "var(--t-fg)",
        outlineColor: "var(--t-accent)",
        transform: pressed ? "scale(0.97)" : "scale(1)",
      }}
    >
      <span
        className="text-5xl sm:text-6xl"
        aria-hidden="true"
        style={{ lineHeight: 1 }}
      >
        {icon}
      </span>
      <span
        style={{
          fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
          fontWeight: 800,
          lineHeight: 1.2,
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
          lineHeight: 1.6,
          opacity: 0.8,
          maxWidth: "28ch",
        }}
      >
        {description}
      </span>
    </button>
  );
}

export function ActionsSection() {
  const { speak } = useTheme();
  const [cameraActive, setCameraActive] = useState(false);
  const [wearableStatus, setWearableStatus] = useState<"idle" | "connecting" | "connected">("idle");

  const handleCameraOpen = () => {
    setCameraActive(true);
    speak("Camera opened. Scanning for objects. Point camera at objects to identify them.");
    setTimeout(() => speak("Object detected. Coffee mug at 30 centimeters in front of you."), 3000);
  };

  const handleWearable = () => {
    if (wearableStatus === "idle") {
      setWearableStatus("connecting");
      speak("Connecting to wearable device. Please wait.");
      setTimeout(() => {
        setWearableStatus("connected");
        speak("Wearable device connected successfully. Haptic feedback enabled.");
      }, 2500);
    } else if (wearableStatus === "connected") {
      setWearableStatus("idle");
      speak("Wearable device disconnected.");
    }
  };

  const handleDownload = () => {
    speak("Downloading TRINETRA app. The app provides enhanced offline voice guidance and object detection.");
  };

  return (
    <section
      id="actions"
      aria-labelledby="actions-heading"
      className="w-full px-4 sm:px-6 py-16 sm:py-20"
      style={{ backgroundColor: "var(--t-section-alt)" }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          id="actions-heading"
          className="text-center mb-3"
          style={{
            color: "var(--t-fg)",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          Main Controls
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
          Tap or press Enter to activate any feature below.
        </p>

        {/* Primary Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Open Camera */}
          <ActionCard
            id="btn-camera"
            icon="📸"
            title="Open Camera"
            description={cameraActive ? "Camera is active — detecting objects…" : "Start object detection using your camera"}
            label="Open Camera for object detection"
            onClick={handleCameraOpen}
            primary
          />

          {/* Connect Wearable */}
          <ActionCard
            id="btn-wearable"
            icon={wearableStatus === "connected" ? "✅" : wearableStatus === "connecting" ? "🔄" : "⌚"}
            title={
              wearableStatus === "connected"
                ? "Wearable Connected"
                : wearableStatus === "connecting"
                ? "Connecting…"
                : "Connect Wearable"
            }
            description={
              wearableStatus === "connected"
                ? "Your device is connected. Haptic feedback active."
                : wearableStatus === "connecting"
                ? "Searching for nearby wearable devices…"
                : "Pair with a wearable device for haptic guidance"
            }
            label={
              wearableStatus === "connected"
                ? "Disconnect wearable device"
                : "Connect with wearable device"
            }
            onClick={handleWearable}
          />
        </div>

        {/* Download App Full Width */}
        <div id="download">
          <button
            onClick={handleDownload}
            aria-label="Download TRINETRA app for enhanced offline experience"
            className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 p-8 rounded-2xl border-2 transition-all duration-200 focus-visible:outline-4 focus-visible:outline-offset-4 min-h-[100px] cursor-pointer"
            style={{
              backgroundColor: "var(--t-card)",
              color: "var(--t-fg)",
              borderColor: "var(--t-fg)",
              outlineColor: "var(--t-accent)",
            }}
          >
            <span className="text-4xl" aria-hidden="true">📥</span>
            <div className="text-center sm:text-left">
              <div
                style={{
                  fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                Download App
              </div>
              <div
                style={{
                  fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                  lineHeight: 1.6,
                  opacity: 0.7,
                  marginTop: "0.25rem",
                }}
              >
                Get the full offline experience on iOS & Android
              </div>
            </div>
          </button>
        </div>

        {/* Camera Status Panel */}
        {cameraActive && (
          <div
            role="status"
            aria-live="polite"
            aria-label="Camera detection results"
            className="mt-6 p-6 rounded-2xl border-2"
            style={{
              backgroundColor: "var(--t-card)",
              borderColor: "var(--t-fg)",
              color: "var(--t-fg)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--t-fg)" }}
                aria-hidden="true"
              />
              <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                Camera Active — Detecting Objects
              </span>
            </div>
            <ul className="space-y-2" aria-label="Detected objects">
              {[
                "☕ Coffee mug — 30 cm directly ahead",
                "📱 Smartphone — 45 cm to your left",
                "🪑 Chair — 1.2 m behind you",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2"
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    opacity: 0.85,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setCameraActive(false);
                speak("Camera closed.");
              }}
              aria-label="Close camera"
              className="mt-4 px-6 py-3 rounded-xl border-2 w-full transition-all focus-visible:outline-4 focus-visible:outline-offset-2 min-h-[48px]"
              style={{
                backgroundColor: "transparent",
                color: "var(--t-fg)",
                borderColor: "var(--t-fg)",
                outlineColor: "var(--t-accent)",
                fontWeight: 700,
              }}
            >
              Close Camera
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
