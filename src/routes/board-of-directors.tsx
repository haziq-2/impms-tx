import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { BoardColumnGrid } from "@/components/board-column-grid";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { boardMembers, founders, pastPresidents, type BoardMember } from "@/data/board-of-directors";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/board-of-directors")({
  head: () => ({
    meta: [
      { title: "Board of Directors — IMPMS Leadership" },
      {
        name: "description",
        content:
          "Meet the IMPMS Board of Directors — leaders in medicine, science, diplomacy, engineering, law, faith, and the arts united in the mission of knowledge in the cause of understanding.",
      },
      { property: "og:title", content: "Board of Directors — IMPMS Leadership" },
      {
        property: "og:description",
        content:
          "The leaders who guide IMPMS in advancing mutual understanding through the scientific and cultural heritage of the Islamic world.",
      },
    ],
    links: [{ rel: "canonical", href: "/board-of-directors" }],
  }),
  component: BoardOfDirectorsPage,
});

function BioText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i}>{part.slice(1, -1)}</em>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function TeamPhoto({ member }: { member: BoardMember }) {
  if (member.photo) {
    return (
      <img
        src={member.photo}
        alt={member.name}
        className="h-full w-full object-cover object-top"
        loading="lazy"
      />
    );
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary/80"
      aria-hidden={!member.initials}
    >
      <span className="font-serif text-4xl font-bold text-primary-foreground/90">
        {member.initials}
      </span>
    </div>
  );
}

function FeaturedLeaderPhoto({
  member,
  inMemoriam,
}: {
  member: BoardMember;
  inMemoriam?: boolean;
}) {
  return (
    <div className="featured-leader-photo relative mx-auto shrink-0 overflow-hidden rounded-2xl bg-secondary md:mx-0">
      <div className="featured-leader-photo-inner overflow-hidden">
        <TeamPhoto member={member} />
      </div>
      {inMemoriam && (
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-0.5 text-[0.65rem] font-medium text-muted-foreground backdrop-blur-sm">
          In Memoriam
        </span>
      )}
    </div>
  );
}

