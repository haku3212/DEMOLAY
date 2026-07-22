import { Clock, ExternalLink, MapPin, Phone, Share2, ShieldAlert } from "lucide-react";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button";
import { defaultWhatsAppMessage, findBusinessBySlug } from "@/lib/directory";
import { createPhoneUrl, createWhatsAppUrl } from "@/lib/utils";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProfilePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProfilePageProps) {
  const { slug } = await params;
  const business = await findBusinessBySlug(slug);

  return {
    title: business ? business.name : "Perfil",
    description: business?.description ?? "Perfil publico de Work DeMolay."
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;
  const business = await findBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="inline-flex rounded-full border border-[#b08a2e]/40 bg-[#fffdf7] px-3 py-1 text-sm font-bold text-[#b11226] dark:bg-red-500/10 dark:text-red-200">
        {business.isFictional ? "Perfil ficticio" : "Perfil publicado"}
      </p>
      <div className="mt-5 grid gap-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[auto_1fr] dark:border-slate-800 dark:bg-slate-900">
        {business.imageUrl ? (
          <Image
            src={business.imageUrl}
            alt={`Foto de ${business.name}`}
            width={96}
            height={96}
            className="size-24 rounded-xl border-2 border-black object-cover dark:border-stone-200"
          />
        ) : (
          <div className="grid size-24 place-items-center rounded-xl border-2 border-black bg-white text-2xl font-black text-[#b11226] dark:border-stone-200">
            {business.initials}
          </div>
        )}
        <div>
          <h1 className="text-4xl font-black text-slate-950 dark:text-white">{business.name}</h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">{business.owner}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {business.category}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {business.specialty}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <article className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">Informacion publica</h2>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{business.description}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Info icon={<MapPin size={18} />} label="Ubicacion" value={`${business.city}, ${business.department}`} />
            <Info icon={<Clock size={18} />} label="Horarios" value="Lunes a sabado, horario comercial" />
            <Info icon={<Phone size={18} />} label="Telefono" value={business.phone} />
            <Info icon={<ExternalLink size={18} />} label="Servicios" value="Consulta, atencion y presupuesto segun solicitud" />
          </div>
        </article>

        <aside className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Contacto directo</h2>
          <div className="mt-5 grid gap-3">
            <ButtonLink
              href={createWhatsAppUrl(business.whatsapp, defaultWhatsAppMessage)}
              variant="whatsapp"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </ButtonLink>
            <ButtonLink href={createPhoneUrl(business.phone)} variant="secondary">
              <Phone size={16} aria-hidden="true" />
              Llamar
            </ButtonLink>
            <ButtonLink href={`/perfil/${slug}`} variant="ghost" className="border border-slate-200 dark:border-slate-700">
              <Share2 size={16} aria-hidden="true" />
              Compartir
            </ButtonLink>
            <ButtonLink href="/contacto" variant="ghost" className="border border-slate-200 dark:border-slate-700">
              <ShieldAlert size={16} aria-hidden="true" />
              Reportar informacion
            </ButtonLink>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-950">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
        {icon}
        {label}
      </div>
      <p className="mt-2 font-semibold text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}
