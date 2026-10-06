import Link from "next/link";
import { getSession } from "@/lib/session";
import { logout } from "../login/actions";

export default async function Header() {
  const { profile } = await getSession();
  const name = profile?.full_name?.split(" ")[0] ?? profile?.email ?? "";

  return (
    <header className="bg-[#0D1B2A] text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/course"
          className="text-2xl leading-none text-[#F4A024] sm:text-3xl"
          style={{ fontFamily: "Caveat, cursive" }}
        >
          Mastermind Tutoring
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/course" className="hidden hover:text-[#F4A024] sm:inline">
            My courses
          </Link>
          {profile?.is_admin && (
            <Link href="/admin" className="hover:text-[#F4A024]">
              Admin
            </Link>
          )}
          <span className="hidden text-white/60 sm:inline">{name}</span>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-md border border-white/30 px-3 py-1.5 hover:border-[#F4A024] hover:text-[#F4A024]"
            >
              Log out
            </button>
          </form>
        </nav>
      </div>
      <div className="h-1 bg-[#F4A024]" />
    </header>
  );
}
