import { MapPin, Phone, Store, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import {
  createBusinessSlug,
  defaultWhatsAppMessage,
  type DirectoryBusiness
} from "@/lib/directory";
import { createPhoneUrl, createWhatsAppUrl } from "@/lib/utils";

export function BusinessCard({ business }: { business: DirectoryBusiness }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#b08a2e]/70 hover:shadow-md dark:border-stone-800 dark:bg-stone-950">
      <div className="flex items-start gap-3">
        {business.imageUrl ? (
          <Image
            src={business.imageUrl}
            alt={`Foto de ${business.name}`}
            width={56}
            height={56}
            className="size-14 shrink-0 rounded-lg border-2 border-black object-cover shadow-sm dark:border-stone-200"
          />
        ) : (
          <div className="grid size-14 shrink-0 place-items-center rounded-lg border-2 border-black bg-white text-sm font-black text-[#b11226] shadow-sm dark:border-stone-200">
            {business.initials}
          </div>
        )}
        <div className="min-w-0">
          <p className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-800 dark:bg-red-500/10 dark:text-red-200">
            {business.isFictional ? "Ficticio" : "Publicado"}
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
