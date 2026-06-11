import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionChapter } from "@/lib/auth";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to bring a National Youth Think Tank chapter to your school.",
};

const steps = [
  {
    name: "Apply",
    detail: "Tell us about your school and what your chapter would work on.",
  },
  {
    name: "Review",
    detail:
      "The board reviews every application. You can track status from your dashboard.",
  },
  {
    name: "Launch",
    detail:
      "Approved chapters join the directory, enter competitions, and get access to NYTT resources.",
  },
];

export default async function RegisterPage() {
  const chapter = await getSessionChapter();
  if (chapter) redirect("/dashboard");

  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-14 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Bring NYTT to your school
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
            Chapters run research and civic projects locally, compete in
            NYTT formats, and plug into a network on four continents.
          </p>

          <ol className="mt-10 max-w-md">
            {steps.map((step, i) => (
              <li
                key={step.name}
                className={`flex gap-5 py-5 ${i > 0 ? "border-t border-line" : ""}`}
              >
                <span className="font-display text-sm font-bold text-gold-strong pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">
                    {step.name}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-sm text-ink-muted">
            Already applied?{" "}
            <a
              href="/login"
              className="font-semibold text-accent hover:underline underline-offset-4"
            >
              Log in
            </a>{" "}
            to check your status.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-line bg-surface p-7 md:p-10">
            <h2 className="font-display text-2xl font-bold text-ink">
              Chapter application
            </h2>
            <p className="mt-2 mb-8 text-sm text-ink-muted">
              Every application is read by the board.
            </p>
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
