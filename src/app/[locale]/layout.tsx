import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "../globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { RateProvider } from "@/components/rate-provider";
import { getUsdIdrRate } from "@/lib/exchange";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Warung Apex - High-Tier Apex Legends Accounts",
  description:
    "Buy high-tier Apex Legends accounts with verified rank, badges, and lifetime support.",
  icons: {
    icon: "/logo/white/white warpex no background.svg",
    shortcut: "/logo/white/white warpex.png",
    apple: "/logo/white/white warpex.png",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  
  setRequestLocale(locale);
  const messages = await getMessages();
  const rate = await getUsdIdrRate();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-dark text-[#f0f2f5]">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          <RateProvider rate={rate}>{children}</RateProvider>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}