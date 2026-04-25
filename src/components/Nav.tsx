"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { site } from "@/content/site";
import { ExternalMark } from "@/components/icons";

const DISMISS_THRESHOLD_PX = 80;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const touchStartY = useRef<number | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setDragY(0);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current == null) return;
    const dy = e.touches[0].clientY - touchStartY.current;
    setDragY(dy < 0 ? dy / 4 : dy);
  };
  const onTouchEnd = () => {
    if (dragY > DISMISS_THRESHOLD_PX) {
      setOpen(false);
    }
    setDragY(0);
    touchStartY.current = null;
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5"
      style={{ background: "transparent" }}
    >
      <Link
        href="/"
        className="display text-sm flex items-center gap-2 relative"
        style={{ color: "var(--foreground)", letterSpacing: "0.18em", zIndex: 50 }}
        onClick={close}
      >
        <span
          aria-hidden
          style={{
            width: 7, height: 7, borderRadius: 999,
            background: "var(--brand)",
            boxShadow: "0 0 10px var(--brand)",
          }}
        />
        Bridge Four
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/#work"
          className="mono text-xs tracking-widest uppercase link-understated"
          style={{ color: "var(--foreground-muted)" }}
        >
          Live products
        </Link>
        <Link
          href={site.author.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("github_click", { location: "nav" })}
          className="mono text-xs tracking-widest uppercase link-understated"
          style={{ color: "var(--foreground-muted)" }}
        >
          GitHub
        </Link>
        <a
          href={site.author.resume}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("resume_click", { location: "nav" })}
          className="mono text-xs tracking-widest uppercase px-3 py-1.5 border"
          style={{
            color: "var(--foreground)",
            borderColor: "var(--rule)",
            transition: "border-color 200ms ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor = "var(--accent)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor = "var(--rule)")
          }
        >
          Resume<ExternalMark />
        </a>
      </nav>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden relative flex items-center justify-center"
        style={{
          color: "var(--foreground)",
          width: 44,
          height: 44,
          borderRadius: 999,
          border: `1px solid ${open ? "var(--accent)" : "transparent"}`,
          background: open ? "var(--background-elev)" : "transparent",
          transition: "border-color 220ms ease, background 220ms ease",
          zIndex: 50,
        }}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span
          aria-hidden
          style={{
            position: "relative",
            display: "inline-block",
            width: 18,
            height: 12,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: open ? 5 : 0,
              height: 2,
              borderRadius: 2,
              background: "currentColor",
              transform: open ? "rotate(45deg)" : "none",
              transition: "transform 220ms ease, top 220ms ease",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 5,
              height: 2,
              borderRadius: 2,
              background: "currentColor",
              opacity: open ? 0 : 1,
              transition: "opacity 150ms ease",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: open ? 5 : 10,
              height: 2,
              borderRadius: 2,
              background: "currentColor",
              transform: open ? "rotate(-45deg)" : "none",
              transition: "transform 220ms ease, top 220ms ease",
            }}
          />
        </span>
      </button>

      <div
        className="md:hidden"
        aria-hidden={!open}
        onClick={close}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(11, 10, 8, 0.55)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 30,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 220ms ease",
        }}
      />

      <div
        id="mobile-nav-panel"
        className="md:hidden"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "72vh",
          background: "var(--background)",
          borderBottom: "1px solid var(--rule)",
          boxShadow: "0 24px 48px -24px rgba(0, 0, 0, 0.6)",
          zIndex: 40,
          transform: open
            ? `translateY(${dragY}px)`
            : "translateY(-100%)",
          transition: touchStartY.current
            ? "none"
            : "transform 280ms cubic-bezier(0.32, 0.72, 0, 1)",
          display: "flex",
          flexDirection: "column",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 88px)",
          paddingBottom: 32,
          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        <nav className="flex flex-col gap-7">
          <Link
            href="/#work"
            onClick={close}
            className="serif"
            style={{
              fontSize: "clamp(1.75rem, 7vw, 2.25rem)",
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Live products
          </Link>
          <Link
            href={site.author.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              track("github_click", { location: "mobile_nav" });
              close();
            }}
            className="serif"
            style={{
              fontSize: "clamp(1.75rem, 7vw, 2.25rem)",
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            GitHub<ExternalMark />
          </Link>
          <a
            href={site.author.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              track("resume_click", { location: "mobile_nav" });
              close();
            }}
            className="serif"
            style={{
              fontSize: "clamp(1.75rem, 7vw, 2.25rem)",
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Resume<ExternalMark />
          </a>
        </nav>

        <div style={{ flex: 1 }} />

        <a
          href={`mailto:${site.author.email}`}
          onClick={close}
          className="mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "var(--foreground-dim)" }}
        >
          {site.author.email}
        </a>

        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 36,
            height: 4,
            borderRadius: 999,
            background: "var(--rule)",
          }}
        />
      </div>
    </header>
  );
}
