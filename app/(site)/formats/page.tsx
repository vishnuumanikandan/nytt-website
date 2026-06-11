import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Competition Formats",
  description:
    "NYTT chapters present year-long work in 45-minute sessions judged by academics, policymakers, and professionals.",
};

const levels = [
  {
    name: "Local",
    detail:
      "Chapters present to community panels and local government offices, testing work against the people it would actually affect.",
  },
  {
    name: "National",
    detail:
      "Cross-chapter sessions where research teams defend their findings before academics and policy professionals.",
  },
  {
    name: "International",
    detail:
      "The network spans four continents. Top projects present across borders, judged on rigor, originality, and real-world traction.",
  },
];

export default function FormatsPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <h1 className="max-w-3xl font-display text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
            Forty-five minutes to defend a year of work
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Chapters take part in local, national, and international
            competitions, presenting year-long projects in 45-minute sessions
            judged by academics, policymakers, and professionals.
          </p>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-3">
            {levels.map((level, i) => (
              <Reveal key={level.name} delay={i * 0.07}>
                <div className="h-full bg-paper p-8 md:p-10">
                  <h2 className="font-display text-2xl font-bold text-brand">
                    {level.name}
                  </h2>
                  <p className="mt-4 leading-relaxed text-ink-muted">
                    {level.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="band-navy mt-16 bg-navy p-8 text-on-navy md:p-12">
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
                <div className="md:col-span-8">
                  <h2 className="font-display text-2xl font-bold md:text-3xl">
                    The rule behind every format
                  </h2>
                  <p className="mt-4 max-w-2xl leading-relaxed text-on-navy-faint">
                    All projects must lead to some form of real-world change.
                    Judges score what a project did, not what it imagined.
                    Strong showings have led to citations, acknowledgments,
                    and incorporation into legislative drafts.
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <ButtonLink href="/events" variant="gold" size="lg">
                    See upcoming events
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-12 max-w-2xl leading-relaxed text-ink-muted">
              Competition entries come from the chapter network. If your
              school is not in it yet, founding a chapter is the way in.{" "}
              <a
                href="/register"
                className="font-semibold text-accent hover:underline underline-offset-4"
              >
                Start a chapter.
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
