import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkShrink - Professional URL Shortener",
  description:
    "Shorten your URLs instantly with our fast, secure, and reliable URL shortener. Track clicks, manage links, and boost your productivity.",
  keywords:
    "URL shortener, link shortener, short URL, link management, analytics",
  authors: [{ name: "LinkShrink" }],
  openGraph: {
    title: "LinkShrink - Professional URL Shortener",
    description:
      "Shorten your URLs instantly with our fast, secure, and reliable URL shortener.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkShrink - Professional URL Shortener",
    description:
      "Shorten your URLs instantly with our fast, secure, and reliable URL shortener.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "LinkShrink",
              description: "Professional URL shortener service",
              url: "https://linkshrink.com",
              applicationCategory: "UtilityApplication",
              operatingSystem: "All",
            }),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
