import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  active?: boolean;
};

const NavLink = ({ href, active = false, className, children, ...props }: NavLinkProps) => (
  <Link
    aria-current={active ? "page" : undefined}
    className={cn(
      "focus-ring relative inline-flex min-h-11 items-center py-2 font-nav text-nav font-semibold transition-colors hover:text-accent",
      active ? "text-accent" : "text-ink",
      className,
    )}
    href={href}
    {...props}
  >
    {children}
    {active ? <span aria-hidden="true" className="absolute inset-x-0 bottom-1 mx-auto h-0.5 w-4 rounded-pill bg-accent" /> : null}
  </Link>
);

export default NavLink;
