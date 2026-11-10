import Link from "next/link";
import { getSession } from "@/lib/session";
import Icon from "../../_site/Icons";
import { logout } from "../login/actions";

export default async function Header() {
  const { profile } = await getSession();
  const name = profile?.full_name?.split(" ")[0] ?? "";
  const initial = (name || profile?.email || "?").charAt(0).toUpperCase();
  const link = "rounded-full px-3.5 py-2 text-white/80 hover:bg-white/10 hover:text-white";

  return (
    <header className="sticky top-0 z-40 bg-navy text-white shadow-[0_1px_0_0_var(--color-gold)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/course" className="font-hand text-[1.65rem] font-bold leading-none text-gold sm:text-3xl">
          Mastermind Tutoring
        </Link>
        <nav aria-label="Portal" className="flex items-center gap-1 text-sm font-medium">
          <Link href="/course" className={`${link} hidden sm:inline-flex`}>
            My courses
          </Link>
          {profile?.is_admin && (
            <Link href="/admin" className={link}>
              Admin
            </Link>
          )}
          <Link href="/account" className="ml-1 flex items-center gap-2 rounded-full py-1 pl-1 pr-1 hover:bg-white/10 sm:pr-3.5" aria-label="Your account">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold font-display text-base font-bold text-navy">{initial}</span>
            {name && <span className="hidden text-white/85 sm:inline">{name}</span>}
          </Link>
          <form action={logout}>
            <button type="submit" className="ml-1 rounded-full px-3.5 py-2 ring-1 ring-white/25 hover:ring-gold hover:text-gold">
              Log out
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}

export function PortalBack({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-medium text-navy/65 hover:text-navy">
      <Icon name="arrow" className="h-4 w-4 rotate-180" />
      {children}
    </Link>
  );
}
