import type { Metadata } from "next";
import EventCard from "@/components/EventCard";
import EventFilter from "@/components/EventFilter";
import { EventType, getUpcomingEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events & Programs",
  description:
    "Upcoming services, classes, and community events at B'nai Israel Congregation in downtown Baltimore.",
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const all = getUpcomingEvents();
  const events =
    type && ["davening", "class", "community", "holiday"].includes(type)
      ? all.filter((e) => e.type === (type as EventType))
      : all;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-navy-800">
        Events &amp; Programs
      </h1>
      <p className="mt-2 text-lg text-gold-600">
        Davening, learning, and community — there&rsquo;s always something
        happening on Lloyd Street
      </p>

      <div className="mt-6">
        <EventFilter active={type} />
      </div>

      <div className="mt-6 grid gap-4">
        {events.length === 0 ? (
          <p className="rounded-xl border border-parchment bg-white p-8 text-center text-ink/70">
            No upcoming events in this category — check back soon or see the
            full list.
          </p>
        ) : (
          events.map((event) => <EventCard key={event.slug} event={event} />)
        )}
      </div>
    </div>
  );
}
