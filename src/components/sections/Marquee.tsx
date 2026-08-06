const items = [
  "HIGH-TIER ACCOUNTS",
  "PACED PROGRESS",
  "TC: ORIGINAL & GARANTI",
  "VAULT SAYA SELAMAT",
  "PENGIRIMAN INSTAN",
  "SUPPORT 24/7",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-brand-red py-5">
      <div className="flex whitespace-nowrap animate-marquee">
        {row.map((t, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="px-6 font-[var(--font-display)] font-bold tracking-[0.2em] text-white text-sm">
              {t}
            </span>
            <span className="text-white/60">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}