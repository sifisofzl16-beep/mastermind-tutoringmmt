import Link from "next/link";

export default function NotFound() {
  return (
    <main className="paper-grid grid min-h-screen flex-1 place-items-center px-4 py-20 text-center">
      <div>
        <p className="font-hand text-4xl font-bold text-amber">Page 404</p>
        <h1 className="mt-2 font-display text-5xl font-bold tracking-tight">That page is not in the notes.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-navy/70">The link may be old, or the page may have moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex min-h-12 items-center rounded-full bg-navy px-6 py-3 font-semibold text-white">
            Go to the home page
          </Link>
          <Link href="/course" className="inline-flex min-h-12 items-center rounded-full px-6 py-3 font-semibold ring-1 ring-navy/25">
            Open the student portal
          </Link>
        </div>
      </div>
    </main>
  );
}
