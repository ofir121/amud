import type { Metadata } from "next";
import Link from "next/link";
import { getSchedule } from "@/lib/content";
import { getZmanim } from "@/lib/hebcal";

export const metadata: Metadata = {
  title: "Davening Times & Zmanim",
  description:
    "Shabbat and weekday service times at B'nai Israel Congregation in downtown Baltimore, with live candle-lighting, havdalah, and parsha for this week.",
};

export default async function DaveningPage() {
  const schedule = getSchedule();
  const zmanim = await getZmanim();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-navy-800">
        Davening at B&rsquo;nai Israel
      </h1>
      <p className="mt-2 text-lg text-gold-600">
        Traditional davening in our historic sanctuary, every week
      </p>

      {zmanim && (
        <section
          aria-label="This week's zmanim"
          className="mt-8 rounded-xl bg-navy-800 p-6 text-white"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-serif text-2xl font-bold">
              This Shabbat{zmanim.parsha ? ` — ${zmanim.parsha}` : ""}
            </h2>
            {zmanim.hebrewDate && (
              <p className="font-serif text-lg text-gold-400">{zmanim.hebrewDate}</p>
            )}
          </div>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {zmanim.candleLighting && (
              <div className="rounded-lg bg-navy-700 px-4 py-3">
                <dt className="text-xs uppercase tracking-widest text-gold-400">
                  Candle Lighting
                </dt>
                <dd className="mt-1 font-serif text-xl font-bold">
                  {zmanim.candleLighting}
                </dd>
              </div>
            )}
            {zmanim.havdalah && (
              <div className="rounded-lg bg-navy-700 px-4 py-3">
                <dt className="text-xs uppercase tracking-widest text-gold-400">
                  Havdalah
                </dt>
                <dd className="mt-1 font-serif text-xl font-bold">
                  {zmanim.havdalah}
                </dd>
              </div>
            )}
          </dl>
          {zmanim.holidays.length > 0 && (
            <p className="mt-3 text-sm text-gold-100">
              {zmanim.holidays.join(" · ")}
            </p>
          )}
          <p className="mt-3 text-xs text-navy-100/70">
            Zmanim calculated for Baltimore, MD via Hebcal.
          </p>
        </section>
      )}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {schedule.sections.map((section) => (
          <section
            key={section.title}
            className="rounded-xl border border-parchment bg-white p-6"
          >
            <h2 className="font-serif text-2xl font-bold text-navy-800">
              {section.title}
            </h2>
            <dl className="mt-4 divide-y divide-parchment">
              {section.rows.map((row) => (
                <div
                  key={row.name}
                  className="flex items-baseline justify-between gap-4 py-2.5"
                >
                  <dt className="font-medium">{row.name}</dt>
                  <dd className="text-right text-ink/80">{row.time}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      {schedule.note && (
        <p className="mt-6 text-sm text-ink/70">
          {schedule.note}{" "}
          <Link href="/this-week" className="font-semibold text-navy-600 underline">
            This week&rsquo;s announcements →
          </Link>
        </p>
      )}
    </div>
  );
}
