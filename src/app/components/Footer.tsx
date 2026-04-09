import React from "react";
import { useTheme } from "../context/ThemeContext";

export function Footer() {
  const { speak } = useTheme();

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#actions", label: "Controls" },
    { href: "#accessibility", label: "Accessibility" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer
      role="contentinfo"
      className="w-full border-t-2 px-4 sm:px-6 py-10 sm:py-14"
      style={{
        backgroundColor: "var(--t-fg)",
        color: "var(--t-bg)",
        borderColor: "var(--t-fg)",
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Brand */}
        <div className="text-center">
          <div
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 900,
              letterSpacing: "0.2em",
              marginBottom: "0.5rem",
            }}
          >
            TRINETRA
          </div>
          <div style={{ fontSize: "1rem", opacity: 0.75, lineHeight: 1.6 }}>
            The Third Eye — AI Assistance for the Visually Impaired
          </div>
        </div>

        {/* Nav Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 list-none">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => speak(`Navigating to ${label}`)}
                  className="focus-visible:outline-4 focus-visible:outline-offset-2 rounded-sm no-underline"
                  style={{
                    color: "var(--t-bg)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    opacity: 0.85,
                    outlineColor: "var(--t-bg)",
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div
          className="w-full max-w-xs h-px opacity-30"
          style={{ backgroundColor: "var(--t-bg)" }}
          aria-hidden="true"
        />

        {/* WCAG Compliance Badge */}
        <div
          className="flex flex-wrap justify-center gap-4 text-center"
          style={{ opacity: 0.7, fontSize: "0.9rem" }}
        >
          <span>♿ WCAG AAA Compliant</span>
          <span aria-hidden="true">·</span>
          <span>🎙 Voice Accessible</span>
          <span aria-hidden="true">·</span>
          <span>⌨ Keyboard Navigable</span>
          <span aria-hidden="true">·</span>
          <span>📱 Screen Reader Ready</span>
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: "0.9rem",
            opacity: 0.6,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          © 2025 TRINETRA. Built with accessibility at its core.
          <br />
          Empowering independence through AI.
        </p>
      </div>
    </footer>
  );
}