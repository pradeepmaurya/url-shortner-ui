'use client';

import { useState, useEffect } from 'react';
import { Copy, ExternalLink, QrCode, BarChart3, Calendar, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface URLRecord {
  id: string;
  originalUrl: string;
  shortUrl: string;
  customAlias?: string;
  clicks: number;
  createdAt: string;
}

export default function URLHistory() {
  const [urls, setUrls] = useState<URLRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchURLHistory();
  }, []);

  const fetchURLHistory = async () => {
    try {
      // Replace with your actual NestJS API endpoint
      const response = await fetch('http://localhost:3001/api/url/history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUrls(data);
      }
    } catch (error) {
      console.error('Error fetching URL history:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('URL copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateUrl = (url: string, maxLength: number = 50) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="neumorphic rounded-2xl p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-slate-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="neumorphic rounded-2xl p-8">
        <div className="flex items-center mb-8">
          <Link className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-3xl font-bold text-slate-800">Recent Links</h2>
        </div>

        {urls.length === 0 ? (
          <div className="text-center py-12">
            <div className="neumorphic-inset rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Link className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No links yet</h3>
            <p className="text-slate-500">Start by creating your first shortened URL above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {urls.map((url, index) => (
              <div
                key={url.id}
                className="neumorphic-inset rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 min-w-0 mr-4">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                      <h3 className="font-semibold text-slate-800 truncate">
                        {url.customAlias || 'Auto-generated'}
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-blue-600">
                        <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="font-medium truncate">{url.shortUrl}</span>
                      </div>
                      
                      <div className="flex items-center text-slate-600">
                        <Link className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{truncateUrl(url.originalUrl)}</span>
                      </div>
                    </div>

                    <div className="flex items-center mt-3 space-x-4 text-sm text-slate-500">
                      <div className="flex items-center">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        <span>{url.clicks} clicks</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDate(url.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Button
                      onClick={() => copyToClipboard(url.shortUrl)}
                      size="sm"
                      className="neumorphic-hover bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      onClick={() => window.open(url.shortUrl, '_blank')}
                      size="sm"
                      className="neumorphic-hover bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}