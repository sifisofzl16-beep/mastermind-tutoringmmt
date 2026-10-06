import Link from "next/link";
import { login, signup } from "./actions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const field =
  "w-full rounded-lg border border-[#0D1B2A]/20 bg-white px-4 py-3 text-base outline-none focus:border-[#F4A024] focus:ring-2 focus:ring-[#F4A024]/30";

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
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <div className="mb-8 text-center">
        <p
          className="text-5xl text-[#0D1B2A]"
          style={{ fontFamily: "Caveat, cursive" }}
        >
          Mastermind Tutoring
        </p>
        <p className="mt-1 text-sm tracking-wide text-[#0D1B2A]/70">
          Discipline. Understanding. Systems. Results.
        </p>
      </div>

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#0D1B2A]/10 sm:p-8">
        <h1 className="text-xl font-semibold">
          {isSignup ? "Create your account" : "Log in to your course"}
        </h1>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className="mt-4 rounded-lg bg-[#F4A024]/15 px-4 py-3 text-sm text-[#0D1B2A]" role="status">
            {message}
          </p>
        )}

        {isSignup ? (
          <form action={signup} className="mt-5 space-y-4">
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
            <button type="submit" className="w-full rounded-lg bg-[#0D1B2A] px-4 py-3 font-semibold text-white hover:bg-[#16293f]">
              Create account
            </button>
          </form>
        ) : (
          <form action={login} className="mt-5 space-y-4">
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
            <button type="submit" className="w-full rounded-lg bg-[#0D1B2A] px-4 py-3 font-semibold text-white hover:bg-[#16293f]">
              Log in
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-[#0D1B2A]/70">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[#0D1B2A] underline decoration-[#F4A024] underline-offset-4">
                Log in
              </Link>
            </>
          ) : (
            <>
              New to Mastermind Tutoring?{" "}
              <Link href="/login?mode=signup" className="font-semibold text-[#0D1B2A] underline decoration-[#F4A024] underline-offset-4">
                Create an account
              </Link>
            </>
          )}
        </p>
      </div>

      <Link href="/" className="mt-6 text-sm text-[#0D1B2A]/70 underline underline-offset-4">
        Back to mastermindtutoring.co.za
      </Link>
    </main>
  );
}
