import type { Metadata } from "next";
import Image from "next/image";
import { ParallaxFrame } from "@/components/motion";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "NYTT is an intentionally small, high-performing cohort of roughly twenty students whose civic work produces outcomes beyond the classroom.",
};

const differences = [
  {
    title: "Real legislative access",
    body: "Established relationships with Pennsylvania legislative offices give student work a structured pathway to review at the Senate level and beyond.",
  },
  {
    title: "Authorship, not simulation",
    body: "No mock trials, no model committees. Members write, publish, and defend real research with their names on it.",
  },
  {
    title: "Small on purpose",
    body: "Roughly twenty students total. Six on research, about ten in the media center. Every member is accountable for output.",
  },
  {
    title: "Nonpartisan by rule",
    body: "Every paper, article, and interview is reviewed for accuracy and held to strict nonpartisan analysis. Credibility is the asset.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="band-navy bg-navy text-on-navy">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
          <div className="md:col-span-7">
            <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              An institution built by students, taken seriously by
              legislators.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-navy-faint">
              The National Youth Think Tank is an intentionally small cohort
              of students who take civic work seriously and produce outcomes
              that extend beyond the classroom.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="bezel">
              <ParallaxFrame>
                <Image
                  src="/images/pa-capitol.jpg"
                  alt="The Pennsylvania State Capitol in Harrisburg"
                  width={1920}
                  height={1440}
                  priority
                  data-parallax-img
                  className="aspect-[4/3] w-full object-cover"
                />
              </ParallaxFrame>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
              Why NYTT exists
            </h2>
            <div className="mt-8 max-w-[70ch] space-y-5 text-lg leading-relaxed text-ink">
              <p>
                Most civic programs for high school students end at the
                classroom door: a competition trophy, a certificate, a line on
                an application. NYTT was founded in 2025 on a different
                premise. If students are held to professional standards and
                given institutional access, their ideas can enter real
                legislative conversations.
              </p>
              <p>
                That premise now runs through everything: a research cohort
                whose white papers are reviewed by Senate offices, a media
                center that puts public officials on the record, and a network
                of school chapters on four continents adapting the model for
                their own communities.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-paper-shade py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              What makes it different
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
            {differences.map((d, i) => (
              <Reveal key={d.title} delay={(i % 2) * 0.06}>
                <div className="h-full bg-paper-shade p-7 md:p-9">
                  <h3 className="font-display text-xl font-bold text-brand">
                    {d.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
              <div className="md:col-span-8">
                <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                  Strict standards, shared upside
                </h2>
                <p className="mt-5 max-w-2xl leading-relaxed text-ink-muted">
                  Members are held to demanding expectations because the
                  output carries the organization&apos;s name into Senate
                  offices. Seldom will you find a similar organization driven
                  by such passionate people, offering students this angle on
                  the political landscape.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end gap-3">
                <ButtonLink href="/team" variant="secondary" size="lg">
                  Meet the team
                </ButtonLink>
                <ButtonLink href="/register" size="lg">
                  Apply
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
