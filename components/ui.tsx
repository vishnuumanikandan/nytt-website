import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

/* Document-register controls: near-sharp corners, firm borders, one label per intent. */

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-[2px] font-sans font-semibold transition-colors duration-150 active:translate-y-px disabled:opacity-50 disabled:pointer-events-none";

const buttonVariants = {
  /* primary: royal ink in light mode, gold plate in dark (via tokens) */
  primary: "bg-btn text-btn-fg hover:bg-btn-hover",
  secondary: "border border-ink/30 text-ink hover:border-ink hover:bg-paper-shade",
  gold: "bg-gold text-gold-fg hover:brightness-[0.93]",
  onNavy: "border border-line-navy text-on-navy hover:bg-white/10",
} as const;

const buttonSizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
} as const;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: {
  href: string;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<"button"> & {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}) {
  return (
    <button
      className={`${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    />
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs text-ink-muted">{hint}</p> : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-[2px] border border-ink/30 bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

export function Input(props: ComponentProps<"input">) {
  return <input className={inputClass} {...props} />;
}

export function Textarea(props: ComponentProps<"textarea">) {
  return <textarea className={`${inputClass} min-h-28`} {...props} />;
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="rounded-[2px] border border-error/30 bg-error-soft px-3.5 py-2.5 text-sm font-medium text-error"
    >
      {message}
    </p>
  );
}

export function StatusBadge({
  status,
}: {
  status: "pending" | "approved" | "founding";
}) {
  const styles = {
    approved: "bg-success-soft text-success border-success/25",
    pending: "bg-warning-soft text-warning border-warning/25",
    founding: "bg-navy text-gold border-navy",
  } as const;
  const labels = {
    approved: "Approved",
    pending: "Pending review",
    founding: "Founding chapter",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-[2px] border px-2 py-0.5 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
