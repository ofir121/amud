import Link from "next/link";
import EventCard from "@/components/EventCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getSettings, getUpcomingEvents, getSchedule } from "@/lib/content";
import { getZmanim } from "@/lib/hebcal";

export default async function Home() {
  const settings = getSettings();
  const events = getUpcomingEvents(4);
  const schedule = getSchedule();
  const zmanim = await getZmanim();

  const shabbatMorning = schedule.sections
    .find((s) => s.title === "Shabbat")
    ?.rows.find((r) => r.name === "Shacharit");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #d4a94e 0, transparent 40%), radial-gradient(circle at 80% 70%, #2c4a6e 0, transparent 50%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-gold-400">
            27 Lloyd Street · Downtown Baltimore
          </p>
          <h1 className="max-w-2xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
            150 years of davening in the same historic sanctuary.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-navy-100">
            {settings.tagline}. A warm, traditional community — and everyone is
            welcome.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/donate"
              className="rounded-full bg-gold-500 px-6 py-3 font-semibold text-navy-900 transition-colors hover:bg-gold-400"
            >
              Donate
            </Link>
            <Link
              href="/visit"
              className="rounded-full border border-white/40 px-6 py-3 font-semibold transition-colors hover:bg-white/10"
            >
              Visit Us
            </Link>
            <Link
              href="/davening"
              className="rounded-full border border-white/40 px-6 py-3 font-semibold transition-colors hover:bg-white/10"
            >
              This Week&rsquo;s Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* At-a-glance strip */}
      <section
        aria-label="This week at a glance"
        className="border-b border-parchment bg-white"
      >
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden px-4 py-5 text-center sm:grid-cols-2 lg:grid-cols-4">
          <Glance
            label="Shabbat Shacharit"
            value={shabbatMorning?.time ?? "9:00 AM"}
          />
          <Glance
            label="Candle Lighting"
            value={zmanim?.candleLighting ?? "See schedule"}
          />
          <Glance label="Havdalah" value={zmanim?.havdalah ?? "See schedule"} />
          <Glance
            label={zmanim?.parsha ? "This Shabbat" : "Next Event"}
            value={zmanim?.parsha ?? events[0]?.title ?? "See calendar"}
          />
        </div>
      </section>

      {/* Upcoming events */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-3xl font-bold text-navy-800">
            Upcoming at B&rsquo;nai Israel
          </h2>
          <Link
            href="/events"
            className="text-sm font-semibold text-navy-600 underline-offset-4 hover:underline"
          >
            Full calendar →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </section>

      {/* History band */}
      <section className="bg-navy-800 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl font-bold">
              A landmark since 1876
            </h2>
            <p className="mt-4 leading-relaxed text-navy-100">
              B&rsquo;nai Israel is one of the oldest synagogue buildings in
              continuous use in the United States — a Moorish-revival gem on
              Lloyd Street, the oldest synagogue street in America. We&rsquo;re
              not a museum: we&rsquo;re a living, davening community, and our
              doors are open to you.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block rounded-full border border-gold-400 px-6 py-2.5 font-semibold text-gold-400 transition-colors hover:bg-gold-500 hover:text-navy-900"
            >
              Our story
            </Link>
          </div>
          <div className="rounded-xl bg-navy-700 p-8 text-center">
            <p className="font-serif text-6xl text-gold-400" aria-hidden="true">
              בית ישראל
            </p>
            <p className="mt-3 text-sm uppercase tracking-widest text-navy-100">
              Congregation B&rsquo;nai Israel
            </p>
            {zmanim?.hebrewDate && (
              <p className="mt-4 text-lg text-gold-100">{zmanim.hebrewDate}</p>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-3xl px-4 py-14 text-center">
        <h2 className="font-serif text-3xl font-bold text-navy-800">
          This Week at B&rsquo;nai Israel
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-ink/70">
          Schedule changes, kiddush sponsors, mazel tovs, and upcoming events —
          one short email every week.
        </p>
        <div className="mx-auto mt-6 max-w-md">
          <NewsletterSignup />
        </div>
        <p className="mt-4 text-sm">
          <Link
            href="/this-week"
            className="font-semibold text-navy-600 underline-offset-4 hover:underline"
          >
            Read this week&rsquo;s announcements →
          </Link>
        </p>
      </section>
    </>
  );
}

function Glance({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-600">
        {label}
      </p>
      <p className="mt-1 truncate font-serif text-lg font-bold text-navy-800">
        {value}
      </p>
    </div>
  );
}
