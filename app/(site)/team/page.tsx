import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The founder and board of directors of the National Youth Think Tank.",
};

const board = [
  {
    photo: "/images/team-carolyn.jpg",
    name: "Carolyn Yuan",
    role: "Board Member",
    bio: "Carolyn is a sophomore at Council Rock High School North. Outside of Think Tank, she is active in Science Fair, Science Olympiad, and FBLA, swims varsity, and plays in several orchestras.",
    email: "carolyn.y.yuan@gmail.com",
  },
  {
    photo: "/images/team-jack.png",
    name: "Jack Herres",
    role: "Board Member",
    bio: "Jack applies his passion for technology to the nonprofit space. A sophomore at Council Rock North, he is active in Science Fair, YMCA Model UN, and FBLA, and competes in varsity cross country and track.",
    email: "jackrherres@gmail.com",
  },
  {
    photo: "/images/team-hrishik.png",
    name: "Hrishik Penmetsa",
    role: "Board Member, Texas Division Lead",
    bio: "Hrishik is a sophomore at Centennial High School and leads the Texas Division for NYTT. He competes in speech and debate, has logged over 100 community service hours, and is multilingual.",
    email: "hrishikpenmetsa77@gmail.com",
  },
  {
    photo: "/images/team-leland.jpg",
    name: "Leland Silva",
    role: "Board Member",
    bio: "Leland is one of the original members of the National Youth Think Tank. His drive for academics extends beyond the classroom, which led him to NYTT to make real-world impact.",
    email: "lelandslv@gmail.com",
  },
];

export default function TeamPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
            The people behind the papers
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            A founder, a board of student directors, and a cohort that holds
            each other to the standard.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Reveal>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="bezel max-w-xs">
                  <Image
                    src="/images/team-aarav.png"
                    alt="Aarav Kulshrestha, founder and CEO of the National Youth Think Tank"
                    width={960}
                    height={2079}
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="md:col-span-8">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-gold-strong">
                  Founder &amp; CEO
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                  Aarav Kulshrestha
                </h2>
                <div className="mt-6 max-w-[65ch] space-y-4 leading-relaxed text-ink">
                  <p>
                    Aarav created NYTT to empower students to take their
                    passions and turn them into real-world impact. He is an AI
                    researcher in London, focused on drafting policy proposals
                    for AI and balancing innovation with regulation. He works
                    with Dr. Jonathan Kenigson of GCAS Dublin, a Nobel Peace
                    Prize nominated researcher.
                  </p>
                  <p>
                    As founder, he scaled the organization to more than fifty
                    schools across four continents. Outside of work, he enjoys
                    golf, being in nature, and spending time with his baby
                    brother.
                  </p>
                </div>
                <a
                  href="mailto:a.kulshrestha.research@gmail.com"
                  className="mt-6 inline-block text-sm font-semibold text-accent hover:underline underline-offset-4"
                >
                  a.kulshrestha.research@gmail.com
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Board */}
      <section className="border-t border-line bg-paper-shade py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Board of Directors
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {board.map((member, i) => (
              <Reveal key={member.name} delay={(i % 4) * 0.05}>
                <article className="flex h-full flex-col">
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.role} of NYTT`}
                    width={600}
                    height={750}
                    className="aspect-[4/5] w-full rounded-[4px] object-cover object-top"
                  />
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gold-strong">
                    {member.role}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                    {member.bio}
                  </p>
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-4 break-all text-sm font-semibold text-accent hover:underline underline-offset-4"
                  >
                    {member.email}
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
