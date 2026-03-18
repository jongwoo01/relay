"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const STORAGE_KEY = "relay_announcement_dismissed_v1";
const CHANGE_EVENT = "relay-announcement-change";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}

function getServerSnapshot() {
  return true;
}

export function AnnouncementBar() {
  const visible = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;

    if (!visible) {
      root.style.setProperty("--announcement-height", "0px");
      return;
    }

    const element = barRef.current;
    if (!element) return;

    const updateHeight = () => {
      root.style.setProperty(
        "--announcement-height",
        `${element.getBoundingClientRect().height}px`,
      );
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
      root.style.setProperty("--announcement-height", "0px");
    };
  }, [visible]);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  if (!visible) return null;

  return (
    <div
      ref={barRef}
      className="announcement-bar"
      role="banner"
      aria-label="For judges announcement"
    >
      <div className="announcement-bar-inner">
        <span className="announcement-bar-badge">Judge Access</span>
        <p className="announcement-bar-text">
          Challenge judges: complete Gemini CLI OAuth sign-in{" "}
          <strong>and</strong> Workspace extension consent first, then open
          Relay and enter the passcode from the{" "}
          <strong>Devpost appendix</strong> to access the hosted session.
        </p>
        <a href="#judge-access" className="announcement-bar-link">
          Full guide ↓
        </a>
        <button
          type="button"
          className="announcement-bar-close"
          onClick={dismiss}
          aria-label="Dismiss announcement"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
