import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize = "display" | "hero" | "large" | "medium" | "small";
type HeadingFont = "heading" | "body";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingLevel;
  font?: HeadingFont;
  size?: HeadingSize;
};

const sizes: Record<HeadingSize, string> = {
  display: "text-display leading-display tracking-display",
  hero: "text-hero-title leading-hero-title tracking-heading",
  large: "text-heading-lg leading-heading tracking-heading",
  medium: "text-heading-md leading-heading tracking-heading",
  small: "text-heading-sm leading-tight tracking-tight",
};

const fonts: Record<HeadingFont, string> = {
  heading: "font-heading",
  body: "font-sans",
};

const Heading = ({ as: Tag = "h2", font = "heading", size = "large", className, ...props }: HeadingProps) => (
  <Tag className={cn("m-0 text-balance text-ink", fonts[font], sizes[size], className)} {...props} />
);

export default Heading;
