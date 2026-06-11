import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CalendarBlank, MapPin } from "@phosphor-icons/react/dist/ssr";
import { logoutAction } from "@/lib/actions";
import { getSessionChapter } from "@/lib/auth";
import { getChapterEventIds, getUpcomingEvents } from "@/lib/db";
import { Button, ButtonLink, StatusBadge } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
};

function formatDate(sqlDate: string) {
  return new Date(sqlDate.replace(" ", "T")).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function DashboardPage() {
  const chapter = await getSessionChapter();
  if (!chapter) redirect("/login");

  const registeredIds = getChapterEventIds(chapter.id);
  const myEvents = getUpcomingEvents().filter((e) =>
    registeredIds.includes(e.id),
  );

  const profileRows = [
    { label: "School", value: chapter.school_name },
    {
      label: "Location",
      value: [chapter.city, chapter.state].filter(Boolean).join(", "),
    },
    {
      label: "Contact",
      value: chapter.contact_title
        ? `${chapter.contact_name} (${chapter.contact_title})`
        : chapter.contact_name,
    },
    { label: "Email", value: chapter.email },
    { label: "Phone", value: chapter.phone || "Not provided" },
  ];

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-8 md:py-16">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-ink md:text-3xl">
              {chapter.school_name}
            </h1>
            <p className="mt-1 text-sm text-ink-muted">Chapter dashboard</p>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="secondary">
              Log out
            </Button>
          </form>
        </div>

        {/* Status */}
        <div className="mt-8 border border-line bg-surface p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-ink">
                Application status
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-muted">
                {chapter.status === "approved"
                  ? "Your chapter is approved and listed in the public directory. You can register for events below."
                  : "Your application is with the board. Every application is read; you will see the status change here once it is reviewed."}
              </p>
            </div>
            <StatusBadge
              status={chapter.is_founding ? "founding" : chapter.status}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Profile */}
          <div className="border border-line bg-surface p-6 md:p-8">
            <h2 className="text-base font-bold text-ink">Chapter profile</h2>
            <dl className="mt-4">
              {profileRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[110px_1fr] gap-4 py-2.5 text-sm ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <dt className="font-semibold text-ink-muted">{row.label}</dt>
                  <dd className="text-ink break-words">{row.value}</dd>
                </div>
              ))}
            </dl>
            {chapter.motivation ? (
              <div className="mt-4 border-t border-line pt-4">
                <h3 className="text-sm font-semibold text-ink-muted">
                  Your application statement
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  {chapter.motivation}
                </p>
              </div>
            ) : null}
          </div>

          {/* Events */}
          <div className="border border-line bg-surface p-6 md:p-8">
            <h2 className="text-base font-bold text-ink">
              Your event registrations
            </h2>
            {myEvents.length === 0 ? (
              <div className="mt-4">
                <p className="text-sm leading-relaxed text-ink-muted">
                  Your school is not registered for any upcoming events. When
                  competitions and workshops open, register from the events
                  page.
                </p>
                <div className="mt-5">
                  <ButtonLink href="/events" variant="secondary">
                    Browse events
                  </ButtonLink>
                </div>
              </div>
            ) : (
              <ul className="mt-4">
                {myEvents.map((event, i) => (
                  <li
                    key={event.id}
                    className={`py-4 ${i > 0 ? "border-t border-line" : ""}`}
                  >
                    <p className="font-semibold text-ink">{event.title}</p>
                    <p className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarBlank size={14} weight="bold" />
                        {formatDate(event.starts_at)}
                      </span>
                      {event.location ? (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} weight="bold" />
                          {event.location}
                        </span>
                      ) : null}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
