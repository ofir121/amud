"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const presets = [18, 36, 54, 100, 180, 360];

const dedications = [
  { value: "general", label: "General donation" },
  { value: "yahrzeit", label: "Yahrzeit / In memory of" },
  { value: "honor", label: "In honor of" },
  { value: "kiddush", label: "Kiddush sponsorship" },
  { value: "building", label: "Building fund" },
];

export default function DonateForm() {
  const router = useRouter();
  const [amount, setAmount] = useState<number | "">(36);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [dedication, setDedication] = useState("general");
  const [dedicationName, setDedicationName] = useState("");
  const [coverFees, setCoverFees] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveAmount = custom ? Number(custom) : amount || 0;
  const fees = coverFees ? Math.round(effectiveAmount * 0.03 * 100) / 100 : 0;
  const total = effectiveAmount + fees;
  const needsName = dedication !== "general" && dedication !== "building";

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!total || total < 1) {
      setError("Please choose an amount.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          frequency,
          dedication,
          dedicationName,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.demo) {
        router.push(
          `/donate/thank-you?demo=1&amount=${total.toFixed(2)}&frequency=${frequency}`
        );
      } else {
        setError(data.error ?? "Something went wrong — please try again.");
        setSubmitting(false);
      }
    } catch {
      setError("Something went wrong — please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Frequency */}
      <fieldset>
        <legend className="sr-only">Donation frequency</legend>
        <div className="grid grid-cols-2 overflow-hidden rounded-full border border-navy-100 text-center text-sm font-semibold">
          {(["one-time", "monthly"] as const).map((f) => (
            <label
              key={f}
              className={`cursor-pointer px-4 py-2.5 transition-colors ${
                frequency === f
                  ? "bg-navy-700 text-white"
                  : "bg-white text-navy-700 hover:bg-navy-50"
              }`}
            >
              <input
                type="radio"
                name="frequency"
                value={f}
                checked={frequency === f}
                onChange={() => setFrequency(f)}
                className="sr-only"
              />
              {f === "one-time" ? "One-time" : "Monthly"}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Amount */}
      <fieldset>
        <legend className="mb-2 text-sm font-medium">Amount (USD)</legend>
        <div className="grid grid-cols-3 gap-2">
          {presets.map((p) => (
            <label
              key={p}
              className={`cursor-pointer rounded-lg border py-2.5 text-center font-semibold transition-colors ${
                amount === p && !custom
                  ? "border-navy-700 bg-navy-700 text-white"
                  : "border-navy-100 bg-white text-navy-700 hover:border-navy-600"
              }`}
            >
              <input
                type="radio"
                name="amount"
                value={p}
                checked={amount === p && !custom}
                onChange={() => {
                  setAmount(p);
                  setCustom("");
                }}
                className="sr-only"
              />
              ${p}
            </label>
          ))}
        </div>
        <div className="mt-2">
          <label htmlFor="custom-amount" className="sr-only">
            Custom amount
          </label>
          <input
            id="custom-amount"
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            placeholder="Custom amount"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="w-full rounded-lg border border-navy-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
          />
        </div>
        <p className="mt-1.5 text-xs text-ink/60">
          Chai amounts (multiples of $18) are traditional — but every amount
          helps.
        </p>
      </fieldset>

      {/* Dedication */}
      <div>
        <label htmlFor="dedication" className="mb-1 block text-sm font-medium">
          Dedication
        </label>
        <select
          id="dedication"
          value={dedication}
          onChange={(e) => setDedication(e.target.value)}
          className="w-full rounded-lg border border-navy-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
        >
          {dedications.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        {needsName && (
          <div className="mt-2">
            <label
              htmlFor="dedication-name"
              className="mb-1 block text-sm font-medium"
            >
              {dedication === "kiddush"
                ? "Occasion or honoree"
                : "Name (English or Hebrew)"}
            </label>
            <input
              id="dedication-name"
              value={dedicationName}
              onChange={(e) => setDedicationName(e.target.value)}
              placeholder={
                dedication === "yahrzeit" ? "e.g. שרה בת אברהם / Sarah Cohen" : ""
              }
              className="w-full rounded-lg border border-navy-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
            />
          </div>
        )}
      </div>

      {/* Cover fees */}
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={coverFees}
          onChange={(e) => setCoverFees(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-navy-700"
        />
        <span>
          Add {fees > 0 ? `$${fees.toFixed(2)}` : "~3%"} to cover processing
          fees so the shul receives the full amount
        </span>
      </label>

      {error && (
        <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-gold-500 px-6 py-3.5 text-lg font-bold text-navy-900 transition-colors hover:bg-gold-400 disabled:opacity-60"
      >
        {submitting
          ? "Opening secure checkout…"
          : `Donate $${total > 0 ? total.toFixed(2).replace(/\.00$/, "") : "0"}${frequency === "monthly" ? "/month" : ""}`}
      </button>
      <p className="text-center text-xs text-ink/60">
        Secure checkout with card, Apple Pay, Google Pay, or PayPal. You&rsquo;ll
        receive an email receipt for tax purposes.
      </p>
    </form>
  );
}
