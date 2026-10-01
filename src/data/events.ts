import aiResilienceChallenge from "@/assets/events/ai-resilience-challenge.jpg";
import allamaIqbalVision from "@/assets/events/allama-iqbal-vision.jpg";
import allamaIqbalVisionHero from "@/assets/events/allama-iqbal-vision-hero.png";
import salmaTauseefPortrait from "@/assets/events/salma-tauseef-portrait.png";
import salmaTauseefWomanOfTheYear from "@/assets/events/salma-tauseef-woman-of-the-year-2024.jpg";

export type UpcomingEventIcon = "brain" | "book-open";

export type EventThemeIcon = "shield" | "brain" | "sparkles" | "book-open" | "lightbulb" | "heart";

export interface EventTheme {
  title: string;
  text: string;
  icon: EventThemeIcon;
}

export interface EventSchedule {
  date?: string;
  time?: string;
  venue?: string;
  venueAddress?: string;
  dinner?: string;
  dressCode?: string;
  babysitting?: string;
  parking?: string;
}

export interface EventSpeaker {
  name: string;
  title?: string;
  bio: string;
  award?: string;
  image?: string;
  imageAlt?: string;
}
export interface EventAudience {
  title: string;
  description: string;
}

export interface UpcomingEvent {
  slug: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  status: string;
  description: string;
  details?: string[];
  icon: UpcomingEventIcon;
  bannerImage: string;
  bannerAlt: string;
  bannerWidth?: number;
  bannerHeight?: number;
  pageHeroImage?: string;
  pageHeroAlt?: string;
  pageHeroWidth?: number;
  pageHeroHeight?: number;
  hideDetailBanner?: boolean;
  focusLabel?: string;
  themes?: EventTheme[];
  audienceIntro?: string;
  schedule?: EventSchedule;
  keynote?: EventSpeaker;
  registrationPrompt?: string;
  ticketNote?: string;
  audiences?: EventAudience[];
  partnerName?: string;
  partnerTagline?: string;
  contactPhone?: string;
  contactEmail?: string;
  mapQuery?: string;
}

export interface PastEvent {
  year: string;
  title: string;
}

export const eventsIntro =
  "IMPMS events connect scholarship, science, and community impact—creating opportunities for supporters, partners, and donors to help expand educational access, celebrate achievement, and invest in future generations of innovators.";

