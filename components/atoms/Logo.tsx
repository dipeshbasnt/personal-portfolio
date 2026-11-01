import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  href: string;
  label: string;
  monogram: ReactNode;
  children: ReactNode;
  compact?: boolean;
  variant?: "wordmark" | "badge";
  className?: string;
};

const Logo = ({ href, label, monogram, children, compact = false, variant = "wordmark", className }: LogoProps) => (
  <Link aria-label={label} className={cn("focus-ring inline-flex min-h-11 items-center gap-5", className)} href={href}>
    <span className={cn(
      "grid shrink-0 place-items-center font-heading font-extrabold tracking-tight",
      variant === "badge" ? "size-10 rounded-md bg-accent-bright text-base text-white" : "text-2xl text-ink",
    )}>
      {monogram}
    </span>
    {!compact ? (
      <>
        <span aria-hidden="true" className="hidden h-6 w-px bg-border-subtle sm:block" />
        <span className="text-base font-semibold tracking-tight text-ink sm:text-2xl">{children}</span>
      </>
    ) : null}
  </Link>
);

export default Logo;
