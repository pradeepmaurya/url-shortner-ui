'use client';

import { Card } from '@/components/ui/card';
import { Zap, Shield, BarChart3, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Shorten URLs instantly with our optimized infrastructure and fast API responses.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Your URLs are protected with enterprise-grade security and 99.9% uptime.',
  },
  {
    icon: BarChart3,
    title: 'Track Performance',
    description: 'Monitor click analytics and track the performance of your shortened links.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Perfect experience across all devices with our responsive design.',
  },
];

export default function FeatureCards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <Card
          key={feature.title}
          className="neumorphic p-6 border-0 text-center hover:scale-105 transition-transform duration-300 animate-in slide-in-from-bottom-4"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="neumorphic inline-flex p-4 rounded-full mb-4">
            <feature.icon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            {feature.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {feature.description}
          </p>
        </Card>
      ))}
    </div>
  );
}