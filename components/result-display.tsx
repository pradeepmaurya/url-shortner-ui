"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy, Check, ExternalLink, RotateCcw } from "lucide-react";
import { ShortenedUrl } from "@/types/common";
import toast from "react-hot-toast";

interface ResultDisplayProps {
  result: ShortenedUrl;
  onNewUrl: () => void;
}

export default function ResultDisplay({
  result,
  onNewUrl,
}: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.shortedUrl);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleOpen = () => {
    window.open(result.shortedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="neumorphic p-8 max-w-2xl mx-auto border-0 animate-in slide-in-from-bottom-4">
      <div className="text-center mb-6">
        <div className="neumorphic inline-flex p-3 rounded-full mb-4 bg-green-50">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-800">
          URL Shortened Successfully!
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Original URL
          </label>
          <div className="neumorphic-inset p-3 rounded-lg">
            <p className="text-slate-600 text-sm break-all">
              {result.original}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Shortened URL
          </label>
          <div className="flex gap-2">
            <Input
              value={result.shortedUrl}
              readOnly
              className="neumorphic-inset border-0 h-12 text-slate-700 font-medium"
            />
            <Button
              onClick={handleCopy}
              className="neumorphic border-0 h-12 px-4 text-slate-700 hover:text-blue-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
              variant="outline"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              onClick={handleOpen}
              className="neumorphic border-0 h-12 px-4 text-slate-700 hover:text-blue-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
              variant="outline"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={onNewUrl}
            className="flex-1 neumorphic border-0 h-12 text-slate-700 hover:text-blue-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
            variant="outline"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Shorten Another URL
          </Button>
        </div>
      </div>
    </Card>
  );
}
