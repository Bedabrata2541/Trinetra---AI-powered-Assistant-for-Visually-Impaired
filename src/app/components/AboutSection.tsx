import React from "react";

const features = [
  {
    icon: "🎙",
    title: "Voice-First Interface",
    description:
      "Every action is accessible through natural voice commands. Just speak, and TRINETRA listens.",
  },
  {
    icon: "📷",
    title: "Real-Time Object Detection",
    description:
      "Camera-powered AI identifies objects, people, and obstacles in your environment instantly.",
  },
  {
    icon: "🔊",
    title: "Audio Guidance",
    description:
      "Crystal-clear text-to-speech narration guides you through every interaction and environment.",
  },
  {
    icon: "⌚",
    title: "Wearable Integration",
    description:
      "Pairs with smartwatches and haptic wearables to deliver tactile feedback alongside voice guidance.",
  },
  {
    icon: "🌐",
    title: "Offline Capable",
    description:
      "Core features work without an internet connection, ensuring assistance is always available.",
  },
  {
    icon: "🔒",
    title: "Privacy Focused",
    description:
      "All processing is done on-device. Your data never leaves your device without your consent.",
  },
];

export function AboutSection() {
  // removed unused `speak` — no TTS calls in this section

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full px-4 sm:px-6 py-16 sm:py-20"
      style={{ backgroundColor: "var(--t-section-alt)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2
          id="about-heading"
          className="text-center mb-6"
          style={{
            color: "var(--t-fg)",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          About TRINETRA
        </h2>

        {/* Mission Statement */}
        <p
          className="text-center max-w-2xl mx-auto mb-16"
          style={{
            color: "var(--t-fg)",
            fontSize: "clamp(1.05rem, 2.5vw, 1.25rem)",
            lineHeight: 1.8,
            opacity: 0.85,
          }}
        >
          TRINETRA empowers visually impaired individuals through AI-driven voice
          interaction, object detection, and assistive technology — giving everyone
          the freedom to navigate the world independently.
        </p>

        {/* Name Meaning */}
        <div
          className="text-center mb-16 p-8 rounded-2xl border-2"
          style={{
            borderColor: "var(--t-fg)",
            color: "var(--t-fg)",
          }}
          aria-label="The meaning of TRINETRA"
        >
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
              lineHeight: 1.8,
              fontStyle: "italic",
              opacity: 0.9,
            }}
          >
            <span style={{ fontWeight: 800, fontStyle: "normal" }}>TRINETRA</span>{" "}
            (Sanskrit: त्रिनेत्र) means{" "}
            <span style={{ fontWeight: 700 }}>"The Third Eye"</span> — the eye of
            wisdom and perception beyond ordinary sight. We believe every person
            deserves to perceive the world fully.
          </p>
        </div>

        {/* Features Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          aria-label="TRINETRA features"
        >
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-3 p-6 rounded-2xl border"
              style={{
                borderColor: "var(--t-border)",
                backgroundColor: "var(--t-card)",
                color: "var(--t-fg)",
              }}
            >
              <span
                className="text-3xl"
                aria-hidden="true"
                style={{ lineHeight: 1 }}
              >
                {icon}
              </span>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  opacity: 0.8,
                }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5"
          aria-label="TRINETRA statistics"
        >
          {[
            { value: "< 1s", label: "Object detection response time" },
            { value: "50+", label: "Languages supported" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="text-center p-6 rounded-2xl border-2"
              style={{
                borderColor: "var(--t-fg)",
                color: "var(--t-fg)",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                  opacity: 0.75,
                  marginTop: "0.5rem",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}