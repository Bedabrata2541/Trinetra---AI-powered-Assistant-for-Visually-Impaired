import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Linkedin } from "lucide-react";

export function ContactSection() {
  const { speak } = useTheme();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full px-4 sm:px-6 py-16 sm:py-20"
      style={{ backgroundColor: "var(--t-bg)" }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          id="contact-heading"
          className="text-center mb-3"
          style={{
            color: "var(--t-fg)",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          Contact Us
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
          We're here to help. Reach out any time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email */}
          <a
            
            
            onClick={() => speak("Opening email to support at trinetra dot ai")}
            className="flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border-2 transition-all duration-200 focus-visible:outline-4 focus-visible:outline-offset-4 min-h-[180px] text-center no-underline"
            style={{
              backgroundColor: "var(--t-fg)",
              color: "var(--t-bg)",
              borderColor: "var(--t-fg)",
              outlineColor: "var(--t-accent)",
            }}
          >
            <span className="text-5xl" aria-hidden="true">✉️</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.35rem" }}>
                Email Support
              </div>
              <div style={{ opacity: 0.8, fontSize: "1rem" }}>
                support@trinetra.ai
              </div>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow TRINETRA on LinkedIn — opens in a new tab"
            onClick={() => speak("Opening TRINETRA LinkedIn page in a new tab.")}
            className="flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border-2 transition-all duration-200 focus-visible:outline-4 focus-visible:outline-offset-4 min-h-[180px] text-center no-underline"
            style={{
              backgroundColor: "var(--t-card)",
              color: "var(--t-fg)",
              borderColor: "var(--t-fg)",
              outlineColor: "var(--t-accent)",
            }}
          >
            <span
              className="flex items-center justify-center rounded-lg p-2"
              style={{
                backgroundColor: "var(--t-fg)",
                color: "var(--t-bg)",
                width: "56px",
                height: "56px",
              }}
              aria-hidden="true"
            >
              <Linkedin size={32} strokeWidth={2} />
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.35rem" }}>
                LinkedIn
              </div>
              <div style={{ opacity: 0.75, fontSize: "1rem" }}>
                Follow us for updates
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
