import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Cinzel } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bridgefour.co"),
  title: {
    default: "Bridge Four — Josh Bocas",
    template: "%s · Bridge Four",
  },
  description:
    "Two AI products, shipped solo from the desk job. Sygnalist, a ranked job radar. Waymark, a coach that reads Strava, sleep, and soreness, then rewrites the week.",
  applicationName: "Bridge Four",
  authors: [{ name: "Josh Bocas" }],
  creator: "Josh Bocas",
  openGraph: {
    type: "website",
    url: "https://bridgefour.co",
    siteName: "Bridge Four",
    title: "Bridge Four — Josh Bocas",
    description:
      "Two AI products, shipped solo from the desk job. Sygnalist and Waymark.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bridge Four — Josh Bocas",
    description:
      "Two AI products, shipped solo from the desk job. Sygnalist and Waymark.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grain">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
