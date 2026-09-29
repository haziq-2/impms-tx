import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact IMPMS" },
      {
        name: "description",
        content:
          "Get in touch with the Institute of Medieval and Post-Medieval Studies for membership, partnerships, speaking, or general inquiries.",
      },
      { property: "og:title", content: "Contact IMPMS" },
      { property: "og:description", content: "Reach the Institute of Medieval and Post-Medieval Studies." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    toast.success("Thank you for reaching out. We'll respond soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Questions about membership, partnerships, or speaking engagements? Send us a message."
      />

      <section className="container-page grid gap-8 section-y lg:gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold">Email</p>
              <a href="mailto:info@impmstx.org" className="text-muted-foreground hover:text-foreground">info@impmstx.org</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-muted-foreground">Texas, United States</p>
            </div>
          </div>
          <div>
            <p className="font-semibold">Follow us</p>
            <SocialLinks className="mt-2 -ml-2" />
          </div>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cname">Name</Label>
              <Input id="cname" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cemail">Email</Label>
              <Input id="cemail" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Label htmlFor="cmsg">Message</Label>
            <Textarea id="cmsg" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <Button type="submit" className="mt-6 bg-gold text-gold-foreground hover:bg-gold/90">Send message</Button>
        </form>
      </section>
    </>
  );
}
