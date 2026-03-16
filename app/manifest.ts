import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME, getSiteUrl } from "../lib/site";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = getSiteUrl();

  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f7fc",
    theme_color: "#1f5eff",
    icons: [
      {
        src: new URL("/favicon.ico", siteUrl).toString(),
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
