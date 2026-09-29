import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — IMPMS" },
      { name: "description", content: "How the Institute of Medieval and Post-Medieval Studies collects and uses information." },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="container-page max-w-3xl space-y-6 section-y leading-relaxed text-muted-foreground">
        <p>
          The Institute of Medieval and Post-Medieval Studies (IMPMS) respects your privacy. We
          collect only the information you choose to share with us — such as your name and email
          when you subscribe, become a member, or contact us.
        </p>
        <p>
          We use this information to respond to inquiries, process memberships, and send
          newsletters and updates. We never sell your personal information to third parties.
        </p>
        <p>
          You may unsubscribe from our communications at any time. For questions about this policy
          or to request removal of your information, please contact us at{" "}
          <a href="mailto:info@impmstx.org" className="text-foreground underline underline-offset-4">info@impmstx.org</a>.
        </p>
      </section>
    </>
  );
}
