const localSiteUrl = "http://localhost:3000";
const productionSiteUrl = "https://relay.leejongwoo.com";
let hasWarnedAboutSiteUrl = false;

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
  const explicitSiteUrl =
    normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeUrl(process.env.SITE_URL);
  const platformSiteUrl =
    normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeUrl(process.env.VERCEL_URL);
  const fallbackSiteUrl =
    process.env.NODE_ENV === "production" ? productionSiteUrl : localSiteUrl;

  const resolvedUrl = explicitSiteUrl ?? platformSiteUrl ?? fallbackSiteUrl;

  if (process.env.NODE_ENV === "production" && !hasWarnedAboutSiteUrl) {
    if (!explicitSiteUrl && platformSiteUrl) {
      console.warn(
        "[seo] NEXT_PUBLIC_SITE_URL is not set. Canonical, robots, sitemap, and JSON-LD will use the detected Vercel host. Set NEXT_PUBLIC_SITE_URL to your final production domain.",
      );
      hasWarnedAboutSiteUrl = true;
    } else if (!explicitSiteUrl && !platformSiteUrl) {
      console.warn(
        `[seo] No production site URL is configured. Canonical, robots, sitemap, and JSON-LD are falling back to ${productionSiteUrl}. Set NEXT_PUBLIC_SITE_URL if you want to override it.`,
      );
      hasWarnedAboutSiteUrl = true;
    }
  }

  return new URL(resolvedUrl);
}

export const SITE_NAME = "Relay";
export const SITE_TITLE =
  "Relay | Desktop Voice Agent for Google Workspace and Gemini CLI";
export const SITE_DESCRIPTION =
  "Relay is a desktop voice agent for Google Workspace workflows and local desktop tasks, combining a hosted Gemini Live session, Vertex AI reasoning, and grounded Gemini CLI execution on your device.";
export const SITE_LOCALE = "en_US";
export const SITE_KEYWORDS = [
  "Relay",
  "desktop voice agent",
  "desktop voice assistant",
  "voice agent",
  "Gemini CLI",
  "Google Workspace voice assistant",
  "Google Workspace automation",
  "desktop voice control",
  "local desktop tasks",
  "Cloud Run",
  "Vertex AI",
  "Gemini Live",
];
