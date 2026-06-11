import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  approveChapterAction,
  deleteEventAction,
  deletePostAction,
  logoutAction,
  rejectChapterAction,
} from "@/lib/actions";
import { getSessionAdmin } from "@/lib/auth";
import {
  getAllChapters,
  getAllEvents,
  getEventRegistrationCounts,
  getPosts,
} from "@/lib/db";
import { Button, StatusBadge } from "@/components/ui";
import { EventForm, PostForm } from "./admin-forms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false },
};

function formatDate(sqlDate: string) {
  return new Date(sqlDate.replace(" ", "T")).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function AdminPage() {
  const admin = await getSessionAdmin();
  if (!admin) redirect("/admin-login");

  const chapters = getAllChapters();
  const pending = chapters.filter((c) => c.status === "pending");
  const approved = chapters.filter((c) => c.status === "approved");
  const posts = getPosts();
  const events = getAllEvents();
  const regCounts = getEventRegistrationCounts();

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-8 md:py-16">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-ink md:text-3xl">
              Admin panel
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              Signed in as {admin.username}
            </p>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="secondary">
              Log out
            </Button>
          </form>
        </div>

        <nav aria-label="Admin sections" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-4 text-sm font-semibold">
          <a href="#applications" className="text-accent hover:underline underline-offset-4">
            Applications ({pending.length})
          </a>
          <a href="#chapters" className="text-accent hover:underline underline-offset-4">
            Chapters ({approved.length})
          </a>
          <a href="#journal" className="text-accent hover:underline underline-offset-4">
            Journal ({posts.length})
          </a>
          <a href="#events" className="text-accent hover:underline underline-offset-4">
            Events ({events.length})
          </a>
        </nav>

        {/* Pending applications */}
        <div id="applications" className="mt-10 scroll-mt-24">
          <h2 className="text-lg font-bold text-ink">Pending applications</h2>
          {pending.length === 0 ? (
            <p className="mt-3 border border-line bg-surface p-6 text-sm text-ink-muted">
              No applications waiting. New ones appear here the moment they
              are submitted.
            </p>
          ) : (
            <div className="mt-4 flex flex-col gap-4">
              {pending.map((c) => (
                <article key={c.id} className="border border-line bg-surface p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-ink">{c.school_name}</h3>
                      <p className="mt-0.5 text-sm text-ink-muted">
                        {[c.city, c.state].filter(Boolean).join(", ")}
                        {" · applied "}
                        {formatDate(c.created_at)}
                      </p>
                    </div>
                    <StatusBadge status="pending" />
                  </div>
                  <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
                    <div className="flex gap-2">
                      <dt className="font-semibold text-ink-muted">Contact:</dt>
                      <dd className="text-ink">
                        {c.contact_name}
                        {c.contact_title ? ` (${c.contact_title})` : ""}
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-semibold text-ink-muted">Email:</dt>
                      <dd className="break-all text-ink">{c.email}</dd>
                    </div>
                    {c.phone ? (
                      <div className="flex gap-2">
                        <dt className="font-semibold text-ink-muted">Phone:</dt>
                        <dd className="text-ink">{c.phone}</dd>
                      </div>
                    ) : null}
                  </dl>
                  {c.motivation ? (
                    <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-ink">
                      {c.motivation}
                    </p>
                  ) : null}
                  <div className="mt-5 flex gap-3">
                    <form action={approveChapterAction}>
                      <input type="hidden" name="id" value={c.id} />
                      <Button type="submit">Approve</Button>
                    </form>
                    <form action={rejectChapterAction}>
                      <input type="hidden" name="id" value={c.id} />
                      <Button type="submit" variant="secondary">
                        Reject and remove
                      </Button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Approved chapters */}
        <div id="chapters" className="mt-14 scroll-mt-24">
          <h2 className="text-lg font-bold text-ink">Approved chapters</h2>
          <div className="mt-4 overflow-x-auto border border-line bg-surface">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-4 py-3 font-semibold">School</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold tabular-nums">Members</th>
                  <th className="px-4 py-3 font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {approved.map((c) => (
                  <tr key={c.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-semibold text-ink">
                      {c.school_name}
                      {c.is_founding ? (
                        <span className="ml-2 align-middle">
                          <StatusBadge status="founding" />
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-ink-muted">
                      {[c.city, c.state].filter(Boolean).join(", ")}
                    </td>
                    <td className="px-4 py-3 text-ink-muted">{c.contact_name}</td>
                    <td className="px-4 py-3 tabular-nums text-ink-muted">
                      {c.member_count || ""}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <form action={rejectChapterAction}>
                        <input type="hidden" name="id" value={c.id} />
                        <button
                          type="submit"
                          className="text-sm font-semibold text-error hover:underline underline-offset-4"
                        >
                          Remove
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Journal */}
        <div id="journal" className="mt-14 scroll-mt-24">
          <h2 className="text-lg font-bold text-ink">Journal</h2>
          <div className="mt-4 border border-line bg-surface p-6 md:p-8">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-ink-muted">
              New post
            </h3>
            <PostForm />
          </div>
          {posts.length === 0 ? (
            <p className="mt-4 text-sm text-ink-muted">
              No posts yet. The first one you publish appears on the Journal
              and the homepage.
            </p>
          ) : (
            <ul className="mt-4 border border-line bg-surface">
              {posts.map((post, i) => (
                <li
                  key={post.id}
                  className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">{post.title}</p>
                    <p className="text-xs text-ink-muted">
                      {post.author}, {formatDate(post.published_at)}
                    </p>
                  </div>
                  <form action={deletePostAction}>
                    <input type="hidden" name="id" value={post.id} />
                    <button
                      type="submit"
                      className="text-sm font-semibold text-error hover:underline underline-offset-4"
                    >
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Events */}
        <div id="events" className="mt-14 scroll-mt-24">
          <h2 className="text-lg font-bold text-ink">Events</h2>
          <div className="mt-4 border border-line bg-surface p-6 md:p-8">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-ink-muted">
              New event
            </h3>
            <EventForm />
          </div>
          {events.length === 0 ? (
            <p className="mt-4 text-sm text-ink-muted">
              No events yet. Created events appear on the public events page
              with school registration enabled.
            </p>
          ) : (
            <ul className="mt-4 border border-line bg-surface">
              {events.map((event, i) => (
                <li
                  key={event.id}
                  className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">{event.title}</p>
                    <p className="text-xs text-ink-muted">
                      {formatDate(event.starts_at)}
                      {event.location ? ` · ${event.location}` : ""}
                      {" · "}
                      {regCounts.get(event.id) ?? 0} school
                      {(regCounts.get(event.id) ?? 0) === 1 ? "" : "s"} registered
                    </p>
                  </div>
                  <form action={deleteEventAction}>
                    <input type="hidden" name="id" value={event.id} />
                    <button
                      type="submit"
                      className="text-sm font-semibold text-error hover:underline underline-offset-4"
                    >
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
