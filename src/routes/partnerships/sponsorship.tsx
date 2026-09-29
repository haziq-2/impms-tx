import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { sponsorshipTiers, type SponsorshipTier } from "@/data/sponsorship";

const tierStyles: Record<
  SponsorshipTier["id"],
  {
    card: string;
    price: string;
    check: string;
    list: string;
    button: string;
  }
> = {
  platinum: {
    card:
      "border-[oklch(0.82_0.03_95)]/40 bg-gradient-to-b from-[oklch(0.38_0.04_265)] via-[oklch(0.32_0.05_264)] to-[oklch(0.26_0.055_264)] shadow-2xl shadow-black/30 ring-1 ring-[oklch(0.9_0.02_95)]/25 lg:-mt-2 lg:mb-[-0.5rem]",
    price: "text-[oklch(0.94_0.02_95)]",
    check: "text-[oklch(0.9_0.03_95)]",
    list: "divide-[oklch(0.9_0.02_95)]/15 border-[oklch(0.9_0.02_95)]/20",
    button: "bg-[oklch(0.94_0.02_95)] text-primary hover:bg-white",
  },
  gold: {
    card: "border-gold/45 bg-gradient-to-b from-gold/25 via-gold/10 to-primary-foreground/[0.04] shadow-xl shadow-gold/10",
    price: "text-gold",
    check: "text-gold",
    list: "divide-gold/15 border-gold/20",
    button: "bg-gold text-gold-foreground hover:bg-gold/90",
  },
  silver: {
    card: "border-primary-foreground/15 bg-primary-foreground/[0.03] shadow-md",
    price: "text-primary-foreground/65",
    check: "text-primary-foreground/55",
    list: "divide-primary-foreground/10 border-primary-foreground/10",
    button:
      "border border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10",
  },
};

export const Route = createFileRoute("/partnerships/sponsorship")({
  head: () => ({
    meta: [
      { title: "Sponsorship Opportunities — IMPMS" },
      {
        name: "description",
        content:
          "Explore IMPMS event sponsorship tiers — Platinum, Gold, and Silver — with recognition, visibility, and community impact.",
      },
      { property: "og:title", content: "Sponsorship Opportunities — IMPMS" },
      {
        property: "og:description",
        content: "Support IMPMS events through Platinum, Gold, or Silver sponsorship packages.",
      },
    ],
    links: [{ rel: "canonical", href: "/partnerships/sponsorship" }],
  }),
  component: SponsorshipPage,
});

function SponsorshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="Sponsorship Opportunities"
        description="Partner with IMPMS to advance education, innovation, and community engagement through our upcoming events."
      />

      <section className="bg-primary text-primary-foreground">
        <div className="container-page section-y">
          <Link
            to="/partnerships"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/75 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Partnerships
          </Link>

          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
            {sponsorshipTiers.map((tier) => {
              const style = tierStyles[tier.id];

              return (
              <article
                key={tier.id}
                className={`flex flex-col rounded-2xl border p-6 sm:p-7 ${style.card}`}
              >
                <h2 className="text-3xl font-bold">{tier.name}</h2>
                <p className={`mt-2 text-3xl font-bold ${style.price}`}>{tier.price}</p>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">{tier.description}</p>

                <ul className={`mt-6 flex-1 divide-y border-t ${style.list}`}>
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3 py-3 text-sm leading-relaxed text-primary-foreground/90">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${style.check}`} strokeWidth={2.5} />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  variant={tier.id === "silver" ? "outline" : "default"}
                  className={`mt-8 w-full ${style.button}`}
                >
                  <Link to="/contact">Select {tier.name}</Link>
                </Button>
              </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
