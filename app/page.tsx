import type { Metadata } from "next";
import Image from "next/image";
import { CommandCopy } from "./components/command-copy";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE,
  getSiteUrl,
} from "../lib/site";

const macosDownloadUrl =
  "https://github.com/jongwoo01/relay-voice-agent/releases/latest/download/Relay-macos-universal.zip";
const windowsDownloadUrl =
  "https://github.com/jongwoo01/relay-voice-agent/releases/latest/download/Relay-windows-x64.zip";
const geminiCliInstallUrl = "https://github.com/google-gemini/gemini-cli";
const workspaceExtensionUrl =
  "https://github.com/gemini-cli-extensions/workspace";
const githubRepoUrl = "https://github.com/jongwoo01/relay-voice-agent";
const youtubeDemoUrl = "https://www.youtube.com/watch?v=ItlKd59fKJc&t=9s";
const youtubeEmbedUrl = "https://www.youtube.com/embed/ItlKd59fKJc?start=9&rel=0";
const geminiCliInstallCommand = "npm install -g @google/gemini-cli";
const geminiCliStartCommand = "gemini";
const workspaceInstallCommand =
  "gemini extensions install https://github.com/gemini-cli-extensions/workspace";

const productPillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Desktop surface",
    description:
      "An Electron + React desktop app built for realtime voice input, playback, live transcript, and task visibility.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600">
        <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: "Hosted agent core",
    description:
      "Cloud Run owns the Gemini Live session, orchestration, and canonical task state — not hidden inside the desktop shell.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Grounded local execution",
    description:
      "Local work is delegated through Gemini CLI on device — results are grounded in real machine state, not hallucinated.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    title: "Persistent continuity",
    description:
      "Gemini Live handles conversation, Vertex AI handles reasoning, and Cloud SQL keeps sessions, tasks, and artifacts durable.",
  },
];

