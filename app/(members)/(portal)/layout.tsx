import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Header from "../_components/Header";

export default async function PortalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await getSession();
  if (!user) redirect("/login");

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <footer className="border-t border-navy/10 py-6 text-center text-sm text-navy/55">
        Mastermind Tutoring. Discipline. Understanding. Systems. Results.
      </footer>
    </>
  );
}
