'use client';

import { Link2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="neumorphic mt-16 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="neumorphic p-2 rounded-lg">
              <Link2 className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-lg font-bold text-slate-800">
              LinkShrink
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-slate-600">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>for better web experiences</span>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-6 pt-6 text-center text-sm text-slate-500">
          <p>&copy; 2025 LinkShrink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}