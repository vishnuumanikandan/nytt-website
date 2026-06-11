import type { Metadata } from "next";
import { Buildings, GlobeHemisphereWest } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { ButtonLink, StatusBadge } from "@/components/ui";
import { Chapter, getApprovedChapters } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chapters",
  description:
    "The NYTT chapter network: student-led chapters running research and civic projects across four continents.",
};

const US_STATES = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
]);

function location(c: Chapter): string {
  const city = c.city?.replace(/\s+/g, " ").trim() ?? "";
  const state = c.state && c.state.toUpperCase() !== "N/A" ? c.state.trim() : "";
  return [city, state].filter(Boolean).join(", ");
}

function isUS(c: Chapter): boolean {
  if (c.state && US_STATES.has(c.state.trim().toUpperCase())) return true;
  const cityText = (c.city ?? "").toLowerCase();
  return /,\s*(pa|nj|ny|ca|tx|va|il|ia|ks|ma|wa|ut|oh|ct|fl|la|ne|mi|ar|vt|co)\b/.test(
    cityText,
  ) || /pennsylvania|virginia|california|illinois|kansas|iowa|massachusetts|buffalo|greenwood village/.test(cityText);
}

function ChapterGrid({ chapters }: { chapters: Chapter[] }) {
  return (
    <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
      {chapters.map((c) => (
        <div key={c.id} className="flex flex-col bg-paper p-6">
          <h3 className="font-display text-lg font-bold leading-snug text-ink">
            {c.school_name}
          </h3>
          <p className="mt-1 flex-1 text-sm text-ink-muted">{location(c)}</p>
          <div className="mt-4 flex items-center gap-3">
            {c.is_founding ? <StatusBadge status="founding" /> : null}
            {c.member_count > 0 ? (
              <span className="text-xs font-semibold text-ink-muted">
                {c.member_count} members
              </span>
            ) : null}
            {c.established_year ? (
              <span className="text-xs text-ink-muted">
                Est. {c.established_year}
              </span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ChaptersPage() {
  const chapters = getApprovedChapters();
  const us = chapters.filter(isUS);
  const international = chapters.filter((c) => !isUS(c));

  return (
    <>
      <section className="band-navy relative overflow-hidden bg-navy text-on-navy">
        <p
          aria-hidden
          className="ghost-type -right-6 -top-10 text-[clamp(8rem,20vw,18rem)]"
        >
          {chapters.length}
        </p>
        <div className="relative mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
                The chapter network
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-navy-faint">
                {chapters.length} approved chapters running NYTT-style
                research and civic projects at their own schools, on four
                continents.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <ButtonLink href="/register" variant="gold" size="lg">
                Start a chapter
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {chapters.length === 0 ? (
        <section className="bg-paper py-24">
          <div className="mx-auto max-w-[1200px] px-5 text-center md:px-8">
            <h2 className="font-display text-2xl font-bold text-ink">
              The directory is being assembled
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-muted">
              Approved chapters will be listed here. Yours could be the first.
            </p>
          </div>
        </section>
      ) : (
        <>
          <section className="bg-paper py-16 md:py-20">
            <div className="mx-auto max-w-[1200px] px-5 md:px-8">
              <Reveal>
                <div className="mb-8 flex items-center gap-3">
                  <Buildings size={22} weight="bold" className="text-gold-strong" />
                  <h2 className="font-display text-2xl font-bold text-ink">
                    United States
                  </h2>
                  <span className="text-sm font-semibold text-ink-muted">
                    {us.length} chapters
                  </span>
                </div>
              </Reveal>
              <ChapterGrid chapters={us} />
            </div>
          </section>

          <section className="bg-paper pb-20 md:pb-28">
            <div className="mx-auto max-w-[1200px] px-5 md:px-8">
              <Reveal>
                <div className="mb-8 flex items-center gap-3">
                  <GlobeHemisphereWest
                    size={22}
                    weight="bold"
                    className="text-gold-strong"
                  />
                  <h2 className="font-display text-2xl font-bold text-ink">
                    International
                  </h2>
                  <span className="text-sm font-semibold text-ink-muted">
                    {international.length} chapters
                  </span>
                </div>
              </Reveal>
              <ChapterGrid chapters={international} />
            </div>
          </section>
        </>
      )}

      <section className="border-t border-line bg-paper-shade py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                Chapter founders go on to top programs
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">
                Founders in the network have gone on to Stanford, Oxford,
                Harvard, and UPenn. A chapter is real operating experience:
                recruiting, publishing, and presenting under judgment.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <ButtonLink href="/formats" variant="secondary" size="lg">
                Competition formats
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
