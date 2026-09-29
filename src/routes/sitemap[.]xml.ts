import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { upcomingEvents } from "@/data/events";
import { scholarProfiles } from "@/data/scholars";

const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.9" },
          { path: "/board-of-directors", changefreq: "monthly", priority: "0.8" },
          { path: "/programs", changefreq: "monthly", priority: "0.9" },
          { path: "/scientists", changefreq: "monthly", priority: "0.8" },
          ...scholarProfiles.map((scholar) => ({
            path: `/scientists/${scholar.slug}`,
            changefreq: "monthly" as const,
            priority: "0.6",
          })),
          { path: "/events", changefreq: "weekly", priority: "0.8" },
          ...upcomingEvents.flatMap((event) => [
            {
              path: `/events/${event.slug}`,
              changefreq: "weekly" as const,
              priority: "0.7",
            },
            ...(event.registrationPrompt
              ? [
                  {
                    path: `/events/${event.slug}/priority-list`,
                    changefreq: "weekly" as const,
                    priority: "0.6",
                  },
                ]
              : []),
          ]),
          { path: "/news", changefreq: "weekly", priority: "0.8" },
          { path: "/resources", changefreq: "monthly", priority: "0.7" },
          { path: "/partnerships", changefreq: "monthly", priority: "0.6" },
          { path: "/partnerships/sponsorship", changefreq: "monthly", priority: "0.6" },
          { path: "/get-involved", changefreq: "monthly", priority: "0.8" },
          { path: "/donate", changefreq: "monthly", priority: "0.8" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
