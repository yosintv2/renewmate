import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RenewMate — Never Miss a Subscription Payment",
  description:
    "Track every subscription, bill, rent, and financial liability in one place. Get reminded before payments hit — Netflix, Spotify, rent, credit cards, BNPL, and more. Free forever.",
  keywords: [
    "subscription tracker",
    "bill reminder app",
    "subscription management",
    "recurring payment tracker",
    "Netflix reminder",
    "subscription cost tracker",
    "monthly bill tracker",
    "BNPL tracker",
    "credit card payment reminder",
    "rent reminder",
  ],
  openGraph: {
    title: "RenewMate — Never Miss a Subscription Payment",
    description:
      "Track every subscription, bill, and recurring payment. Get reminded before they charge. Free forever.",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
