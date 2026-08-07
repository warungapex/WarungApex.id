export function SectionHeading({ eyebrow, title, accent }: { eyebrow?: string; title: string; accent: string }) {
  return (
    <div className="text-center">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan/80">
          <span className="h-px w-6 bg-brand-cyan/50" />
          {eyebrow}
          <span className="h-px w-6 bg-brand-cyan/50" />
        </div>
      )}
      <h2 className="mt-4 text-2xl md:text-4xl font-[var(--font-display)] font-bold tracking-widest text-[#f0f2f5]">
        {title} <span className="text-brand-red">{accent}</span>
      </h2>
    </div>
  );
}