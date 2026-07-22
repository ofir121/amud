import type { Metadata } from "next";
import Link from "next/link";
import { marked } from "marked";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getAnnouncements } from "@/lib/content";

export const metadata: Metadata = {
  title: "This Week at B'nai Israel",
  description:
    "Weekly announcements from B'nai Israel Congregation — schedule, kiddush sponsors, mazel tovs, and upcoming events.",
};

function formatWeekOf(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ThisWeekPage() {
  const [latest, ...archive] = getAnnouncements();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-navy-800">
        This Week at B&rsquo;nai Israel
      </h1>

      {latest ? (
        <article className="mt-8 rounded-xl border border-parchment bg-white p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">
            Week of {formatWeekOf(latest.weekOf)}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-navy-800">
            {latest.title}
          </h2>
          <div
            className="prose-announcement mt-4"
            dangerouslySetInnerHTML={{ __html: marked.parse(latest.body) }}
          />
        </article>
      ) : (
        <p className="mt-8 text-ink/70">No announcements posted yet.</p>
      )}

      {archive.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-2xl font-bold text-navy-800">
            Recent Weeks
          </h2>
          <ul className="mt-4 space-y-2">
            {archive.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/this-week/${a.slug}`}
                  className="flex items-baseline justify-between gap-4 rounded-lg border border-parchment bg-white px-4 py-3 hover:border-navy-100"
                >
                  <span className="font-medium text-navy-700">{a.title}</span>
                  <span className="shrink-0 text-sm text-ink/60">
                    {formatWeekOf(a.weekOf)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-xl bg-parchment p-6">
        <h2 className="font-serif text-xl font-bold text-navy-800">
          Get it in your inbox
        </h2>
        <p className="mt-1 mb-4 text-sm text-ink/70">
          One short email every week — schedule, sponsors, and simchas.
        </p>
        <NewsletterSignup />
      </section>
    </div>
  );
}
