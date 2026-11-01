import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TagProps = HTMLAttributes<HTMLSpanElement>;

const Tag = ({ className, ...props }: TagProps) => (
  <span
    className={cn("inline-flex min-h-8 items-center rounded-pill border border-border-subtle bg-surface px-3 py-1 text-xs font-medium leading-5 text-ink", className)}
    {...props}
  />
);

export default Tag;
