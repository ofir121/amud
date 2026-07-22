"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="rounded-lg bg-gold-100 px-4 py-3 text-sm font-medium text-navy-800" role="status">
        Thank you! You&rsquo;re on the list for This Week at B&rsquo;nai Israel.
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.includes("@")) setDone(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 rounded-lg border border-navy-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
      />
      <button
        type="submit"
        className="rounded-lg bg-navy-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-600"
      >
        Get the Weekly Email
      </button>
    </form>
  );
}
