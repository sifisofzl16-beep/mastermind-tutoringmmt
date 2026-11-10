export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="skeleton h-5 w-28 rounded-full bg-navy/10" />
      <div className="skeleton mt-4 h-44 rounded-3xl bg-navy/15" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="skeleton h-28 rounded-2xl bg-navy/10" />
        ))}
      </div>
    </div>
  );
}
