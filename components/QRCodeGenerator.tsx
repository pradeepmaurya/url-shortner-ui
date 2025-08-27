'use client';

import { useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface QRCodeGeneratorProps {
  url: string;
}

export default function QRCodeGenerator({ url }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateQRCode();
  }, [url]);

  const generateQRCode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple QR code placeholder - in production, use a QR code library like 'qrcode'
    const size = 200;
    canvas.width = size;
    canvas.height = size;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Simple pattern (replace with actual QR code generation)
    ctx.fillStyle = '#000000';
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if ((i + j) % 2 === 0) {
          ctx.fillRect(i * 10, j * 10, 8, 8);
        }
      }
    }

    // Add URL text below
    ctx.fillStyle = '#64748b';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(url, size / 2, size - 10);
  };

  const downloadQRCode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvas.toDataURL();
      link.click();
      toast.success('QR code downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download QR code');
    }
  };

  return (
    <div className="neumorphic-inset rounded-xl p-6">
      <h4 className="text-lg font-semibold text-slate-800 mb-4 text-center">
        QR Code
      </h4>
      <div className="flex flex-col items-center space-y-4">
        <div className="neumorphic rounded-lg p-4">
          <canvas
            ref={canvasRef}
            className="rounded-lg"
            style={{ maxWidth: '200px', height: 'auto' }}
          />
        </div>
        <Button
          onClick={downloadQRCode}
          className="neumorphic-hover bg-slate-600 hover:bg-slate-700 text-white px-6 py-2"
        >
          <Download className="w-4 h-4 mr-2" />
          Download QR Code
        </Button>
        <p className="text-sm text-slate-500 text-center max-w-xs">
          Scan this QR code with your mobile device to quickly access the shortened URL
        </p>
      </div>
    </div>
  );
}