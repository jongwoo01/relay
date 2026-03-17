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

const installSteps = [
  {
    number: "01",
    title: "Gemini CLI install + sign-in",
    description:
      "Install Gemini CLI, launch `gemini`, and complete the Gemini CLI OAuth sign-in first. Relay cannot use grounded local execution if the CLI is installed but not authenticated.",
  },
  {
    number: "02",
    title: "Workspace ext. install + consent",
    description:
      "Install the Workspace extension, then complete its separate Google Workspace OAuth consent when Gemini CLI first prompts for Docs, Drive, or Gmail access. Relay needs the extension to be both installed and authorized.",
  },
  {
    number: "03",
    title: "Download Relay",
    description:
      "After Gemini CLI sign-in and Workspace extension consent are both complete, download the ZIP for your OS, unzip it, and launch Relay.",
  },
];

const downloads = [
  {
    id: "macos-download",
    title: "macOS ZIP",
    description:
      "ZIP download for Apple Silicon and Intel Macs. Unzip it, then open the packaged macOS build inside.",
    href: macosDownloadUrl,
    cta: "Download for macOS",
  },
  {
    id: "windows-download",
    title: "Windows ZIP",
    description:
      "ZIP download containing the Windows x64 installer. Unzip it, then run the setup executable inside.",
    href: windowsDownloadUrl,
    cta: "Download for Windows",
  },
];

