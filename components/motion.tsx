"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Scrubbed word reveal: the manifesto moment. Server-renders fully visible;
   with motion allowed, words dim and resolve as the reader scrolls through. */
export function ScrubText({
  text,
  className = "",
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "h2";
}) {
  const ref = useRef<HTMLParagraphElement | HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = ref.current!.querySelectorAll("[data-w]");
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "top 32%",
              scrub: 0.4,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} data-w className="inline">
          {word}
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/* Parallax photograph: the image drifts and settles inside its frame as it
   crosses the viewport. Wrap any <Image> marked with data-parallax-img. */
export function ParallaxFrame({
  children,
  className = "",
  strength = 1,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const img = ref.current!.querySelector("[data-parallax-img]");
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -6 * strength, scale: 1.12 },
          {
            yPercent: 6 * strength,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
