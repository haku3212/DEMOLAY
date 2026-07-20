"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/brand-mark";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Buscar", href: "/buscar" },
  { label: "Categorias", href: "/categorias" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Acceso admin", href: "/iniciar-sesion" }
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const savedTheme = window.localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function toggleTheme() {
    const nextTheme = !isDark;
    document.documentElement.classList.toggle("dark", nextTheme);
    window.localStorage.setItem("theme", nextTheme ? "dark" : "light");
    setIsDark(nextTheme);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Inicio Work DeMolay">
          <BrandMark compact />
          <span className="text-lg font-black tracking-normal text-slate-950 dark:text-white">
            Work DeMolay
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegacion principal">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid size-11 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <ButtonLink href="/admin">Panel admin</ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="grid size-11 place-items-center rounded-lg border border-slate-200 text-slate-800 md:hidden dark:border-slate-700 dark:text-slate-100"
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-slate-200 px-4 py-4 md:hidden dark:border-slate-800",
          isOpen ? "block" : "hidden"
        )}
      >
        <nav className="mx-auto grid max-w-7xl gap-2" aria-label="Navegacion movil">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 grid grid-cols-[auto_1fr] gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="grid size-11 place-items-center rounded-lg border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200"
              aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <ButtonLink href="/admin" onClick={() => setIsOpen(false)}>
              Panel admin
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
