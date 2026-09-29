import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, ExternalLink, Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { articles, books } from "@/data/publications";
import { toast } from "sonner";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Publications & Newsletter | IMPMS" },
      {
        name: "description",
        content:
          "Access IMPMS publications, books, research articles, and newsletters exploring the scientific and cultural heritage of the Islamic world.",
      },
      { property: "og:title", content: "Resources — Publications & Newsletter" },
      { property: "og:description", content: "Books, articles, and newsletter from IMPMS." },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing to the IMPMS newsletter!");
    setEmail("");
  };

  return (
    <>
      <PageHero
        eyebrow="Publications"
        title="Books, articles, and scholarship"
        description="IMPMS leadership has contributed to scholarship on Muslim intellectual history through books, research, and educational materials."
      />

      <section className="container-page section-y">
        <h2 className="text-2xl font-bold">Books</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <article key={book.title} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex aspect-[2/3] items-center justify-center bg-secondary">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={`Cover of ${book.title}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 p-6 text-center">
                    <BookOpen className="h-10 w-10 text-gold" />
                    <p className="text-sm font-medium text-muted-foreground">{book.title}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-semibold leading-snug">{book.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{book.author}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {book.year}
                  {book.price ? ` · ${book.price}` : ""}
                </p>
                {book.buyUrl && (
                  <a
                    href={book.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-gold"
                  >
                    Buy online <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="container-page section-y">
          <h2 className="text-2xl font-bold">Articles</h2>
          <ul className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
            {articles.map((article) => (
              <li key={article.title} className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-foreground">{article.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {article.author}
                    {article.date ? ` · ${article.date}` : ""}
                  </p>
                </div>
                {article.url ? (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground hover:text-gold"
                  >
                    Read article <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">Available on request</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page section-y">
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-primary p-8 text-primary-foreground">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-gold-foreground">
            <Mail className="h-6 w-6" />
          </span>
          <h2 className="mt-5 text-xl font-semibold">Subscribe to our newsletter</h2>
          <p className="mt-2 text-sm text-primary-foreground/75">
            Get updates on events, publications, and the latest in scientific heritage.
          </p>
          <form onSubmit={subscribe} className="mt-6 space-y-3">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <Button type="submit" className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
