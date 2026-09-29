import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Calendar,
  Clock,
  GraduationCap,
  Handshake,
  Heart,
  HeartPulse,
  Lightbulb,
  MapPin,
  Mic,
  Shield,
  Sparkles,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";
import type { EventThemeIcon, UpcomingEvent } from "@/data/events";
import { pageBannerDimensions, pageBannerImageClass } from "@/lib/page-banner";

const themeIcons: Record<EventThemeIcon, LucideIcon> = {
  shield: Shield,
  brain: Brain,
  sparkles: Sparkles,
  "book-open": BookOpen,
  lightbulb: Lightbulb,
  heart: Heart,
};

const audienceIcons = [HeartPulse, Briefcase, GraduationCap, Users] as const;

interface FeaturedEventPageProps {
  event: UpcomingEvent;
}

export function FeaturedEventPage({ event }: FeaturedEventPageProps) {
  const schedule = event.schedule;
  const hasSchedule = schedule && (schedule.date || schedule.time || schedule.venue || schedule.dinner);
  const sponsorAudience = event.audiences?.find((audience) => audience.title === "Sponsors and Partners");
  const attendeeAudiences = event.audiences?.filter((audience) => audience.title !== "Sponsors and Partners");

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <div className="pattern-bg absolute inset-0 opacity-30" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_55%)]"
          aria-hidden="true"
        />

        <div className="container-page relative z-10 pt-5 sm:pt-6">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-2 text-sm font-medium text-primary-foreground/85 backdrop-blur-sm transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all events
          </Link>
        </div>

        <div className="container-page relative z-10 pb-8 pt-6 sm:pb-10 sm:pt-8">
          <div
            className={`overflow-hidden rounded-2xl border border-gold/25 shadow-2xl shadow-black/30 ring-1 ring-gold/15 ${
              event.pageHeroWidth &&
              event.pageHeroHeight &&
              event.pageHeroHeight > event.pageHeroWidth
                ? "mx-auto max-w-xl bg-primary"
                : ""
            }`}
          >
            <img
              src={event.pageHeroImage ?? event.bannerImage}
              alt={event.pageHeroAlt ?? event.bannerAlt}
              width={event.pageHeroWidth ?? pageBannerDimensions.width}
              height={event.pageHeroHeight ?? pageBannerDimensions.height}
              sizes="(max-width: 80rem) 100vw, 80rem"
              className={
                event.pageHeroWidth &&
                event.pageHeroHeight &&
                event.pageHeroHeight > event.pageHeroWidth
                  ? "mx-auto h-auto w-full object-contain"
                  : pageBannerImageClass
              }
              fetchPriority="high"
              decoding="async"
            />
          </div>

          {event.registrationPrompt && (
            <>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg" className="w-full bg-gold text-gold-foreground hover:bg-gold/90 sm:w-auto">
                  <Link to="/events/$slug/priority-list" params={{ slug: event.slug }}>
                    Join the Priority List <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              {event.ticketNote && (
                <p className="mt-3 text-sm text-primary-foreground/70">{event.ticketNote}</p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Event details strip */}
      {hasSchedule && (
        <section className="border-y border-border bg-secondary">
          <div className="container-page grid grid-cols-1 gap-4 py-8 sm:grid-cols-2 sm:py-10 lg:grid-cols-4">
            {schedule.date && (
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold text-gold-foreground">
                  <Calendar className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Date</p>
                  <p className="mt-1 font-medium leading-snug text-foreground">{schedule.date}</p>
                </div>
              </div>
            )}
            {schedule.time && (
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Time</p>
                  <p className="mt-1 font-medium leading-snug text-foreground">{schedule.time}</p>
                </div>
              </div>
            )}
            {schedule.venue && (
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Venue</p>
                  <p className="mt-1 font-medium leading-snug text-foreground">{schedule.venue}</p>
                  {schedule.venueAddress && (
                    <p className="mt-1 text-sm font-normal leading-snug text-muted-foreground">
                      {schedule.venueAddress}
                    </p>
                  )}
                </div>
              </div>
            )}
            {schedule.dinner && (
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Utensils className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Evening</p>
                  <p className="mt-1 font-medium leading-snug text-foreground">{schedule.dinner}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Program themes */}
      {event.themes && event.themes.length > 0 && (
        <section className="bg-background">
          <div className="container-page section-y">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {event.focusLabel ?? "Conference Focus"}
              </p>
              {event.tagline && (
                <h2 className="mt-3 text-[clamp(1.5rem,3vw+1rem,2.25rem)] font-bold">{event.tagline}</h2>
              )}
              <p className={`leading-relaxed text-muted-foreground ${event.tagline ? "mt-4" : "mt-3"}`}>
                {event.description}
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
              {event.themes.map((theme, index) => {
                const Icon = themeIcons[theme.icon];
                const iconVariants = [
                  "bg-primary text-primary-foreground",
                  "bg-accent text-accent-foreground",
                  "bg-primary text-primary-foreground",
                ] as const;

                return (
                  <article
                    key={theme.title}
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconVariants[index % iconVariants.length]}`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold">{theme.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{theme.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Description only (no themes) */}
      {(!event.themes || event.themes.length === 0) && (
        <section className="bg-background">
          <div className="container-page section-y">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {event.focusLabel ?? "About This Event"}
              </p>
              {event.tagline && (
                <h2 className="mt-3 text-[clamp(1.5rem,3vw+1rem,2.25rem)] font-bold">{event.tagline}</h2>
              )}
              <p className={`leading-relaxed text-muted-foreground ${event.tagline ? "mt-4" : "mt-3"}`}>
                {event.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Keynote spotlight */}
      {event.keynote && (
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="pattern-bg absolute inset-0 opacity-25" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,color-mix(in_oklab,var(--gold)_14%,transparent),transparent_50%)]"
            aria-hidden="true"
          />

          <div className="container-page relative section-y">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  <Mic className="h-3.5 w-3.5" />
                  Keynote Speaker
                </div>
                <h2 className="mt-5 text-[clamp(1.75rem,3vw+1rem,2.5rem)] font-bold leading-tight">
                  {event.keynote.name}
                </h2>
                {event.keynote.title && (
                  <p className="mt-2 text-lg font-medium text-gold">{event.keynote.title}</p>
                )}
                {event.keynote.award && (
                  <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm font-medium text-gold">
                    <Award className="h-4 w-4 shrink-0" />
                    {event.keynote.award}
                  </div>
                )}
                <p className="mt-6 max-w-xl leading-relaxed text-primary-foreground/80">{event.keynote.bio}</p>
              </div>

              <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
                <div className="relative w-full max-w-36 sm:max-w-40 lg:max-w-44">
                  <div
                    className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-gold/30 to-gold/5 blur-sm"
                    aria-hidden="true"
                  />
                  <div className="relative overflow-hidden rounded-xl border border-gold/20 shadow-xl">
                    <img
                      src={event.keynote.image ?? event.bannerImage}
                      alt={event.keynote.imageAlt ?? `${event.keynote.name}, keynote speaker`}
                      width={757}
                      height={1024}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Who should attend */}
      {attendeeAudiences && attendeeAudiences.length > 0 && (
        <section className="bg-secondary">
          <div className="container-page section-y">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Audience</p>
                <h2 className="mt-2 text-[clamp(1.5rem,3vw+1rem,2.25rem)] font-bold">Who Should Attend</h2>
              </div>
              {event.audienceIntro && (
                <p className="max-w-md text-sm text-muted-foreground">{event.audienceIntro}</p>
              )}
            </div>

            <ul className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              {attendeeAudiences.map((audience, index) => {
                const Icon = audienceIcons[index % audienceIcons.length];
                const iconVariants = [
                  "bg-gold text-gold-foreground",
                  "bg-primary text-primary-foreground",
                  "bg-accent text-accent-foreground",
                ] as const;

                return (
                  <li key={audience.title} className="flex gap-4 p-5 sm:gap-5 sm:p-6">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconVariants[index % iconVariants.length]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground">{audience.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{audience.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Sponsors and Partners */}
      {sponsorAudience && (
        <section className="container-page section-y">
          <Button
            asChild
            size="lg"
            className="w-full bg-gold text-gold-foreground hover:bg-gold/90 sm:w-auto"
          >
            <Link to="/partnerships">
              <Handshake className="h-5 w-5" />
              Sponsors and Partners
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      )}

      {/* Additional information */}
      {event.details && event.details.length > 0 && (
        <section className="border-t border-border bg-muted/40">
          <div className="container-page section-y">
            <h2 className="text-2xl font-bold">Additional Information</h2>
            <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              {event.details.map((detail) => (
                <li key={detail} className="flex gap-3 p-5 text-sm leading-relaxed text-muted-foreground sm:p-6">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
