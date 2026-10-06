import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mastermind Tutoring",
    short_name: "Mastermind",
    description: "Your Mastermind Tutoring Full Course: study guides, practice questions and live classes.",
    start_url: "/course",
    display: "standalone",
    background_color: "#0D1B2A",
    theme_color: "#0D1B2A",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
