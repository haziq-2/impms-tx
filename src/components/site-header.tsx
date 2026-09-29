import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Mail, Menu } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { SocialLinks } from "./social-links";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/board-of-directors", label: "Board" },
  { to: "/programs", label: "Programs" },
  { to: "/scientists", label: "Scholars" },
  { to: "/events", label: "Events" },
  { to: "/news", label: "News" },
  { to: "/resources", label: "Resources" },
  { to: "/partnerships", label: "Partners" },
] as const;

const mobileNavLinks = [
  ...navLinks,
  { to: "/get-involved", label: "Join" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="hidden border-b border-border/40 bg-primary text-primary-foreground sm:block">
        <div className="container-page flex min-h-9 flex-wrap items-center justify-between gap-2 py-1 text-xs">
          <div className="flex items-center gap-4">
            <a href="mailto:info@impmstx.org" className="flex items-center gap-1.5 transition-colors hover:text-gold">
              <Mail className="h-3.5 w-3.5 shrink-0" /> info@impmstx.org
            </a>
          </div>
          <SocialLinks variant="header" className="flex-wrap justify-end" />
        </div>
      </div>

      {/* Main nav */}
      <header className="border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="container-page flex min-h-14 items-center justify-between gap-3 py-2">
          <Logo />

          <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Primary">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-2.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground xl:px-3"
                activeProps={{ className: "text-foreground bg-accent" }}
                activeOptions={l.to === "/" ? { exact: true } : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link to="/get-involved">Join</Link>
            </Button>
            <Button asChild className="hidden sm:inline-flex bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/donate">
                <Heart className="h-4 w-4" /> Donate
              </Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-full max-w-[min(100vw,20rem)] flex-col p-0">
                <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-14">
                  <nav className="flex flex-col gap-1" aria-label="Mobile">
                    {mobileNavLinks.map((l) => (
                      <SheetClose asChild key={l.to}>
                        <Link
                          to={l.to}
                          className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:bg-accent"
                          activeProps={{ className: "text-foreground bg-accent" }}
                          activeOptions={l.to === "/" ? { exact: true } : undefined}
                        >
                          {l.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
                    <SheetClose asChild>
                      <Button asChild className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                        <Link to="/donate">
                          <Heart className="h-4 w-4" /> Donate
                        </Link>
                      </Button>
                    </SheetClose>
                    <a
                      href="mailto:info@impmstx.org"
                      className="flex items-center justify-center gap-2 rounded-md px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Mail className="h-4 w-4 shrink-0" />
                      info@impmstx.org
                    </a>
                    <SocialLinks className="justify-center pt-1" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
}
