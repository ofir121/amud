import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export type EventType = "davening" | "class" | "community" | "holiday";

export interface ShulEvent {
  slug: string;
  title: string;
  date: string;
  type: EventType;
  location?: string;
  description: string;
  image?: string;
  rsvpLink?: string;
  body: string;
}

export interface Announcement {
  slug: string;
  title: string;
  weekOf: string;
  published: string;
  body: string;
}

export interface ScheduleRow {
  name: string;
  time: string;
}

export interface ScheduleSection {
  title: string;
  rows: ScheduleRow[];
}

export interface Schedule {
  note?: string;
  sections: ScheduleSection[];
}

export interface Settings {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  rabbi: string;
  venmoHandle: string;
  zelleAddress: string;
  facebook?: string;
  instagram?: string;
}

function readCollection(dir: string) {
  const full = path.join(contentDir, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(full, f), "utf8");
      const { data, content } = matter(raw);
      return { slug: f.replace(/\.md$/, ""), data, body: content };
    });
}

function toISO(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value ?? "");
}

export function getEvents(): ShulEvent[] {
  return readCollection("events")
    .map(({ slug, data, body }) => ({
      slug,
      title: String(data.title ?? ""),
      date: toISO(data.date),
      type: (data.type ?? "community") as EventType,
      location: data.location ? String(data.location) : undefined,
      description: String(data.description ?? ""),
      image: data.image ? String(data.image) : undefined,
      rsvpLink: data.rsvpLink ? String(data.rsvpLink) : undefined,
      body,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getUpcomingEvents(limit?: number): ShulEvent[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const upcoming = getEvents().filter((e) => new Date(e.date) >= now);
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export function getEvent(slug: string): ShulEvent | undefined {
  return getEvents().find((e) => e.slug === slug);
}

export function getAnnouncements(): Announcement[] {
  return readCollection("announcements")
    .map(({ slug, data, body }) => ({
      slug,
      title: String(data.title ?? ""),
      weekOf: toISO(data.weekOf).slice(0, 10),
      published: toISO(data.published),
      body,
    }))
    .sort((a, b) => b.weekOf.localeCompare(a.weekOf));
}

export function getAnnouncement(slug: string): Announcement | undefined {
  return getAnnouncements().find((a) => a.slug === slug);
}

export function getSchedule(): Schedule {
  const raw = fs.readFileSync(path.join(contentDir, "schedule.json"), "utf8");
  return JSON.parse(raw) as Schedule;
}

export function getSettings(): Settings {
  const raw = fs.readFileSync(path.join(contentDir, "settings.json"), "utf8");
  return JSON.parse(raw) as Settings;
}

export function formatEventDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });
}

export function formatEventTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
}

export const eventTypeLabels: Record<EventType, string> = {
  davening: "Davening",
  class: "Learning",
  community: "Community",
  holiday: "Holiday",
};
