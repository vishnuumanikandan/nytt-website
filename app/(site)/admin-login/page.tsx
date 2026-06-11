import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionAdmin } from "@/lib/auth";
import { AdminLoginForm } from "./admin-login-form";

export const metadata: Metadata = {
  title: "Administrator login",
  robots: { index: false },
};

export default async function AdminLoginPage() {
  const admin = await getSessionAdmin();
  if (admin) redirect("/admin");

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-md px-5 py-16 md:py-24">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          Administrator access
        </h1>
        <p className="mt-3 text-ink-muted">
          For NYTT staff managing chapters, the Journal, and events.
        </p>

        <div className="mt-10 border border-line bg-surface p-7 md:p-8">
          <AdminLoginForm />
        </div>
      </div>
    </section>
  );
}
