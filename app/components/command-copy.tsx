"use client";

import { useState } from "react";

type CommandCopyProps = {
  command: string;
  label: string;
};

export function CommandCopy({ command, label }: CommandCopyProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="command-box transition-all">
      <div className="command-meta">
        <span>{label}</span>
        <button 
          className={`copy-button ${copied ? '!bg-green-500 !text-white !border-green-500' : ''}`} 
          type="button" 
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="command-pre">
        <code>{command}</code>
      </pre>
    </div>
  );
}
