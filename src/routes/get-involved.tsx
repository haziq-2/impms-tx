import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Check,
  GraduationCap,
  Handshake,
  LayoutGrid,
  Users,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import communityImg from "@/assets/community.jpg";
import { pageBannerDimensions, pageBannerImageClass } from "@/lib/page-banner";

const involvementSections = [
  { id: "join-impms", label: "Join IMPMS", icon: LayoutGrid },
  { id: "volunteer-with-impms", label: "Volunteer with IMPMS", icon: Users },
  { id: "sponsor-or-partner", label: "Sponsor or Partner", icon: Handshake },
  { id: "fund-our-programs", label: "Fund our Programs", icon: GraduationCap },
  { id: "students", label: "Students", icon: BookOpen },
] as const;

const volunteerBenefits = [
  "Invitations to conferences, lectures, and public programs",
  "Access to publications and educational resources",
  "Opportunities to support youth innovation and STEM partnerships",
  "A community advancing shared discovery and understanding",
];

const sponsorPartnerAreas = [
  "Research grants for high school students",
  "Student mentorship and academic enrichment",
  "Conferences, lectures, and public programs",
  "Publications and educational resources",
  "Community outreach and initiatives that promote cultural understanding",
];

const programFundingAreas = [
  "Research Grants for high school students",
  "Student mentorship and academic enrichment",
  "Conferences, lectures, and public programs",
  "Publications and educational resources",
  "Community outreach and cultural understanding initiatives",
];

function SectionHeading({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className={`flex gap-3.5 ${subtitle ? "items-start" : "items-center"}`}>
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground ${
          subtitle ? "mt-0.5" : ""
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-base text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved — Membership & Volunteering | IMPMS" },
      {
        name: "description",
        content:
          "Join IMPMS as a board member, volunteer, student ambassador, or supporter. Explore shared heritage through programs, events, and publications.",
      },
      { property: "og:title", content: "Get Involved — Membership & Volunteering" },
      { property: "og:description", content: "Become a member and support IMPMS." },
    ],
    links: [{ rel: "canonical", href: "/get-involved" }],
  }),
  component: GetInvolvedPage,
});

