import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getAnnouncement, getAnnouncements } from "@/lib/content";

export function generateStaticParams() {
  return getAnnouncements().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getAnnouncement(slug);
  if (!post) return {};
  return { title: post.title };
}

export default async function AnnouncementPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getAnnouncement(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/this-week"
        className="text-sm font-semibold text-navy-600 underline-offset-4 hover:underline"
      >
        ← This Week at B&rsquo;nai Israel
      </Link>
      <article className="mt-4 rounded-xl border border-parchment bg-white p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">
          Week of{" "}
          {new Date(`${post.weekOf}T12:00:00`).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-navy-800">
          {post.title}
        </h1>
        <div
          className="prose-announcement mt-4"
          dangerouslySetInnerHTML={{ __html: marked.parse(post.body) }}
        />
      </article>
    </div>
  );
}
