import Link from "next/link";

const footerLinks = [
  { label: "Terminos", href: "/terminos" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Contacto", href: "/contacto" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="text-lg font-black text-slate-950 dark:text-white">Work DeMolay</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Directorio comunitario inspirado en el ambiente DeMolay para conectar personas con profesionales, negocios y servicios confiables en Bolivia.
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
            Bolivia 2026. Todos los derechos reservados a Cortez Dev Studio.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-slate-600 dark:text-slate-300">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-950 dark:hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
