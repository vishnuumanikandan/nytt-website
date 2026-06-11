import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-paper px-5 text-center">
      <Image
        src="/images/nytt-mark.png"
        alt=""
        width={56}
        height={56}
        className="rounded-[2px]"
      />
      <h1 className="mt-7 font-display text-4xl font-extrabold tracking-tight text-ink">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-ink-muted">
        This page does not exist or has moved. The work, however, continues.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-[2px] bg-btn px-7 py-3.5 font-semibold text-btn-fg transition-colors hover:bg-btn-hover"
      >
        Back to the homepage
      </Link>
    </div>
  );
}
