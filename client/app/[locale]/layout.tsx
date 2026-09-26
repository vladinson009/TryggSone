import type { Metadata } from 'next';
import { Geist, Geist_Mono, Roboto } from 'next/font/google';
import '../globals.css';
import { cn } from '@/lib/utils';
import NavigationHeader from './navigation-menu';
import { ThemeProvider } from '@/components/theme-provider';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from '@/components/ui/toast';

const roboto = Roboto({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TryggSone',
  description: 'TryggSone app',
};

export default function RootLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        'font-sans',
        roboto.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <NavigationHeader />
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
