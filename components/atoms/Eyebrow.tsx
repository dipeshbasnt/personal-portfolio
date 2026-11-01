import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = HTMLAttributes<HTMLParagraphElement>;

const Eyebrow = ({ className, ...props }: EyebrowProps) => (
  <p className={cn("m-0 text-eyebrow font-bold uppercase tracking-wider text-accent", className)} {...props} />
);

export default Eyebrow;
