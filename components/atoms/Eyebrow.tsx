import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = HTMLAttributes<HTMLParagraphElement>;

const Eyebrow = ({ className, ...props }: EyebrowProps) => (
  <p className={cn("type-label m-0", className)} {...props} />
);

export default Eyebrow;
