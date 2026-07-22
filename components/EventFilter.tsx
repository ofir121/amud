import Link from "next/link";
import { eventTypeLabels } from "@/lib/content";

export default function EventFilter({ active }: { active?: string }) {
  const filters = [
    { value: undefined, label: "All" },
    ...Object.entries(eventTypeLabels).map(([value, label]) => ({
      value,
      label,
    })),
  ];

  return (
    <nav aria-label="Filter events by type" className="flex flex-wrap gap-2">
      {filters.map((f) => {
        const isActive = f.value === active || (!f.value && !active);
        return (
          <Link
            key={f.label}
            href={f.value ? `/events?type=${f.value}` : "/events"}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              isActive
                ? "bg-navy-700 text-white"
                : "border border-navy-100 bg-white text-navy-700 hover:border-navy-600"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {f.label}
          </Link>
        );
      })}
    </nav>
  );
}