export const upcomingEvents: UpcomingEvent[] = [
  {
    slug: "ai-resilience",
    title: "An Evening of Learning & Inspiration",
    subtitle: "AI Resilience: The Edge That Keeps You Ahead",
    tagline: "Two Powerful Programs, One Impactful Evening",
    status: "By Invitation Only",
    icon: "brain",
    bannerImage: aiResilienceChallenge,
    bannerAlt:
      "An Evening of Learning & Inspiration — AI Resilience and DiscoverSTEM Innovation Day, Saturday October 3, 2026 at Hilton Richardson Dallas",
    bannerWidth: 2560,
    bannerHeight: 700,
    pageHeroImage: salmaTauseefWomanOfTheYear,
    pageHeroAlt:
      "Official Event Flyer — An Evening of Learning & Inspiration: AI Resilience and DiscoverSTEM Innovation Day",
    pageHeroWidth: 791,
    pageHeroHeight: 1024,
    hideDetailBanner: true,
    partnerName: "discoverSTEM",
    partnerTagline: "Innovation Quotient is the new IQ",
    contactPhone: "(469) 209-5990",
    contactEmail: "info@impmstx.org",
    mapQuery: "Hilton Richardson Dallas, 701 E Campbell Rd, Richardson, TX 75081",
    description:
      "IMPMS and discoverSTEM jointly present an extraordinary evening of learning and inspiration. Part One features AI Resilience: The Edge That Keeps You Ahead with keynote speaker Dr. Tauseef Salma, exploring leadership and innovation in an AI-accelerated era. Part Two celebrates DiscoverSTEM Innovation Day, featuring patent certificate presentations and America's Top Young Innovators Awards.",
    schedule: {
      date: "Saturday, October 3, 2026",
      time: "5:30 PM – 9:30 PM CDT",
      venue: "Hilton Richardson Dallas",
      venueAddress: "701 E Campbell Rd, Richardson, TX 75081",
      dinner: "Dinner included (Seated banquet with halal & vegetarian options)",
      dressCode: "Business casual or traditional attire",
      babysitting: "Complimentary on-site babysitting available — please request upon RSVP",
      parking: "Complimentary self-parking on-site at Hilton Richardson Dallas",
    },
    keynote: {
      name: "Dr. Tauseef Salma",
      title: "Former Chief Technology Officer at Johnson Matthey",
      award: "Woman of the Year 2024 — Recognized by Women in Chemicals (WIC)",
      image: salmaTauseefPortrait,
      imageAlt: "Dr. Tauseef Salma, keynote speaker",
      bio: "Dr. Tauseef Salma is an acclaimed technology executive and researcher whose leadership, innovative vision, and dedication to advancing women in STEM have made her an inspiring industry trailblazer. Formerly Chief Technology Officer at Johnson Matthey, Dr. Salma has spearheaded breakthrough innovations across material science, chemical technologies, and executive innovation strategy. Honored as the 2024 Woman of the Year by Women in Chemicals (WIC), her journey of perseverance and excellence inspires innovators across scientific and industrial disciplines.",
    },
    focusLabel: "Dual Evening Programs",
    themes: [
      {
        icon: "brain",
        title: "Part One: AI Resilience — The Edge That Keeps You Ahead",
        text: "Keynote address with Dr. Tauseef Salma examining strategic resilience, technological leadership, and staying competitive in an AI-driven era, presented alongside the Healthcare AI Innovation Challenge.",
      },
      {
        icon: "sparkles",
        title: "Part Two: DiscoverSTEM Innovation Day",
        text: "Celebrating student inventors and breakthrough thinkers through official Patent Certificate Presentations and America's Top Young Innovators Awards.",
      },
      {
        icon: "lightbulb",
        title: "Joint Vision: Heritage Meets Future Innovation",
        text: "IMPMS and discoverSTEM unite to connect the golden legacy of scientific inquiry with the next generation of youth patent holders, scientists, and problem-solvers.",
      },
    ],
    audiences: [
      {
        title: "Healthcare Professionals",
        description:
          "Physicians, clinical researchers, and healthcare executives exploring AI integration, ethics, and the future of healthcare innovation.",
      },
      {
        title: "Students & Young Innovators",
        description:
          "High school and collegiate innovators seeking STEM mentorship, patent pathways, and inspiration from proven trailblazers.",
      },
      {
        title: "Researchers & Academics",
        description:
          "Scholars connecting scientific heritage with applied artificial intelligence, materials science, and interdisciplinary research.",
      },
      {
        title: "Technology Leaders & Executives",
        description:
          "CTOs, engineering directors, and technology strategists seeking actionable insights on AI disruption, resilience, and organizational excellence.",
      },
      {
        title: "Entrepreneurs & Inventors",
        description:
          "Founders, startup creators, and patent holders looking to commercialize novel concepts and network with fellow innovators.",
      },
      {
        title: "Educators & Mentors",
        description:
          "Teachers, professors, and academic mentors dedicated to fostering youth curiosity, patenting, and STEM excellence.",
      },
    ],
    details: [
      "Admission: By invitation only. If you have received an invitation, please confirm your attendance. If you represent an organization or have not received your invitation, please contact IMPMS.",
      "Babysitting Option: Complimentary on-site babysitting is provided for families with young children throughout the event. Please indicate your need and child ages when confirming your RSVP so dedicated caregivers can be arranged.",
      "Dinner: Seated dinner is included for all confirmed attendees. Halal, vegetarian, and dietary accommodations are available upon advance notification.",
      "Dress Code: Business casual or traditional attire is warmly recommended for this special evening.",
      "Venue & Parking: Complimentary self-parking is available directly on-site at the Hilton Richardson Dallas (701 E Campbell Rd, Richardson, TX 75081).",
      "Event Inquiries: For questions, table reservations, or invitation inquiries, contact the IMPMS team at (469) 209-5990 or email info@impmstx.org.",
      "Nonprofit Status: IMPMS is a 501(c)(3) nonprofit organization advancing scholarship, innovation, and public dialogue since 2001.",
    ],
  },
  {
    slug: "allama-iqbal-vision",
    title: "Allama Iqbal's Vision for the 21st Century",
    tagline: "Exploring Iqbal's poetry, thought, faith, identity, and relevance across generations",
    status: "In Development",
    icon: "book-open",
    bannerImage: allamaIqbalVision,
    bannerAlt: "Special IMPMS Event — Allama Iqbal's Vision for the 21st Century",
    pageHeroImage: allamaIqbalVisionHero,
    pageHeroAlt: "Allama Iqbal's Vision for the 21st Century — Special IMPMS Event",
    pageHeroWidth: 2560,
    pageHeroHeight: 700,
    hideDetailBanner: true,
    description:
      "IMPMS is planning a special program dedicated to the timeless vision, poetry, and thought of Allama Muhammad Iqbal. This upcoming event will explore Iqbal's continuing relevance in the 21st century, including his powerful message on faith, human identity, self discovery, knowledge, and excellence.",
    schedule: {
      date: "Coming Soon",
      time: "To be announced",
      venue: "To be announced",
    },
    focusLabel: "Program Focus",
    themes: [
      {
        icon: "heart",
        title: "Faith & Identity",
        text: "Exploring Iqbal's enduring message on faith, human dignity, and the shaping of individual and collective identity.",
      },
      {
        icon: "lightbulb",
        title: "Self-Discovery",
        text: "Engaging with Iqbal's call for self-awareness, purpose, and the awakening of human potential across generations.",
      },
      {
        icon: "book-open",
        title: "Knowledge & Excellence",
        text: "Celebrating Iqbal's vision of knowledge, creativity, and excellence as foundations for a thoughtful 21st-century society.",
      },
    ],
    audienceIntro:
      "A program for scholars, students, and community members inspired by Iqbal's vision for faith, knowledge, and human excellence.",
    audiences: [
      {
        title: "Scholars and Educators",
        description:
          "Engage with Iqbal's poetry, philosophy, and intellectual legacy through scholarly dialogue and public reflection.",
      },
      {
        title: "Students and Youth",
        description:
          "Discover how Iqbal's message on self-discovery, purpose, and excellence speaks to emerging generations.",
      },
      {
        title: "Community Leaders",
        description:
          "Explore Iqbal's continuing relevance for faith, identity, and civic life in the 21st century.",
      },
      {
        title: "Sponsors and Partners",
        description:
          "Support a special program connecting heritage, thought, and community engagement.",
      },
    ],
    details: [
      "Program details and schedule will be announced soon.",
      "Speaker announcements will be shared with priority list members first.",
      "Priority list registration details will be announced soon.",
    ],
    registrationPrompt:
      "Join the priority list to be among the first to receive program details, speaker announcements, and registration information.",
  },
];

