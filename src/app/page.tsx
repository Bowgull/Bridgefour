"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { track } from "@vercel/analytics";
import Nav from "@/components/Nav";
import DeviceFrame from "@/components/DeviceFrame";
import { ExternalMark } from "@/components/icons";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

// Section head. Name is the protagonist. No numerals.
function SectionHead({
  label,
  accent = "gold",
}: {
  label: string;
  accent?: "gold" | "green";
}) {
  return (
    <div className="flex items-baseline gap-5 mb-12">
      <h2
        className="serif"
        style={{
          fontSize: "clamp(2rem, 4vw, 3.25rem)",
          letterSpacing: "-0.02em",
          color: "var(--foreground)",
          lineHeight: 1.05,
        }}
      >
        {label}
      </h2>
      <span
        aria-hidden
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg, ${
            accent === "green" ? "var(--sygnalist-green)" : "var(--waymark-gold)"
          }55, transparent)`,
        }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Nav />

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col justify-end px-6 pb-20 pt-32 hero-glow">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex flex-col gap-3"
          >
            <span className="signal-rule mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--foreground-dim)" }}>
              <span className="md:ml-[52px]">Toronto · Fintech AM · Solo builder</span>
            </span>
            <h1
              className="display"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                letterSpacing: "0.06em",
                color: "var(--foreground)",
                lineHeight: 1,
              }}
            >
              Josh <span style={{ color: "var(--waymark-gold)" }}>Bocas</span>
            </h1>
            <p
              className="mono text-xs tracking-[0.18em] uppercase"
              style={{ color: "var(--foreground-muted)", marginTop: 4 }}
            >
              {site.positioning}
            </p>
          </motion.div>

          <motion.p
            className="serif mb-20"
            style={{
              fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
              color: "var(--foreground)",
              maxWidth: "42ch",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {site.thesis}
          </motion.p>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.45}
            variants={fadeUp}
            className="mono text-xs tracking-widest uppercase"
            style={{ color: "var(--foreground-dim)" }}
          >
            A personal lab, currently housing two products.
          </motion.p>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="work" className="px-6 py-24 rule-accent wash-work relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <SectionHead label="Shipped" accent="green" />
          <p
            className="serif mb-14"
            style={{ fontSize: "var(--text-title)", color: "var(--foreground-muted)", maxWidth: "46ch", lineHeight: 1.4 }}
          >
            Two products, both built solo, both running in production.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {projects.map((project, i) => {
              const isPhone = project.slug === "waymark";
              const tintClass = isPhone ? "tint-waymark" : "tint-sygnalist";
              const accent = isPhone ? "var(--waymark-gold)" : "var(--sygnalist-green)";
              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  className={isPhone ? "md:col-span-2" : "md:col-span-3"}
                >
                  <Link href={`/work/${project.slug}`} className="group block">
                    <div
                      className={`${tintClass} w-full mb-5 rounded-sm flex items-center justify-center ${
                        isPhone ? "p-5 sm:p-6 md:p-8 min-h-[380px] sm:min-h-[420px] md:min-h-[460px]" : "p-4 sm:p-5 md:p-6"
                      }`}
                      style={{ border: "1px solid var(--rule)" }}
                    >
                      <DeviceFrame
                        kind={isPhone ? "phone" : "browser"}
                        src={isPhone ? "/assets/waymark/screens/01.png" : "/assets/sygnalist/screens/01.png"}
                        alt={`${project.title} product screen`}
                        accent={accent}
                        hideChrome={!isPhone}
                      />
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
                        className="mono text-[10px] tracking-[0.22em] uppercase shrink-0 flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
                        style={{ color: accent, marginTop: "6px" }}
                      >
                        Case study
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW I WORK ── */}
      <section className="px-6 py-24 rule-accent wash-how relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <SectionHead label="How I work" accent="green" />
          <p
            className="serif mb-16"
            style={{ fontSize: "var(--text-title)", color: "var(--foreground-muted)", maxWidth: "52ch", lineHeight: 1.4 }}
          >
            Three cases from the last couple of years. Each one covers what I saw, how I read it, and what I built in response.
          </p>

          <div className="space-y-20">
            {site.howIWork.map((item, i) => {
              const tagAccent =
                item.tag === "Sygnalist"
                  ? "var(--sygnalist-green)"
                  : item.tag === "Waymark"
                  ? "var(--waymark-gold)"
                  : "var(--foreground-muted)";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                  className="pb-16"
                  style={{ borderBottom: i < site.howIWork.length - 1 ? "1px solid var(--rule)" : "none" }}
                >
                  <p
                    className="mono text-[11px] tracking-[0.25em] uppercase mb-4"
                    style={{ color: tagAccent }}
                  >
                    {item.tag}
                  </p>
                  <h3
                    className="serif mb-10"
                    style={{
                      fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.02em",
                      color: "var(--foreground)",
                      maxWidth: "24ch",
                    }}
                  >
                    {item.headline}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 mb-10">
                    <div>
                      <p
                        className="mono text-[10px] tracking-[0.2em] uppercase mb-3"
                        style={{ color: "var(--foreground-dim)" }}
                      >
                        Problem
                      </p>
                      <p style={{ fontSize: "var(--text-body)", color: "var(--foreground-muted)", lineHeight: 1.7 }}>
                        {item.problem}
                      </p>
                    </div>
                    <div>
                      <p
                        className="mono text-[10px] tracking-[0.2em] uppercase mb-3"
                        style={{ color: tagAccent, opacity: 0.85 }}
                      >
                        Move
                      </p>
                      <p style={{ fontSize: "var(--text-body)", color: "var(--foreground-muted)", lineHeight: 1.7 }}>
                        {item.move}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p
                      className="mono text-[10px] tracking-[0.2em] uppercase mb-3"
                      style={{ color: "var(--foreground-dim)" }}
                    >
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.stack.map((tool) => (
                        <span
                          key={tool}
                          className="mono text-xs px-2.5 py-1 border"
                          style={{ color: "var(--foreground-muted)", borderColor: "var(--rule)" }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="px-6 py-24 rule-accent relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <SectionHead label="Operating history" />

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
      <section className="px-6 py-24 rule-accent wash-contact relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <SectionHead label="Contact" accent="green" />

          <motion.p
            className="serif mb-10"
            style={{ fontSize: "var(--text-headline)", color: "var(--foreground)", lineHeight: 1.05, maxWidth: "14ch" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Reach out.
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
              onClick={() => track("linkedin_click")}
              className="mono text-sm link-understated"
              style={{ color: "var(--foreground-muted)" }}
            >
              LinkedIn<ExternalMark />
            </a>
            <a
              href={site.author.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-sm link-understated"
              style={{ color: "var(--foreground-muted)" }}
            >
              GitHub<ExternalMark />
            </a>
            <a
              href={site.author.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-sm link-understated"
              style={{ color: "var(--foreground-muted)" }}
            >
              Resume<ExternalMark />
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
            More in the pipeline.
          </p>
        </div>
      </footer>
    </main>
  );
}
