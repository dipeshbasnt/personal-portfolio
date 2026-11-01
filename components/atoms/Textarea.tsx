import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea
    className={cn("focus-ring min-h-32 w-full resize-y rounded-control border border-default bg-surface px-4 py-3 text-body text-ink placeholder:text-muted aria-invalid:border-error disabled:cursor-not-allowed disabled:opacity-60", className)}
    {...props}
  />
);

export default Textarea;
