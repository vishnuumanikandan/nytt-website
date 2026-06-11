"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "./ui";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/about", label: "About" },
  { href: "/mission", label: "Programs" },
  { href: "/chapters", label: "Chapters" },
  { href: "/blog", label: "Journal" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
];

export function SiteNav({ session }: { session: "chapter" | "admin" | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const accountHref =
    session === "admin" ? "/admin" : session === "chapter" ? "/dashboard" : "/login";
  const accountLabel = session ? "Dashboard" : "Log in";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-6 px-5 md:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="National Youth Think Tank, home"
        >
          <Image
            src="/images/nytt-mark.png"
            alt=""
            width={36}
            height={36}
            className="rounded-[2px]"
            priority
          />
          <span className="font-display text-xl font-extrabold tracking-tight text-brand">
            NYTT
          </span>
          <span className="hidden xl:block pl-3 border-l border-line text-[13px] leading-tight font-medium text-ink-muted max-w-36">
            National Youth Think Tank
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              className={`nav-link text-sm font-semibold transition-colors ${
                pathname === l.href ? "text-accent" : "text-ink hover:text-accent"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href={accountHref}
            className="text-sm font-semibold text-ink hover:text-accent transition-colors"
          >
            {accountLabel}
          </Link>
          <ButtonLink href="/register" size="md">
            Apply
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="relative h-10 w-10 -mr-1 text-ink"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {/* Hamburger that morphs into an X */}
            <span
              aria-hidden
              className={`absolute left-1/2 top-1/2 block h-[2px] w-5 -translate-x-1/2 bg-current transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "rotate-45" : "-translate-y-[4px]"
              }`}
            />
            <span
              aria-hidden
              className={`absolute left-1/2 top-1/2 block h-[2px] w-5 -translate-x-1/2 bg-current transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "-rotate-45" : "translate-y-[4px]"
              }`}
            />
          </button>
        </div>
      </nav>

      {open ? (
        <div className="lg:hidden fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto border-t border-line bg-paper/95 backdrop-blur-xl px-5 pb-10">
          <div className="flex flex-col divide-y divide-line">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                style={{ "--i": i } as React.CSSProperties}
                className="menu-item py-4 font-display text-2xl font-bold text-ink hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={accountHref}
              onClick={closeMenu}
              style={{ "--i": links.length } as React.CSSProperties}
              className="menu-item py-4 font-display text-2xl font-bold text-ink hover:text-accent transition-colors"
            >
              {accountLabel}
            </Link>
          </div>
          <div
            className="menu-item mt-8"
            style={{ "--i": links.length + 1 } as React.CSSProperties}
            onClick={closeMenu}
          >
            <ButtonLink href="/register" size="lg" className="w-full">
              Apply
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