const judgeSteps = [
  {
    num: "1",
    text: (
      <>
        <strong>Gemini CLI</strong> — install, run <code className="font-mono text-blue-700 text-[0.85em]">gemini</code>, complete OAuth sign-in
      </>
    ),
  },
  {
    num: "2",
    text: (
      <>
        <strong>Workspace ext.</strong> — install and complete the separate Google Workspace OAuth consent
      </>
    ),
  },
  {
    num: "3",
    text: (
      <>
        <strong>Download Relay</strong> — unzip, launch, enter the passcode from the <strong>Devpost appendix</strong>
      </>
    ),
  },
];

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function Home() {
  const siteUrl = getSiteUrl().toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: siteUrl,
      },
      {
        "@type": "SoftwareApplication",
        name: SITE_NAME,
        url: siteUrl,
        applicationCategory: "DeveloperApplication",
        operatingSystem: ["macOS", "Windows"],
        description: SITE_DESCRIPTION,
        downloadUrl: [macosDownloadUrl, windowsDownloadUrl],
        sameAs: [githubRepoUrl],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--text-strong)] relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Sticky Glass Header */}
      <header className="glass-header w-full">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-4 sm:px-8 lg:px-10">
          <a
            href="#top"
            className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.22em] text-[var(--text-muted)] uppercase transition-transform hover:scale-105"
          >
            <Image
              src="/icon.png"
              alt="Relay Icon"
              width={40}
              height={40}
              priority
              className="h-10 w-10 drop-shadow-md"
            />
            Relay
          </a>

          <nav className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
            <a className="chip-link" href="#watch-demo">Watch Demo</a>
            <a className="chip-link" href="#quick-start">Quick Start</a>
            <a className="chip-link" href="#downloads">Downloads</a>
            <a className="chip-link" href="#how-it-works">How It Works</a>
            <a
              className="button-primary !py-[0.55rem] !px-[1.1rem] !text-[0.82rem] !animate-none"
              href={macosDownloadUrl}
            >
              Download ↓
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--line)] pb-10" id="top">
        {/* Background blobs */}
        <div className="absolute inset-x-0 -top-40 h-[800px] bg-[radial-gradient(ellipse_at_top,var(--blob-1),transparent_70%)] opacity-75" />
        <div className="absolute left-[5%] top-24 h-96 w-96 rounded-full bg-[var(--blob-2)] blur-3xl mix-blend-multiply opacity-55 animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute right-[5%] top-64 h-80 w-80 rounded-full bg-[var(--blob-3)] blur-3xl mix-blend-multiply opacity-55 animate-[float_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute left-1/2 top-[500px] h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--blob-1)] blur-3xl mix-blend-multiply opacity-40 animate-[float_12s_ease-in-out_infinite]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pt-10 pb-10 sm:px-8 lg:px-10 lg:pt-16">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">

            {/* Left — Product value + CTAs */}
            <div className="flex flex-col gap-8">
              <div className="space-y-5 animate-fade-in-up">
                <p className="eyebrow flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                  </span>
                  Voice Agent for the Google Ecosystem
                </p>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.5rem] leading-[1.18] py-2 pb-4">
                  Install tools,{" "}
                  download{" "}
                  <span className="inline-block pr-[0.04em] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Relay
                  </span>
                  ,{" "}
                  <br className="hidden lg:block" />
                  and start talking.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--text-soft)] sm:text-xl">
                  Relay is an Electron desktop app backed by a hosted Cloud Run
                  core. Gemini Live powers the conversation, Vertex AI handles
                  reasoning, and Gemini CLI grounds local execution on your
                  machine.
                </p>
              </div>

              {/* Primary CTAs — simplified to 2 */}
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap animate-fade-in-up delay-100">
                <a className="button-primary" href="#watch-demo">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch the demo
                </a>
                <a className="button-secondary" href={macosDownloadUrl}>
                  Download for macOS
                </a>
                <a className="button-ghost" href={githubRepoUrl} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              </div>

              {/* "How to get started" 3-step overview */}
              <div className="grid gap-4 md:grid-cols-3 pt-4 animate-fade-in-up delay-200">
                {[
                  { n: "01", label: "Gemini CLI install + sign-in", desc: "Install Gemini CLI, run `gemini`, and complete OAuth sign-in before doing anything else." },
                  { n: "02", label: "Workspace ext. + consent", desc: "Install the Workspace extension, then complete its separate Google Workspace OAuth consent." },
                  { n: "03", label: "Download Relay", desc: "With both prerequisites done, download the ZIP, unzip, and launch." },
                ].map((step) => (
                  <article key={step.n} className="step-card group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-3">
                        <span className="step-number">{step.n}</span>
                        <span className="mini-badge text-[0.73rem]">{step.label}</span>
                      </div>
                      <p className="mt-4 text-[0.93rem] leading-7 text-[var(--text-soft)]">
                        {step.desc}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right — Judge Access + Quick Start */}
            <div className="relative flex flex-col gap-5 animate-fade-in-up delay-300" id="judge-access">

              {/* Judge Access box */}
              <div className="judge-card">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-2.5 py-1 text-[0.68rem] font-800 tracking-widest text-white uppercase font-extrabold">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                    </span>
                    For Judges
                  </span>
                </div>
                <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--text-strong)] mb-3">
                  3 steps to access the hosted session
                </h2>
                <ol className="flex flex-col gap-3">
                  {judgeSteps.map((step) => (
                    <li key={step.num} className="judge-step">
                      <span className="judge-step-num">{step.num}</span>
                      <p className="text-sm leading-6 text-[var(--text-soft)]">{step.text}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    className="button-primary w-full justify-center text-[0.88rem]"
                    href={macosDownloadUrl}
                  >
                    macOS Download
                  </a>
                  <a
                    className="button-secondary w-full justify-center text-[0.88rem]"
                    href={windowsDownloadUrl}
                  >
                    Windows Download
                  </a>
                </div>
                <p className="mt-3 text-[0.78rem] leading-6 text-[var(--text-muted)] text-center">
                  Passcode in the{" "}
                  <strong className="text-[var(--text-soft)]">Devpost appendix</strong>
                  {" "}· Need early access?{" "}
                  <a
                    href="mailto:main220704@gmail.com"
                    className="underline underline-offset-3 text-[var(--text-soft)] hover:text-[var(--text-strong)] transition-colors"
                  >
                    Email me
                  </a>
                </p>
              </div>

              {/* Quick Start panel */}
              <div className="relative" id="quick-start">
                <div className="absolute inset-0 -m-4 rounded-[2.5rem] bg-[linear-gradient(145deg,rgba(83,145,255,0.08),rgba(17,24,39,0.02))] blur-2xl" />
                <div className="relative rounded-[2rem] border border-[rgba(255,255,255,0.6)] bg-[var(--card)] p-6 shadow-[var(--shadow-card)] sm:p-7 backdrop-blur-xl">
                  <div className="space-y-2">
                    <p className="eyebrow text-blue-600">Quick Start Commands</p>
                    <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--text-strong)]">
                      Run these first
                    </h2>
                    <p className="text-[0.9rem] leading-7 text-[var(--text-soft)]">
                      Install Gemini CLI, sign in, and install the Workspace
                      extension before you download Relay.
                    </p>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <CommandCopy
                      label="1. Install Gemini CLI"
                      command={geminiCliInstallCommand}
                    />
                    <CommandCopy
                      label="2. Start and sign in"
                      command={geminiCliStartCommand}
                    />
                    <CommandCopy
                      label="3. Install extension"
                      command={workspaceInstallCommand}
                    />
                  </div>

                  <p className="mt-4 text-[0.8rem] leading-6 text-[var(--text-muted)]">
                    After the extension installs, open Gemini CLI once and
                    finish the Google Workspace OAuth consent when the extension
                    prompts for access.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={geminiCliInstallUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[0.8rem] font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-3 transition-colors"
                    >
                      Gemini CLI docs ↗
                    </a>
                    <span className="text-[var(--line-strong)]">·</span>
                    <a
                      href={workspaceExtensionUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[0.8rem] font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-3 transition-colors"
                    >
                      Workspace ext. ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Watch Demo — inside hero, right below main grid */}
          <section
            id="watch-demo"
            className="grid gap-8 rounded-[2.2rem] border border-[rgba(255,255,255,0.68)] bg-[rgba(255,255,255,0.62)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl animate-fade-in-up delay-300 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:p-8"
          >
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="eyebrow text-blue-600">Watch Relay</p>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-strong)] sm:text-4xl">
                  See the hosted session before you install anything
                </h2>
                <p className="text-base leading-8 text-[var(--text-soft)]">
                  This walkthrough opens at the live product segment — judges
                  and new visitors can verify the end-to-end voice flow, task
                  handling, and local execution handoff before stepping through
                  setup.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  className="button-primary"
                  href={youtubeDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Open on YouTube
                </a>
                <a className="button-secondary" href="#quick-start">
                  Continue to setup →
                </a>
              </div>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-[1.9rem] border border-white/70 bg-slate-950 shadow-[var(--shadow-card)]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={youtubeEmbedUrl}
                title="Relay demo video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </section>
        </div>
      </section>

      {/* Downloads Section */}
      <section
        id="downloads"
        className="section-shell border-b border-[var(--line)] relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, rgba(241,245,255,0.6) 0%, var(--page-bg) 100%)" }}
      >
        <div className="absolute right-0 top-0 h-[600px] w-[600px] bg-[radial-gradient(circle_at_right,rgba(83,145,255,0.1),transparent_70%)]" />
        <div className="relative z-10 section-heading animate-fade-in-up">
          <p className="eyebrow">Downloads</p>
          <h2 className="section-title">Choose your platform</h2>
          <p className="section-copy">
            Live GitHub Release assets for the current public build. If
            prerequisites are done, you are ready to launch.
          </p>
        </div>

        <div className="relative z-10 grid gap-6 lg:grid-cols-2 animate-fade-in-up delay-100">
          {[
            {
              id: "macos-download",
              title: "macOS",
              subtitle: "Apple Silicon + Intel",
              description:
                "Universal ZIP for Apple Silicon and Intel Macs. Unzip, then open the packaged macOS build inside.",
              href: macosDownloadUrl,
              cta: "Download for macOS",
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#1d1d1f]">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              ),
            },
            {
              id: "windows-download",
              title: "Windows",
              subtitle: "x64 installer",
              description:
                "ZIP containing the Windows x64 installer. Unzip, then run the setup executable inside.",
              href: windowsDownloadUrl,
              cta: "Download for Windows",
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#0078d4]">
                  <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91V13.1l10 .15z" />
                </svg>
              ),
            },
          ].map((dl) => (
            <article key={dl.id} id={dl.id} className="download-card group">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="platform-icon">{dl.icon}</div>
                  <div>
                    <p className="text-xl font-semibold">{dl.title}</p>
                    <p className="text-sm text-[var(--text-muted)]">{dl.subtitle}</p>
                  </div>
                </div>
                <p className="max-w-xl text-base leading-7 text-[var(--text-soft)] pt-1">
                  {dl.description}
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4">
                <a
                  className="button-primary w-full justify-center sm:w-fit"
                  href={dl.href}
                >
                  {dl.cta}
                </a>
                <span className="text-sm leading-6 text-[var(--text-muted)] flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    Unzip first. Unsigned builds may trigger a standard OS security
                    warning on first launch — this is expected.
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-shell relative">
        <div className="section-heading animate-fade-in-up">
          <p className="eyebrow">How It Works</p>
          <h2 className="section-title">The system boundary is clean.</h2>
          <p className="section-copy">
            The desktop app is the user-facing surface. The hosted core owns
            live conversation and task state. Gemini CLI on the device handles
            grounded local execution.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up delay-100">
          {productPillars.map((item, i) => (
            <article
              key={item.title}
              className="info-card group relative overflow-hidden"
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-100/60 to-transparent rounded-bl-[80px] -z-10 group-hover:scale-110 transition-transform duration-500" />
              <div className="icon-pill">{item.icon}</div>
              <p className="card-index text-blue-600 mb-2">{`Phase 0${i + 1}`}</p>
              <h3 className="text-lg font-semibold text-[var(--text-strong)] mb-2">{item.title}</h3>
              <p className="card-description mt-0">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--line)] bg-[rgba(255,255,255,0.4)] backdrop-blur-md relative z-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Image
                src="/icon.png"
                alt="Relay"
                width={24}
                height={24}
                className="h-6 w-6 opacity-80"
              />
              <p className="eyebrow text-[0.8rem]">Relay</p>
            </div>
            <p className="text-[0.95rem] leading-7 text-[var(--text-soft)]">
              Voice-first desktop control for the Google ecosystem — Cloud Run
              orchestration, Gemini Live conversation, Vertex AI reasoning, and
              grounded Gemini CLI execution on your device.
            </p>
            <p className="text-sm leading-7 text-[var(--text-muted)]">
              Currently in judges-first access. For early access, email{" "}
              <a
                className="font-semibold text-[var(--text-strong)] underline decoration-[var(--line-strong)] underline-offset-4 hover:text-blue-600 transition-colors"
                href="mailto:main220704@gmail.com"
              >
                main220704@gmail.com
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm font-medium text-[var(--text-strong)] sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
            <a href={geminiCliInstallUrl} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
              Install Gemini CLI
            </a>
            <span className="hidden sm:inline text-gray-300">•</span>
            <a href={workspaceExtensionUrl} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
              Workspace extension
            </a>
            <span className="hidden sm:inline text-gray-300">•</span>
            <a href={githubRepoUrl} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
              GitHub ↗
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
