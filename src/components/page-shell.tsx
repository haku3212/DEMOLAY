import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-normal text-red-700 dark:text-red-300">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">{title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
        {description}
      </p>
      {children ? <div className="mt-8">{children}</div> : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="secondary">
          Volver al inicio
        </ButtonLink>
        <ButtonLink href="/admin">Panel admin</ButtonLink>
      </div>
    </section>
  );
}
