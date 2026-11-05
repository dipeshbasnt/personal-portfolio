import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "dark";
type ButtonSize = "default" | "small" | "icon";

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: boolean;
  fullWidth?: boolean;
};

type LinkButtonProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonProps = LinkButtonProps | NativeButtonProps;

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white hover:bg-accent",
  secondary: "bg-accent-bright text-white hover:bg-accent-strong",
  outline: "border border-default text-ink hover:bg-surface",
  dark: "bg-ink text-white hover:bg-accent-strong",
};

const sizes: Record<ButtonSize, string> = {
  default: "min-h-12 px-4 py-3.5 text-xl sm:min-h-14 sm:px-4",
  small: "min-h-11 px-4 py-2.5 text-[length:var(--text-nav)]",
  icon: "size-11 p-0",
};

const baseStyles = "focus-ring inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors duration-200";

const Button = (props: ButtonProps) => {
  const { href, children, variant = "primary", size = "default", className, fullWidth, ...rest } = props;
  const classNames = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    className
  );

  if (href) {
    return <Link className={classNames} href={href} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</Link>;
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button className={classNames} {...buttonProps} type={buttonProps.type ?? "button"}>{children}</button>;
};

export default Button;
