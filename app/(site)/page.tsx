import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ParallaxFrame, ScrubText } from "@/components/motion";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui";
import { getApprovedChapters, getPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

const cadence = [
  {
    figure: "One policy paper",
    every: "every two months",
    detail:
      "15 to 25 pages with an executive brief, literature review, and fiscal and legal analysis.",
  },
  {
    figure: "One public piece",
    every: "every week",
    detail:
      "from the Civic Media Center, with a coordinated social post and accuracy review.",
  },
  {
    figure: "One official interview",
    every: "every two weeks",
    detail: "recorded, edited, archived, and tracked for engagement.",
  },
  {
    figure: "Five hours of research",
    every: "logged weekly",
    detail:
      "by every member of the research cohort, plus a monthly policy briefing.",
  },
];

export default function HomePage() {
  const chapters = getApprovedChapters();
  const posts = getPosts().slice(0, 3);
  const schoolNames = chapters
    .map((c) => c.school_name.replace(/^NYTT\s*-?\s*/i, "").trim())
    .filter((n) => n.length > 3);

  return (
    <>
      {/* Hero: navy drench, ghost type, bezel-framed rotunda */}
      <section className="band-navy relative overflow-hidden bg-navy text-on-navy">
        <p
          aria-hidden
          className="ghost-type -bottom-8 -left-6 text-[clamp(8rem,22vw,20rem)]"
        >
          2025
        </p>
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
          <div className="md:col-span-8">
            <h1 className="hero-rise font-display text-[clamp(2.5rem,4.6vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight">
              Policy research that reaches the{" "}
              <em className="not-italic text-gold">Senate floor.</em>
            </h1>
            <p className="hero-rise hero-rise-2 mt-6 max-w-xl text-lg leading-relaxed text-on-navy-faint">
              A selective think tank of roughly twenty students producing
              nonpartisan research and civic media for real legislative
              review.
            </p>
            <div className="hero-rise hero-rise-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/register" variant="gold" size="lg">
                Apply
              </ButtonLink>
              <ButtonLink href="/mission" variant="onNavy" size="lg">
                Explore the programs
              </ButtonLink>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="hero-rise hero-rise-4 bezel ml-auto max-w-105">
              <ParallaxFrame>
                <Image
                  src="/images/pa-rotunda.jpg"
                  alt="The dome of the Pennsylvania State Capitol rotunda in Harrisburg, where NYTT research is reviewed"
                  width={1280}
                  height={1646}
                  priority
                  data-parallax-img
                  className="aspect-[4/5] w-full object-cover"
                />
              </ParallaxFrame>
            </div>
          </div>
        </div>
      </section>

      {/* Legislative proof strip */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-xs text-sm font-semibold leading-snug text-ink">
                Working with the legislative offices of the Pennsylvania
                General Assembly
              </p>
              <ul className="flex flex-col gap-x-12 gap-y-3 sm:flex-row">
                {[
                  { name: "Tracy Pennycuick", role: "Senator, PA-24" },
                  { name: "Steve Santarsiero", role: "Senator, PA-10" },
                  { name: "Joanna McClinton", role: "Speaker, PA House" },
                ].map((p) => (
                  <li key={p.name} className="reg-mark">
                    <p className="font-display text-lg font-bold text-brand">
                      {p.name}
                    </p>
                    <p className="text-sm text-ink-muted">{p.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Two programs, asymmetric */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
              Two programs. Both real work.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <Link
                href="/mission#research"
                className="group block border border-line bg-surface transition-colors duration-300 hover:border-gold-strong"
              >
                <div className="overflow-hidden">
                  <Image
                    src="/images/pa-senate-chamber.jpg"
                    alt="The Senate Chamber of the Pennsylvania State Capitol"
                    width={1920}
                    height={1274}
                    className="duotone aspect-[2/1] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-7 md:p-9">
                  <p className="font-display text-2xl font-bold text-ink md:text-3xl">
                    Policy Research
                  </p>
                  <p className="mt-3 max-w-lg leading-relaxed text-ink-muted">
                    Six seats. White papers drafted, internally reviewed, and
                    placed under review by Senate offices. Demanding by
                    design.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    The research cohort
                    <ArrowRight
                      size={16}
                      weight="bold"
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-5">
              <Link
                href="/mission#media"
                className="band-navy group relative flex h-full flex-col justify-between overflow-hidden border border-line bg-navy p-7 text-on-navy transition-colors duration-300 hover:border-gold md:p-9"
              >
                <p
                  aria-hidden
                  className="ghost-type -right-4 -top-7 text-[7rem]"
                >
                  10
                </p>
                <div className="relative">
                  <p className="font-display text-2xl font-bold md:text-3xl">
                    Civic Media Center
                  </p>
                  <p className="mt-3 leading-relaxed text-on-navy-faint">
                    Ten students publishing weekly public-interest journalism
                    and interviewing public officials every two weeks, on the
                    record and strictly nonpartisan.
                  </p>
                </div>
                <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                  The media team
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Operating cadence: the document ledger */}
      <section className="border-y border-line bg-paper-shade py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                What we hold ourselves to
              </h2>
              <p className="mt-4 leading-relaxed text-ink-muted">
                Membership is an obligation, not a line on a resume. The
                cadence below is the minimum, in writing.
              </p>
            </Reveal>
            <div className="md:col-span-8">
              <dl>
                {cadence.map((item, i) => (
                  <Reveal key={item.figure} delay={i * 0.05}>
                    <div
                      className={`reg-mark grid grid-cols-1 gap-2 py-7 sm:grid-cols-[280px_1fr] sm:gap-8 ${
                        i > 0 ? "border-t border-line" : ""
                      }`}
                    >
                      <dt>
                        <span className="block font-display text-2xl font-extrabold leading-tight text-brand">
                          {item.figure}
                        </span>
                        <span className="mt-1 block text-sm font-semibold uppercase tracking-[0.08em] text-gold-strong">
                          {item.every}
                        </span>
                      </dt>
                      <dd className="self-center leading-relaxed text-ink-muted">
                        {item.detail}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Network: chapters worldwide */}
      <section className="overflow-hidden bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
                {chapters.length} chapters, four continents
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ink-muted">
                From Newtown, Pennsylvania to Seoul, Accra, and Westport, New
                Zealand: student chapters run NYTT-style research and civic
                projects at their own schools.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/chapters" variant="secondary">
                  Browse the directory
                </ButtonLink>
                <ButtonLink href="/register">Start a chapter</ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7">
              <div className="bezel">
                <ParallaxFrame className="duotone-wash">
                  <Image
                    src="/images/pa-capitol.jpg"
                    alt="The Pennsylvania State Capitol building in Harrisburg on a clear day"
                    width={1920}
                    height={1440}
                    data-parallax-img
                    className="aspect-[3/2] w-full object-cover"
                  />
                </ParallaxFrame>
              </div>
            </Reveal>
          </div>
        </div>

        {/* One marquee, real chapter names */}
        <div className="mt-16 border-y border-line py-5" aria-hidden>
          <div className="flex w-max marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0">
                {schoolNames.map((name, i) => (
                  <span
                    key={`${copy}-${i}`}
                    className="whitespace-nowrap px-6 font-display text-lg font-bold text-ink/25"
                  >
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship: the engraved plaque */}
      <section className="bg-paper pb-20 md:pb-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Reveal>
            <div className="bezel">
              <div className="band-navy relative overflow-hidden bg-navy px-7 py-14 text-center md:px-12 md:py-20">
                <p
                  aria-hidden
                  className="ghost-type left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[clamp(5rem,14vw,11rem)]"
                >
                  NYTT
                </p>
                <div className="relative">
                  <p className="mx-auto max-w-2xl font-display text-2xl font-bold leading-snug text-on-navy md:text-3xl">
                    Students receive direct mentorship and recognition from
                    professionals at Harvard, Yale, the U.S. Senate, and the
                    United Nations.
                  </p>
                  <p className="mx-auto mt-5 max-w-xl text-on-navy-faint">
                    Every published paper includes expert feedback from people
                    in the field. The review is real, and so is the standard.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Journal, only when posts exist */}
      {posts.length > 0 ? (
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8">
            <Reveal>
              <div className="flex items-end justify-between gap-6">
                <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                  From the Journal
                </h2>
                <Link
                  href="/blog"
                  className="shrink-0 text-sm font-semibold text-accent hover:underline underline-offset-4"
                >
                  All writing
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={i * 0.06}>
                  <article>
                    <p className="text-sm text-ink-muted">
                      {new Date(post.published_at + "Z").toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" },
                      )}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold leading-snug text-ink">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-accent transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      {post.excerpt}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Closing: the manifesto, resolved word by word */}
      <section className="band-navy bg-navy py-24 text-on-navy md:py-36">
        <div className="mx-auto max-w-[1200px] px-5 text-center md:px-8">
          <ScrubText
            as="h2"
            className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl"
            text="More than resume lines: authorship, ownership, and a genuine seat at the table."
          />
          <Reveal>
            <p className="mx-auto mt-6 max-w-xl text-on-navy-faint">
              Admission is selective and the standards are strict. If that
              sounds like the point, it is.
            </p>
            <div className="mt-9">
              <ButtonLink href="/register" variant="gold" size="lg">
                Apply
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
