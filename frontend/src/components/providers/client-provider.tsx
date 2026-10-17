'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { DynamicStellarProvider } from '@/components/providers/dynamic-stellar-provider';
import { Navbar } from '@/components/navbar';
import { MobileNav } from '@/components/mobile-nav';

export function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <DynamicStellarProvider>
          <Navbar />
          <main className="pb-20 md:pb-0">{children}</main>
          <MobileNav />
          <Toaster />
        </DynamicStellarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
