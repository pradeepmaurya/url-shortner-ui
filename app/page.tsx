"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import UrlShortenerForm from "@/components/url-shortener-form";
import UrlHistory from "@/components/url-history";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FeatureCards from "@/components/feature-cards";
import { ShortenedUrl } from "@/types/common";

export default function HomePage() {
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("shortened-urls");
    if (stored) {
      setShortenedUrls(JSON.parse(stored));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && shortenedUrls.length > 0) {
      localStorage.setItem("shortened-urls", JSON.stringify(shortenedUrls));
    }
  }, [shortenedUrls, isLoaded]);

  const addShortenedUrl = (url: ShortenedUrl) => {
    setShortenedUrls((prev) => [url, ...prev.slice(0, 9)]);
  };

  const clearHistory = () => {
    setShortenedUrls([]);
    localStorage.removeItem("shortened-urls");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-float">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                Shorten URLs
                <span className="block text-blue-600 animate-pulse-slow">
                  Instantly
                </span>
              </h1>
            </div>

            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform long, complex URLs into clean, shareable links. Fast,
              secure, and completely free.
            </p>

            <div className="mb-16">
              <Suspense
                fallback={<div className="animate-pulse">Loading...</div>}
              >
                <UrlShortenerForm onUrlShortened={addShortenedUrl} />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
              Why Choose LinkShrink?
            </h2>
            <FeatureCards />
          </div>
        </section>

        {/* History Section */}
        {shortenedUrls.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <UrlHistory urls={shortenedUrls} onClear={clearHistory} />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
