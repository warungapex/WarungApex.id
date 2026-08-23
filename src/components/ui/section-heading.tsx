export function SectionHeading({ eyebrow, title, accent }: { eyebrow?: string; title: string; accent: string }) {
  return (
    <div className="text-center">
      {eyebrow && (
        <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5">
          <span className="dot-pulse inline-block size-1 rounded-full bg-brand-cyan text-brand-cyan" />
          <span className="font-mono2 text-[10px] font-medium uppercase tracking-[0.35em] text-brand-cyan/90">
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        data-reveal
        className={`font-display text-3xl font-bold tracking-tight text-white md:text-5xl ${eyebrow ? "mt-6" : ""}`}
      >
        {title} <span className="text-gradient">{accent}</span>
      </h2>
    </div>
  );
}
