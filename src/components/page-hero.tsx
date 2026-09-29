interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
      <div className="pattern-bg absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-page relative flex min-h-[clamp(13rem,32vw,18rem)] flex-col justify-center py-8 md:py-10">
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold sm:mb-3 sm:text-sm">
            {eyebrow}
          </p>
        ) : (
          <div className="mb-2 min-h-[1.25rem] sm:mb-3" aria-hidden="true" />
        )}
        <h1 className="max-w-3xl text-balance text-[clamp(1.5rem,4vw+1rem,2.25rem)] font-bold leading-tight line-clamp-3 sm:line-clamp-2">
          {title}
        </h1>
        <p className="mt-3 min-h-[3.5rem] max-w-2xl text-[clamp(0.9375rem,1.5vw+0.8rem,1rem)] leading-relaxed text-primary-foreground/80 line-clamp-4 sm:mt-4 sm:min-h-[4.5rem] sm:line-clamp-3">
          {description ?? ""}
        </p>
      </div>
    </section>
  );
}
