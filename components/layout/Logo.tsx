import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  variant?: "horizontal" | "isotipo";
  className?: string;
  showText?: boolean;
};

export function Logo({ variant = "horizontal", className, showText = true }: LogoProps) {
  const isoSize = 28;
  const textSize =
    variant === "horizontal" ? "text-[15px]" : "text-[13px]";

  return (
    <Link
      href="/"
      aria-label="DeskHUB — ir al inicio"
      className={cn(
        "group inline-flex items-center gap-2 text-ink",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="relative inline-block"
        style={{ width: isoSize, height: isoSize }}
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-full w-full"
        >
          <rect
            x="6"
            y="6"
            width="52"
            height="52"
            rx="12"
            fill="currentColor"
            style={{ color: "var(--color-primary-700)" }}
          />
          <line
            x1="32"
            y1="10"
            x2="32"
            y2="54"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ color: "var(--color-accent-300)" }}
          />
          <circle cx="20" cy="32" r="3.5" fill="var(--color-primary-200)" />
          <circle cx="44" cy="32" r="3.5" fill="var(--color-primary-200)" />
        </svg>
      </span>
      {showText && (
        <span
          className={cn(
            "font-semibold tracking-tight",
            textSize,
          )}
        >
          Desk<span className="text-secondary">HUB</span>
        </span>
      )}
    </Link>
  );
}