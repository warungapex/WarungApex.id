import { Stats } from "@/components/sections/Stats";
import { Marquee } from "@/components/sections/Marquee";
import { Catalog } from "@/components/sections/Catalog";
import { Guarantee } from "@/components/sections/Guarantee";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { getTranslations } from "next-intl/server";
import { getFeaturedAccounts } from "@/lib/supabase/accounts";
import { LocaleSwitcherModal } from "@/components/ui/locale-switcher-modal";
import { Link } from "@/i18n/routing";
import { HowItWorks } from "@/components/ui/how-it-works";
import { StickyFooter } from "@/components/ui/sticky-footer";
import { Component as CursorFollower } from "@/components/ui/cursor-follower";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [tNav, tHero, spot] = await Promise.all([
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "hero" }),
    getFeaturedAccounts(3),
  ]);

  return (
    <div className="w-full selection:bg-blue-500 selection:text-white bg-[#08080c]">
      <CursorFollower />
      {/* HERO SECTION */}
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background Video */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-black overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover"
        >
          <source src="/video/Wraith.mp4" type="video/mp4" />
        </video>

      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between pb-10">

        {/* Navigation */}
        <nav className="relative flex items-start justify-between px-4 sm:px-10 pt-6">
          {/* Left — locale switcher (mobile) / empty spacer (desktop) */}
          <div className="flex items-center mt-1">
            <div className="lg:hidden">
              <LocaleSwitcherModal />
            </div>
            <div className="hidden lg:block invisible" aria-hidden="true" />
          </div>

          {/* Center Logo Area */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[240px] sm:w-[400px] lg:w-[480px] h-[52px] sm:h-[65px] bg-[#f0f2f5]/95 backdrop-blur-md shadow-sm flex items-center justify-center"
            style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)' }}
          >
            <h1 className="text-base sm:text-[1.75rem] font-[var(--font-display)] font-semibold tracking-[0.2em] text-gray-900 pb-1 whitespace-nowrap">
              WARUNG APEX
            </h1>
          </div>

          {/* Right Nav — mobile: profile icon | desktop: locale + text button */}
          <div className="flex items-center gap-3 sm:gap-6 text-sm font-semibold tracking-wide text-white drop-shadow-md mt-1">
            {/* Desktop only: locale switcher */}
            <div className="hidden lg:block">
              <LocaleSwitcherModal />
            </div>
            {/* Mobile: profile icon */}
            <Link
              href="/login"
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition shadow-lg"
              aria-label={tNav("signIn")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </Link>
            {/* Desktop: full text button */}
            <Link href="/login" className="hidden lg:block bg-white text-gray-900 px-6 py-2.5 rounded-full hover:bg-gray-100 transition shadow-lg whitespace-nowrap text-sm">
              {tNav("signIn")}
            </Link>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="flex justify-center px-4 sm:px-10 w-full mb-8">

          {/* Center: Main Heading */}
          <div className="flex flex-col items-center text-center space-y-8 z-20 px-2">
            <div className="space-y-1">
              <h2 className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white tracking-tighter leading-none drop-shadow-lg">
                {tHero("title1")}
              </h2>
              <h3 className="text-xl sm:text-3xl text-gray-200 tracking-[0.2em] font-medium mt-2 drop-shadow-md">
                {tHero("title2")}
              </h3>
            </div>

            <div className="flex flex-col w-full sm:w-auto sm:flex-row items-center justify-center gap-3 sm:gap-5">
              <Link href="/catalog" className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-black transition shadow-xl text-center">
                {tHero("buttonCatalog")}
              </Link>
              <a href="https://wa.me/6285167202134" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-white text-gray-900 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-gray-50 transition shadow-xl border border-gray-100 text-center">
                {tHero("buttonSell")}
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* SECTIONS */}
      <Marquee />
      <Catalog spot={spot} />
      <HowItWorks />
      <Stats />
      <Guarantee />
      <Testimonials />
      <Faq />
      <Cta />

      {/* STICKY FOOTER */}
      <StickyFooter />
    </div>
  );
}
