import { Advantages } from "@/components/sections/Advantages";
import { Stats } from "@/components/sections/Stats";
import { Marquee } from "@/components/sections/Marquee";
import { Catalog } from "@/components/sections/Catalog";
import { Guarantee } from "@/components/sections/Guarantee";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { useTranslations } from "next-intl";
import { LocaleSwitcherModal } from "@/components/ui/locale-switcher-modal";
import { Link } from "@/i18n/routing";

export default function Home() {
  const tNav = useTranslations("nav");
  const tHero = useTranslations("hero");
  const tFooter = useTranslations("footer");

  return (
    <div className="w-full selection:bg-blue-500 selection:text-white bg-[#08080c]">
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
          {/* Left Nav */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8 text-sm font-semibold tracking-wide text-white drop-shadow-md mt-2">
            <a href="#" className="hover:text-blue-500 transition">{tNav("shop")}</a>
            <a href="#" className="hover:text-blue-500 transition">{tNav("men")}</a>
            <a href="#" className="hover:text-blue-500 transition">{tNav("women")}</a>
            <a href="#" className="hover:text-blue-500 transition">{tNav("trending")}</a>
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

          {/* Right Nav */}
          <div className="flex items-center gap-3 sm:gap-6 text-sm font-semibold tracking-wide text-white drop-shadow-md mt-1">
            <LocaleSwitcherModal />
            <Link href="/login" className="bg-white text-gray-900 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-gray-100 transition shadow-lg whitespace-nowrap text-xs sm:text-sm">
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
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-white text-gray-900 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-gray-50 transition shadow-xl border border-gray-100 text-center">
                {tHero("buttonSell")}
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* SECTIONS */}
      <Marquee />
      <Catalog />
      <Advantages />
      <Stats />
      <Guarantee />
      <Testimonials />
      <Faq />
      <Cta />

      {/* FOOTER SECTION */}
      <footer className="w-full bg-[#08080c] text-gray-400 py-20 px-4 sm:px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand/About */}
          <div className="space-y-4">
             <h4 className="text-white text-xl font-[var(--font-display)] font-semibold tracking-widest">WARUNG APEX</h4>
             <p className="text-sm leading-relaxed text-gray-400">
               {tFooter("desc")}
             </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
             <h4 className="text-white font-semibold tracking-wide uppercase text-sm">{tFooter("col1")}</h4>
             <ul className="space-y-2 text-sm text-gray-400">
               <li><a href="#" className="hover:text-blue-500 transition">{tFooter("col1_link1")}</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">{tFooter("col1_link2")}</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">{tFooter("col1_link3")}</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">{tFooter("col1_link4")}</a></li>
             </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
             <h4 className="text-white font-semibold tracking-wide uppercase text-sm">{tFooter("col2")}</h4>
             <ul className="space-y-2 text-sm text-gray-400">
               <li><a href="#" className="hover:text-blue-500 transition">{tFooter("col2_link1")}</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">{tFooter("col2_link2")}</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">{tFooter("col2_link3")}</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">{tFooter("col2_link4")}</a></li>
             </ul>
          </div>

          {/* Legal & Payment */}
          <div className="space-y-4">
             <h4 className="text-white font-semibold tracking-wide uppercase text-sm">{tFooter("col3")}</h4>
             <ul className="space-y-2 text-sm mb-6 text-gray-400">
               <li><a href="#" className="hover:text-blue-500 transition">{tFooter("col3_link1")}</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">{tFooter("col3_link2")}</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">{tFooter("col3_link3")}</a></li>
             </ul>
             <div className="pt-2">
                <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-white/50">{tFooter("securePayment")}</p>
                <div className="flex space-x-3">
                   <div className="w-12 h-7 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold text-white border border-white/5">QRIS</div>
                   <div className="w-12 h-7 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold text-white border border-white/5">BCA</div>
                   <div className="w-12 h-7 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold text-white border border-white/5">OVO</div>
                   <div className="w-12 h-7 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold text-white border border-white/5">DANA</div>
                </div>
             </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
           <p>&copy; {new Date().getFullYear()} {tFooter("copyright")}</p>
           <div className="flex space-x-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition">Twitter</a>
             <a href="#" className="hover:text-white transition">Instagram</a>
             <a href="#" className="hover:text-white transition">Facebook</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
