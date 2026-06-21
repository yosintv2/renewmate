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
  title: "RenewMate — Never Miss a Renewal",
  description:
    "Nepal's #1 vehicle renewal reminder platform. Track vehicle tax, bluebook, insurance, and pollution test dates. Get timely reminders and store documents securely.",
  keywords: [
    "vehicle tax reminder Nepal",
    "bluebook renewal Nepal",
    "vehicle insurance Nepal",
    "pollution test Nepal",
    "bike tax Nepal",
    "car tax Nepal",
  ],
  openGraph: {
    title: "RenewMate — Never Miss a Renewal",
    description:
      "Track vehicle tax, bluebook, insurance, and pollution test renewals. Built for Nepal.",
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
