import { Link } from "@tanstack/react-router";
import impmsFooterLogo from "@/assets/impms-footer-logo.png";
import impmsHomeLogo from "@/assets/impms-home-logo.png";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex max-w-[min(100%,14rem)] shrink-0 items-center sm:max-w-none" aria-label="IMPMS home">
      <img
        src={light ? impmsFooterLogo : impmsHomeLogo}
        alt="Institute for Medieval and Post Medieval Studies (IMPMS) logo"
        width={592}
        height={421}
        className={
          light
            ? "h-12 w-auto max-h-14 rounded-lg bg-white p-1 sm:h-14"
            : "h-9 w-auto sm:h-11 md:h-12"
        }
      />
    </Link>
  );
}
