import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import {
  eventTypeLabels,
  formatEventDate,
  formatEventTime,
  getEvent,
  getEvents,
  getSettings,
} from "@/lib/content";

export function generateStaticParams() {
  return getEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: `${event.title} · B'nai Israel Congregation`,
      description: `${formatEventDate(event.date)} at ${formatEventTime(event.date)} — ${event.description}`,
      type: "article",
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  const settings = getSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/events"
        className="text-sm font-semibold text-navy-600 underline-offset-4 hover:underline"
      >
        ← All events
      </Link>

      <article className="mt-4 rounded-xl border border-parchment bg-white p-6 sm:p-8">
        <span className="inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
          {eventTypeLabels[event.type]}
        </span>
        <h1 className="mt-3 font-serif text-3xl font-bold text-navy-800 sm:text-4xl">
          {event.title}
        </h1>

        <dl className="mt-5 space-y-1.5 border-l-4 border-gold-400 pl-4 text-ink/90">
          <div>
            <dt className="sr-only">Date and time</dt>
            <dd className="font-semibold">
              {formatEventDate(event.date)} · {formatEventTime(event.date)}
            </dd>
          </div>
          {event.location && (
            <div>
              <dt className="sr-only">Location</dt>
              <dd>
                {event.location}, {settings.address}
              </dd>
            </div>
          )}
        </dl>

        <p className="mt-6 leading-relaxed">{event.description}</p>
        {event.body.trim() && (
          <div
            className="prose-announcement mt-4"
            dangerouslySetInnerHTML={{ __html: marked.parse(event.body) }}
          />
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {event.rsvpLink && (
            <a
              href={event.rsvpLink}
              className="rounded-full bg-navy-700 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-navy-600"
            >
              RSVP
            </a>
          )}
          <Link
            href="/visit"
            className="rounded-full border border-navy-600 px-6 py-2.5 font-semibold text-navy-700 transition-colors hover:bg-navy-50"
          >
            Plan your visit
          </Link>
        </div>
      </article>
    </div>
  );
}
