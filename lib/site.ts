const defaultSiteUrl = "http://localhost:3000";

function normalizeUrl(value?: string | null) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  const withProtocol = trimmed.startsWith("http")
    ? trimmed
    : `https://${trimmed}`;

  return withProtocol.replace(/\/+$/, "");
}

export function getSiteUrl() {
  const resolvedUrl =
    normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeUrl(process.env.SITE_URL) ??
    normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeUrl(process.env.VERCEL_URL) ??
    defaultSiteUrl;

  return new URL(resolvedUrl);
}

export const SITE_NAME = "Relay";
export const SITE_TITLE = "Relay | Voice Agent for the Google Ecosystem";
export const SITE_DESCRIPTION =
  "Relay is a desktop voice agent with a Cloud Run hosted core, Gemini Live conversation, Vertex AI reasoning, and grounded Gemini CLI execution on the user's device.";
export const SITE_LOCALE = "en_US";
export const SITE_KEYWORDS = [
  "Relay",
  "voice agent",
  "Gemini CLI",
  "Google ecosystem",
  "desktop voice control",
  "Cloud Run",
  "Vertex AI",
  "Gemini Live",
];
