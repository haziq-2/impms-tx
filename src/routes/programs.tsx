import { createFileRoute } from "@tanstack/react-router";
import { Brain, Microscope, Rocket, Trophy, Target, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import stemImg from "@/assets/stem.jpg";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — STEM Education & DiscoverSTEM | IMPMS" },
      {
        name: "description",
        content:
          "IMPMS programs mentor students through the DiscoverSTEM collaboration, building critical thinking, problem-solving, and patentable STEM innovation skills.",
      },
      { property: "og:title", content: "Programs — STEM Education & Youth Innovation" },
      { property: "og:description", content: "How IMPMS prepares students to think like innovators." },
      { property: "og:image", content: stemImg },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

const outcomes = [
  { icon: Brain, title: "Critical Thinking", text: "Students develop analytical skills to break down complex problems." },
  { icon: Target, title: "Problem Solving", text: "Learners identify real-world challenges worth solving." },
  { icon: Rocket, title: "Innovation", text: "Students engineer original, patentable STEM solutions." },
  { icon: Trophy, title: "University Readiness", text: "Mentorship prepares students for prestigious colleges." },
  { icon: Microscope, title: "Hands-On Science", text: "Practical labs connect theory to discovery." },
  { icon: Users, title: "Mentorship", text: "Guidance from educators and past innovators." },
];

function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Educating and inspiring the innovators of tomorrow"
        description="Through our DiscoverSTEM collaboration, IMPMS equips young people with the mindset and skills to turn curiosity into invention."
      />

      <section className="container-page grid items-center gap-8 section-y lg:gap-12 lg:grid-cols-2">
        <img
          src={stemImg}
          alt="Students collaborating around a microscope in a bright STEM classroom"
          width={1280}
          height={960}
          loading="lazy"
          className="aspect-[5/4] w-full rounded-2xl object-cover shadow-xl"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Since 2018</p>
          <h2 className="mt-3 text-3xl font-bold">The DiscoverSTEM Collaboration</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            DiscoverSTEM prepares young students to develop critical and analytical skills,
            problem-solving, and creativity. The goal is to prepare students for admission to
            prestigious universities and colleges while mentoring them to think like innovators.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Students learn to identify the world's problems and innovate patentable STEM solutions.
            By learning from past innovators, they gain the knowledge and confidence to become the
            innovators of tomorrow.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-gold">·</span> Hosts public lectures and university-based learning events</li>
            <li className="flex gap-2"><span className="text-gold">·</span> Partners with STEM-focused organizations to inspire student innovation</li>
            <li className="flex gap-2"><span className="text-gold">·</span> Organizes essay competitions and educational activities for students</li>
            <li className="flex gap-2"><span className="text-gold">·</span> Recognizes young innovators and encourages continued learning</li>
          </ul>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="container-page section-y">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">What students gain</h2>
            <p className="mt-4 text-muted-foreground">
              A complete foundation for academic success and lifelong innovation.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((o) => (
              <div key={o.title} className="rounded-2xl border border-border bg-card p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <o.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
