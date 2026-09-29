import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Users, Globe, Lightbulb, GraduationCap, Newspaper } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import manuscriptImg from "@/assets/manuscript.jpg";
import stemImg from "@/assets/stem.jpg";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/cta-band";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { upcomingEvents } from "@/data/events";
import { pageBannerDimensions, pageBannerImageClass } from "@/lib/page-banner";

const eventSlides = upcomingEvents.map((event) => ({
  src: event.bannerImage,
  alt: event.bannerAlt,
  slug: event.slug,
}));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IMPMS — Reviving the Scientific Heritage of the Islamic World" },
      {
        name: "description",
        content:
          "The Institute of Medieval and Post-Medieval Studies is a nonprofit advancing understanding of Islamic contributions to science and the arts while inspiring tomorrow's innovators.",
      },
      { property: "og:title", content: "Institute of Medieval and Post-Medieval Studies" },
      {
        property: "og:description",
        content: "Reviving the scientific heritage of the Islamic world and inspiring the innovators of tomorrow.",
      },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const stats = [
  { value: "2001", label: "Founded" },
  { value: "501(c)(3)", label: "Nonprofit since 2012" },
  { value: "1,000+", label: "Years of discovery shared" },
  { value: "Global", label: "Conferences & outreach" },
];

const pillars = [
  {
    icon: BookOpen,
    title: "Preserve",
    text: "Documenting the achievements of medieval scholars and scientists whose work shaped the modern world.",
  },
  {
    icon: Globe,
    title: "Connect",
    text: "Building mutual understanding and respect between people of all faiths and cultures.",
  },
  {
    icon: Lightbulb,
    title: "Inspire",
    text: "Mentoring young innovators to identify real problems and engineer patentable STEM solutions.",
  },
];

const explore = [
  {
    icon: GraduationCap,
    title: "STEM Programs",
    text: "Our DiscoverSTEM collaboration prepares students to think like innovators.",
    to: "/programs" as const,
  },
  {
    icon: Users,
    title: "Scholars & Science",
    text: "Meet the thinkers who advanced medicine, astronomy, optics, and mathematics.",
    to: "/scientists" as const,
  },
  {
    icon: Newspaper,
    title: "News & Media",
    text: "Read coverage, newsletters, and stories of Muslim scientists in the news.",
    to: "/news" as const,
  },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImg}
          alt="Golden Islamic geometric star pattern over ancient manuscripts and an astrolabe"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" aria-hidden="true" />
        <div className="container-page relative grid min-h-[clamp(24rem,72vh,42rem)] items-center py-12 sm:py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold sm:mb-5 sm:px-4 sm:text-xs">
              Nonprofit · Established 2001
            </p>
            <h1 className="text-balance text-[clamp(1.875rem,5vw+1rem,3.75rem)] font-bold leading-[1.08]">
              Preserving a shared intellectual legacy
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:mt-6 sm:text-lg">
              Inspiring curiosity, learning, and innovation for the future. IMPMS shares the
              intellectual, scientific, and cultural contributions of Muslim scholars with broad
              audiences through education, public engagement, and community partnerships.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <Button asChild size="lg" className="w-full bg-gold text-gold-foreground hover:bg-gold/90 sm:w-auto">
                <Link to="/about">
                  Discover Our Mission <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto">
                <Link to="/programs">Explore Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="container-page grid grid-cols-1 gap-6 py-8 min-[400px]:grid-cols-2 min-[400px]:gap-8 md:grid-cols-4 md:py-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-[clamp(1.5rem,3vw+1rem,2.25rem)] font-bold text-foreground">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming events */}
      <section className="container-page section-y">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Events</p>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw+1rem,2.25rem)] font-bold">Upcoming Events</h2>
          </div>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link to="/events">
              View all events <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-border shadow-xl">
          <Carousel opts={{ loop: true }}>
            <CarouselContent className="-ml-0">
              {eventSlides.map((slide) => (
                <CarouselItem key={slide.alt} className="pl-0">
                  <Link
                    to="/events/$slug"
                    params={{ slug: slide.slug }}
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      width={pageBannerDimensions.width}
                      height={pageBannerDimensions.height}
                      loading="lazy"
                      className={`${pageBannerImageClass} transition-opacity group-hover:opacity-95`}
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 top-1/2 h-9 w-9 -translate-y-1/2 border-border/50 bg-background/85 shadow-md hover:bg-background sm:left-3 sm:h-10 sm:w-10" />
            <CarouselNext className="right-2 top-1/2 h-9 w-9 -translate-y-1/2 border-border/50 bg-background/85 shadow-md hover:bg-background sm:right-3 sm:h-10 sm:w-10" />
          </Carousel>
        </div>
      </section>

      {/* Mission intro */}
      <section className="container-page section-y-lg grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative">
          <img
            src={manuscriptImg}
            alt="A brass astrolabe resting on an illuminated medieval Islamic science manuscript"
            width={1280}
            height={960}
            loading="lazy"
            className="aspect-[5/4] w-full rounded-2xl object-cover shadow-xl"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Our Purpose</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Connecting the past to the present
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Founded in 2001, IMPMS increases awareness of the achievements of Muslim scholars in
            science, medicine, mathematics, philosophy, literature, and the arts. By highlighting
            this shared heritage, we promote mutual respect, strengthen intercultural understanding,
            and encourage young people to imagine themselves as future innovators and scholars.
          </p>
          <ul className="mt-6 space-y-3">
            {pillars.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{p.title}</p>
                  <p className="text-sm text-muted-foreground">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button asChild variant="link" className="mt-4 px-0 text-foreground">
            <Link to="/about">
              Read our full story <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured program */}
      <section className="bg-secondary">
        <div className="container-page section-y-lg grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">DiscoverSTEM Collaboration</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Creating the innovators of tomorrow</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Since 2018, IMPMS has partnered with DiscoverSTEM to help young students build
              critical thinking, problem-solving, and creativity. Students learn from past
              innovators, identify the world's challenges, and design patentable solutions —
              preparing them for admission to leading universities.
            </p>
            <Button asChild className="mt-7">
              <Link to="/programs">
                See our programs <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src={stemImg}
              alt="Diverse students collaborating on a STEM science project with a microscope and laptop"
              width={1280}
              height={960}
              loading="lazy"
              className="aspect-[5/4] w-full rounded-2xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Explore cards */}
      <section className="container-page section-y-lg">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(1.5rem,3vw+1rem,2.25rem)] font-bold md:text-4xl">Explore the Institute</h2>
          <p className="mt-4 text-muted-foreground">
            Discover the people, programs, and stories at the heart of our mission.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
          {explore.map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <c.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
