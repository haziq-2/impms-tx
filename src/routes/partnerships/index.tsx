import { createFileRoute } from "@tanstack/react-router";
import { Handshake } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import partnershipsImg from "@/assets/partnerships.jpg";
import { pageBannerDimensions, pageBannerImageClass } from "@/lib/page-banner";

export const Route = createFileRoute("/partnerships/")({
  head: () => ({
    meta: [
      { title: "Partnerships — Collaborate with IMPMS" },
      {
        name: "description",
        content:
          "IMPMS partners with educational and community organizations like DiscoverSTEM to advance science education and cultural understanding.",
      },
      { property: "og:title", content: "Partnerships — Collaborate with IMPMS" },
      { property: "og:description", content: "Partner with IMPMS to advance education and understanding." },
    ],
    links: [{ rel: "canonical", href: "/partnerships" }],
  }),
  component: PartnershipsPage,
});

const partners = [
  { name: "DiscoverSTEM", text: "Our flagship education partner, preparing students to become innovators since 2018." },
  { name: "Academic Institutions", text: "We collaborate with universities and colleges to present research and mentor students." },
  { name: "Community Organizations", text: "Local and international groups help us reach people of all faiths and cultures." },
];

function PartnershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="Stronger together"
        description="Collaboration multiplies our impact. IMPMS works with partners who share our commitment to education, discovery, and understanding."
      />

      <section className="container-page section-y">
        <figure className="mb-12 overflow-hidden rounded-2xl border border-border shadow-xl">
          <img
            src={partnershipsImg}
            alt="A diverse group of professionals collaborating and shaking hands at a meeting"
            width={pageBannerDimensions.width}
            height={pageBannerDimensions.height}
            loading="lazy"
            className={pageBannerImageClass}
          />
        </figure>
        <div className="grid gap-6 md:grid-cols-3">
          {partners.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-card p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Handshake className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-lg font-semibold">{p.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-border bg-secondary p-8 text-center">
          <h2 className="text-2xl font-bold">Interested in partnering?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            We welcome organizations that want to advance science education and cross-cultural
            understanding. Reach out through our contact page to start a conversation.
          </p>
        </div>
      </section>

      <CtaBand showSponsorshipButton />
    </>
  );
}
