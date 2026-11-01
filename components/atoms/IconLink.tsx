import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type IconLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
  href: string;
  label: string;
  children: ReactNode;
};

const IconLink = ({ href, label, className, children, ...props }: IconLinkProps) => (
  <Link
    aria-label={label}
    className={cn("focus-ring inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-default text-ink transition-colors hover:border-accent hover:text-accent", className)}
    href={href}
    {...props}
  >
    {children}
  </Link>
);

export default IconLink;
