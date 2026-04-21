"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Nav from "@/components/Nav";
import Placeholder from "@/components/Placeholder";
import DeviceFrame from "@/components/DeviceFrame";
import { projects, type Screen } from "@/content/projects";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function AssetImage({
  aspect,
  placeholderLabel,
  note,
}: {
  src?: string;
  alt?: string;
  aspect: "video" | "screen" | "wide" | "square";
  placeholderLabel: string;
  note?: string;
}) {
  return (
    <div className="relative w-full">
      <Placeholder label={placeholderLabel} aspect={aspect} />
      {note && (
        <p
          className="mono text-[11px] mt-3 leading-relaxed"
          style={{ color: "var(--foreground-dim)", maxWidth: "68ch" }}
        >
          <span style={{ color: "var(--waymark-gold)" }}>RECORD:</span> {note}
        </p>
      )}
    </div>
  );
}

// Section head. Same pattern as the homepage. No numerals.
function BeatHead({
  process,
  title,
  accent,
}: {
  process: string;
  title: string;
  accent: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-5">
        <span
          className="mono text-[10px] tracking-[0.25em] uppercase"
          style={{ color: accent, opacity: 0.9 }}
        >
          {process}
        </span>
        <span
          aria-hidden
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(90deg, ${accent}55, transparent)`,
          }}
        />
      </div>
      <h2
        className="serif"
        style={{
          fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--foreground)",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function FeaturedScreen({
  screen,
  slug,
  accent,
  isPhone,
}: {
  screen: Screen;
  slug: string;
  accent: string;
  isPhone: boolean;
}) {
  const tintClass = isPhone ? "tint-waymark" : "tint-sygnalist";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="my-12"
    >
      <div
        className={`${tintClass} rounded-sm`}
        style={{
          border: "1px solid var(--rule)",
          padding: isPhone ? "40px" : "28px",
        }}
      >
        <DeviceFrame
          kind={isPhone ? "phone" : "browser"}
          src={`/assets/${slug}/screens/${screen.file}`}
          alt={screen.caption}
          accent={accent}
          hideChrome={!isPhone}
        />
      </div>
      <p
        className="mt-5"
        style={{
          fontSize: "var(--text-small)",
          color: "var(--foreground-muted)",
          lineHeight: 1.6,
          maxWidth: "68ch",
        }}
      >
        {screen.caption}
      </p>
    </motion.div>
  );
}

export default function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const assetBase = `/assets/${project.slug}`;
  const isPhone = project.slug === "waymark";
  const accent = isPhone ? "var(--waymark-gold)" : "var(--sygnalist-green)";
  const featuredScreens = project.product.screens.filter((s) => s.featured);
  const restScreens = project.product.screens.filter((s) => !s.featured);
  const [showMore, setShowMore] = useState(false);

  return (
    <main>
      <Nav />

      {/* ── HEADER ── */}
      <section className="px-6 pt-36 pb-20" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Link
              href="/#work"
              className="mono text-xs tracking-widest uppercase mb-10 inline-flex items-center gap-2 link-understated"
              style={{ color: "var(--foreground-dim)" }}
            >
              ← Work
            </Link>

            <span className={`eyebrow-chip ${project.slug === "sygnalist" ? "green" : ""} mt-8 mb-6`}>
              <span className="dot" />
              {project.status}
            </span>

            <h1
              className="display mb-6 mt-4"
              style={{
                fontSize: "clamp(3rem, 9vw, 7rem)",
                letterSpacing: "0.04em",
                lineHeight: 1,
                color: "var(--foreground)",
              }}
            >
              {project.title}
            </h1>

            <p
              style={{
                fontSize: "var(--text-title)",
                color: "var(--foreground-muted)",
                maxWidth: "52ch",
                lineHeight: 1.4,
              }}
            >
              {project.tagline}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8"
            style={{ borderTop: "1px solid var(--rule)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { label: "Role", value: project.role },
              { label: "Year", value: project.year },
              { label: "Status", value: project.status },
              { label: "Stack", value: project.stack.slice(0, 3).join(", ") },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="mono text-xs tracking-widest uppercase mb-1" style={{ color: "var(--foreground-dim)" }}>
                  {label}
                </p>
                <p style={{ fontSize: "var(--text-small)", color: "var(--foreground-muted)", lineHeight: 1.5 }}>
                  {value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 01 · SIGNAL (problem) ── */}
      <section className="px-6 py-20" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <BeatHead process="Signal · the problem" title={project.problem.headline} accent={accent} />
            <p style={{ fontSize: "var(--text-body)", color: "var(--foreground-muted)", lineHeight: 1.75, maxWidth: "52ch" }}>
              {project.problem.body}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <AssetImage
              src={`${assetBase}/before.png`}
              alt="Before state"
              aspect="wide"
              placeholderLabel={`before.png · the mess this replaces`}
              note={`Drop a screenshot of the broken state at public/assets/${project.slug}/before.png. ${
                project.slug === "sygnalist"
                  ? "A chaotic Gmail inbox full of LinkedIn alerts and Greenhouse digests."
                  : "A generic training app still showing the old plan after a missed week."
              }`}
            />
          </motion.div>
        </div>
      </section>

      {/* ── 02 · READ (approach) ── */}
      <section className="px-6 py-20" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <BeatHead process="Read · the approach" title={project.approach.headline} accent={accent} />
            <p style={{ fontSize: "var(--text-body)", color: "var(--foreground-muted)", lineHeight: 1.75, maxWidth: "72ch" }}>
              {project.approach.body}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <AssetImage
              src={`${assetBase}/architecture.png`}
              alt="Architecture diagram"
              aspect="wide"
              placeholderLabel={`architecture.png · how the system actually flows`}
              note={`Draw the architecture on paper and photo it, or use excalidraw.com. Drop at public/assets/${project.slug}/architecture.png. ${
                project.slug === "sygnalist"
                  ? "Show the ten sources fanning in, the enrichment layer, the scorer, and the ranked inbox."
                  : "Show signals in (Strava, wellness), the pre-filter gate, Sonnet with tool use, and weekAdjustments out."
              }`}
            />
          </motion.div>
        </div>
      </section>

      {/* ── 03 · BUILD (product) ── */}
      <section className="px-6 py-20" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto">
          <BeatHead process="Build · the product" title={project.product.headline} accent={accent} />

          {/* Walkthrough video slot with explicit recording script */}
          <div className="my-12">
            <AssetImage
              src={`${assetBase}/walkthrough.mp4`}
              alt="Walkthrough"
              aspect="video"
              placeholderLabel={`walkthrough.mp4 · 30 to 60s product recording`}
              note={project.product.recordingScript}
            />
          </div>

          {/* Featured screens, interleaved at full width (browser) or larger (phone) */}
          {isPhone ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
              {featuredScreens.map((screen) => (
                <FeaturedScreen
                  key={screen.file}
                  screen={screen}
                  slug={project.slug}
                  accent={accent}
                  isPhone
                />
              ))}
            </div>
          ) : (
            <div>
              {featuredScreens.map((screen) => (
                <FeaturedScreen
                  key={screen.file}
                  screen={screen}
                  slug={project.slug}
                  accent={accent}
                  isPhone={false}
                />
              ))}
            </div>
          )}

          {/* Rest of the screens, collapsed by default */}
          {restScreens.length > 0 && (
            <div className="mt-12 pt-10" style={{ borderTop: "1px solid var(--rule)" }}>
              <button
                onClick={() => setShowMore((v) => !v)}
                className="mono text-xs tracking-[0.2em] uppercase link-understated"
                style={{ color: "var(--foreground-muted)" }}
              >
                {showMore ? "Hide" : "Show"} {restScreens.length} more surface{restScreens.length === 1 ? "" : "s"} ↓
              </button>

              {showMore && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`grid grid-cols-1 md:grid-cols-2 ${isPhone ? "lg:grid-cols-3" : ""} gap-6 mt-8`}
                >
                  {restScreens.map((screen, i) => (
                    <motion.div
                      key={screen.file}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex flex-col"
                    >
                      <div
                        className={isPhone ? "tint-waymark rounded-sm p-5" : "tint-sygnalist rounded-sm p-4"}
                        style={{ border: "1px solid var(--rule)" }}
                      >
                        <DeviceFrame
                          kind={isPhone ? "phone" : "browser"}
                          src={`${assetBase}/screens/${screen.file}`}
                          alt={screen.caption}
                          accent={accent}
                          hideChrome={!isPhone}
                        />
                      </div>
                      <p
                        className="mt-4"
                        style={{ fontSize: "var(--text-small)", color: "var(--foreground-muted)", lineHeight: 1.55 }}
                      >
                        {screen.caption}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── 04 · TOOLS ── */}
      <section className="px-6 py-20" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16">
          <div>
            <BeatHead process="Tools · what I used" title={project.tools.headline} accent={accent} />
            <p style={{ fontSize: "var(--text-body)", color: "var(--foreground-muted)", lineHeight: 1.75 }}>
              {project.tools.body}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 content-start pt-10">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="mono text-xs px-3 py-1.5 border"
                style={{ color: "var(--foreground-muted)", borderColor: "var(--rule)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 · PROOF ── */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <BeatHead process="Proof · what it shows" title={project.proof.headline} accent={accent} />

          {project.proof.stat && (
            <div className="mb-12">
              <p
                className="display"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 7rem)",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                  color: accent,
                }}
              >
                {project.proof.stat}
              </p>
              <p className="mono text-xs mt-3 tracking-widest" style={{ color: "var(--foreground-dim)" }}>
                {project.proof.statLabel}
              </p>
            </div>
          )}

          <p
            style={{ fontSize: "var(--text-body)", color: "var(--foreground-muted)", lineHeight: 1.75, maxWidth: "60ch" }}
          >
            {project.proof.body}
          </p>
        </div>
      </section>

      {/* ── NEXT PROJECT ── */}
      <section className="px-6 py-16" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/#work"
            className="mono text-xs tracking-widest uppercase link-understated"
            style={{ color: "var(--foreground-dim)" }}
          >
            ← All work
          </Link>
          {projects.filter((p) => p.slug !== project.slug).map((other) => (
            <Link
              key={other.slug}
              href={`/work/${other.slug}`}
              className="mono text-xs tracking-widest uppercase link-understated flex items-center gap-2"
              style={{ color: "var(--foreground-muted)" }}
            >
              {other.title} →
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

