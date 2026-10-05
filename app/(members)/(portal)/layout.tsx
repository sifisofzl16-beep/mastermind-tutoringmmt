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
      <main className="mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
    </>
  );
}
