import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the Decap CMS editor (public/admin/index.html) at /admin —
  // Next.js doesn't resolve directory indexes in /public on its own.
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};

export default nextConfig;
