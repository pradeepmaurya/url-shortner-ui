'use client';

import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#f0f2f7',
            color: '#334155',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '9px 9px 16px rgba(163, 177, 198, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.8)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#f0f2f7',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#f0f2f7',
            },
          },
        }}
      />
    </>
  );
}