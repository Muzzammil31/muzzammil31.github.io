import { Reveal } from "@/components/Media";

export function SectionHeader({
  index,
  kicker,
  title,
  subtitle,
}: {
  index: string;
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-primary">{index}</span>
          <span className="h-px w-10 bg-[image:var(--gradient-line)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            {kicker}
          </span>
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
          <span className="gradient-text">{title}</span>
        </h2>
        {subtitle && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
      </div>
    </Reveal>
  );
}