export function getEventBySlug(slug: string): UpcomingEvent | undefined {
  return upcomingEvents.find((event) => event.slug === slug);
}

export function getEventTitle(event: UpcomingEvent): string {
  return event.subtitle ? `${event.title}: ${event.subtitle}` : event.title;
}

export function getPriorityListEvents(): UpcomingEvent[] {
  return upcomingEvents.filter((event) => event.registrationPrompt);
}

export function getEventPath(slug: string): `/events/${string}` {
  return `/events/${slug}`;
}

export const pastEvents: PastEvent[] = [
  { year: "2025", title: "IMPMS Annual Gala: Artificial Intelligence & The Future: Bridging Heritage and Innovation" },
  { year: "2024", title: "Research Milestone: Dr. Bashoo Naziruddin's Diabetes Grant" },
  { year: "2023", title: "IMPMS Annual Event 2023 featuring Dr. Muhammad M. Muhiuddin" },
  { year: "2022", title: "UTD Auditorium Dedication Honoring Dr. Basheer and Dr. Shakila Ahmed" },
  { year: "2022", title: "IMPMS Annual Event 2022 with Dr. Burçin Mutlu-Pakdil" },
  { year: "2022", title: "In Pursuit of the Smallest and Faintest Galaxies — UTD, Texas" },
  { year: "2020", title: "IMPMS Annual Function 2020 with NASA Scientist Dr. Hashima Hasan" },
  { year: "2020", title: "From Past Scholars to Innovators of Tomorrow — UTD, Texas" },
  { year: "2019", title: "Young Muslim Innovators in the Footsteps of Their Ancestors — UTD, Texas" },
  { year: "2018", title: "Stay in STEM: Supporting Today's Aspiring Youth — Plano, Texas" },
  { year: "2017", title: "Islamic Heritage and the Foundation of Renaissance — TCU, Texas" },
  { year: "2016", title: "Year of Light: Recognizing Ibn Haytham's Work — UTD, Texas" },
  { year: "2015", title: "The Great Sufi Mystique Rumi — SMU, Dallas" },
  { year: "2012", title: "The Influence of Ibn Rushd's Philosophy on the West — St. Louis University, Missouri" },
  { year: "2010", title: "Panel on contributions to the history of science by Islamic civilization — Texas A&M University" },
  { year: "2007–2009", title: "\"Great Thinkers of the Islamic World\" continuing education course at SMU" },
  { year: "2005", title: "Islamic Spain and Its Seminal Contribution to Modern Civilization — 40th International Congress on Medieval Studies, Spain" },
  { year: "2005", title: "Islamic Medieval Scholars and Their Impact on the West — SMU, Dallas" },
  { year: "2003", title: "38th International Congress on Medieval Studies" },
  { year: "2003", title: "Extremism Threat to Global Peace — Arlington, Texas" },
  { year: "2002", title: "Role of Religion in Promoting World Peace — Dallas, Texas" },
  { year: "2001", title: "Muslim Contribution to Human Civilization — Dallas, Texas" },
];
