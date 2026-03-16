import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Relay | Voice Agent for the Google Ecosystem",
  description:
    "Relay is a desktop voice agent with a Cloud Run hosted core, Gemini Live conversation, Vertex AI reasoning, and grounded Gemini CLI execution on the user's device.",
  openGraph: {
    title: "Relay | Voice Agent for the Google Ecosystem",
    description:
      "Desktop voice control backed by a hosted cloud core and grounded local execution through Gemini CLI.",
    siteName: "Relay",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Relay | Voice Agent for the Google Ecosystem",
    description:
      "Realtime voice control with a hosted cloud brain and grounded local execution.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} antialiased`}>{children}</body>
    </html>
  );
}
