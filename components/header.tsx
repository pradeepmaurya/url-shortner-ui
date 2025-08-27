'use client';

import { Link2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphic">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="neumorphic p-2 rounded-xl">
              <Link2 className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xl font-bold text-slate-800">
              LinkShrink
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#features" 
              className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
            >
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}