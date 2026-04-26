import type { NextConfig } from "next";

const SYGNALIST_DEMO_ORIGIN =
  process.env.NEXT_PUBLIC_SYGNALIST_DEMO_ORIGIN ?? "https://sygnalist-demo.vercel.app";
const WAYMARK_DEMO_ORIGIN =
  process.env.NEXT_PUBLIC_WAYMARK_DEMO_ORIGIN ?? "https://waymark-demo.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/_demo/sygnalist", destination: `${SYGNALIST_DEMO_ORIGIN}/login` },
      { source: "/_demo/sygnalist/:path*", destination: `${SYGNALIST_DEMO_ORIGIN}/:path*` },
      { source: "/_demo/waymark", destination: `${WAYMARK_DEMO_ORIGIN}/today` },
      { source: "/_demo/waymark/:path*", destination: `${WAYMARK_DEMO_ORIGIN}/:path*` },
    ];
  },
};

export default nextConfig;
