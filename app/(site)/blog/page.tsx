import type { Metadata } from "next";
import Link from "next/link";
import { PenNib } from "@phosphor-icons/react/dist/ssr";
import { getPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Publications, reflections, and civic writing from members of the National Youth Think Tank.",
};

function formatDate(sqlDate: string) {
  return new Date(sqlDate + "Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
            The Journal
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            Publications, reflections, and civic writing from members of the
            National Youth Think Tank.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          {posts.length === 0 ? (
            <div className="mx-auto max-w-lg border border-line px-8 py-16 text-center">
              <PenNib size={36} weight="regular" className="mx-auto text-ink-muted" />
              <h2 className="mt-5 font-display text-2xl font-bold text-ink">
                The first issue is in progress
              </h2>
              <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink-muted">
                Member writing is published here after accuracy review. In the
                meantime, the research itself moves on its own schedule: one
                paper every two months.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
              {/* Lead article */}
              <article className="lg:col-span-7">
                <p className="text-sm text-ink-muted">
                  {formatDate(lead.published_at)}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                  <Link
                    href={`/blog/${lead.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-ink-muted">
                  {lead.excerpt}
                </p>
                <p className="mt-5 text-sm font-semibold text-ink">
                  {lead.author}
                </p>
              </article>

              {/* The rest */}
              {rest.length > 0 ? (
                <div className="lg:col-span-5">
                  <div className="border-t border-line">
                    {rest.map((post) => (
                      <article key={post.id} className="border-b border-line py-6">
                        <p className="text-xs text-ink-muted">
                          {formatDate(post.published_at)}
                        </p>
                        <h3 className="mt-1.5 font-display text-xl font-bold leading-snug text-ink">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="transition-colors hover:text-accent"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                          {post.excerpt}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
