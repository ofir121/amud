"use client";

import { useState } from "react";

export default function MembershipForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p
        className="rounded-lg bg-gold-100 px-4 py-3 font-medium text-navy-800"
        role="status"
      >
        Thank you! The office will be in touch within a few days. (Preview site:
        submissions will be emailed to the office on the live site.)
      </p>
    );
  }

  return (
    <form
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <div>
        <label htmlFor="m-name" className="mb-1 block text-sm font-medium">
          Full name
        </label>
        <input
          id="m-name"
          name="name"
          required
          className="w-full rounded-lg border border-navy-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
        />
      </div>
      <div>
        <label htmlFor="m-email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="m-email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-navy-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
        />
      </div>
      <div>
        <label htmlFor="m-tier" className="mb-1 block text-sm font-medium">
          Membership type
        </label>
        <select
          id="m-tier"
          name="tier"
          className="w-full rounded-lg border border-navy-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
        >
          <option>Young Professional</option>
          <option>Individual</option>
          <option>Family</option>
          <option>Supporter</option>
        </select>
      </div>
      <div>
        <label htmlFor="m-phone" className="mb-1 block text-sm font-medium">
          Phone (optional)
        </label>
        <input
          id="m-phone"
          name="phone"
          type="tel"
          className="w-full rounded-lg border border-navy-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-full bg-navy-700 px-8 py-3 font-semibold text-white transition-colors hover:bg-navy-600"
        >
          Send to the Office
        </button>
      </div>
    </form>
  );
}
