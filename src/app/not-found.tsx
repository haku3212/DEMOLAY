import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 py-16 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-normal text-[#b11226] dark:text-red-300">
          Pagina no encontrada
        </p>
        <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
          No encontramos esa direccion
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Puede que el perfil aun no este aprobado o que la URL haya cambiado.
        </p>
        <ButtonLink href="/" className="mt-6">
          Volver al inicio
        </ButtonLink>
      </div>
    </section>
  );
}
