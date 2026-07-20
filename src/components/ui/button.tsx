import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost" | "whatsapp";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants[variant], className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  children: ReactNode;
  variant?: ButtonProps["variant"];
};

export function ButtonLink({
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return <Link className={cn(buttonVariants[variant], className)} {...props} />;
}

const baseButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60";

const buttonVariants = {
  primary: cn(
    baseButton,
    "bg-[#9b0000] text-white shadow-sm hover:bg-[#7d0000] focus-visible:outline-[#9b0000] dark:bg-red-700 dark:text-white dark:hover:bg-red-600"
  ),
  secondary: cn(
    baseButton,
    "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus-visible:outline-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800"
  ),
  ghost: cn(
    baseButton,
    "text-slate-700 hover:bg-slate-100 focus-visible:outline-slate-500 dark:text-slate-200 dark:hover:bg-slate-800"
  ),
  whatsapp: cn(
    baseButton,
    "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline-emerald-600"
  )
};
