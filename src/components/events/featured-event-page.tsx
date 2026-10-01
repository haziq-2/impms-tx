import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Baby,
  BookOpen,
  Brain,
  Calendar,
  Check,
  Clock,
  Copy,
  Download,
  ExternalLink,
  GraduationCap,
  Handshake,
  Heart,
  HeartPulse,
  Lightbulb,
  Mail,
  MapPin,
  Mic,
  Navigation,
  Phone,
  Shield,
  Shirt,
  Sparkles,
  Users,
  Utensils,
  ZoomIn,
  type LucideIcon,
} from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

function getAudienceIcon(title: string): LucideIcon {
  const lower = title.toLowerCase();
  if (lower.includes("health") || lower.includes("care")) return HeartPulse;
  if (lower.includes("student") || lower.includes("youth")) return GraduationCap;
  if (lower.includes("research") || lower.includes("scholar") || lower.includes("academic")) return BookOpen;
  if (lower.includes("tech") || lower.includes("leader") || lower.includes("executive")) return Brain;
  if (lower.includes("entrepreneur") || lower.includes("invent")) return Lightbulb;
  if (lower.includes("educator") || lower.includes("mentor") || lower.includes("teacher")) return Users;
  return Users;
}

interface FeaturedEventPageProps {
  event: UpcomingEvent;
}

