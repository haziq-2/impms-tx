import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface CtaBandProps {
  showSponsorshipButton?: boolean;
}

export function CtaBand({ showSponsorshipButton = false }: CtaBandProps) {
  return (
    <section className="container-page section-y-lg">
      <div className="relative overflow-hidden rounded-2xl bg-primary px-5 py-10 text-center text-primary-foreground sm:px-8 sm:py-12 md:px-16 md:py-14">
        <div className="pattern-bg absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance text-[clamp(1.5rem,3vw+1rem,2.25rem)] font-bold">
            Help us bridge cultures through knowledge
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
            Your support funds conferences, publications, and STEM mentorship that bring
            history's discoveries to a new generation.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="w-full bg-gold text-gold-foreground hover:bg-gold/90 sm:w-auto">
              <Link to="/donate">Make a Donation</Link>
            </Button>
            {showSponsorshipButton && (
              <Button
                asChild
                size="lg"
                className="w-full bg-gold text-gold-foreground hover:bg-gold/90 sm:w-auto"
              >
                <Link to="/partnerships/sponsorship">Sponsorship Opportunities</Link>
              </Button>
            )}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
            >
              <Link to="/get-involved">
                Become a Member <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
