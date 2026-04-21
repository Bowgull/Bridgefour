"use client";

import Link from "next/link";
import { site } from "@/content/site";

export default function Nav() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5"
      style={{ background: "transparent" }}
    >
      <Link
        href="/"
        className="display text-sm flex items-center gap-2"
        style={{ color: "var(--foreground)", letterSpacing: "0.18em" }}
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

      <nav className="flex items-center gap-6">
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
    </header>
  );
}
