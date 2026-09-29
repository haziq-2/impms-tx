import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  Flag,
  GraduationCap,
  Handshake,
  History,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";
import manuscriptImg from "@/assets/manuscript.jpg";

const aboutSections = [
  { id: "our-mission", label: "Our Mission", icon: Flag },
  { id: "history-and-milestones", label: "History and Milestones", icon: History },
  { id: "youth-programs-and-partnerships", label: "Youth Programs and Partnerships", icon: GraduationCap },
  { id: "our-work", label: "Our Work", icon: Briefcase },
  { id: "publications", label: "Publications", icon: BookOpen },
  { id: "affiliations-and-collaboration", label: "Affiliations and Collaboration", icon: Handshake },
] as const;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About IMPMS — Our Mission & History" },
      {
        name: "description",
        content:
          "Founded in 2001, IMPMS is a Dallas-based nonprofit dedicated to sharing the intellectual, scientific, and cultural contributions of Muslim scholars with broad audiences.",
      },
      { property: "og:title", content: "About IMPMS — Our Mission & History" },
      { property: "og:description", content: "Preserving a shared intellectual legacy. Inspiring curiosity, learning, and innovation for the future." },
      { property: "og:image", content: manuscriptImg },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const milestones = [
  "Organizes conferences, lectures, and public programs on the legacy and global impact of Muslim scholarship.",
  "Brings together scholars, educators, and professionals from the United States and abroad.",
  "Contributes to academic dialogue through conference participation and research presentations.",
  "Explores themes such as the history of science, philosophy, education, and cross-cultural exchange.",
];

const youthPrograms = [
  "Hosts public lectures and university-based learning events.",
  "Partners with STEM-focused organizations to inspire student innovation.",
  "Organizes essay competitions and educational activities for students.",
  "Recognizes young innovators and encourages continued learning.",
];

const whatWeDo = [
  "Build and maintain a library of books, manuscripts, and learning resources on major medieval and post-medieval Muslim scholars.",
  "Support research into the lives, works, and ongoing relevance of these scholars to current academic, cultural, and global issues.",
  "Publish monographs, papers, and other educational materials based on these studies.",
  "Share research findings through academic channels and appropriate print and electronic media.",
  "Organize local, national, and international conferences, seminars, colloquia, and workshops.",
  "Highlight the influence of Muslim scholars on later developments in the arts, humanities, mathematics, science, and related fields.",
];

const affiliations = [
  "American Renaissance Society",
  "Institute of International Islamic Thought",
  "Islamic Heritage Foundation in Hyderabad",
  "Medieval Academy of America",
  "Medieval Institute at Western Michigan University",
];

