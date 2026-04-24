"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5"
      style={{ background: "transparent" }}
    >
      <Link
        href="/"
        className="display text-sm flex items-center gap-2"
        style={{ color: "var(--foreground)", letterSpacing: "0.18em" }}
        onClick={() => setOpen(false)}
      >
        <span
          aria-hidden
          style={{
            width: 7, height: 7, borderRadius: 999,
            background: "var(--waymark-gold)",
            boxShadow: "0 0 10px var(--waymark-gold)",
          }}
        />
        Bridge Four
      </Link>

      {/* Desktop nav — unchanged from original at md+ breakpoint */}
      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/#work"
          className="mono text-xs tracking-widest uppercase link-understated"
          style={{ color: "var(--foreground-muted)" }}
        >
          Shipped
        </Link>
        <Link
          href={site.author.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mono text-xs tracking-widest uppercase link-understated"
          style={{ color: "var(--foreground-muted)" }}
        >
          GitHub
        </Link>
        <a
          href={site.author.resume}
          target="_blank"
          rel="noopener noreferrer"
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
          Resume ↗
        </a>
      </nav>

      {/* Mobile hamburger — only renders < md */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex items-center justify-center p-2 -mr-2"
        style={{ color: "var(--foreground)" }}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span
          aria-hidden
          style={{
            position: "relative",
            display: "inline-block",
            width: 22,
            height: 14,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: open ? 6 : 0,
              height: 1,
              background: "currentColor",
              transform: open ? "rotate(45deg)" : "none",
              transition: "transform 200ms ease, top 200ms ease",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 6,
              height: 1,
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
              top: open ? 6 : 13,
              height: 1,
              background: "currentColor",
              transform: open ? "rotate(-45deg)" : "none",
              transition: "transform 200ms ease, top 200ms ease",
            }}
          />
        </span>
      </button>

      {/* Mobile panel — only renders < md */}
      <div
        id="mobile-nav-panel"
        className="md:hidden"
        aria-hidden={!open}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "var(--background)",
          zIndex: 40,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 220ms ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 32px",
        }}
      >
        <nav className="flex flex-col gap-8">
          <Link
            href="/#work"
            onClick={() => setOpen(false)}
            className="serif"
            style={{
              fontSize: "clamp(1.75rem, 8vw, 2.5rem)",
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Shipped
          </Link>
          <Link
            href={site.author.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="serif"
            style={{
              fontSize: "clamp(1.75rem, 8vw, 2.5rem)",
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            GitHub ↗
          </Link>
          <a
            href={site.author.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="serif"
            style={{
              fontSize: "clamp(1.75rem, 8vw, 2.5rem)",
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Resume ↗
          </a>
        </nav>

        <div
          className="mono text-[10px] tracking-[0.3em] uppercase"
          style={{
            position: "absolute",
            bottom: 40,
            left: 32,
            right: 32,
            color: "var(--foreground-dim)",
          }}
        >
          <a href={`mailto:${site.author.email}`} onClick={() => setOpen(false)}>
            {site.author.email}
          </a>
        </div>
      </div>
    </header>
  );
}
