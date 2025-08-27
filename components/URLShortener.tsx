"use client";

import { useState } from "react";
import { Copy, Link, QrCode, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import QRCodeGenerator from "./QRCodeGenerator";

interface URLShortenerProps {
  onURLCreated: () => void;
}

interface ShortenedURL {
  id: string;
  originalUrl: string;
  shortedUrl: string;
  customAlias?: string;
  createdAt: string;
}

export default function URLShortener({ onURLCreated }: URLShortenerProps) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedURL | null>(null);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState("");

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  console.log("shortenedUrl:", shortenedUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!originalUrl.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(originalUrl)) {
      setError("Please enter a valid URL");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Replace this with your actual NestJS API endpoint
      const response = await fetch("http://localhost:4000/api/urls/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: originalUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to shorten URL");
      }

      const data = await response.json();

      setShortenedUrl({
        ...data,
      });

      setOriginalUrl("");
      setCustomAlias("");
      onURLCreated();

      toast.success("URL shortened successfully!");
    } catch (error) {
      console.error("Error shortening URL:", error);
      setError(
        error instanceof Error ? error.message : "Failed to shorten URL"
      );
      toast.error("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shortenedUrl) return;

    try {
      await navigator.clipboard.writeText(shortenedUrl.shortedUrl);
      setCopied(true);
      toast.success("URL copied to clipboard!");

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy URL");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="neumorphic rounded-2xl p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="url"
              className="text-lg font-medium text-slate-700 mb-2 block"
            >
              Enter your long URL
            </Label>
            <div className="relative">
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/very/long/url/path"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className={`neumorphic-inset h-14 text-lg pr-12 transition-all duration-300 focus:shadow-lg ${
                  error
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : ""
                }`}
                disabled={loading}
              />
              <Link className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
            {error && (
              <div className="flex items-center mt-2 text-red-600">
                <AlertCircle className="w-4 h-4 mr-2" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>

          <div>
            <Label
              htmlFor="alias"
              className="text-lg font-medium text-slate-700 mb-2 block"
            >
              Custom alias (optional)
            </Label>
            <Input
              id="alias"
              type="text"
              placeholder="my-custom-link"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="neumorphic-inset h-12 text-lg transition-all duration-300 focus:shadow-lg"
              disabled={loading}
            />
            <p className="text-sm text-slate-500 mt-1">
              Leave empty for auto-generated alias
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading || !originalUrl.trim()}
            className="w-full h-14 text-lg font-semibold neumorphic-hover bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="loading-dots mr-3">
                  <div style={{ "--i": 0 } as React.CSSProperties}></div>
                  <div style={{ "--i": 1 } as React.CSSProperties}></div>
                  <div style={{ "--i": 2 } as React.CSSProperties}></div>
                </div>
                Shortening...
              </div>
            ) : (
              "Shorten URL"
            )}
          </Button>
        </form>
      </div>

      {shortenedUrl && (
        <div className="neumorphic rounded-2xl p-8 animate-fade-in">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Your shortened URL is ready! 🎉
          </h3>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 mr-4">
                <p className="text-sm text-slate-600 mb-1">Short URL:</p>
                <p className="text-xl font-semibold text-blue-600 break-all">
                  {shortenedUrl.shortedUrl}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={copyToClipboard}
                  className={`neumorphic-hover px-4 py-2 transition-all duration-300 ${
                    copied
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
                  }`}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  onClick={() => setShowQR(!showQR)}
                  className="neumorphic-hover bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2"
                >
                  <QrCode className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="text-sm text-slate-500">
              <p className="mb-1">Original: {shortenedUrl.originalUrl}</p>
              <p>
                Created: {new Date(shortenedUrl.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {showQR && (
            <div className="animate-slide-up">
              <QRCodeGenerator url={shortenedUrl.shortedUrl} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
