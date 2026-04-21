"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Placeholder from "@/components/Placeholder";
import { projects } from "@/content/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function AssetImage({
  src,
  alt,
  aspect,
  placeholderLabel,
}: {
  src: string;
  alt: string;
  aspect: "video" | "screen" | "wide" | "square";
  placeholderLabel: string;
}) {
  // If the file has been dropped into public/, render it; otherwise show placeholder
  return (
    <div className="relative w-full">
      <Placeholder label={placeholderLabel} aspect={aspect} />
      {/* Once you drop the real file in, swap Placeholder for:
          <Image src={src} alt={alt} fill className="object-cover rounded-sm" />
          wrapped in a relative container */}
    </div>
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

            <p
              className="mono text-xs tracking-widest uppercase mb-6 mt-8"
              style={{ color: "var(--foreground-dim)" }}
            >
              {project.status}
            </p>

            <h1
              className="serif mb-6"
              style={{ fontSize: "var(--text-display)", lineHeight: 1.05, color: "var(--foreground)" }}
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

          {/* Metadata row */}
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

      {/* ── BEAT 1: THE PROBLEM ── */}
      <section className="px-6 py-20" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mono text-xs tracking-widest uppercase mb-6" style={{ color: "var(--foreground-dim)" }}>
              01 — The problem
            </p>
            <h2
              className="serif mb-6"
              style={{ fontSize: "var(--text-headline)", lineHeight: 1.1, color: "var(--foreground)" }}
            >
              {project.problem.headline}
            </h2>
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
              placeholderLabel={`public/assets/${project.slug}/before.png`}
            />
          </motion.div>
        </div>
      </section>

      {/* ── BEAT 2: THE APPROACH ── */}
      <section className="px-6 py-20" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 items-start mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mono text-xs tracking-widest uppercase mb-6" style={{ color: "var(--foreground-dim)" }}>
                02 — The approach
              </p>
              <h2
                className="serif mb-6"
                style={{ fontSize: "var(--text-headline)", lineHeight: 1.1, color: "var(--foreground)" }}
              >
                {project.approach.headline}
              </h2>
              <p style={{ fontSize: "var(--text-body)", color: "var(--foreground-muted)", lineHeight: 1.75 }}>
                {project.approach.body}
              </p>
            </motion.div>
          </div>

          {/* Architecture diagram — full width */}
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
              placeholderLabel={`public/assets/${project.slug}/architecture.png`}
            />
            <p className="mono text-xs mt-3" style={{ color: "var(--foreground-dim)" }}>
              System architecture
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── BEAT 3: THE PRODUCT ── */}
      <section className="px-6 py-20" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="mono text-xs tracking-widest uppercase mb-6" style={{ color: "var(--foreground-dim)" }}>
            03 — The product
          </p>
          <h2
            className="serif mb-12"
            style={{ fontSize: "var(--text-headline)", lineHeight: 1.1, color: "var(--foreground)" }}
          >
            {project.product.headline}
          </h2>

          {/* Walkthrough video */}
          <div className="mb-12">
            <AssetImage
              src={`${assetBase}/walkthrough.mp4`}
              alt="Walkthrough"
              aspect="video"
              placeholderLabel={`public/assets/${project.slug}/walkthrough.mp4`}
            />
            <p className="mono text-xs mt-3" style={{ color: "var(--foreground-dim)" }}>
              Product walkthrough
            </p>
          </div>

          {/* 3 screens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.product.screens.map((screen, i) => (
              <motion.div
                key={screen.file}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              >
                <AssetImage
                  src={`${assetBase}/screens/${screen.file}`}
                  alt={screen.caption}
                  aspect={project.slug === "waymark" ? "screen" : "wide"}
                  placeholderLabel={`public/assets/${project.slug}/screens/${screen.file}`}
                />
                <p
                  className="mt-3"
                  style={{ fontSize: "var(--text-small)", color: "var(--foreground-muted)", lineHeight: 1.5 }}
                >
                  {screen.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEAT 4: TOOLS ── */}
      <section className="px-6 py-20" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16">
          <div>
            <p className="mono text-xs tracking-widest uppercase mb-6" style={{ color: "var(--foreground-dim)" }}>
              04 — What I used
            </p>
            <h2
              className="serif mb-6"
              style={{ fontSize: "var(--text-headline)", lineHeight: 1.1, color: "var(--foreground)" }}
            >
              {project.tools.headline}
            </h2>
            <p style={{ fontSize: "var(--text-body)", color: "var(--foreground-muted)", lineHeight: 1.75 }}>
              {project.tools.body}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 content-start pt-14">
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

      {/* ── BEAT 5: THE PROOF ── */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="mono text-xs tracking-widest uppercase mb-6" style={{ color: "var(--foreground-dim)" }}>
            05 — What it proves
          </p>

          {project.proof.stat && (
            <div className="mb-10">
              <p
                className="serif"
                style={{ fontSize: "var(--text-display)", lineHeight: 1, color: "var(--accent)" }}
              >
                {project.proof.stat}
              </p>
              <p className="mono text-xs mt-2" style={{ color: "var(--foreground-dim)" }}>
                {project.proof.statLabel}
              </p>
            </div>
          )}

          <p
            className="serif mb-8"
            style={{ fontSize: "var(--text-headline)", lineHeight: 1.15, color: "var(--foreground)", maxWidth: "22ch" }}
          >
            {project.proof.headline}
          </p>
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