const productPillars = [
  {
    title: "Desktop surface",
    description:
      "Relay is an Electron and React desktop app built for realtime voice input, playback, transcript, and task visibility.",
  },
  {
    title: "Hosted agent core",
    description:
      "Cloud Run owns the Gemini Live session, orchestration, and canonical task state instead of hiding product logic inside the desktop shell.",
  },
  {
    title: "Grounded local execution",
    description:
      "When work must happen on your machine, Relay delegates it through Gemini CLI on device so the result is grounded in real local state.",
  },
  {
    title: "Persistent continuity",
    description:
      "Gemini Live handles the conversation, Vertex AI handles reasoning, and Cloud SQL keeps sessions, tasks, and artifacts durable.",
  },
];

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/",
  },
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
            <a className="chip-link" href="#watch-demo">
              Watch Demo
            </a>
            <a className="chip-link" href="#quick-start">
              Quick Start
            </a>
            <a className="chip-link" href="#downloads">
              Downloads
            </a>
            <a className="chip-link" href="#how-it-works">
              How It Works
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--line)] pb-10" id="top">
        {/* Dynamic Background Blobs */}
        <div className="absolute inset-x-0 -top-40 h-[800px] bg-[radial-gradient(ellipse_at_top,var(--blob-1),transparent_70%)] opacity-80" />
        <div className="absolute left-[5%] top-24 h-96 w-96 rounded-full bg-[var(--blob-2)] blur-3xl mix-blend-multiply opacity-40 animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute right-[5%] top-64 h-80 w-80 rounded-full bg-[var(--blob-3)] blur-3xl mix-blend-multiply opacity-40 animate-[float_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute left-1/2 top-[500px] h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--blob-1)] blur-3xl mix-blend-multiply opacity-30 animate-[float_12s_ease-in-out_infinite]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pt-10 pb-10 sm:px-8 lg:px-10 lg:pt-16">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] animate-fade-in-up">
            <article className="notice-card">
              <p className="eyebrow">For Judges</p>
              <p className="mt-3 text-base leading-7 text-[var(--text-soft)]">
                Install Gemini CLI and finish its OAuth sign-in, install the
                Workspace extension, then complete the separate Google
                Workspace OAuth consent for the extension when it first asks
                for Docs, Drive, or Gmail access. Only after both
                authenticated prerequisites are ready should you open Relay and
                enter the judge passcode from the Devpost appendix to access
                the hosted session.
              </p>
            </article>
            <article className="notice-card">
              <p className="eyebrow">Public Access</p>
              <p className="mt-3 text-base leading-7 text-[var(--text-soft)]">
                Relay is currently opened for judges first. If you want early
                access before the wider release, contact{" "}
                <a
                  className="font-semibold text-[var(--text-strong)] underline decoration-[var(--line-strong)] underline-offset-4"
                  href="mailto:main220704@gmail.com"
                >
                  main220704@gmail.com
                </a>
                .
              </p>
            </article>
          </div>

          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            
            {/* Left Content */}
            <div className="flex flex-col gap-8">
              <div className="space-y-5 animate-fade-in-up">
                <p className="eyebrow flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Voice Agent for the Google Ecosystem
                </p>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.5rem] leading-[1.2] py-2 pb-4">
                  Install tools, download <span className="inline-block pr-[0.04em] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Relay</span>, <br className="hidden lg:block"/> and start talking.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--text-soft)] sm:text-xl">
                  Relay is an Electron desktop app backed by a hosted Cloud Run
                  core. Gemini Live powers the conversation, Vertex AI handles
                  reasoning, and Gemini CLI grounds local execution on your
                  machine.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap animate-fade-in-up delay-100">
                <a className="button-secondary" href="#watch-demo">
                  Watch the demo
                </a>
                <a className="button-primary" href="#quick-start">
                  Start with install commands
                </a>
                <a className="button-ghost" href="#downloads">
                  Go to downloads
                </a>
                <a
                  className="button-ghost"
                  href={githubRepoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </a>
              </div>

              <div className="grid gap-5 md:grid-cols-3 pt-6 animate-fade-in-up delay-200">
                {installSteps.map((step) => (
                  <article key={step.number} className="step-card group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-3">
                        <span className="step-number">{step.number}</span>
                        <span className="mini-badge">{step.title}</span>
                      </div>
                      <p className="mt-4 text-[0.95rem] leading-7 text-[var(--text-soft)]">
                        {step.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

            </div>

            {/* Right Content / Quick Start Box */}
            <div className="relative animate-fade-in-up delay-300" id="quick-start">
              <div className="absolute inset-0 -m-4 rounded-[2.5rem] bg-[linear-gradient(145deg,rgba(83,145,255,0.1),rgba(17,24,39,0.02))] blur-2xl" />
              <div className="relative rounded-[2rem] border border-[rgba(255,255,255,0.6)] bg-[var(--card)] p-6 shadow-[var(--shadow-card)] sm:p-8 backdrop-blur-xl">
                <div className="space-y-3">
                  <p className="eyebrow text-blue-600">Quick Start</p>
                  <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-strong)] sm:text-4xl">
                    Ready your setup
                  </h2>
                  <p className="text-[0.95rem] leading-7 text-[var(--text-soft)]">
                    This is the shortest path to a working Relay setup. Install
                    Gemini CLI and complete its sign-in, install the Workspace
                    extension, then finish the extension Google Workspace OAuth
                    consent before you download Relay.
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-[1.2rem] border border-blue-200/50 bg-blue-50/50 p-4">
                    <p className="eyebrow mb-2">Required Core</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="mini-badge mini-badge-strong">Gemini CLI</span>
                      <span className="mini-badge mini-badge-strong">Workspace Ext.</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
                      Gemini CLI sign-in and Workspace extension consent are
                      separate checks. Package installation alone is not enough.
                    </p>
                  </div>

                  <div className="grid gap-4">
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
                  <p className="text-sm leading-6 text-[var(--text-soft)]">
                    Before launching Relay, open Gemini CLI once after the
                    extension install and finish the separate Google Workspace
                    OAuth consent flow when the extension asks for access.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <a
                    className="button-primary w-full justify-center text-[0.9rem]"
                    href={macosDownloadUrl}
                  >
                    Mac Download
                  </a>
                  <a
                    className="button-secondary w-full justify-center text-[0.9rem]"
                    href={windowsDownloadUrl}
                  >
                    Win Download
                  </a>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <article className="install-note">
                    <p className="install-note-title">Authentication required</p>
                    <p className="install-note-copy text-[0.85rem]">
                      Gemini CLI sign-in and Workspace extension Google
                      Workspace consent must both be completed before Relay can
                      use grounded local execution.
                    </p>
                  </article>
                  <article className="install-note">
                    <p className="install-note-title">What you download</p>
                    <p className="install-note-copy text-[0.85rem]">
                      Platform links point to Release ZIPs. Unzip first, then open it.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>

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
                  This embedded walkthrough opens at the live product segment so
                  judges and new visitors can verify the end-to-end experience
                  before stepping through setup.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <article className="install-note">
                  <p className="install-note-title">Why it is here</p>
                  <p className="install-note-copy text-[0.9rem]">
                    The video gives immediate proof of the hosted voice flow,
                    task handling, and local execution handoff.
                  </p>
                </article>
                <article className="install-note">
                  <p className="install-note-title">Direct link</p>
                  <p className="install-note-copy text-[0.9rem]">
                    Need a larger view or comments? Open the original YouTube
                    page directly.
                  </p>
                </article>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  className="button-primary"
                  href={youtubeDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open on YouTube
                </a>
                <a className="button-secondary" href="#quick-start">
                  Continue to setup
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
      <section id="downloads" className="section-shell border-b border-[var(--line)] relative overflow-hidden">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] bg-[radial-gradient(circle_at_right,rgba(83,145,255,0.08),transparent_70%)]" />
        <div className="relative z-10 section-heading animate-fade-in-up">
          <p className="eyebrow">Downloads</p>
          <h2 className="section-title">
            Choose your platform
          </h2>
          <p className="section-copy">
            These are the live GitHub Release assets for the current public
            build. If you have already configured the prerequisites, you are ready.
          </p>
        </div>

        <div className="relative z-10 grid gap-6 lg:grid-cols-2 animate-fade-in-up delay-100">
          {downloads.map((download) => (
            <article
              key={download.title}
              id={download.id}
              className="download-card group"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-blue-50 border border-white shadow-sm group-hover:shadow-md transition-shadow">
                    <span className="text-xl">💻</span>
                  </div>
                  <p className="text-xl font-semibold">{download.title}</p>
                </div>
                <p className="max-w-xl text-base leading-7 text-[var(--text-soft)] pt-2">
                  {download.description}
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4">
                <a
                  className="button-primary w-full justify-center sm:w-fit"
                  href={download.href}
                >
                  {download.cta}
                </a>
                <span className="text-sm leading-6 text-[var(--text-muted)] flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Unzip first. Unsigned builds may still trigger a standard OS warning before the first launch.</span>
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
          <h2 className="section-title">
            The system boundary is clean.
          </h2>
          <p className="section-copy">
            The desktop app is the user-facing surface. The hosted core owns
            live conversation and task truth. Gemini CLI on the device handles
            grounded local execution.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up delay-100">
          {productPillars.map((item, i) => (
            <article key={item.title} className="info-card group relative overflow-hidden" style={{ animationDelay: `${(i+1)*100}ms` }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-transparent rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500" />
              <p className="card-index text-blue-600 mb-4">{`Phase 0${i+1}`}</p>
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
            <p className="eyebrow text-[0.8rem]">Relay</p>
            <p className="text-[0.95rem] leading-7 text-[var(--text-soft)]">
              Voice-first desktop control for the Google ecosystem, with Cloud
              Run orchestration, Gemini Live conversation, Vertex AI reasoning,
              and grounded Gemini CLI execution on the device.
            </p>
            <p className="text-sm leading-7 text-[var(--text-muted)]">
              This landing page is currently optimized for challenge judges. If
              you want early access before the wider release, email{" "}
              <a
                className="font-semibold text-[var(--text-strong)] underline decoration-[var(--line-strong)] underline-offset-4"
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
              GitHub repository
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