export function FeaturedEventPage({ event }: FeaturedEventPageProps) {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isFlyerOpen, setIsFlyerOpen] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const schedule = event.schedule;
  const hasSchedule =
    schedule &&
    (schedule.date ||
      schedule.time ||
      schedule.venue ||
      schedule.dinner ||
      schedule.dressCode ||
      schedule.babysitting ||
      schedule.parking);

  const sponsorAudience = event.audiences?.find((audience) => audience.title === "Sponsors and Partners");
  const attendeeAudiences = event.audiences?.filter((audience) => audience.title !== "Sponsors and Partners");

  const isPortraitPoster =
    event.pageHeroWidth &&
    event.pageHeroHeight &&
    event.pageHeroHeight > event.pageHeroWidth;

  const eventTitle = event.subtitle ? `${event.title}: ${event.subtitle}` : event.title;
  const contactEmail = event.contactEmail || "info@impmstx.org";
  const contactPhone = event.contactPhone || "(469) 209-5990";
  const mapQuery =
    event.mapQuery ||
    `${schedule?.venue ?? "Hilton Richardson Dallas"}, ${schedule?.venueAddress ?? "701 E Campbell Rd, Richardson, TX 75081"}`;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  const rsvpEmailTemplate = `Dear IMPMS Organizing Committee,

I would like to confirm my attendance / inquire about an invitation for:
Event: ${event.title} (${schedule?.date ?? "Saturday, October 3, 2026"})
Venue: ${schedule?.venue ?? "Hilton Richardson Dallas"}

Name(s): 
Organization / Affiliation: 
Number of Attendees: 
Email: 
Phone: 

Babysitting Option:
- Babysitting Needed? [Yes / No]
- If yes, please provide number of children and their ages: 

Dietary Requirements / Preferences: [None / Halal / Vegetarian / Other: ]

Notes / Inquiries: 

Thank you,
`;

  const rsvpMailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(
    `RSVP Inquiry — ${event.title}`
  )}&body=${encodeURIComponent(rsvpEmailTemplate)}`;

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventTitle
  )}&dates=20261003T223000Z/20261004T023000Z&details=${encodeURIComponent(
    `${event.description}\n\nKeynote: ${event.keynote?.name ?? "Dr. Tauseef Salma"}\nDinner Included.\nBabysitting: ${schedule?.babysitting ?? "Complimentary on-site babysitting available upon RSVP"}\n\nVenue: ${schedule?.venue ?? "Hilton Richardson Dallas"}\nInquiries: ${contactPhone} | ${contactEmail}`
  )}&location=${encodeURIComponent(
    `${schedule?.venue ?? "Hilton Richardson Dallas"}, ${schedule?.venueAddress ?? "701 E Campbell Rd, Richardson, TX 75081"}`
  )}`;

  const handleDownloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//IMPMS//Event Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:impms-event-${event.slug}-20261003@impmstx.org`,
      "DTSTAMP:20261001T000000Z",
      "DTSTART:20261003T223000Z",
      "DTEND:20261004T023000Z",
      `SUMMARY:${eventTitle.replace(/,/g, "\\,")}`,
      `DESCRIPTION:${(
        `${event.description}\n\nKeynote: ${event.keynote?.name ?? "Dr. Tauseef Salma"}\nDinner Included.\nBabysitting: ${schedule?.babysitting ?? "Complimentary on-site babysitting available upon RSVP"}\n\nVenue: ${schedule?.venue ?? "Hilton Richardson Dallas"}\nInquiries: ${contactPhone} | ${contactEmail}`
      )
        .replace(/\n/g, "\\n")
        .replace(/,/g, "\\,")}`,
      `LOCATION:${(`${schedule?.venue ?? "Hilton Richardson Dallas"}, ${schedule?.venueAddress ?? "701 E Campbell Rd, Richardson, TX 75081"}`).replace(/,/g, "\\,")}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.slug}-october-3-2026.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(rsvpEmailTemplate);
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <div className="pattern-bg absolute inset-0 opacity-25" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/95"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,color-mix(in_oklab,var(--gold)_20%,transparent),transparent_55%)]"
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

        {isPortraitPoster ? (
          /* Rich Split Layout for Portrait Event Flyer (October Event) */
          <div className="container-page relative z-10 pb-12 pt-6 sm:pb-16 sm:pt-8">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Titles, Badges, Summary, CTAs */}
              <div className="lg:col-span-7">
                {/* Joint presentation & status badges */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  {event.partnerName ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1 text-xs font-semibold tracking-wide text-gold backdrop-blur-sm">
                      <Sparkles className="h-3.5 w-3.5 text-gold" />
                      IMPMS × {event.partnerName} Joint Presentation
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1 text-xs font-semibold tracking-wide text-gold backdrop-blur-sm">
                      IMPMS Special Event
                    </span>
                  )}
                  <Badge className="border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/15">
                    <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    {event.status}
                  </Badge>
                </div>

                {/* Main Heading */}
                <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                  {event.title}
                </h1>

                {event.subtitle && (
                  <p className="mt-3 text-lg font-semibold text-gold sm:text-2xl">
                    {event.subtitle}
                  </p>
                )}

                {event.tagline && (
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-primary-foreground/75 sm:text-base">
                    {event.tagline}
                  </p>
                )}

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
                  {event.description}
                </p>

                {/* Key Quick Facts Pills */}
                {schedule && (
                  <div className="mt-6 flex flex-wrap gap-2.5 text-xs font-medium text-primary-foreground/90 sm:text-sm">
                    {schedule.date && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1.5 backdrop-blur-sm">
                        <Calendar className="h-4 w-4 text-gold" />
                        {schedule.date}
                      </span>
                    )}
                    {schedule.time && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1.5 backdrop-blur-sm">
                        <Clock className="h-4 w-4 text-gold" />
                        {schedule.time}
                      </span>
                    )}
                    {schedule.venue && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1.5 backdrop-blur-sm">
                        <MapPin className="h-4 w-4 text-gold" />
                        {schedule.venue}
                      </span>
                    )}
                    {schedule.dinner && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1.5 backdrop-blur-sm">
                        <Utensils className="h-4 w-4 text-gold" />
                        {schedule.dinner.split("(")[0].trim()}
                      </span>
                    )}
                    {schedule.babysitting && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1.5 backdrop-blur-sm">
                        <Baby className="h-4 w-4 text-gold" />
                        Babysitting Available
                      </span>
                    )}
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {event.registrationPrompt ? (
                    <Button asChild size="lg" className="w-full bg-gold text-gold-foreground hover:bg-gold/90 sm:w-auto">
                      <Link to="/events/$slug/priority-list" params={{ slug: event.slug }}>
                        Join the Priority List <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="w-full cursor-pointer bg-gold font-semibold text-gold-foreground shadow-lg shadow-gold/20 hover:bg-gold/90 sm:w-auto"
                      onClick={() => setIsRsvpOpen(true)}
                    >
                      <Mail className="h-4 w-4" />
                      RSVP / Inquire Invitation
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 sm:w-auto"
                    onClick={() => window.open(googleCalendarUrl, "_blank")}
                  >
                    <Calendar className="h-4 w-4" />
                    Add to Calendar
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 sm:w-auto"
                    onClick={() => window.open(mapUrl, "_blank")}
                  >
                    <Navigation className="h-4 w-4" />
                    Directions
                  </Button>
                </div>
              </div>

              {/* Right Column: Framed Event Flyer Poster */}
              <div className="flex justify-center lg:col-span-5 lg:justify-end">
                <div className="group relative w-full max-w-md">
                  <div
                    className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-gold/30 via-gold/10 to-transparent blur-md transition-all duration-300 group-hover:from-gold/45 group-hover:blur-lg"
                    aria-hidden="true"
                  />
                  <div
                    className="relative cursor-pointer overflow-hidden rounded-2xl border-2 border-gold/30 bg-primary shadow-2xl shadow-black/40 ring-1 ring-gold/20 transition-transform duration-300 group-hover:scale-[1.01]"
                    onClick={() => setIsFlyerOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setIsFlyerOpen(true);
                      }
                    }}
                    aria-label="Click to enlarge official event flyer"
                  >
                    <img
                      src={event.pageHeroImage ?? event.bannerImage}
                      alt={event.pageHeroAlt ?? event.bannerAlt}
                      width={event.pageHeroWidth ?? pageBannerDimensions.width}
                      height={event.pageHeroHeight ?? pageBannerDimensions.height}
                      sizes="(max-width: 80rem) 100vw, 80rem"
                      className="mx-auto h-auto w-full object-contain"
                      fetchPriority="high"
                      decoding="async"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-gold-foreground shadow-lg">
                        <ZoomIn className="h-6 w-6" />
                      </span>
                      <p className="mt-2 text-sm font-semibold text-white">Click to enlarge flyer</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-primary-foreground/70">
                    <span>Official Event Flyer</span>
                    <button
                      type="button"
                      onClick={() => setIsFlyerOpen(true)}
                      className="inline-flex cursor-pointer items-center gap-1 font-medium text-gold hover:underline"
                    >
                      <ZoomIn className="h-3.5 w-3.5" />
                      View High Resolution
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Landscape Banner Layout (Allama Iqbal or other wide banner events) */
          <div className="container-page relative z-10 pb-8 pt-6 sm:pb-10 sm:pt-8">
            <div className="overflow-hidden rounded-2xl border border-gold/25 shadow-2xl shadow-black/30 ring-1 ring-gold/15">
              <img
                src={event.pageHeroImage ?? event.bannerImage}
                alt={event.pageHeroAlt ?? event.bannerAlt}
                width={event.pageHeroWidth ?? pageBannerDimensions.width}
                height={event.pageHeroHeight ?? pageBannerDimensions.height}
                sizes="(max-width: 80rem) 100vw, 80rem"
                className={pageBannerImageClass}
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
        )}
      </section>

      {/* Event Details Strip (Schedule, Venue, Dinner, Attire, Babysitting, Parking) */}
      {hasSchedule && (
        <section className="border-y border-border bg-secondary">
          <div className="container-page py-8 sm:py-10">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Event Logistics</p>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">Key Event Details & Amenities</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadIcs}
                  className="cursor-pointer gap-1.5 border-border text-xs"
                >
                  <Download className="h-3.5 w-3.5 text-gold" />
                  Download .ICS
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(mapUrl, "_blank")}
                  className="cursor-pointer gap-1.5 border-border text-xs"
                >
                  <Navigation className="h-3.5 w-3.5 text-gold" />
                  Get Directions
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {/* Date */}
              {schedule.date && (
                <div className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-gold/30 hover:shadow-md">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold text-gold-foreground">
                    <Calendar className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Date</p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-foreground">{schedule.date}</p>
                  </div>
                </div>
              )}

              {/* Time */}
              {schedule.time && (
                <div className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-gold/30 hover:shadow-md">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Time</p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-foreground">{schedule.time}</p>
                  </div>
                </div>
              )}

              {/* Venue */}
              {schedule.venue && (
                <div className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-gold/30 hover:shadow-md">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Venue</p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-foreground">{schedule.venue}</p>
                    {schedule.venueAddress && (
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                        {schedule.venueAddress}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Dinner */}
              {schedule.dinner && (
                <div className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-gold/30 hover:shadow-md">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Utensils className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Dining</p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-foreground">Dinner Included</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Halal & vegetarian options</p>
                  </div>
                </div>
              )}

              {/* Attire */}
              {schedule.dressCode && (
                <div className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-gold/30 hover:shadow-md">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold text-gold-foreground">
                    <Shirt className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Attire</p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-foreground">Business Casual</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Or traditional attire</p>
                  </div>
                </div>
              )}

              {/* Babysitting */}
              {schedule.babysitting && (
                <div className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-gold/30 hover:shadow-md">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Baby className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Babysitting</p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-foreground">Available On-Site</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Request with RSVP</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Dual Programs Section (Part One: AI Resilience & Part Two: DiscoverSTEM Innovation Day) */}
      {event.themes && event.themes.length > 0 && (
        <section className="bg-background">
          <div className="container-page section-y">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {event.focusLabel ?? "Conference Focus"}
              </p>
              {event.tagline && (
                <h2 className="mt-3 text-[clamp(1.5rem,3vw+1rem,2.25rem)] font-bold text-foreground">
                  {event.tagline}
                </h2>
              )}
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Join scholars, researchers, youth inventors, and industry leaders for an impactful evening celebrating both technological foresight and emerging human ingenuity.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {event.themes.map((theme, index) => {
                const Icon = themeIcons[theme.icon];
                const isPartOne = theme.title.includes("Part One");
                const isPartTwo = theme.title.includes("Part Two");

                return (
                  <article
                    key={theme.title}
                    className={`relative flex flex-col justify-between rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                      isPartOne
                        ? "border-primary/40 bg-card ring-1 ring-primary/20"
                        : isPartTwo
                          ? "border-gold/40 bg-card ring-1 ring-gold/25"
                          : "border-border bg-card"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                            isPartOne
                              ? "bg-primary text-primary-foreground"
                              : isPartTwo
                                ? "bg-gold text-gold-foreground"
                                : "bg-accent text-accent-foreground"
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                        {isPartOne && (
                          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                            Part 1
                          </span>
                        )}
                        {isPartTwo && (
                          <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold">
                            Part 2
                          </span>
                        )}
                      </div>

                      <h3 className="mt-5 text-xl font-bold text-foreground">{theme.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{theme.text}</p>
                    </div>

                    {isPartOne && (
                      <div className="mt-6 rounded-xl border border-primary/15 bg-primary/5 p-3 text-xs text-muted-foreground">
                        <strong className="text-foreground">Featuring:</strong> Keynote Address by Dr. Tauseef Salma & Healthcare AI Innovation Challenge.
                      </div>
                    )}
                    {isPartTwo && (
                      <div className="mt-6 rounded-xl border border-gold/25 bg-gold/5 p-3 text-xs text-muted-foreground">
                        <strong className="text-foreground">Featuring:</strong> Patent Certificate Presentations & America&apos;s Top Young Innovators Awards.
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Keynote Speaker Spotlight */}
      {event.keynote && (
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="pattern-bg absolute inset-0 opacity-25" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,color-mix(in_oklab,var(--gold)_16%,transparent),transparent_50%)]"
            aria-hidden="true"
          />

          <div className="container-page relative section-y">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  <Mic className="h-3.5 w-3.5" />
                  Keynote Speaker
                </div>
                <h2 className="mt-4 text-[clamp(1.75rem,3vw+1rem,2.75rem)] font-extrabold leading-tight">
                  {event.keynote.name}
                </h2>
                {event.keynote.title && (
                  <p className="mt-2 text-lg font-semibold text-gold sm:text-xl">{event.keynote.title}</p>
                )}
                {event.keynote.award && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/15 px-4 py-2.5 text-sm font-semibold text-gold shadow-sm">
                    <Award className="h-4 w-4 shrink-0 text-gold" />
                    {event.keynote.award}
                  </div>
                )}
                <p className="mt-6 max-w-2xl leading-relaxed text-primary-foreground/85">
                  {event.keynote.bio}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer border-gold/40 bg-gold/10 text-gold hover:bg-gold/20"
                    onClick={() => setIsRsvpOpen(true)}
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Confirm Attendance
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer border-white/20 bg-white/10 text-white hover:bg-white/20"
                    onClick={() => setIsFlyerOpen(true)}
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                    View Keynote on Flyer
                  </Button>
                </div>
              </div>

              <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
                <div className="relative w-full max-w-44 sm:max-w-48 lg:max-w-56">
                  <div
                    className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-gold/40 to-gold/10 blur-md"
                    aria-hidden="true"
                  />
                  <div className="relative overflow-hidden rounded-2xl border-2 border-gold/40 shadow-2xl">
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

      {/* Who Should Attend (Target Audiences) */}
      {attendeeAudiences && attendeeAudiences.length > 0 && (
        <section className="bg-secondary">
          <div className="container-page section-y">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Target Audience</p>
                <h2 className="mt-1 text-[clamp(1.5rem,3vw+1rem,2.25rem)] font-bold text-foreground">
                  Who Should Attend?
                </h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                Connecting cross-disciplinary leaders across medicine, engineering, youth innovation, and education.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {attendeeAudiences.map((audience) => {
                const Icon = getAudienceIcon(audience.title);

                return (
                  <article
                    key={audience.title}
                    className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-gold/40 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold ring-1 ring-gold/25">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground">{audience.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {audience.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Sponsors & Partners Banner */}
      {sponsorAudience && (
        <section className="border-y border-border bg-background">
          <div className="container-page py-10">
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  <Handshake className="h-4 w-4" />
                  Partnership Opportunities
                </div>
                <h3 className="mt-2 text-xl font-bold sm:text-2xl">Partner With IMPMS & DiscoverSTEM</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Support young inventors, patent awards, and educational programs bridging historical scientific inquiry with next-generation breakthroughs.
                </p>
              </div>
              <Button asChild size="lg" className="shrink-0 bg-gold text-gold-foreground hover:bg-gold/90">
                <Link to="/partnerships">
                  Explore Partnerships <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Additional Information & Guest Guidelines (With Prominent Babysitting Details) */}
      {event.details && event.details.length > 0 && (
        <section className="border-t border-border bg-muted/40">
          <div className="container-page section-y">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Event Guidelines</p>
                <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Important Guest Information</h2>
              </div>
              <p className="text-xs text-muted-foreground">
                Questions? Call {contactPhone} or email {contactEmail}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {event.details.map((detail, index) => {
                const isBabysittingLine = detail.toLowerCase().includes("babysitting");
                const isDinnerLine = detail.toLowerCase().includes("dinner");
                const isParkingLine = detail.toLowerCase().includes("parking");
                const isAdmissionLine = detail.toLowerCase().includes("admission");
                const isAttireLine = detail.toLowerCase().includes("attire") || detail.toLowerCase().includes("dress");

                const Icon = isBabysittingLine
                  ? Baby
                  : isDinnerLine
                    ? Utensils
                    : isParkingLine
                      ? MapPin
                      : isAdmissionLine
                        ? Shield
                        : isAttireLine
                          ? Shirt
                          : Sparkles;

                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-gold/30 hover:shadow-md"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact & Inquiries Support Card */}
      <section className="border-t border-border bg-background">
        <div className="container-page py-10">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Need Assistance?</p>
                <h3 className="mt-1 text-xl font-bold sm:text-2xl">Questions Regarding Invitations or Logistics?</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Our event team is happy to assist with invitation inquiries, childcare accommodations, dietary needs, or table seating.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  IMPMS is a 501(c)(3) nonprofit organization advancing scholarship, innovation, and public dialogue since 2001.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" className="gap-2 border-border">
                  <a href={`tel:${contactPhone.replace(/\D/g, "")}`}>
                    <Phone className="h-4 w-4 text-gold" />
                    {contactPhone}
                  </a>
                </Button>
                <Button asChild variant="outline" className="gap-2 border-border">
                  <a href={`mailto:${contactEmail}`}>
                    <Mail className="h-4 w-4 text-gold" />
                    {contactEmail}
                  </a>
                </Button>
                <Button
                  className="cursor-pointer gap-2 bg-gold text-gold-foreground hover:bg-gold/90"
                  onClick={() => setIsRsvpOpen(true)}
                >
                  <Mail className="h-4 w-4" />
                  RSVP Inquiry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Modal Dialog */}
      <Dialog open={isRsvpOpen} onOpenChange={setIsRsvpOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <Mail className="h-5 w-5 text-gold" />
              RSVP & Invitation Inquiry
            </DialogTitle>
            <DialogDescription>
              {event.title} • {schedule?.date ?? "Saturday, October 3, 2026"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2 text-sm">
            <div className="rounded-xl border border-gold/30 bg-gold/10 p-3.5 text-xs text-foreground">
              <p className="font-semibold text-gold">Admission Policy:</p>
              <p className="mt-1 leading-relaxed text-muted-foreground">
                Admission is by invitation only. If you have already received an invitation card or link, please confirm your attendance. If you represent an institution or would like to request attendance, please contact us below.
              </p>
            </div>

            {/* Childcare notice in modal */}
            {schedule?.babysitting && (
              <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary p-3">
                <Baby className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Need babysitting?</strong> Complimentary on-site child care is provided. Please mention your children&apos;s ages when confirming so caregivers can be scheduled.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Option 1: Send RSVP Email Directly
              </p>
              <Button asChild className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                <a href={rsvpMailtoUrl}>
                  <Mail className="mr-2 h-4 w-4" />
                  Open Pre-Filled RSVP Email
                </a>
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Option 2: Copy RSVP Message Template
                </p>
                <button
                  type="button"
                  onClick={handleCopyTemplate}
                  className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-gold hover:underline"
                >
                  {copiedTemplate ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy Template
                    </>
                  )}
                </button>
              </div>
              <textarea
                readOnly
                value={rsvpEmailTemplate}
                rows={5}
                className="w-full rounded-lg border border-border bg-muted/40 p-2.5 font-mono text-xs text-muted-foreground focus:outline-none"
              />
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-xs font-medium text-muted-foreground">
                Direct Contact:{" "}
                <a href={`tel:${contactPhone.replace(/\D/g, "")}`} className="font-semibold text-foreground hover:text-gold">
                  {contactPhone}
                </a>{" "}
                |{" "}
                <a href={`mailto:${contactEmail}`} className="font-semibold text-foreground hover:text-gold">
                  {contactEmail}
                </a>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Resolution Flyer Lightbox Modal */}
      <Dialog open={isFlyerOpen} onOpenChange={setIsFlyerOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto p-4 sm:p-6">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-lg font-bold">
              Official Event Flyer
            </DialogTitle>
            <DialogDescription>
              {event.title} — Saturday, October 3, 2026
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-hidden rounded-xl border border-border bg-black/5 shadow-inner">
            <img
              src={event.pageHeroImage ?? event.bannerImage}
              alt={event.pageHeroAlt ?? event.bannerAlt}
              className="mx-auto h-auto max-h-[70vh] w-auto object-contain"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
            <p className="text-xs text-muted-foreground">
              Hilton Richardson Dallas • 5:30 PM - 9:30 PM CDT
            </p>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs">
                <a href={event.pageHeroImage ?? event.bannerImage} download="impms-event-flyer.jpg" target="_blank" rel="noreferrer">
                  <Download className="h-3.5 w-3.5 text-gold" />
                  Download Flyer
                </a>
              </Button>
              <Button
                size="sm"
                className="gap-1.5 bg-gold text-gold-foreground hover:bg-gold/90 text-xs"
                onClick={() => {
                  setIsFlyerOpen(false);
                  setIsRsvpOpen(true);
                }}
              >
                <Mail className="h-3.5 w-3.5" />
                RSVP Inquiry
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CtaBand />
    </>
  );
}
