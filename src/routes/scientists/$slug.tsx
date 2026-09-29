import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Cog,
  Globe,
  HeartPulse,
  Lightbulb,
  Sigma,
  Telescope,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Badge } from "@/components/ui/badge";
import {
  featuredScholarFieldOrder,
  getScholarBySlug,
  scholarFieldIntros,
  scholarFieldSlug,
} from "@/data/scholars";

const scholarFieldIcons: Record<(typeof featuredScholarFieldOrder)[number], LucideIcon> = {
  "Astronomy and Observational Science": Telescope,
  "Mathematics and Measurement": Sigma,
  "Medicine, Surgery, and Pharmacology": HeartPulse,
  "Philosophy, Logic, and Intellectual Tradition": Lightbulb,
  "Engineering, Mechanics, and Invention": Cog,
  "Geography, Cartography, and Earth Sciences": Globe,
};

export const Route = createFileRoute("/scientists/$slug")({
  loader: ({ params }) => {
    const scholar = getScholarBySlug(params.slug);
    if (!scholar) throw notFound();
    return { scholar };
  },
  head: ({ loaderData }) => {
    const scholar = loaderData?.scholar;
    if (!scholar) return {};

    return {
      meta: [
        { title: `${scholar.name} — Scholars & Science | IMPMS` },
        { name: "description", content: scholar.description },
        { property: "og:title", content: `${scholar.name} — Scholars & Science` },
        { property: "og:description", content: scholar.description },
        { property: "og:image", content: scholar.image },
      ],
      links: [{ rel: "canonical", href: `/scientists/${scholar.slug}` }],
    };
  },
  component: ScholarDetailPage,
});

function ScholarDetailPage() {
  const { scholar } = Route.useLoaderData();
  const fieldKey = scholar.field as (typeof featuredScholarFieldOrder)[number];
  const FieldIcon = scholarFieldIcons[fieldKey] ?? Telescope;
  const fieldIntro = scholarFieldIntros[fieldKey];

  return (
    <>
      <PageHero
        eyebrow={scholar.field}
        title={scholar.name}
        description={scholar.period ? `Active ${scholar.period}` : undefined}
      />

      <section className="container-page section-y">
        <Link
          to="/scientists"
          hash={scholarFieldSlug(scholar.field)}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Scholars & Science
        </Link>

        <div className="mx-auto mt-6 w-full max-w-md overflow-hidden rounded-2xl border border-border shadow-lg sm:mt-8">
          <img
            src={scholar.image}
            alt={`Portrait or historical illustration of ${scholar.name}`}
            width={480}
            height={640}
            className="aspect-[3/4] w-full object-cover object-top"
          />
        </div>

        <div className="mt-10 max-w-3xl">
          <Badge className="bg-accent text-accent-foreground hover:bg-accent">
            <span className="inline-flex items-center gap-2">
              <FieldIcon className="h-4 w-4" />
              {scholar.field}
            </span>
          </Badge>
          {scholar.period && (
            <p className="mt-4 text-sm font-medium text-gold">{scholar.period}</p>
          )}
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{scholar.description}</p>
        </div>

        <section className="mt-10 rounded-2xl border border-border bg-card card-pad sm:mt-12 md:p-10">
          <h2 className="text-2xl font-bold">Field of Achievement</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{fieldIntro}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            {scholar.name} is featured here as part of IMPMS&apos;s reader-friendly guide to
            medieval Muslim contributions in {scholar.field.toLowerCase()}.
          </p>
        </section>
      </section>

      <CtaBand />
    </>
  );
}
