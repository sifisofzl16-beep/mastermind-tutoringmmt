import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Portal | Mastermind Tutoring",
  robots: { index: false, follow: false },
};

export default function MembersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-[#F7F4EC] text-[#0D1B2A]">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
      />
      {children}
    </div>
  );
}
