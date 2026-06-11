import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getPostBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="bg-paper">
      <div className="mx-auto max-w-[760px] px-5 py-16 md:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline underline-offset-4"
        >
          <ArrowLeft size={16} weight="bold" />
          The Journal
        </Link>

        <header className="mt-8 border-b border-line pb-8">
          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-sm text-ink-muted">
            <span className="font-semibold text-ink">{post.author}</span>
            {" on "}
            {new Date(post.published_at + "Z").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <div className="mt-9 space-y-6 text-lg leading-relaxed text-ink">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
