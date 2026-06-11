import type { Metadata } from "next";
import { CalendarBlank, MapPin } from "@phosphor-icons/react/dist/ssr";
import { registerForEventAction } from "@/lib/actions";
import { getSessionChapter } from "@/lib/auth";
import {
  getChapterEventIds,
  getUpcomingEvents,
} from "@/lib/db";
import { Button, ButtonLink } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming NYTT competitions, workshops, and briefings for chapters and members.",
};

function formatDate(sqlDate: string) {
  return new Date(sqlDate.replace(" ", "T")).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(sqlDate: string) {
  const d = new Date(sqlDate.replace(" ", "T"));
  if (d.getHours() === 0 && d.getMinutes() === 0) return null;
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export default async function EventsPage() {
  const events = getUpcomingEvents();
  const chapter = await getSessionChapter();
  const registeredIds = chapter ? getChapterEventIds(chapter.id) : [];

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
            Events
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            Competitions, workshops, and briefings. Chapters register through
            their account.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          {events.length === 0 ? (
            <div className="mx-auto max-w-lg border border-line px-8 py-16 text-center">
              <CalendarBlank
                size={36}
                weight="regular"
                className="mx-auto text-ink-muted"
              />
              <h2 className="mt-5 font-display text-2xl font-bold text-ink">
                Nothing on the calendar right now
              </h2>
              <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink-muted">
                Check back soon for new competition opportunities and
                workshops. Until then, the chapter network is always open.
              </p>
              <div className="mt-7">
                <ButtonLink href="/register" variant="secondary">
                  Start a chapter
                </ButtonLink>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {events.map((event) => {
                const registered = registeredIds.includes(event.id);
                const time = formatTime(event.starts_at);
                return (
                  <article
                    key={event.id}
                    className="grid grid-cols-1 gap-6 border border-line p-7 md:grid-cols-12 md:p-9"
                  >
                    <div className="md:col-span-8">
                      {event.format ? (
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-strong">
                          {event.format}
                        </p>
                      ) : null}
                      <h2 className="mt-2 font-display text-2xl font-bold text-ink">
                        {event.title}
                      </h2>
                      <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">
                        {event.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink">
                        <span className="inline-flex items-center gap-2">
                          <CalendarBlank size={16} weight="bold" className="text-brand" />
                          {formatDate(event.starts_at)}
                          {time ? `, ${time}` : ""}
                        </span>
                        {event.location ? (
                          <span className="inline-flex items-center gap-2">
                            <MapPin size={16} weight="bold" className="text-brand" />
                            {event.location}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex items-center md:col-span-4 md:justify-end">
                      {chapter ? (
                        registered ? (
                          <p className="rounded-[2px] border border-success/25 bg-success-soft px-4 py-2.5 text-sm font-semibold text-success">
                            Your school is registered
                          </p>
                        ) : (
                          <form action={registerForEventAction}>
                            <input type="hidden" name="eventId" value={event.id} />
                            <Button type="submit">Register your school</Button>
                          </form>
                        )
                      ) : (
                        <ButtonLink href="/login" variant="secondary">
                          Log in to register
                        </ButtonLink>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
