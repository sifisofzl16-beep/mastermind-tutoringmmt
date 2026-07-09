import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mastermindtutoring.co.za"),
  title: "Mastermind Tutoring | Wits University Tutoring, Johannesburg",
  description:
    "Peer tutoring for Wits University students across Engineering, Commerce and Science, by tutors who passed the same modules. Online and in-person sessions. High school tutoring also available in Johannesburg.",
  keywords: [
    "Wits tutoring",
    "Wits University tutor",
    "tutoring Johannesburg",
    "Wits Engineering tutor",
    "Wits Commerce tutor",
    "high school tutoring Johannesburg",
  ],
  authors: [{ name: "Mastermind Tutoring" }],
  openGraph: {
    title: "Mastermind Tutoring | Wits University Tutoring, Johannesburg",
    description:
      "Peer tutoring for Wits University students, by tutors who passed the same modules. Online and in-person.",
    url: "https://www.mastermindtutoring.co.za",
    siteName: "Mastermind Tutoring",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mastermind Tutoring | Wits University Tutoring",
    description: "Peer tutoring for Wits students, by tutors who passed the same modules.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#06080f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
