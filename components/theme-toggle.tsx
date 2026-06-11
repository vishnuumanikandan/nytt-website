"use client";

import { useSyncExternalStore } from "react";
import { Lightbulb, LightbulbFilament } from "@phosphor-icons/react";

/* The theme lives on <html data-theme>, set pre-paint by the head script.
   useSyncExternalStore keeps this button in sync without hydration drift. */
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getTheme(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/* The NYTT mark is a lightbulb, so the theme switch is the light switch.
   Filament glowing = lights on (light theme). */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => null);

  function toggle() {
    const next = getTheme() === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-fade");
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("nytt-theme", next);
    } catch {}
    window.setTimeout(() => root.classList.remove("theme-fade"), 420);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      title={theme === "dark" ? "Lights on" : "Lights off"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-[2px] border border-line text-ink transition-colors duration-200 hover:border-gold-strong hover:text-gold-strong ${className}`}
    >
      {theme === null ? (
        <span className="block h-[18px] w-[18px]" aria-hidden />
      ) : theme === "dark" ? (
        <Lightbulb size={18} weight="regular" aria-hidden />
      ) : (
        <LightbulbFilament size={18} weight="fill" aria-hidden />
      )}
    </button>
  );
}
