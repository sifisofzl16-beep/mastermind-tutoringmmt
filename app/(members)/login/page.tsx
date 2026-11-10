import Link from "next/link";
import { whatsappLink } from "@/lib/contact";
import Icon from "../../_site/Icons";
import { login, signup } from "./actions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const field =
  "w-full rounded-xl border border-navy/20 bg-white px-4 py-3 text-base outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const isSignup = sp.mode === "signup";
  const error = typeof sp.error === "string" ? sp.error : null;
  const message = typeof sp.message === "string" ? sp.message : null;

  return (
    <main className="grid flex-1 lg:grid-cols-2">
      <section className="night-grid relative hidden flex-col justify-between bg-navy p-12 text-white lg:flex">
        <Link href="/" className="font-hand text-4xl font-bold text-gold">
          Mastermind Tutoring
        </Link>
        <div>
          <h2 className="font-display text-5xl font-bold leading-[1.05] tracking-tight">
            Your whole module, <span className="text-gold">in order</span>, in one place.
          </h2>
          <ul className="mt-8 space-y-4 text-lg text-white/80">
            {[
              ["play", "Recorded lessons for every chapter"],
              ["book", "Study guides and problem sets"],
              ["live", "Live class recordings"],
              ["check", "Your progress, saved as you go"],
            ].map(([icon, text]) => (
              <li key={text} className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-gold">
                  <Icon name={icon} className="h-4 w-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm tracking-wide text-white/50">Discipline. Understanding. Systems. Results.</p>
      </section>

      <section className="flex flex-col items-center justify-center px-4 py-12">
        <div className="mb-8 text-center lg:hidden">
          <Link href="/" className="font-hand text-5xl font-bold text-navy">
            Mastermind Tutoring
          </Link>
          <p className="mt-1 text-sm tracking-wide text-navy/65">Discipline. Understanding. Systems. Results.</p>
        </div>

        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl font-bold tracking-tight">
            {isSignup ? "Create your account" : "Log in to the student portal"}
          </h1>
          <p className="mt-2 text-navy/65">
            {isSignup ? "Use the email address you gave us when you joined." : "Use the email and password we sent you when you joined."}
          </p>

          {error && (
            <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className="mt-5 rounded-xl bg-gold/20 px-4 py-3 text-sm" role="status">
              {message}
            </p>
          )}

          {isSignup ? (
            <form action={signup} className="mt-6 space-y-4">
              <div>
                <label htmlFor="full_name" className="mb-1 block text-sm font-medium">
                  Full name
                </label>
                <input id="full_name" name="full_name" type="text" required autoComplete="name" className={field} />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className={field} />
              </div>
              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium">
                  Password (8 characters or more)
                </label>
                <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className={field} />
              </div>
              <button type="submit" className="min-h-12 w-full rounded-full bg-navy px-4 py-3 font-semibold text-white hover:bg-navy-3">
                Create account
              </button>
            </form>
          ) : (
            <form action={login} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className={field} />
              </div>
              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium">
                  Password
                </label>
                <input id="password" name="password" type="password" required autoComplete="current-password" className={field} />
              </div>
              <button type="submit" className="min-h-12 w-full rounded-full bg-navy px-4 py-3 font-semibold text-white hover:bg-navy-3">
                Log in
              </button>
              <p className="text-center text-sm text-navy/65">
                Forgot your password?{" "}
                <a
                  href={whatsappLink("Hi Mastermind Tutoring, I've forgotten my student portal password.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
                >
                  Message us and we will reset it
                </a>
              </p>
            </form>
          )}

          <p className="mt-8 border-t border-navy/10 pt-6 text-center text-sm text-navy/70">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4">
                  Log in
                </Link>
              </>
            ) : (
              <>
                Not a student yet?{" "}
                <Link href="/#full-course" className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4">
                  See the Full Course
                </Link>{" "}
                or{" "}
                <Link href="/login?mode=signup" className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4">
                  create an account
                </Link>
              </>
            )}
          </p>
        </div>
      </section>
    </main>
  );
}
