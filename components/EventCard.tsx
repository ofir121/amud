import Link from "next/link";
import {
  ShulEvent,
  eventTypeLabels,
  formatEventDate,
  formatEventTime,
} from "@/lib/content";

const typeColors: Record<string, string> = {
  davening: "bg-navy-100 text-navy-800",
  class: "bg-gold-100 text-gold-600",
  community: "bg-emerald-100 text-emerald-800",
  holiday: "bg-rose-100 text-rose-800",
};

export default function EventCard({ event }: { event: ShulEvent }) {
  const date = new Date(event.date);
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex gap-4 rounded-xl border border-parchment bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-navy-700 text-white">
        <span className="text-[11px] uppercase tracking-wide text-gold-400">
          {date.toLocaleDateString("en-US", { month: "short", timeZone: "America/New_York" })}
        </span>
        <span className="font-serif text-2xl font-bold leading-none">
          {date.toLocaleDateString("en-US", { day: "numeric", timeZone: "America/New_York" })}
        </span>
      </div>
      <div className="min-w-0">
        <span
          className={`mb-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
            typeColors[event.type] ?? typeColors.community
          }`}
        >
          {eventTypeLabels[event.type]}
        </span>
        <h3 className="font-serif text-lg font-bold text-navy-800 group-hover:text-navy-600">
          {event.title}
        </h3>
        <p className="text-sm text-ink/70">
          {formatEventDate(event.date)} · {formatEventTime(event.date)}
          {event.location ? ` · ${event.location}` : ""}
        </p>
      </div>
    </Link>
  );
}
