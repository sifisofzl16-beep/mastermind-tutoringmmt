import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--ff-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--ff-body", display: "swap" });
const hand = Caveat({ subsets: ["latin"], weight: ["600", "700"], variable: "--ff-hand", display: "swap" });

const title = "Mastermind Tutoring | Maths and Science Tutors, Johannesburg";
const description =
  "Maths and Physical Sciences tutoring for Grades 10 to 12, focused on matric, from Wits students who did well in these subjects. Plus Full Courses and tutoring for university students. Online, or in person in Johannesburg.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mastermindtutoring.co.za"),
  title,
  description,
  keywords: [
    "Wits tutoring",
    "Wits University tutor",
    "Wits Engineering Physics",
    "MATH1043",
    "PHYS1034",
    "tutoring Johannesburg",
    "high school maths tutor Johannesburg",
  ],
  authors: [{ name: "Mastermind Tutoring" }],
  openGraph: {
    title,
    description,
    url: "https://www.mastermindtutoring.co.za",
    siteName: "Mastermind Tutoring",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1B2A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${hand.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NHC974LQ6P"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NHC974LQ6P');
          `}
        </Script>
      </body>
    </html>
  );
}
