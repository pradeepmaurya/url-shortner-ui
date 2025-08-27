"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link2, Loader2 } from "lucide-react";
import { validateUrl } from "@/lib/validation";
import { ShortenedUrl } from "@/types/common";
import toast from "react-hot-toast";
import ResultDisplay from "./result-display";
import { IApiClientResponse } from "@/lib/apiClient";
import CommonServices from "@/services/CommonServices";

interface UrlShortenerFormProps {
  onUrlShortened: (url: ShortenedUrl) => void;
}

export default function UrlShortenerForm({
  onUrlShortened,
}: UrlShortenerFormProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ShortenedUrl | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validation = validateUrl(url);
    if (!validation.isValid) {
      setError(validation.error || "Invalid URL");
      return;
    }

    setIsLoading(true);

    try {
      const results: IApiClientResponse =
        await CommonServices.createShortenUrlFromLongUrl(url);
      const urlData: ShortenedUrl = {
        shortedUrl: results?.data?.shortedUrl || "",
        original: results?.data?.originalUrl || "",
      };

      setResult(urlData);
      onUrlShortened(urlData);
      setUrl("");
      toast.success("URL shortened successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to shorten URL";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewUrl = () => {
    setResult(null);
    setError("");
  };

  if (result) {
    return <ResultDisplay result={result} onNewUrl={handleNewUrl} />;
  }

  return (
    <Card className="neumorphic p-8 max-w-2xl mx-auto border-0">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <div className="neumorphic inline-flex p-3 rounded-full mb-4 animate-bounce-gentle">
            <Link2 className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-800">
            Enter Your URL
          </h2>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/very-long-url-that-needs-shortening"
              className="neumorphic-inset border-0 h-12 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              disabled={isLoading}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm font-medium animate-in slide-in-from-top-1">
              {error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="w-full neumorphic border-0 h-12 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Shortening...
            </>
          ) : (
            <>
              <Link2 className="mr-2 h-4 w-4" />
              Shorten URL
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
