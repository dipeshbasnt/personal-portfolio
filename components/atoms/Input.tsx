import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: InputProps) => (
  <input
    className={cn("focus-ring min-h-11 w-full rounded-control border border-default bg-surface px-4 py-2 text-body text-ink placeholder:text-muted aria-invalid:border-error disabled:cursor-not-allowed disabled:opacity-60", className)}
    {...props}
  />
);

export default Input;
