import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { BusinessCard } from "@/components/business-card";
import { SearchPanel } from "@/components/search-panel";
import { ButtonLink } from "@/components/ui/button";
import {
  brotherhoodQuotes,
  demoBusinesses,
  featuredCategories,
  howItWorks
} from "@/lib/demo-data";

export default function Home() {
  return (
    <>
      <section className="border-b border-red-950/10 bg-white dark:border-red-500/20 dark:bg-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-yellow-300/70 bg-white px-3 py-1 text-sm font-bold text-[#00145f] shadow-sm dark:border-yellow-300/30 dark:bg-white/5 dark:text-yellow-200">
              <ShieldCheck size={16} aria-hidden="true" />
              Directorio fraterno DeMolay en Bolivia
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              Encuentra profesionales, negocios y emprendimientos cerca de ti
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Work DeMolay conecta a la comunidad con perfiles curados por administracion, para que la hermandad tambien sea apoyo, resiliencia y servicio en la vida diaria.
            </p>
            <blockquote className="mt-5 max-w-2xl border-l-4 border-yellow-300 pl-4 text-base font-semibold leading-7 text-[#00145f] dark:text-yellow-100">
              Un hermano DeMolay nunca camina solo.
            </blockquote>

            <div className="mt-8">
              <SearchPanel />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/buscar">
                Ver directorio
                <ArrowRight size={18} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/admin" variant="secondary">
                Acceso administrativo
              </ButtonLink>
            </div>
          </div>

          <div className="grid content-center gap-4">
            <div className="rounded-xl border border-yellow-300/70 bg-white p-5 shadow-xl shadow-red-950/10 dark:border-yellow-300/30 dark:bg-zinc-950 dark:shadow-black/30">
              <div className="mb-5 rounded-lg border border-yellow-300/70 bg-[linear-gradient(135deg,#00145f_0%,#00145f_44%,#9b0000_45%,#9b0000_100%)] p-5 text-white">
                <div className="flex items-center gap-4">
                  <BrandMark className="size-20 shrink-0" />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-normal text-yellow-200">
                      Work DeMolay
                    </p>
                    <p className="mt-1 text-2xl font-black">Directorio de hermanos y servicios</p>
                    <p className="mt-3 text-sm leading-6 text-white/80">
                      La fraternidad no se hereda; se construye con respeto y confianza.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["9", "perfiles ficticios"],
                  ["9", "departamentos listos"],
                  ["Admin", "carga controlada"]
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-slate-100 bg-white p-4 dark:border-zinc-800 dark:bg-black">
                    <p className="text-3xl font-black text-[#00145f] dark:text-yellow-200">{value}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-yellow-300/50 bg-black p-5 text-white">
                <div className="flex items-center gap-3">
                  <Sparkles size={24} className="text-yellow-300" aria-hidden="true" />
                  <p className="text-lg font-black">Servicio, confianza y fraternidad</p>
                </div>
                <p className="mt-3 text-sm leading-6 opacity-80">
                  Perfiles organizados para encontrar apoyo profesional dentro de la comunidad, en las victorias y tambien en las dificultades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-yellow-300/40 bg-black py-10 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-normal text-yellow-200">
            Hermandad y resiliencia
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {brotherhoodQuotes.map((quote) => (
              <blockquote
                key={quote}
                className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm font-semibold leading-6 text-white/90"
              >
                {quote}
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-normal text-red-700 dark:text-red-300">
                Categorias destacadas
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                Encuentra por oficio, rubro o servicio
              </h2>
            </div>
            <ButtonLink href="/categorias" variant="secondary">
              Ver todas
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <a
                  key={category.slug}
                  href={`/categoria/${category.slug}`}
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-yellow-300/50 dark:hover:bg-slate-900"
                >
                  <div className="grid size-11 place-items-center rounded-lg border border-yellow-300/70 bg-[#00145f] text-yellow-200">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-slate-950 dark:text-white">{category.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{category.description}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-normal text-red-700 dark:text-red-300">
                Datos ficticios
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                Perfiles recientes
              </h2>
            </div>
            <ButtonLink href="/buscar" variant="secondary">
              Buscar mas
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {demoBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-white py-12 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-normal text-red-700 dark:text-red-300">
              Como funciona
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
              Simple para quien busca y seguro para quien publica
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {howItWorks.map((step, index) => (
              <div key={step.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="grid size-10 place-items-center rounded-lg border border-yellow-300/70 bg-[#00145f] text-sm font-black text-yellow-200">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-950 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-red-900/30 bg-black p-6 text-white md:flex md:items-center md:justify-between md:gap-6 dark:border-red-500/30">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={22} aria-hidden="true" />
                <h3 className="text-xl font-black">La informacion se carga y revisa desde administracion</h3>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-6 opacity-80">
                Asi el directorio se mantiene ordenado, confiable y sin formularios publicos para cargar datos.
              </p>
            </div>
            <ButtonLink href="/admin" className="mt-5 md:mt-0">
              Ir al panel
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
