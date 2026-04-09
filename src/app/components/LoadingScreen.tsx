import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../../assets/91a068d1019dac46f1b47403ec1777afef6f822d.png";

const LETTERS = "TRINETRA".split("");
const LOAD_DURATION = 2400; // ms before fade begins

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), LOAD_DURATION);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
          role="status"
          aria-label="Loading TRINETRA"
          aria-live="polite"
        >
          {/* Subtle noise grid overlay */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.04) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Logo Area ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ position: "relative", marginBottom: "2.5rem" }}
          >
            {/* Outer ripple ring */}
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1, 1.65, 1], opacity: [0.35, 0, 0.35] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.6,
              }}
              style={{
                position: "absolute",
                inset: -24,
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.45)",
                pointerEvents: "none",
              }}
            />
            {/* Inner ripple ring */}
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0.1, 0.55] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1.0,
              }}
              style={{
                position: "absolute",
                inset: -24,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.25)",
                pointerEvents: "none",
              }}
            />

            {/* Static border ring */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                pointerEvents: "none",
              }}
            />

            {/* Logo + scan line container */}
            <div
              style={{
                position: "relative",
                width: "clamp(140px, 22vw, 196px)",
                height: "clamp(140px, 22vw, 196px)",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                src={logoImg}
                alt=""
                aria-hidden="true"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "invert(1)",
                  display: "block",
                }}
              />

              {/* Horizontal scan line */}
              <motion.div
                aria-hidden="true"
                animate={{ top: ["-4%", "104%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5,
                  repeatDelay: 0.5,
                }}
                style={{
                  position: "absolute",
                  left: "-10%",
                  right: "-10%",
                  height: "4px",
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
                  filter: "blur(1.5px)",
                  pointerEvents: "none",
                }}
              />

              {/* Sheen overlay */}
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.06, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </motion.div>

          {/* ── TRINETRA letters ── */}
          <div
            style={{
              display: "flex",
              gap: "0.04em",
              marginBottom: "1.1rem",
            }}
            aria-label="TRINETRA"
          >
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.45 + i * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(2rem, 6.5vw, 3.6rem)",
                  fontWeight: 900,
                  letterSpacing: "0.18em",
                  fontFamily: "var(--font-sans)",
                  display: "inline-block",
                  lineHeight: 1,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* ── Tagline ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.55, y: 0 }}
            transition={{ delay: 1.35, duration: 0.75, ease: "easeOut" }}
            style={{
              color: "#ffffff",
              fontSize: "clamp(0.82rem, 2vw, 0.97rem)",
              letterSpacing: "0.1em",
              textAlign: "center",
              fontFamily: "var(--font-sans)",
              maxWidth: "380px",
              padding: "0 1.5rem",
              lineHeight: 1.6,
            }}
          >
            The Third Eye — AI Assistance for the Visually Impaired
          </motion.p>

          {/* ── Loading dots ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.7, duration: 0.5 }}
            style={{
              display: "flex",
              gap: "0.45rem",
              marginTop: "2rem",
            }}
            aria-hidden="true"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.1, 0.8] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.22,
                  ease: "easeInOut",
                }}
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                }}
              />
            ))}
          </motion.div>

          {/* ── Progress bar ── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "3px",
              backgroundColor: "rgba(255,255,255,0.07)",
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: (LOAD_DURATION / 1000) * 0.88,
                ease: [0.4, 0, 0.6, 1],
              }}
              style={{
                height: "100%",
                backgroundColor: "#ffffff",
                transformOrigin: "left center",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
