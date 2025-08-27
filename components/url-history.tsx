"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Trash2, Clock } from "lucide-react";
import { ShortenedUrl } from "@/types/common";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

interface UrlHistoryProps {
  urls: ShortenedUrl[];
  onClear: () => void;
}

export default function UrlHistory({ urls, onClear }: UrlHistoryProps) {
  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleOpen = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center">
          <Clock className="mr-2 h-6 w-6 text-blue-600" />
          Recent URLs
        </h2>
        <Button
          onClick={onClear}
          variant="outline"
          className="neumorphic border-0 text-slate-600 hover:text-red-600 transition-colors duration-200"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear History
        </Button>
      </div>

      <div className="grid gap-4">
        {urls.map((urlData, index) => (
          <Card
            key={`${urlData.shortedUrl}-${index}`}
            className="neumorphic p-6 border-0 animate-in slide-in-from-left-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    Original URL
                  </span>
                </div>
                <p className="text-slate-600 text-sm break-all bg-slate-50 p-2 rounded-lg">
                  {urlData.original}
                </p>
              </div>

              <div>
                <span className="text-sm font-medium text-slate-700 block mb-2">
                  Shortened URL
                </span>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-blue-600 font-medium break-all">
                    {urlData.shortedUrl}
                  </p>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      onClick={() => handleCopy(urlData.shortedUrl)}
                      size="sm"
                      variant="outline"
                      className="neumorphic border-0 h-8 w-8 p-0 text-slate-600 hover:text-blue-600 transition-all duration-200"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={() => handleOpen(urlData.shortedUrl)}
                      size="sm"
                      variant="outline"
                      className="neumorphic border-0 h-8 w-8 p-0 text-slate-600 hover:text-blue-600 transition-all duration-200"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
