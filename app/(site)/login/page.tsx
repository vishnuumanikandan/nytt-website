import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionChapter } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your NYTT chapter account.",
};

export default async function LoginPage() {
  const chapter = await getSessionChapter();
  if (chapter) redirect("/dashboard");

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-md px-5 py-16 md:py-24">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          Chapter login
        </h1>
        <p className="mt-3 text-ink-muted">
          Check your application status and register for events.
        </p>

        <div className="mt-10 border border-line bg-surface p-7 md:p-8">
          <LoginForm />
        </div>

        <p className="mt-6 text-sm text-ink-muted">
          No account yet?{" "}
          <a
            href="/register"
            className="font-semibold text-accent hover:underline underline-offset-4"
          >
            Apply
          </a>{" "}
          to start a chapter.
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          Chapters imported from the previous site need a new password. Email{" "}
          <a
            href="mailto:a.kulshrestha.research@gmail.com"
            className="font-semibold text-accent hover:underline underline-offset-4"
          >
            the team
          </a>{" "}
          to restore access.
        </p>
      </div>
    </section>
  );
}
