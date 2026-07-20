import { MapPin, Phone, Store, UserRound } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import type { DemoBusiness } from "@/lib/demo-data";
import { createBusinessSlug, defaultWhatsAppMessage } from "@/lib/directory";
import { createPhoneUrl, createWhatsAppUrl } from "@/lib/utils";

export function BusinessCard({ business }: { business: DemoBusiness }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <div className="grid size-14 shrink-0 place-items-center rounded-lg border border-yellow-300/80 bg-[#00145f] text-sm font-black text-white shadow-sm">
          {business.initials}
        </div>
        <div className="min-w-0">
          <p className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-800 dark:bg-red-500/10 dark:text-red-200">
            Ficticio
          </p>
          <h3 className="mt-2 text-lg font-black leading-tight text-slate-950 dark:text-white">
            <Link href={`/perfil/${createBusinessSlug(business.name)}`}>
              {business.name}
            </Link>
          </h3>
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
        <p className="flex items-center gap-2">
          <UserRound size={16} aria-hidden="true" />
          {business.owner}
        </p>
        <p className="flex items-center gap-2">
          <Store size={16} aria-hidden="true" />
          {business.category} - {business.specialty}
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={16} aria-hidden="true" />
          {business.city}, {business.department}
        </p>
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {business.description}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <ButtonLink href={`/perfil/${createBusinessSlug(business.name)}`} variant="secondary">
          Ver perfil
        </ButtonLink>
        <ButtonLink
          href={createWhatsAppUrl(business.whatsapp, defaultWhatsAppMessage)}
          variant="whatsapp"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </ButtonLink>
        <ButtonLink href={createPhoneUrl(business.phone)} variant="ghost" className="col-span-2 border border-slate-200 dark:border-slate-700">
          <Phone size={16} aria-hidden="true" />
          Llamar
        </ButtonLink>
      </div>
    </article>
  );
}
