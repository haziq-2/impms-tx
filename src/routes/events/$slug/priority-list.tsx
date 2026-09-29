import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { PriorityListForm } from "@/components/priority-list-form";
import { getEventBySlug, getEventTitle } from "@/data/events";

const priorityListBenefits = [
  "Early ticket release notification",
  "Event updates and program announcements",
  "Sponsorship opportunity information",
  "Priority registration access",
] as const;

export const Route = createFileRoute("/events/$slug/priority-list")({
  loader: ({ params }) => {
    const event = getEventBySlug(params.slug);
    if (!event?.registrationPrompt) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    const event = loaderData?.event;
    if (!event) return {};

    const eventTitle = getEventTitle(event);

    return {
      meta: [
        { title: `Join the Priority List — ${eventTitle} | IMPMS` },
        {
          name: "description",
          content: `Register your interest for ${eventTitle}. ${event.registrationPrompt}`,
        },
        { property: "og:title", content: `Join the Priority List — ${eventTitle}` },
        { property: "og:description", content: event.registrationPrompt },
      ],
      links: [{ rel: "canonical", href: `/events/${event.slug}/priority-list` }],
    };
  },
  component: PriorityListPage,
});

function PriorityListPage() {
  const { event } = Route.useLoaderData();
  const eventTitle = getEventTitle(event);

  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden bg-primary text-primary-foreground">
      <div className="pattern-bg absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="container-page relative py-12 md:py-16 lg:py-20">
        <Link
          to="/events/$slug"
          params={{ slug: event.slug }}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/75 transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {eventTitle}
        </Link>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="text-balance text-4xl font-bold leading-tight md:text-5xl">
              Join the Priority Interest List
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-primary-foreground/80">
              Submit your information to receive event updates, ticket release notices, and
              sponsorship details.
            </p>
            <ul className="mt-8 space-y-4">
              {priorityListBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="text-primary-foreground/90">{benefit}</span>
                </li>
              ))}
            </ul>
            {event.ticketNote && (
              <p className="mt-8 text-sm text-primary-foreground/65">{event.ticketNote}</p>
            )}
          </div>

          <PriorityListForm key={event.slug} defaultEventSlug={event.slug} />
        </div>
      </div>
    </section>
  );
}
