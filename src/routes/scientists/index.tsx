import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cog, Globe, HeartPulse, Lightbulb, Sigma, Telescope, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  featuredScholarFieldOrder,
  heritageIntro,
  scholarFieldSlug,
  scholarFields,
  scholarProfiles,
  scholarsNote,
} from "@/data/scholars";
import bannerAlFazari from "@/assets/scholars/banner-al-fazari.png";
import bannerAlKhwarizmi from "@/assets/scholars/banner-al-khwarizmi.png";
import bannerAlRazi from "@/assets/scholars/banner-al-razi.png";
import { pageBannerDimensions, pageBannerImageClass } from "@/lib/page-banner";

const scholarSlides = [
  {
    src: bannerAlKhwarizmi,
    alt: "Al-Khwarizmi — A foundational figure in algebra whose methods shaped mathematical problem-solving for centuries",
  },
  {
    src: bannerAlRazi,
    alt: "Al-Razi — A major physician and medical writer whose clinical observations shaped later medical practice",
  },
  {
    src: bannerAlFazari,
    alt: "Al-Fazari — Among the earliest astronomers associated with the translation and adaptation of astronomical knowledge into Arabic",
  },
] as const;

const scholarFieldIcons: Record<(typeof featuredScholarFieldOrder)[number], LucideIcon> = {
  "Astronomy and Observational Science": Telescope,
  "Mathematics and Measurement": Sigma,
  "Medicine, Surgery, and Pharmacology": HeartPulse,
  "Philosophy, Logic, and Intellectual Tradition": Lightbulb,
  "Engineering, Mechanics, and Invention": Cog,
  "Geography, Cartography, and Earth Sciences": Globe,
};

function SectionHeading({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
}

function getScholarProfile(name: string, field: string) {
  return scholarProfiles.find((profile) => profile.name === name && profile.field === field)!;
}

export const Route = createFileRoute("/scientists/")({
  head: () => ({
    meta: [
      { title: "Scholars & Science — Pioneers of the Islamic Golden Age | IMPMS" },
      {
        name: "description",
        content:
          "Explore the medieval Muslim scholars who advanced astronomy, medicine, mathematics, philosophy, engineering, and geography — and shaped global intellectual history.",
      },
      { property: "og:title", content: "Scholars & Science — Pioneers of the Islamic Golden Age" },
      { property: "og:description", content: "Discover the scientists who illuminated a golden age of discovery." },
    ],
    links: [{ rel: "canonical", href: "/scientists" }],
  }),
  component: ScientistsPage,
});

function ScientistsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Heritage"
        title="Centuries of achievement in science and thought"
        description="This heritage reflects centuries of achievement in astronomy, mathematics, medicine, philosophy, engineering, geography, and other fields that helped shape global intellectual history."
      />

      <section className="container-page section-y">
        <div className="relative mb-12 overflow-hidden rounded-2xl border border-border shadow-xl">
          <Carousel opts={{ loop: true }}>
            <CarouselContent className="-ml-0">
              {scholarSlides.map((slide) => (
                <CarouselItem key={slide.alt} className="pl-0">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    width={pageBannerDimensions.width}
                    height={pageBannerDimensions.height}
                    loading="lazy"
                    className={pageBannerImageClass}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 top-1/2 h-9 w-9 -translate-y-1/2 border-border/50 bg-background/85 shadow-md hover:bg-background sm:left-3 sm:h-10 sm:w-10" />
            <CarouselNext className="right-2 top-1/2 h-9 w-9 -translate-y-1/2 border-border/50 bg-background/85 shadow-md hover:bg-background sm:right-3 sm:h-10 sm:w-10" />
          </Carousel>
        </div>

        <p className="w-full text-lg leading-relaxed text-muted-foreground">{heritageIntro}</p>
        <p className="mt-6 w-full text-base leading-relaxed text-muted-foreground">
          {scholarsNote}
        </p>

        <nav
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Scholar categories"
        >
          {featuredScholarFieldOrder.map((field) => {
            const FieldIcon = scholarFieldIcons[field];

            return (
              <a
                key={field}
                href={`#${scholarFieldSlug(field)}`}
                className="group flex items-start gap-4 rounded-2xl border border-primary/10 bg-secondary p-4 shadow-sm transition-all hover:border-gold/50 hover:bg-primary/5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold text-gold-foreground transition-colors group-hover:bg-gold/90">
                  <FieldIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1 pt-0.5 text-sm font-semibold leading-snug text-foreground sm:text-base">
                  {field}
                </span>
              </a>
            );
          })}
        </nav>

        <div className="mt-16 space-y-16">
          {scholarFields.map((field) => (
            <div key={field.field} id={scholarFieldSlug(field.field)} className="scroll-mt-28">
              <SectionHeading
                icon={scholarFieldIcons[field.field as (typeof featuredScholarFieldOrder)[number]] ?? Telescope}
                title={field.field}
              />
              <ul className="mt-6 space-y-4">
                {field.scholars.map((scholar) => {
                  const profile = getScholarProfile(scholar.name, field.field);

                  return (
                    <li key={`${field.field}-${scholar.name}`}>
                      <Link
                        to="/scientists/$slug"
                        params={{ slug: profile.slug }}
                        className="group block rounded-xl border border-border bg-card p-5 transition-colors hover:border-gold/50 hover:bg-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <p className="font-semibold text-foreground group-hover:text-foreground">
                          {scholar.name}
                          {scholar.period && (
                            <span className="ml-2 font-normal text-muted-foreground">
                              ({scholar.period})
                            </span>
                          )}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {scholar.description}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold">
                          Read more
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          This list is intended as a broad, reader-friendly guide rather than a strict or exhaustive scholarly catalog.
        </p>
      </section>

      <CtaBand />
    </>
  );
}
