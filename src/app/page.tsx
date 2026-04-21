"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function Home() {
  return (
    <main>
      <Nav />

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col justify-end px-6 pb-16 pt-28">
        <div className="max-w-6xl mx-auto w-full">

          {/* Split voice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20">
            {/* Left: Sygnalist */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.1}
              variants={fadeUp}
            >
              <p
                className="mono text-xs tracking-widest uppercase mb-6"
                style={{ color: "var(--foreground-dim)" }}
              >
                {site.heroLeft.label}
              </p>
              <div className="mb-5">
                {site.heroLeft.lines.map((line, i) => (
                  <p
                    key={i}
                    className="serif leading-[1.1]"
                    style={{ fontSize: "var(--text-headline)", color: "var(--foreground)" }}
                  >
                    {line}
                  </p>
                ))}
              </div>
              <p style={{ fontSize: "var(--text-small)", color: "var(--foreground-muted)", maxWidth: "38ch", lineHeight: 1.6 }}>
                {site.heroLeft.sub}
              </p>
            </motion.div>

            {/* Right: Waymark */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.25}
              variants={fadeUp}
            >
              <p
                className="mono text-xs tracking-widest uppercase mb-6"
                style={{ color: "var(--foreground-dim)" }}
              >
                {site.heroRight.label}
              </p>
              <div className="mb-5">
                {site.heroRight.lines.map((line, i) => (
                  <p
                    key={i}
                    className="serif leading-[1.1]"
                    style={{ fontSize: "var(--text-headline)", color: "var(--foreground)" }}
                  >
                    {line}
                  </p>
                ))}
              </div>
              <p style={{ fontSize: "var(--text-small)", color: "var(--foreground-muted)", maxWidth: "38ch", lineHeight: 1.6 }}>
                {site.heroRight.sub}
              </p>
            </motion.div>
          </div>

          {/* Byline */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.45}
            variants={fadeUp}
            className="flex items-center gap-4"
          >
            <div style={{ height: 1, width: 40, background: "var(--foreground-dim)" }} />
            <p className="mono text-xs tracking-widest uppercase" style={{ color: "var(--foreground-dim)" }}>
              Two voices. One builder.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── THESIS ── */}
      <section className="px-6 py-28" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.p
            className="serif"
            style={{
              fontSize: "var(--text-display)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--foreground)",
              maxWidth: "16ch",
            }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {site.thesis}
          </motion.p>
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" className="px-6 py-20" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="mono text-xs tracking-widest uppercase mb-12" style={{ color: "var(--foreground-dim)" }}>
            Selected work
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              >
                <Link href={`/work/${project.slug}`} className="group block">
                  {/* Hero image slot: drop public/assets/[slug]/hero.png to fill */}
                  <div
                    className="w-full aspect-[4/3] mb-5 overflow-hidden rounded-sm flex flex-col items-center justify-center gap-1"
                    style={{ background: "var(--background-elev)", border: "1px dashed var(--foreground-dim)" }}
                  >
                    <span className="mono text-xs" style={{ color: "var(--foreground-dim)" }}>
                      Drop in:
                    </span>
                    <span className="mono text-xs" style={{ color: "var(--accent)" }}>
                      public/assets/{project.slug}/hero.png
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className="serif mb-1 group-hover:opacity-70 transition-opacity duration-200"
                        style={{ fontSize: "var(--text-title)", color: "var(--foreground)" }}
                      >
                        {project.title}
                      </p>
                      <p style={{ fontSize: "var(--text-small)", color: "var(--foreground-muted)", maxWidth: "44ch", lineHeight: 1.5 }}>
                        {project.tagline}
                      </p>
                    </div>
                    <span
                      className="mono text-xs shrink-0 group-hover:translate-x-1 transition-transform duration-200"
                      style={{ color: "var(--accent)", marginTop: "4px" }}
                    >
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW I WORK ── */}
      <section className="px-6 py-20" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
          <div>
            <p className="mono text-xs tracking-widest uppercase" style={{ color: "var(--foreground-dim)" }}>
              How I work
            </p>
          </div>
          <ul className="space-y-5">
            {site.howIWork.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
                className="flex gap-4 items-start"
                style={{ fontSize: "var(--text-body)", color: "var(--foreground-muted)", lineHeight: 1.65 }}
              >
                <span className="mono shrink-0 mt-1" style={{ color: "var(--foreground-dim)", fontSize: "0.7rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="px-6 py-20" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
          <div>
            <p className="mono text-xs tracking-widest uppercase" style={{ color: "var(--foreground-dim)" }}>
              Selected roles
            </p>
          </div>
          <ul className="space-y-8">
            {site.experience.map((job, i) => (
              <motion.li
                key={`${job.company}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
                className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-8"
              >
                <p
                  className="mono text-xs tracking-wider shrink-0 pt-1"
                  style={{ color: "var(--foreground-dim)" }}
                >
                  {job.period}
                </p>
                <div>
                  <p
                    className="serif mb-1"
                    style={{ fontSize: "var(--text-title)", color: "var(--foreground)", lineHeight: 1.2 }}
                  >
                    {job.role}
                    <span style={{ color: "var(--foreground-dim)" }}> / </span>
                    <span style={{ color: "var(--foreground-muted)", fontSize: "calc(var(--text-title) * 0.88)" }}>
                      {job.company}
                    </span>
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-small)",
                      color: "var(--foreground-muted)",
                      lineHeight: 1.6,
                      maxWidth: "64ch",
                    }}
                  >
                    {job.summary}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="px-6 py-24" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.p
            className="serif mb-10"
            style={{ fontSize: "var(--text-headline)", color: "var(--foreground)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Let&apos;s talk.
          </motion.p>

          <div className="flex flex-wrap gap-6 items-center">
            <a
              href={`mailto:${site.author.email}`}
              className="mono text-sm link-understated"
              style={{ color: "var(--foreground)" }}
            >
              {site.author.email}
            </a>
            <a
              href={site.author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-sm link-understated"
              style={{ color: "var(--foreground-muted)" }}
            >
              LinkedIn ↗
            </a>
            <a
              href={site.author.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-sm link-understated"
              style={{ color: "var(--foreground-muted)" }}
            >
              GitHub ↗
            </a>
            <a
              href={site.author.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-sm link-understated"
              style={{ color: "var(--foreground-muted)" }}
            >
              Resume ↗
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="mono text-xs" style={{ color: "var(--foreground-dim)" }}>
            {site.domain}
          </p>
          <p className="mono text-xs" style={{ color: "var(--foreground-dim)" }}>
            Still building.
          </p>
        </div>
      </footer>
    </main>
  );
}
