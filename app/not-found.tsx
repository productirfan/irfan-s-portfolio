import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-gutter mx-auto w-full py-24">
      <p className="text-sm text-muted">404</p>
      <h1 className="mt-3 font-display text-3xl">This page isn’t here.</h1>
      <Link href="/" className="mt-6 inline-flex min-h-11 items-center squiggle">
        Back home
      </Link>
    </div>
  );
}
