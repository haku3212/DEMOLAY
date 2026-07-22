import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { BusinessCard } from "@/components/business-card";
import { SearchPanel } from "@/components/search-panel";
import { ButtonLink } from "@/components/ui/button";
import {
  featuredCategories,
  howItWorks
} from "@/lib/demo-data";
import { getPublishedBusinesses } from "@/lib/directory";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const businesses = await getPublishedBusinesses();

  return (
    <>
      <section className="border-b border-stone-200 bg-[#fffdf7] dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[#b08a2e]/50 bg-white px-3 py-1 text-sm font-bold text-[#b11226] shadow-sm dark:border-[#b08a2e]/40 dark:bg-white/5 dark:text-stone-100">
              <ShieldCheck size={16} aria-hidden="true" />
              Directorio fraterno DeMolay en Bolivia
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              Encuentra profesionales, negocios y emprendimientos cerca de ti
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Work DeMolay conecta a la comunidad con negocios, profesiones y servicios publicados para contactar directo por WhatsApp o llamada.
            </p>

            <div className="mt-8">
              <SearchPanel />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/buscar">
                Ver directorio
                <ArrowRight size={18} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/registrar" variant="secondary">
                Agregar mi negocio
              </ButtonLink>
            </div>
          </div>

          <div className="grid content-center gap-4">
            <div className="rounded-xl border border-stone-300 bg-white p-5 shadow-xl shadow-stone-900/10 dark:border-stone-800 dark:bg-stone-950 dark:shadow-black/30">
              <div className="mb-5 rounded-lg border border-[#b08a2e]/50 bg-[linear-gradient(135deg,#111111_0%,#111111_56%,#b11226_57%,#b11226_100%)] p-5 text-white">
                <div className="flex items-center gap-4">
                  <BrandMark className="size-20 shrink-0" />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-normal text-[#d2b15f]">
                      Work DeMolay
                    </p>
                    <p className="mt-1 text-2xl font-black">Directorio de hermanos y servicios</p>
                    <p className="mt-3 text-sm leading-6 text-white/80">
                      Registra negocios, profesiones, oficios y emprendimientos con contacto directo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  [businesses.length.toString(), "perfiles visibles"],
                  ["Beni", "departamento piloto"],
                  ["Revision", "antes de publicar"]
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-stone-200 bg-[#fffdf7] p-4 dark:border-stone-800 dark:bg-black">
                    <p className="text-3xl font-black text-[#b11226] dark:text-stone-100">{value}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-[#b08a2e]/50 bg-[#111111] p-5 text-white">
                <div className="flex items-center gap-3">
                  <Sparkles size={24} className="text-[#d2b15f]" aria-hidden="true" />
                  <p className="text-lg font-black">Servicios, contactos y oportunidades</p>
                </div>
                <p className="mt-3 text-sm leading-6 opacity-80">
                  Perfiles organizados para encontrar servicios y compartir informacion de contacto clara.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-normal text-[#b11226] dark:text-red-300">
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
                  className="rounded-xl border border-stone-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#b08a2e] hover:shadow-md dark:border-stone-800 dark:bg-stone-950 dark:hover:border-[#b08a2e]/60 dark:hover:bg-stone-900"
                >
                  <div className="grid size-11 place-items-center rounded-lg border border-black bg-white text-[#b11226] dark:border-stone-200">
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
              <p className="text-sm font-bold uppercase tracking-normal text-[#b11226] dark:text-red-300">
                Directorio del Beni
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                Perfiles recientes aprobados
              </h2>
            </div>
            <ButtonLink href="/buscar" variant="secondary">
              Buscar mas
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-white py-12 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-normal text-[#b11226] dark:text-red-300">
              Como funciona
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
              Simple para quien busca y seguro para quien publica
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {howItWorks.map((step, index) => (
              <div key={step.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="grid size-10 place-items-center rounded-lg border border-black bg-white text-sm font-black text-[#b11226] dark:border-stone-200">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-950 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-[#b08a2e]/40 bg-[#111111] p-6 text-white md:flex md:items-center md:justify-between md:gap-6 dark:border-[#b08a2e]/30">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={22} aria-hidden="true" />
                <h3 className="text-xl font-black">Los hermanos pueden enviar sus datos para revision</h3>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-6 opacity-80">
                Cada solicitud queda lista para revision antes de publicarse como perfil del directorio.
              </p>
            </div>
            <ButtonLink href="/registrar" className="mt-5 md:mt-0">
              Agregar negocio
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
