"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/* Scroll reveal, progressive-enhancement style: content is server-rendered
   visible. After hydration, elements still below the fold are hidden and
   rise into view once. No JS (or reduced motion) means no hiding at all. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen: leave it static, no flicker.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setPhase("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reveal when intersecting, or when already scrolled past (e.g.
        // after an anchor jump landed further down the page).
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${phase === "hidden" ? "reveal-hidden" : ""} ${
        phase === "shown" ? "reveal-shown" : ""
      }`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
