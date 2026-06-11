import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "NextBridge Advisory",
  description:
    "NextBridge Advisory is an economic advisory firm providing advanced mentorship to youth entrepreneurs, powered by NYTT resources.",
};

const services = [
  {
    name: "Advisory calls",
    detail:
      "Detailed consultation focused on economic strategy, operational excellence, and sustainable growth.",
  },
  {
    name: "Learning paths",
    detail:
      "Interactive programs with one-on-one mentorship and direct connections to corporate professionals.",
  },
  {
    name: "Business consulting",
    detail:
      "Advanced consulting tailored to specific needs: resource allocation, operations optimization, and strategic growth planning.",
  },
];

const recognition = [
  {
    title: "Y Combinator Startup School",
    detail:
      "Selected for the program, joining a cohort of the world's most promising young ventures.",
  },
  {
    title: "Bold Journey feature",
    detail:
      "Featured in the magazine's entrepreneurship spotlight on democratizing access to innovation.",
  },
  {
    title: "International recognition",
    detail:
      "Received an official Letter of International Recognition for International Business Excellence.",
  },
];

export default function FeaturedProjectPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-gold-strong">
            Featured project
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
            NextBridge Advisory
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            An economic advisory firm providing advanced mentorship to youth
            entrepreneurs, powered by NYTT resources and run by students.
          </p>
        </div>
      </section>

      {/* Founder quote + photo */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <figure>
                <div className="bezel">
                  <Image
                    src="/images/nextbridge-sujit.png"
                    alt="Sujit Pai, founder of NextBridge Advisory"
                    width={578}
                    height={496}
                    className="w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-ink-muted">
                  Sujit Pai, founder of NextBridge Advisory
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-8">
              <blockquote className="max-w-2xl">
                <p className="font-display text-2xl font-bold leading-snug text-ink md:text-3xl">
                  &ldquo;NextBridge is building a decentralized movement of
                  student advisors, founders, and mentors who believe access
                  to innovation shouldn&apos;t depend on geography or
                  background.&rdquo;
                </p>
                <footer className="mt-5 text-sm font-semibold text-ink-muted">
                  Sujit Pai, Founder of NextBridge Advisory
                  <span className="block font-normal">
                    from his Bold Journey interview
                  </span>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-line bg-paper-shade py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              What NextBridge does
            </h2>
          </Reveal>
          <div className="mt-10">
            {services.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <div
                  className={`grid grid-cols-1 gap-2 py-6 sm:grid-cols-[260px_1fr] sm:gap-8 ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <h3 className="font-display text-xl font-bold text-brand">
                    {s.name}
                  </h3>
                  <p className="max-w-2xl leading-relaxed text-ink-muted">
                    {s.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 max-w-2xl leading-relaxed text-ink-muted">
              The network includes connections with professionals at JP Morgan
              and Goldman Sachs, the University of Burkina Faso, and United
              Nations Volunteers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Recognition */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Recognition
              </h2>
              <ul className="mt-8">
                {recognition.map((r, i) => (
                  <li
                    key={r.title}
                    className={`py-5 ${i > 0 ? "border-t border-line" : ""}`}
                  >
                    <h3 className="font-display text-lg font-bold text-ink">
                      {r.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {r.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="/images/nextbridge-team.png"
                  alt="The NextBridge Advisory team receiving recognition"
                  width={561}
                  height={748}
                  className="w-full rounded-[4px] object-cover"
                />
                <div className="flex flex-col gap-4">
                  <Image
                    src="/images/nextbridge-2.jpg"
                    alt="NextBridge Advisory mentorship session"
                    width={647}
                    height={642}
                    className="w-full rounded-[4px] object-cover"
                  />
                  <Image
                    src="/images/nextbridge-recognition.png"
                    alt="NextBridge Advisory's Letter of International Recognition"
                    width={301}
                    height={318}
                    className="w-full rounded-[4px] object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
