"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DemoStep } from "@/content/projects";

type Props = {
  open: boolean;
  onClose: () => void;
  url: string | null;
  kind: "phone" | "browser";
  title: string;
  accent: string;
  steps?: DemoStep[];
};

export default function DemoModal({ open, onClose, url, kind, title, accent, steps }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:px-8 sm:py-10"
          style={{ background: "rgba(8, 7, 6, 0.85)", backdropFilter: "blur(12px)" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} demo`}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-5 max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 self-stretch px-1">
              <span
                className="mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: accent }}
              >
                {title} · Live demo
              </span>
              <span
                aria-hidden
                style={{
                  flex: 1,
                  height: 1,
                  background: `linear-gradient(90deg, ${accent}55, transparent)`,
                }}
              />
              <button
                ref={closeRef}
                onClick={onClose}
                className="mono text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 border transition-colors duration-200"
                style={{
                  color: "var(--foreground)",
                  borderColor: "var(--rule)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = accent)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--rule)")}
                aria-label="Close demo"
              >
                Close · Esc
              </button>
            </div>

            {steps && steps.length > 0 && (
              <div
                className="self-stretch flex items-start gap-3 px-1 py-3 rounded-sm"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--rule)" }}
              >
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="mono text-[11px] pt-0.5 shrink-0 transition-opacity duration-150"
                  style={{ color: accent, opacity: step === 0 ? 0.25 : 1 }}
                  disabled={step === 0}
                  aria-label="Previous step"
                >
                  ←
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="mono text-[10px] tracking-[0.2em] uppercase" style={{ color: accent }}>
                      {step + 1} / {steps.length}
                    </span>
                    <span className="mono text-[10px] tracking-[0.15em] uppercase" style={{ color: "var(--foreground-dim)" }}>
                      {steps[step].title}
                    </span>
                  </div>
                  <p
                    className="serif"
                    style={{ fontSize: 13, color: "var(--foreground-muted)", lineHeight: 1.6, margin: 0 }}
                  >
                    {steps[step].body}
                  </p>
                </div>
                <button
                  onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                  className="mono text-[11px] pt-0.5 shrink-0 transition-opacity duration-150"
                  style={{ color: accent, opacity: step === steps.length - 1 ? 0.25 : 1 }}
                  disabled={step === steps.length - 1}
                  aria-label="Next step"
                >
                  →
                </button>
              </div>
            )}

            {kind === "phone" ? <PhoneFrame url={url} accent={accent} title={title} /> : <BrowserFrame url={url} accent={accent} title={title} />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PhoneFrame({ url, accent, title }: { url: string | null; accent: string; title: string }) {
  return (
    <div
      style={{
        position: "relative",
        width: "min(360px, calc(100vw - 64px))",
        aspectRatio: "390 / 844",
        maxHeight: "calc(100vh - 200px)",
        padding: 10,
        borderRadius: 44,
        background: "linear-gradient(180deg, #1d1b17 0%, #0d0c0a 100%)",
        boxShadow: `inset 0 0 0 1px ${accent}33, 0 40px 80px -30px rgba(0,0,0,0.9)`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 34,
          overflow: "hidden",
          background: "var(--waymark-bg)",
        }}
      >
        {url ? (
          <iframe
            src={url}
            title={`${title} demo`}
            sandbox="allow-scripts allow-same-origin allow-forms"
            style={{ width: "100%", height: "100%", border: 0, background: "transparent" }}
          />
        ) : (
          <DemoUnavailable accent={accent} />
        )}
      </div>
    </div>
  );
}

function BrowserFrame({ url, accent, title }: { url: string | null; accent: string; title: string }) {
  return (
    <div
      style={{
        position: "relative",
        width: "min(1100px, calc(100vw - 64px))",
        aspectRatio: "16 / 10",
        maxHeight: "calc(100vh - 200px)",
        borderRadius: 12,
        overflow: "hidden",
        background: "#0e1218",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: `0 40px 80px -30px rgba(0,0,0,0.9), inset 0 0 0 1px ${accent}22`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 14px",
          background: "#0b0f14",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: 999, background: "#ff5f57" }} />
        <span style={{ width: 9, height: 9, borderRadius: 999, background: "#febc2e" }} />
        <span style={{ width: 9, height: 9, borderRadius: 999, background: "#28c840" }} />
        <span
          className="mono"
          style={{ marginLeft: 12, fontSize: 11, color: "#5c6470", letterSpacing: "0.04em" }}
        >
          {title.toLowerCase()}-demo.bridgefour.xyz
        </span>
      </div>
      <div style={{ position: "relative", width: "100%", height: "calc(100% - 39px)", background: "var(--sygnalist-bg)" }}>
        {url ? (
          <iframe
            src={url}
            title={`${title} demo`}
            sandbox="allow-scripts allow-same-origin allow-forms"
            style={{ width: "100%", height: "100%", border: 0, background: "transparent" }}
          />
        ) : (
          <DemoUnavailable accent={accent} />
        )}
      </div>
    </div>
  );
}

function DemoUnavailable({ accent }: { accent: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-8 text-center">
      <span
        className="mono uppercase"
        style={{ fontSize: 10, letterSpacing: "0.25em", color: accent }}
      >
        Demo coming soon
      </span>
      <p
        className="serif"
        style={{ fontSize: 16, color: "var(--foreground-muted)", lineHeight: 1.5, maxWidth: "32ch" }}
      >
        Wiring up the deployment. Check back shortly.
      </p>
    </div>
  );
}
