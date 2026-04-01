"use client";

import { useMemo, useSyncExternalStore } from "react";

export type PlatformId = "macos" | "windows";

type DownloadOption = {
  id: PlatformId;
  href: string;
  label: string;
  shortLabel: string;
};

declare global {
  interface NavigatorUAData {
    platform?: string;
  }

  interface Navigator {
    userAgentData?: NavigatorUAData;
  }
}

const platformLabels: Record<PlatformId, string> = {
  macos: "macOS",
  windows: "Windows",
};

function detectPlatform(): PlatformId | null {
  if (typeof navigator === "undefined") return null;

  const signal = [
    navigator.userAgentData?.platform,
    navigator.platform,
    navigator.userAgent,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (signal.includes("win")) return "windows";
  if (signal.includes("mac")) return "macos";
  return null;
}

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return detectPlatform();
}

function getServerSnapshot() {
  return null;
}

function useDetectedPlatform() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function useOrderedOptions(macosUrl: string, windowsUrl: string) {
  const platform = useDetectedPlatform();

  const options = useMemo<DownloadOption[]>(
    () => [
      {
        id: "macos",
        href: macosUrl,
        label: "Download for macOS",
        shortLabel: platformLabels.macos,
      },
      {
        id: "windows",
        href: windowsUrl,
        label: "Download for Windows",
        shortLabel: platformLabels.windows,
      },
    ],
    [macosUrl, windowsUrl],
  );

  if (!platform) {
    return { platform, options };
  }

  return {
    platform,
    options: [
      options.find((option) => option.id === platform)!,
      options.find((option) => option.id !== platform)!,
    ],
  };
}

export function HeroDownloadChooser({
  macosUrl,
  windowsUrl,
}: {
  macosUrl: string;
  windowsUrl: string;
}) {
  const { platform, options } = useOrderedOptions(macosUrl, windowsUrl);

  return (
    <div className="rounded-[1.7rem] border border-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.62)] p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-5 animate-fade-in-up delay-200">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="eyebrow text-blue-600">Choose Your Build</p>
          <p className="text-sm leading-6 text-[var(--text-soft)]">
            Pick the installer for the machine where Relay will run.
          </p>
        </div>
        {platform ? (
          <span className="mini-badge mini-badge-strong">
            Recommended: {platformLabels[platform]}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {options.map((option) => {
          const isRecommended = option.id === platform;
          return (
            <a
              key={option.id}
              className={isRecommended ? "button-primary" : "button-secondary"}
              href={option.href}
            >
              {option.label}
            </a>
          );
        })}
      </div>

      <p className="mt-3 text-[0.82rem] leading-6 text-[var(--text-muted)]">
        {platform
          ? `This browser looks like ${platformLabels[platform]}. If you are downloading for another machine, pick that platform instead.`
          : "Platform detection is only used to recommend a build. Both installers stay available so you can choose explicitly."}
      </p>
    </div>
  );
}

export function DownloadsRecommendationNote() {
  const platform = useDetectedPlatform();

  return (
    <p className="text-sm leading-6 text-[var(--text-muted)]">
      {platform
        ? `Recommended for this browser: ${platformLabels[platform]}. The other build is still listed in case you are downloading for a different computer.`
        : "Choose the installer that matches the computer where you will run Relay."}
    </p>
  );
}

export function RecommendedPlatformBadge({
  platformId,
}: {
  platformId: PlatformId;
}) {
  const platform = useDetectedPlatform();

  if (platform !== platformId) return null;

  return (
    <span className="mini-badge mini-badge-strong">
      Recommended for this browser
    </span>
  );
}
