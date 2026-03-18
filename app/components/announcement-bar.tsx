"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "relay_announcement_dismissed_v1";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="announcement-bar" role="banner" aria-label="For judges announcement">
      <div className="announcement-bar-inner">
        <span className="announcement-bar-badge">For Judges</span>
        <p className="announcement-bar-text">
          Complete Gemini CLI OAuth sign-in{" "}
          <strong>and</strong> Workspace extension consent first, then open
          Relay and enter the passcode from the{" "}
          <strong>Devpost appendix</strong> to access the hosted session.
        </p>
        <a
          href="#judge-access"
          className="announcement-bar-link"
          onClick={dismiss}
        >
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
