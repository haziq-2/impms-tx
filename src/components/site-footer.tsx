import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";
import { navLinks } from "./site-header";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 bg-primary text-primary-foreground md:mt-20 lg:mt-24">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 md:gap-12 md:py-16 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            A nonprofit institute advancing understanding of the scientific and cultural
            contributions of the Islamic world, and inspiring the innovators of tomorrow.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gold">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-primary-foreground/75 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://www.impmstx.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/75 transition-colors hover:text-gold"
              >
                Old Website
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gold">Get Involved</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: "/get-involved", label: "Membership" },
              { to: "/donate", label: "Donate" },
              { to: "/programs", label: "STEM Programs" },
              { to: "/contact", label: "Contact Us" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-primary-foreground/75 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <address className="not-italic">
                501 Pink Muhly Trail
                <br />
                Wylie, Texas 75098
              </address>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href="tel:+14692095990" className="hover:text-gold">(469) 209-5990</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href="mailto:info@impmstx.org" className="hover:text-gold">info@impmstx.org</a>
            </li>
          </ul>
          <SocialLinks className="mt-5" />
          <p className="mt-5 text-xs text-primary-foreground/60">
            IMPMS is a registered 501(c)(3) tax-exempt nonprofit organization (Tax ID 20-4962180).
          </p>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© {year} Institute of Medieval and Post-Medieval Studies. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-gold">Privacy</Link>
            <Link to="/contact" className="hover:text-gold">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
