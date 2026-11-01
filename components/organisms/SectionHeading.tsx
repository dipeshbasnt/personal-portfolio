import type { ReactNode } from "react";
import Eyebrow from "@/components/atoms/Eyebrow";
import Heading from "@/components/atoms/Heading";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  children: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

const SectionHeading = ({
  eyebrow,
  children,
  description,
  align = "left",
  className,
}: SectionHeadingProps) => {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <header className={cn("flex max-w-4xl flex-col gap-3 sm:gap-4", alignment, className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading as="h2" size="large">{children}</Heading>
      {description ? (
        <p className="type-lead text-pretty">
          {description}
        </p>
      ) : null}
    </header>
  );
};

export default SectionHeading;