const featuredPublications = [
  { title: "Muslim Contributions to World Civilization", publisher: "AMSS & IIIT", year: "2005" },
  { title: "The Islamic Intellectual Heritage and Its Impact on the West", publisher: "IMPMS", year: "2008" },
  { title: "The Rise and Fall of Muslim Civilization: Hope for the Future", publisher: "IMPMS", year: "2022" },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Institute"
        title="Preserving a shared intellectual legacy"
        description="Founded in 2001, the Institute of Medieval and Post-Medieval Studies (IMPMS) is a Dallas-based nonprofit dedicated to sharing the intellectual, scientific, and cultural contributions of Muslim scholars with broad audiences."
      />

      <section className="container-page section-y">
        <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted-foreground">
          Through educational programs, public engagement, publications, and community partnerships, IMPMS helps
          connect the past to the present in ways that inform, inspire, and build understanding.
        </p>

        <div className="scroll-nav-pills mt-10 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-12">
          <nav
            className="mx-auto flex w-max flex-nowrap justify-center gap-3"
            aria-label="About page sections"
          >
            {aboutSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-gold/50 hover:bg-gold/10"
              >
                <section.icon className="h-4 w-4 text-gold" />
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section id="our-mission" className="scroll-mt-28 bg-secondary">
        <div className="container-page grid gap-8 section-y lg:gap-12 lg:grid-cols-2">
          <div className="space-y-6 leading-relaxed text-muted-foreground">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
              <p className="mt-3">
                IMPMS increases awareness of the achievements of Muslim scholars in science, medicine, mathematics,
                philosophy, literature, and the arts. By highlighting this shared heritage, the institute promotes
                mutual respect, strengthens intercultural understanding, and encourages young people to imagine
                themselves as future innovators and scholars.
              </p>
              <p className="mt-3">
                Established in Dallas in 2001 by a group of scholars, educators, and community leaders, IMPMS has grown
                into a platform for dialogue, education, and cultural understanding. Its work continues to bring the
                historical contributions of Islamic civilization to wider public attention.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Our Goal</h2>
              <p className="mt-3">
                IMPMS seeks to foster mutual trust, understanding, and genuine respect among people of all backgrounds,
                especially within academia, business, and wider society.
              </p>
            </div>
          </div>
          <img
            src={manuscriptImg}
            alt="An illuminated medieval Islamic science manuscript with a brass astrolabe"
            width={1280}
            height={960}
            loading="lazy"
            className="aspect-[5/4] w-full rounded-2xl object-cover shadow-xl"
          />
        </div>
      </section>

      <section id="history-and-milestones" className="container-page scroll-mt-28 section-y">
        <h2 className="text-2xl font-bold">History and Milestones</h2>
        <ul className="mt-6 space-y-3">
          {milestones.map((item) => (
            <li key={item} className="flex gap-3 text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section id="youth-programs-and-partnerships" className="scroll-mt-28 bg-secondary">
        <div className="container-page section-y">
          <h2 className="text-2xl font-bold">Youth Programs and Partnerships</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            A core part of IMPMS's mission is encouraging young people to explore the arts, humanities, science, and
            technology through the lens of historical Muslim achievement. The institute helps students connect heritage
            with curiosity, creativity, and future opportunity.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            Through partnerships with organizations such as Discover STEM, IMPMS supports seminars, educational
            programs, and events that motivate students to become scientists, inventors, and community leaders.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {youthPrograms.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
          <Button asChild className="mt-8">
            <Link to="/programs">Explore youth programs</Link>
          </Button>
        </div>
      </section>

      <section id="our-work" className="container-page scroll-mt-28 section-y">
        <h2 className="text-2xl font-bold">Our Work</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          The Institute of Medieval & Post-Medieval Studies (IMPMS) highlights the intellectual, scientific, and
          cultural contributions of Muslim scholars from the medieval and post-medieval world. Through research, public
          programs, and educational outreach, the institute works to connect this rich heritage with modern scholarship
          and contemporary society.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          IMPMS promotes a broader understanding of how knowledge developed across civilizations and how these
          achievements helped shape global learning, innovation, and dialogue.
        </p>
        <h3 className="mt-10 text-xl font-semibold">What We Do</h3>
        <ul className="mt-5 space-y-3">
          {whatWeDo.map((item) => (
            <li key={item} className="flex gap-3 text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-secondary">
        <div className="container-page grid gap-8 section-y lg:gap-12 lg:grid-cols-2">
          <div id="publications" className="scroll-mt-28">
            <h2 className="text-2xl font-bold">Publications</h2>
            <p className="mt-4 text-muted-foreground">
              IMPMS leadership has contributed to scholarship on Muslim intellectual history through several
              publications, including:
            </p>
            <ul className="mt-6 space-y-4">
              {featuredPublications.map((p) => (
                <li key={p.title} className="rounded-xl border border-border bg-card p-5">
                  <p className="font-medium text-foreground">{p.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.publisher} · {p.year}
                  </p>
                </li>
              ))}
            </ul>
            <Button asChild variant="link" className="mt-6 px-0">
              <Link to="/resources">View all publications</Link>
            </Button>
          </div>
          <div id="affiliations-and-collaboration" className="scroll-mt-28">
            <h2 className="text-2xl font-bold">Affiliations and Collaboration</h2>
            <p className="mt-4 text-muted-foreground">
              IMPMS develops partnerships with national and international organizations that share a commitment to
              scholarship, cultural understanding, and public engagement.
            </p>
            <ul className="mt-6 space-y-2">
              {affiliations.map((org) => (
                <li key={org} className="text-muted-foreground">
                  · {org}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">and similar institutions.</p>
            <Button asChild variant="link" className="mt-4 px-0">
              <Link to="/partnerships">Learn about partnerships</Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
