import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="frame grid min-h-[70svh] content-center gap-6">
      <p className="eyebrow">(404) - Out of frame</p>
      <h1 className="display text-[clamp(3.5rem,10vw,9rem)]">This frame <em className="text-steel-300">was never shot.</em></h1>
      <Link href="/" className="inline-flex min-h-11 w-fit items-center border-b border-ice-300 ui-label text-[0.6875rem] text-ice-100 hover:border-ice-100">
        ← Back to the index
      </Link>
    </div>
  );
}
