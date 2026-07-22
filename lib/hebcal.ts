// Live zmanim + Hebrew date for Baltimore via the Hebcal API (no key required).
// Cached for an hour so pages stay static-fast; falls back gracefully offline.

const BALTIMORE_GEONAME_ID = 4347778;

export interface Zmanim {
  candleLighting?: string;
  havdalah?: string;
  parsha?: string;
  hebrewDate?: string;
  holidays: string[];
}

interface HebcalItem {
  category: string;
  title: string;
  hebrew?: string;
  date: string;
}

export async function getZmanim(): Promise<Zmanim | null> {
  try {
    const [shabbat, converter] = await Promise.all([
      fetch(
        `https://www.hebcal.com/shabbat?cfg=json&geonameid=${BALTIMORE_GEONAME_ID}&M=on`,
        { next: { revalidate: 3600 } }
      ),
      fetch(`https://www.hebcal.com/converter?cfg=json&g2h=1&gs=off&date=today`, {
        next: { revalidate: 3600 },
      }),
    ]);
    if (!shabbat.ok) return null;

    const data = (await shabbat.json()) as { items: HebcalItem[] };
    const items = data.items ?? [];

    const candles = items.find((i) => i.category === "candles");
    const havdalah = items.find((i) => i.category === "havdalah");
    const parsha = items.find((i) => i.category === "parashat");
    const holidays = items
      .filter((i) => i.category === "holiday")
      .map((i) => i.title);

    let hebrewDate: string | undefined;
    if (converter.ok) {
      const conv = (await converter.json()) as { hebrew?: string };
      hebrewDate = conv.hebrew;
    }

    return {
      candleLighting: candles ? formatHebcalTime(candles) : undefined,
      havdalah: havdalah ? formatHebcalTime(havdalah) : undefined,
      parsha: parsha?.title,
      hebrewDate,
      holidays,
    };
  } catch {
    return null;
  }
}

function formatHebcalTime(item: HebcalItem): string {
  const day = new Date(item.date).toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: "America/New_York",
  });
  const time = new Date(item.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
  return `${day} ${time}`;
}
