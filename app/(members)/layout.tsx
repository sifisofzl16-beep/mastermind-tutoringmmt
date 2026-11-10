import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Portal | Mastermind Tutoring",
  robots: { index: false, follow: false },
};

export default function MembersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex min-h-screen flex-col bg-cream text-navy">{children}</div>;
}
