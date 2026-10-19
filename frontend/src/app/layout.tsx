"use client"
import Navbar, { MobileNav } from '@/components/molecules/navbar';
import { metadata } from "./metadata";
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { Toaster } from 'sonner';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const interV = localFont({
  src: '../fonts/inter-v.ttf',
  variable: '--font-interv',
});

const DynamicStellarProvider = dynamic(() => import('@/lib/stellar/stellar-provider').then(mod => mod.StellarProvider), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Loading Game Engine...</h2>
        <p className="text-gray-500">Please wait while we initialize the game</p>
      </div>
    </div>
  ),
});

/**
 * Defers mounting the wallet/SDK provider until after the first client render so
 * the Stellar SDK and Wallets Kit are never part of the initial route bundle.
 */
function DeferredStellarProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading Game Engine...</h2>
          <p className="text-gray-500">Please wait while we initialize the game</p>
        </div>
      </div>
    );
  }

  return <DynamicStellarProvider>{children}</DynamicStellarProvider>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Inline script runs before paint to avoid a flash of wrong theme */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('lyricsflip-theme');var t=s?JSON.parse(s).state?.theme:null;if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable} ${interV.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}>
        <ThemeProvider>
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Loading...</h2>
                  <p className="text-gray-500">Please wait while we prepare the game</p>
                </div>
              </div>
            }>
              <DeferredStellarProvider>
                <Navbar />
                {/* pb-20 on mobile so the fixed MobileNav bar never overlaps content; md:pb-0 restores normal flow on desktop */}
                <main className="pb-20 md:pb-0">
                  {children}
                </main>
                <MobileNav />
              </DeferredStellarProvider>
            </Suspense>
            <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
