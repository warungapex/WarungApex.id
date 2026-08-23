import { Stats } from "@/components/sections/Stats";
import { Marquee } from "@/components/sections/Marquee";
import { Hero } from "@/components/sections/Hero";
import { Catalog } from "@/components/sections/Catalog";
import { Guarantee } from "@/components/sections/Guarantee";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { getFeaturedAccounts } from "@/lib/supabase/accounts";
import { LocaleSwitcherModal } from "@/components/ui/locale-switcher-modal";
import { UserMenu } from "@/components/auth/user-menu";
import { Link } from "@/i18n/routing";
import { HowItWorks } from "@/components/ui/how-it-works";
import { StickyFooter } from "@/components/ui/sticky-footer";
import { Component as CursorFollower } from "@/components/ui/cursor-follower";
import { ScrollEffects } from "@/components/ui/scroll-effects";
import Image from "next/image";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const [spot] = await Promise.all([getFeaturedAccounts(3)]);

  return (
    <div className="w-full bg-brand-dark">
      <CursorFollower />
      <ScrollEffects />

      {/* NAV */}
      <nav className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo/white/white warpex no background.svg"
            alt="Warung Apex"
            width={28}
            height={28}
            className="size-7 object-contain"
          />
          <span className="font-display text-sm font-bold tracking-[0.25em] text-white">
            WARUNG APEX
          </span>
        </Link>

        <div className="flex items-center gap-3 text-sm font-semibold tracking-wide text-white sm:gap-4">
          <LocaleSwitcherModal />
          <UserMenu />
        </div>
      </nav>

      {/* HERO */}
      <Hero />

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
