import { Youtube, Facebook, Instagram, Linkedin } from "lucide-react";

// Inline SVGs for brands not in lucide
function TikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.3 2.1 1.6 3.8 3.7 4.1v2.6c-1.3.1-2.6-.3-3.7-1v6.6a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.7a3 3 0 1 0 2.1 2.9V3h2.7z" />
    </svg>
  );
}

function WhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.5-5.9c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5.3-.5v-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.6 1.1 2.7a10 10 0 0 0 3.8 3.3c1.9.8 1.9.5 2.3.5a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1 0-.2-.1-.4-.2z" />
    </svg>
  );
}

const socials = [
  { name: "YouTube", href: "https://www.youtube.com/@IMPMSTX", Icon: Youtube },
  { name: "Facebook", href: "https://www.facebook.com/IMPMS", Icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/impmsteam/", Icon: Instagram },
  { name: "TikTok", href: "https://tiktok.com", Icon: TikTok },
  { name: "WhatsApp", href: "https://whatsapp.com", Icon: WhatsApp },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/impms", Icon: Linkedin },
];

export function SocialLinks({ className = "", variant = "footer" }: { className?: string; variant?: "footer" | "header" }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {socials.map(({ name, href, Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className={
              variant === "footer"
                ? "flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/80 transition-colors hover:border-gold hover:text-gold"
                : variant === "header"
                  ? "flex h-9 w-9 items-center justify-center rounded-full text-primary-foreground/90 transition-colors hover:text-gold"
                  : "flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            }
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