function GetInvolvedPage() {
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    message: "",
    isStudent: false,
  });

  const submitVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.email) return;
    toast.success(
      volunteerForm.isStudent
        ? "Thank you! We'll be in touch about the student volunteer / ambassador opportunity."
        : "Thank you! We'll be in touch about volunteering with IMPMS."
    );
    setVolunteerForm({ name: "", email: "", message: "", isStudent: false });
  };

  const handleStudentOptionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setVolunteerForm((prev) => ({
      ...prev,
      isStudent: true,
    }));
    const el = document.getElementById("volunteer-with-impms");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Help carry this legacy forward"
        description="Whether you are an educator, student, researcher, or community member, IMPMS invites you to explore this shared heritage through its programs, events, and publications."
      />

      <section className="container-page section-y">
        <figure className="mb-12 overflow-hidden rounded-2xl border border-border shadow-xl">
          <img
            src={communityImg}
            alt="A diverse community of IMPMS volunteers and students smiling together"
            width={pageBannerDimensions.width}
            height={pageBannerDimensions.height}
            loading="lazy"
            className={pageBannerImageClass}
          />
        </figure>

        <div className="scroll-nav-pills mb-12 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <nav
            className="mx-auto flex w-max flex-nowrap justify-center gap-3"
            aria-label="Ways to get involved"
          >
            {involvementSections.map((section) => (
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

        <div className="space-y-20">
          <section id="join-impms" className="scroll-mt-28">
            <div id="board-members" className="scroll-mt-28" />
            <SectionHeading
              icon={LayoutGrid}
              title="Join IMPMS"
              subtitle="Explore the past. Enrich the present."
            />
            <div className="mt-8 rounded-2xl border border-border bg-card p-7 lg:p-8">
              <p className="leading-relaxed text-muted-foreground">
                IMPMS brings people together to explore the ideas, discoveries, and cultural
                exchange that have shaped our world. Through scholarship, education, mentorship, and
                public programs, we make the study of history accessible and relevant to new
                generations, advancing the institute&apos;s mission, vision, and goals.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
                  <Link to="/board-of-directors">Meet the Board</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Express Your Interest</Link>
                </Button>
              </div>
            </div>
          </section>

          <section id="volunteer-with-impms" className="scroll-mt-28">
            <div id="volunteer-student-ambassador" className="scroll-mt-28" />
            <SectionHeading icon={Users} title="Volunteer with IMPMS" />
            <div className="mt-8 grid gap-12 lg:grid-cols-2">
              <div>
                <p className="leading-relaxed text-muted-foreground">
                  Share your time and skills in support of IMPMS programs and events. Volunteers
                  help with research, communications, outreach, event coordination, and other
                  projects. We welcome a range of interests and experience.
                </p>
                <ul className="mt-6 space-y-3">
                  {volunteerBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="text-xl font-semibold">Volunteer interest form</h3>
                <form onSubmit={submitVolunteer} className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="volunteer-name">Full name</Label>
                    <Input
                      id="volunteer-name"
                      required
                      value={volunteerForm.name}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="volunteer-email">Email</Label>
                    <Input
                      id="volunteer-email"
                      type="email"
                      required
                      value={volunteerForm.email}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="volunteer-message">How would you like to help?</Label>
                    <Textarea
                      id="volunteer-message"
                      value={volunteerForm.message}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                      placeholder="Tell us about your interests as a volunteer or student ambassador"
                      rows={4}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-1">
                    <Checkbox
                      id="student-option"
                      checked={volunteerForm.isStudent}
                      onCheckedChange={(checked) =>
                        setVolunteerForm({ ...volunteerForm, isStudent: !!checked })
                      }
                    />
                    <Label
                      htmlFor="student-option"
                      className="text-sm font-normal text-muted-foreground cursor-pointer"
                    >
                      Student volunteer option
                    </Label>
                  </div>
                  <Button type="submit" className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                    Submit Interest
                  </Button>
                </form>
              </div>
            </div>
          </section>

          <section id="sponsor-or-partner" className="scroll-mt-28">
            <div id="support-impms" className="scroll-mt-28" />
            <SectionHeading icon={Handshake} title="Sponsor or Partner" />
            <div className="mt-8 rounded-2xl border border-border bg-card p-7 lg:p-8">
              <p className="leading-relaxed text-muted-foreground">
                Partner with IMPMS to expand educational opportunities and bring the richness of
                history to wider audiences. Sponsors and donors help sustain programs that serve
                students, scholars, educators, and the broader community, including:
              </p>
              <ul className="mt-6 space-y-3">
                {sponsorPartnerAreas.map((area) => (
                  <li key={area} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Support may be directed to a specific program or event, or to IMPMS&apos;s broader
                work.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
                  <Link to="/donate">Make a Donation</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/partnerships">Explore Partnerships</Link>
                </Button>
              </div>
            </div>
          </section>

          <section id="fund-our-programs" className="scroll-mt-28">
            <SectionHeading icon={GraduationCap} title="Fund our Programs" />
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-7 lg:p-8">
                <p className="leading-relaxed text-muted-foreground">
                  Program funding helps IMPMS advance scholarship, education, mentorship, and public
                  engagement. Support from sponsors and donors strengthens programs that serve
                  students, scholars, educators, and the wider community through research
                  opportunities, conferences, lectures, publications, and cultural understanding
                  initiatives.
                </p>
                <ul className="mt-6 space-y-3">
                  {programFundingAreas.map((area) => (
                    <li key={area} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-center rounded-2xl border border-border bg-card p-7 lg:p-8">
                <p className="leading-relaxed text-muted-foreground">
                  Interested in sponsoring a specific program or event? We welcome conversations
                  with individuals, foundations, and organizations that share our mission.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
                    <Link to="/programs">View Programs</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/contact">Discuss Sponsorship</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section id="students" className="scroll-mt-28">
            <SectionHeading icon={BookOpen} title="Students" />
            <div className="mt-8 rounded-2xl border border-border bg-card p-7 lg:p-8">
              <p className="leading-relaxed text-muted-foreground">
                Bring your curiosity to IMPMS. Take part in events and projects, explore
                connections between past and present, and learn alongside a community of scholars
                and enthusiasts. No prior expertise is required.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
                  <a href="#volunteer-with-impms" onClick={handleStudentOptionClick}>
                    Volunteer with IMPMS
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
