export default function Loading() {
  return (
    <div className="frame pt-16" aria-busy="true" aria-live="polite">
      <div className="h-6 w-40 animate-pulse rounded-full bg-ice-100/10" />
      <div className="mt-6 h-24 w-3/4 animate-pulse rounded-2xl bg-ice-100/10" />
      <div className="mt-10 aspect-[21/9] animate-pulse rounded-3xl bg-ice-100/[0.06]" />
    </div>
  );
}
