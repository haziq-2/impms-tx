import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Clock,
  GraduationCap,
  HeartPulse,
  MapPin,
  Mic,
  Users,
} from "lucide-react";
import { FeaturedEventPage } from "@/components/events/featured-event-page";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEventBySlug } from "@/data/events";
import { pageBannerDimensions, pageBannerImageClass } from "@/lib/page-banner";

export const Route = createFileRoute("/events/$slug/")({
  loader: ({ params }) => {
    const event = getEventBySlug(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    const event = loaderData?.event;
    if (!event) return {};

    const pageTitle = event.subtitle ? `${event.subtitle} — ${event.title}` : event.title;

    return {
      meta: [
        { title: `${pageTitle} | IMPMS Events` },
        { name: "description", content: event.description },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: event.description },
        { property: "og:image", content: event.bannerImage },
      ],
      links: [{ rel: "canonical", href: `/events/${event.slug}` }],
    };
  },
  component: EventDetailPage,
});

function EventDetailPage() {
  const { event } = Route.useLoaderData();

  if (event.hideDetailBanner) {
    return <FeaturedEventPage event={event} />;
  }

  const eventTitle = event.subtitle ? `${event.title}: ${event.subtitle}` : event.title;

  return (
    <>
      <PageHero
        eyebrow={event.status}
        title={eventTitle}
        description={event.tagline ?? event.description}
      />

      <section className="container-page section-y">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all events
        </Link>

        {!event.hideDetailBanner && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-lg">
            <img
              src={event.bannerImage}
              alt={event.bannerAlt}
              width={pageBannerDimensions.width}
              height={pageBannerDimensions.height}
              className={pageBannerImageClass}
            />
          </div>
        )}

        {event.schedule && (event.schedule.date || event.schedule.time || event.schedule.venue) && (
          <div className={event.hideDetailBanner ? "mt-8 grid gap-4 sm:grid-cols-3" : "mt-10 grid gap-4 sm:grid-cols-3"}>
            {event.schedule.date && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Calendar className="h-5 w-5" />
                </span>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-gold">Date</p>
                <p className="mt-2 font-medium text-foreground">{event.schedule.date}</p>
              </div>
            )}
            {event.schedule.time && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Clock className="h-5 w-5" />
                </span>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-gold">Time</p>
                <p className="mt-2 font-medium text-foreground">{event.schedule.time}</p>
              </div>
            )}
            {event.schedule.venue && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <MapPin className="h-5 w-5" />
                </span>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-gold">Venue</p>
                <p className="mt-2 font-medium text-foreground">{event.schedule.venue}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 max-w-3xl">
          <Badge className="bg-accent text-accent-foreground hover:bg-accent">{event.status}</Badge>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{event.description}</p>
        </div>

        {event.keynote && (
          <section className="mt-12 rounded-2xl border border-border bg-card p-8 md:p-10">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Mic className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-bold">Keynote Speaker</h2>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold">{event.keynote.name}</h3>
              {event.keynote.title && (
                <p className="mt-1 text-sm font-medium text-gold">{event.keynote.title}</p>
              )}
              <p className="mt-4 leading-relaxed text-muted-foreground">{event.keynote.bio}</p>
            </div>
          </section>
        )}

        {event.registrationPrompt && (
          <section className="mt-12 rounded-2xl border border-gold/30 bg-gold/5 p-8 md:p-10">
            <p className="max-w-2xl leading-relaxed text-muted-foreground">
              {event.registrationPrompt}
            </p>
            <Button asChild size="lg" className="mt-6 bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/events/$slug/priority-list" params={{ slug: event.slug }}>
                Join the Priority List
              </Link>
            </Button>
            {event.ticketNote && (
              <p className="mt-4 text-sm text-muted-foreground">{event.ticketNote}</p>
            )}
          </section>
        )}

        {event.audiences && event.audiences.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Users className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-bold">Who Should Attend</h2>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {event.audiences.map((audience) => {
                const Icon =
                  audience.title === "Healthcare Professionals"
                    ? HeartPulse
                    : audience.title === "Technology Leaders"
                      ? Briefcase
                      : audience.title === "Students and Researchers"
                        ? GraduationCap
                        : Users;

                return (
                  <article key={audience.title} className="rounded-2xl border border-border bg-card p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-semibold">{audience.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {audience.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {event.details && event.details.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold">Additional Information</h2>
            <ul className="mt-6 space-y-3">
              {event.details.map((detail) => (
                <li key={detail} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {detail}
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>

      <CtaBand />
    </>
  );
}
