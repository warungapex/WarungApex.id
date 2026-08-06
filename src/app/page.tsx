import Link from "next/link";
import { Advantages } from "@/components/sections/Advantages";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Stats } from "@/components/sections/Stats";
import { Marquee } from "@/components/sections/Marquee";
import { Catalog } from "@/components/sections/Catalog";
import { Guarantee } from "@/components/sections/Guarantee";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";

export default function Home() {
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
        <nav className="flex items-start justify-between px-10 pt-6">
          {/* Left Nav */}
          <div className="flex space-x-8 text-sm font-semibold tracking-wide text-white drop-shadow-md mt-2">
            <a href="#" className="hover:text-blue-500 transition">SHOP</a>
            <a href="#" className="hover:text-blue-500 transition">MEN</a>
            <a href="#" className="hover:text-blue-500 transition">WOMEN</a>
            <a href="#" className="hover:text-blue-500 transition">TRENDING</a>
          </div>

          {/* Center Logo Area */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[65px] bg-[#f0f2f5]/95 backdrop-blur-md shadow-sm flex items-center justify-center"
            style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)' }}
          >
            <h1 className="text-[1.75rem] font-[var(--font-display)] font-semibold tracking-[0.2em] text-gray-900 pb-1">
              WARUNG APEX
            </h1>
          </div>

          {/* Right Nav */}
          <div className="flex items-center space-x-8 text-sm font-semibold tracking-wide text-white drop-shadow-md mt-1">
            <a href="#" className="hover:text-blue-500 transition">SEASONAL</a>
            <a href="#" className="hover:text-blue-500 transition">ACCESSORIES</a>
            <Link href="/login" className="bg-white text-gray-900 px-6 py-2.5 rounded-full hover:bg-gray-100 transition shadow-lg">
              SIGN IN / UP
            </Link>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="flex justify-center px-10 w-full mb-8">

          {/* Center: Main Heading */}
          <div className="flex flex-col items-center text-center space-y-8 z-20">
            <div className="space-y-1">
              <h2 className="text-[5.5rem] font-bold text-white tracking-tighter leading-none drop-shadow-lg">
                PHASE INTO ACTION
              </h2>
              <h3 className="text-3xl text-gray-200 tracking-[0.2em] font-medium mt-2 drop-shadow-md">
                MASTER THE VOID
              </h3>
            </div>

            <div className="flex items-center space-x-5">
              <Link href="/catalog" className="bg-gray-900 text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-black transition shadow-xl">
                View the account catalog
              </Link>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-gray-50 transition shadow-xl border border-gray-100">
                Sell my account
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
      <HowItWorks />
      <Guarantee />
      <Testimonials />
      <Faq />
      <Cta />

      {/* FOOTER SECTION */}
      <footer className="w-full bg-[#08080c] text-gray-400 py-20 px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand/About */}
          <div className="space-y-4">
             <h4 className="text-white text-xl font-[var(--font-display)] font-semibold tracking-widest">WARUNG APEX</h4>
             <p className="text-sm leading-relaxed text-gray-400">
               Marketplace terpercaya untuk akun Apex Legends tier tinggi. Transaksi aman, pengiriman instan, dan support seumur hidup.
             </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
             <h4 className="text-white font-semibold tracking-wide uppercase text-sm">Marketplace</h4>
             <ul className="space-y-2 text-sm text-gray-400">
               <li><a href="#" className="hover:text-blue-500 transition">Beli Akun</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">Jual Akun</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">Jasa Joki (Boost)</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">Garansi Akun</a></li>
             </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
             <h4 className="text-white font-semibold tracking-wide uppercase text-sm">Bantuan</h4>
             <ul className="space-y-2 text-sm text-gray-400">
               <li><a href="#" className="hover:text-blue-500 transition">FAQ / Pusat Bantuan</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">Hubungi Kami</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">Komunitas Discord</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">Lapor Masalah</a></li>
             </ul>
          </div>

          {/* Legal & Payment */}
          <div className="space-y-4">
             <h4 className="text-white font-semibold tracking-wide uppercase text-sm">Legal & Pembayaran</h4>
             <ul className="space-y-2 text-sm mb-6 text-gray-400">
               <li><a href="#" className="hover:text-blue-500 transition">Syarat & Ketentuan</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">Kebijakan Privasi</a></li>
               <li><a href="#" className="hover:text-blue-500 transition">Kebijakan Pengembalian</a></li>
             </ul>
             <div className="pt-2">
                <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-white/50">Pembayaran Aman</p>
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
           <p>&copy; {new Date().getFullYear()} Warung Apex. Hak Cipta Dilindungi. Tidak berafiliasi dengan EA atau Respawn Entertainment.</p>
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
