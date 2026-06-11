import type { Metadata } from "next";
import Image from "next/image";
import { ParallaxFrame } from "@/components/motion";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "NYTT runs two programs: a six-seat policy research cohort whose papers are reviewed at the Senate level, and a ten-person Civic Media Center.",
};

const researchRequirements = [
  "Log at least five hours of research per week",
  "Draft white papers and participate in publishing",
  "Meet with local government offices",
  "Take part in the internal review process",
  "Attend at least one policy meeting or briefing per month",
  "Track formal acknowledgments, citations, and incorporation into drafts",
  "Commit to nonpartisan analysis",
];

const paperStandard = [
  {
    name: "Executive brief",
    detail: "One to two pages, written for legislative staff who decide in minutes.",
  },
  {
    name: "Literature review",
    detail: "A formal review section built on peer-reviewed sources.",
  },
  {
    name: "Recommendations",
    detail: "Clear policy recommendations with fiscal and legal analysis.",
  },
  {
    name: "Expert feedback",
    detail: "Review from professionals in the field before anything ships.",
  },
];

const mediaActivities = [
  {
    name: "Public-interest publishing",
    detail:
      "Policy analysis, investigative reporting, community research, and articles written for the general public, in tandem with the research team.",
  },
  {
    name: "Amplifying young voices",
    detail:
      "Researching pressing topics and advocating for civic voices underrepresented in mainstream discourse.",
  },
  {
    name: "Running public dialogue",
    detail:
      "Forums, events, and digital platforms for constructive debate, organized and moderated by students.",
  },
  {
    name: "Media literacy",
    detail:
      "Helping audiences critically evaluate information, including a strong social media presence.",
  },
  {
    name: "Interviews with officials",
    detail:
      "Biweekly recorded interviews with politicians on nonpartisan topics: youth civic empowerment and depolarization.",
  },
];

export default function MissionPage() {
  return (
    <>
      {/* Page opener */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <h1 className="max-w-3xl font-display text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
            Ideas here are not confined to competitions or simulations.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            NYTT runs two programs. Both produce work that leaves the
            classroom: white papers under Senate review and civic media on the
            public record.
          </p>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="scroll-mt-24 bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-gold-strong">
              Program one
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
              Policy Research
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-ink-muted">
              Six seats, by selective admission. Members draft white papers
              that are published and placed under review by Senators, working
              directly with the legislative offices of Senators Tracy
              Pennycuick and Steve Santarsiero and Speaker Joanna McClinton.
              Students generate the substance; NYTT supplies the
              infrastructure and institutional access that make professional
              review possible.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <h3 className="font-display text-xl font-bold text-ink">
                What membership requires
              </h3>
              <ul className="mt-6">
                {researchRequirements.map((req, i) => (
                  <li
                    key={req}
                    className={`flex gap-4 py-3.5 ${i > 0 ? "border-t border-line" : ""}`}
                  >
                    <span className="font-display text-sm font-bold text-gold-strong pt-0.5 w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed text-ink">{req}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6">
              <div className="band-navy bg-navy p-8 text-on-navy md:p-10">
                <h3 className="font-display text-xl font-bold">
                  The publication standard
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-navy-faint">
                  One fully developed policy paper every two months, 15 to 25
                  pages. Every member authors, attends, and publishes.
                </p>
                <dl className="mt-7">
                  {paperStandard.map((s, i) => (
                    <div
                      key={s.name}
                      className={`py-4 ${i > 0 ? "border-t border-line-navy" : ""}`}
                    >
                      <dt className="font-semibold text-gold">{s.name}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-on-navy-faint">
                        {s.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-12 max-w-3xl leading-relaxed text-ink-muted">
              Even undergraduates rarely encounter authentic legislative
              engagement. NYTT is one of the few organizations where high
              school students produce research with tangible policy relevance
              rather than purely academic circulation. In exchange for the
              workload, members graduate fully published with research that
              stands out.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Civic Media Center */}
      <section
        id="media"
        className="scroll-mt-24 border-y border-line bg-paper-shade py-20 md:py-28"
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-gold-strong">
              Program two
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
              Civic Media Center
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-ink-muted">
              A team of about ten students producing, curating, and
              distributing media that strengthens democratic participation.
              Unlike commercial outlets driven by profit, the Civic Media
              Center prioritizes public interest, transparency, and community
              dialogue.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {mediaActivities.map((a, i) => (
              <Reveal key={a.name} delay={(i % 3) * 0.05}>
                <div className="h-full border border-line bg-paper p-6">
                  <h3 className="font-display text-lg font-bold text-ink">
                    {a.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {a.detail}
                  </p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-center band-navy bg-navy p-6 text-on-navy">
                <p className="font-display text-3xl font-bold text-gold">
                  4 to 6 hours
                </p>
                <p className="mt-2 text-sm leading-relaxed text-on-navy-faint">
                  weekly commitment, including strategy meetings and
                  engagement review. One substantial public piece and one
                  coordinated social post ship every week.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-12 border border-line bg-paper p-7 md:p-9">
              <h3 className="font-display text-xl font-bold text-ink">
                The interview cycle
              </h3>
              <p className="mt-3 max-w-3xl leading-relaxed text-ink-muted">
                Every two weeks the team interviews at least one public
                official. Students initiate the outreach, prepare research
                briefs, and draft structured nonpartisan questions. Interviews
                are recorded, edited into short clips, posted with a written
                summary, archived, and tracked for engagement. When possible,
                the team seeks a public acknowledgment or repost from the
                official&apos;s office.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Professional development */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <div className="bezel">
                <ParallaxFrame>
                  <Image
                    src="/images/pa-rotunda.jpg"
                    alt="Looking up into the dome of the Pennsylvania State Capitol rotunda"
                    width={1280}
                    height={1646}
                    data-parallax-img
                    className="aspect-[4/5] w-full object-cover"
                  />
                </ParallaxFrame>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7">
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Professional development is mandatory, not optional
              </h2>
              <ul className="mt-8 max-w-xl">
                {[
                  "Training in policy writing and legislative procedure",
                  "Workshops on statistical literacy and data interpretation",
                  "Exposure to grant writing and think-tank methodology",
                ].map((item, i) => (
                  <li
                    key={item}
                    className={`py-4 leading-relaxed text-ink ${i > 0 ? "border-t border-line" : ""}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href="/register" size="lg">
                  Apply
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