function FeaturedLeaderCard({
  member,
  inMemoriam,
}: {
  member: BoardMember;
  inMemoriam?: boolean;
}) {
  const hasBio = member.bio.length > 0;
  const previewBio = member.bio[0];
  const restBio = member.bio.slice(1);
  const hasMoreBio = restBio.length > 0;

  const headerBlock = (
    <>
      <h3 className="text-lg font-bold leading-snug text-foreground md:text-xl">{member.name}</h3>
      <p
        className={cn(
          "mt-1 text-sm",
          member.highlightRole ? "font-medium text-gold" : "text-muted-foreground",
        )}
      >
        {member.role}
      </p>
    </>
  );

  const staticCard = (
    <article
      className={cn(
        "rounded-[1.75rem] bg-muted p-5 sm:p-6",
        inMemoriam && "opacity-95",
      )}
    >
      <div className="featured-leader-layout flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
        <FeaturedLeaderPhoto member={member} inMemoriam={inMemoriam} />
        <div className="featured-leader-content">
          {headerBlock}
          {hasBio && (
            <div className="mt-4 border-t border-border/60 pt-4">
              <p className="text-sm font-semibold leading-relaxed text-foreground">
                <BioText text={previewBio} />
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );

  if (!hasMoreBio) {
    return <div className="mx-auto w-full max-w-4xl">{staticCard}</div>;
  }

  return (
    <Collapsible className="featured-leader-card group/leader mx-auto w-full max-w-4xl self-start">
      <article
        className={cn(
          "rounded-[1.75rem] bg-muted p-5 transition-[box-shadow,padding] duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] sm:p-6",
          "group-data-[state=open]/leader:shadow-lg",
          inMemoriam && "opacity-95",
        )}
      >
        <div className="featured-leader-layout flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
          <FeaturedLeaderPhoto member={member} inMemoriam={inMemoriam} />

          <div className="featured-leader-content">
            {headerBlock}

            <div className="mt-4 border-t border-border/60 pt-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold leading-relaxed text-foreground">
                  <BioText text={previewBio} />
                </p>
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-background/80 outline-none transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={`${member.name} — expand biography`}
                  >
                    <ChevronDown
                      className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-data-[state=open]/leader:rotate-180"
                      aria-hidden="true"
                    />
                  </button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="board-collapsible-content">
                <div className="board-collapsible-inner space-y-3 pt-3 text-sm font-semibold leading-relaxed text-muted-foreground">
                  {restBio.map((paragraph, i) => (
                    <p key={i}>
                      <BioText text={paragraph} />
                    </p>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </div>
        </div>
      </article>
    </Collapsible>
  );
}

function TeamProfileCard({
  member,
  inMemoriam,
  size = "default",
}: {
  member: BoardMember;
  inMemoriam?: boolean;
  size?: "default" | "large";
}) {
  const hasBio = !member.forthcoming && member.bio.length > 0;

  const cardClass = cn(
    "group/card w-full rounded-[1.75rem] border border-border bg-muted p-4 transition-[box-shadow] duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-md",
    inMemoriam && "opacity-95",
  );

  const photoBlock = (
    <div className="relative overflow-hidden rounded-2xl bg-secondary">
      <div className={cn("overflow-hidden", size === "large" ? "aspect-[3/4]" : "aspect-[4/5]")}>
        <TeamPhoto member={member} />
      </div>
      {inMemoriam && (
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-0.5 text-[0.65rem] font-medium text-muted-foreground backdrop-blur-sm">
          In Memoriam
        </span>
      )}
    </div>
  );

  const memberInfo = (
    <div className="min-w-0">
      <h3 className="text-sm font-bold leading-snug text-foreground">{member.name}</h3>
      <p
        className={cn(
          "mt-0.5 text-xs leading-snug",
          member.highlightRole ? "font-medium text-gold" : "text-muted-foreground",
        )}
      >
        {member.role}
      </p>
    </div>
  );

  const expandButton = (
    <CollapsibleTrigger asChild>
      <button
        type="button"
                    className="mt-0.5 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-background/80 outline-none transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={`${member.name} — expand biography`}
      >
        <ChevronDown
          className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-data-[state=open]/card:rotate-180"
          aria-hidden="true"
        />
      </button>
    </CollapsibleTrigger>
  );

  const collapsedFooterClass = cn(
    "mt-4 flex w-full items-start justify-between gap-2",
    size === "default" && "md:min-h-[5.5rem]",
  );

  if (!hasBio) {
    return (
      <article className={cardClass}>
        {photoBlock}
        <div className={collapsedFooterClass}>
          {memberInfo}
          {size === "default" && <span className="h-7 w-7 shrink-0" aria-hidden="true" />}
        </div>
        {member.forthcoming && (
          <p className="mt-3 text-xs italic text-muted-foreground">Biography forthcoming.</p>
        )}
      </article>
    );
  }

  return (
    <Collapsible className={cardClass}>
      <article>
        {photoBlock}
        <div className={collapsedFooterClass}>
          {memberInfo}
          {expandButton}
        </div>

        <CollapsibleContent className="board-collapsible-content">
          <div className="board-collapsible-inner mt-3 space-y-3 border-t border-border/60 pt-3 text-sm font-semibold leading-relaxed text-muted-foreground">
            {member.bio.map((paragraph, i) => (
              <p key={i}>
                <BioText text={paragraph} />
              </p>
            ))}
          </div>
        </CollapsibleContent>
      </article>
    </Collapsible>
  );
}

function TeamSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("section-y", className)}>
      <div className="container-page">
        <h2 className="text-center text-[clamp(1.5rem,3vw+1rem,2.25rem)] font-bold">{title}</h2>
        <div className="mt-8 md:mt-12 lg:mt-14">{children}</div>
      </div>
    </section>
  );
}

function TeamGrid({
  items,
  renderCard,
  columnClassName,
  className,
}: {
  items: BoardMember[];
  renderCard: (member: BoardMember) => React.ReactNode;
  columnClassName?: string;
  className?: string;
}) {
  return (
    <BoardColumnGrid
      items={items}
      getKey={(member) => member.name}
      renderItem={renderCard}
      columnClassName={columnClassName}
      className={className}
    />
  );
}

function BoardOfDirectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Board of Directors"
        description="The leaders profiled here bring together medicine, science, diplomacy, engineering, the academy, law, faith, the arts, and global enterprise — offered in service of a single mission: knowledge in the cause of understanding."
      />

      <TeamSection title="President Emeriti">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {founders.map((member) => (
            <FeaturedLeaderCard
              key={member.name}
              member={member}
              inMemoriam={member.inMemoriam}
            />
          ))}
        </div>
      </TeamSection>

      <TeamSection title="Board of Directors" className="bg-secondary">
        <TeamGrid
          items={boardMembers}
          className="mx-auto w-full lg:w-[80%]"
          renderCard={(member) => <TeamProfileCard member={member} />}
        />
      </TeamSection>

      <TeamSection title="Past Presidents">
        <div className="flex flex-wrap items-start justify-center gap-5 md:gap-8">
          {pastPresidents.map((member) => (
            <div key={member.name} className="w-full min-w-0 max-w-[300px] sm:w-[calc(50%-0.625rem)] lg:w-full lg:max-w-[300px]">
              <TeamProfileCard member={member} size="large" />
            </div>
          ))}
        </div>
      </TeamSection>

      <CtaBand />
    </>
  );
}
