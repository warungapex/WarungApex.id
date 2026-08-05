import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white selection:bg-brand-red selection:text-white">
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
            <a href="#" className="hover:text-brand-red transition">SHOP</a>
            <a href="#" className="hover:text-brand-red transition">MEN</a>
            <a href="#" className="hover:text-brand-red transition">WOMEN</a>
            <a href="#" className="hover:text-brand-red transition">TRENDING</a>
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
            <a href="#" className="hover:text-brand-red transition">SEASONAL</a>
            <a href="#" className="hover:text-brand-red transition">ACCESSORIES</a>
            <button className="bg-white text-gray-900 px-6 py-2.5 rounded-full hover:bg-gray-100 transition shadow-lg">
              SIGN IN / UP
            </button>
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
              <button className="bg-gray-900 text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-black transition shadow-xl">
                View the account catalog
              </button>
              <button className="bg-white text-gray-900 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-gray-50 transition shadow-xl border border-gray-100">
                Sell my account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
