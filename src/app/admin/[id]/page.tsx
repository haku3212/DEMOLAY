import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Phone,
  ShieldCheck,
  Store,
  UserRound
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { AdminDeleteForm } from "@/components/admin-delete-form";
import { AdminStatusForm } from "@/components/admin-status-form";
import { ButtonLink } from "@/components/ui/button";
import { createSupabaseServerClient, hasSupabaseServerConfig } from "@/lib/supabase/server";
import type { BusinessSubmission } from "@/types/supabase";

export const metadata = {
  title: "Revisar solicitud",
  description: "Revision administrativa de una solicitud en Work DeMolay."
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

type AdminSubmissionPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminSubmissionPage({ params }: AdminSubmissionPageProps) {
  const { id } = await params;
  const submission = await getSubmission(id);

  if (!submission) {
    notFound();
  }

  const visibleWhenApproved = submission.department === "Beni";

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <ButtonLink href="/admin" variant="ghost" className="border border-slate-200 dark:border-slate-700">
        <ArrowLeft size={16} aria-hidden="true" />
        Volver al panel
      </ButtonLink>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-[#b11226] dark:text-red-300">
            Revision de solicitud
          </p>
          <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
            {submission.business_name}
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
            Revisa que el contenido sea correcto antes de publicarlo.
          </p>
        </div>
        <span className="w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-black uppercase tracking-normal text-[#b11226]">
          {submission.status}
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-zinc-950">
          <div className="grid aspect-square place-items-center overflow-hidden rounded-xl border border-stone-200 bg-[#fffdf7] dark:border-stone-800 dark:bg-black">
            {submission.image_url ? (
              <Image
                src={submission.image_url}
                alt={`Foto enviada para ${submission.business_name}`}
                width={320}
                height={320}
                className="h-full w-full object-cover"
              />
            ) : (
              <Store className="text-[#b11226]" size={64} aria-hidden="true" />
            )}
          </div>

          <div className="mt-5 grid gap-2">
            <AdminStatusForm id={submission.id} status="approved" label="Aprobar y publicar" />
            <AdminStatusForm id={submission.id} status="rejected" label="Rechazar" variant="secondary" />
            <AdminStatusForm id={submission.id} status="suspended" label="Ocultar" variant="ghost" />
            <AdminDeleteForm id={submission.id} />
          </div>

          {!visibleWhenApproved ? (
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">
              Esta solicitud no es del Beni. Si la apruebas, quedara aprobada, pero no saldra en el directorio piloto actual.
            </p>
          ) : null}
        </aside>

        <div className="grid gap-5">
          <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-zinc-950">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">Datos enviados</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Info icon={<UserRound size={18} />} label="Hermano / solicitante" value={submission.owner_name} />
              <Info icon={<Store size={18} />} label="Negocio o profesion" value={submission.business_name} />
              <Info icon={<ShieldCheck size={18} />} label="Categoria" value={submission.category} />
              <Info icon={<CheckCircle2 size={18} />} label="Especialidad" value={submission.specialty} />
              <Info icon={<MapPin size={18} />} label="Ubicacion" value={`${submission.city}, ${submission.department}`} />
              <Info icon={<CalendarDays size={18} />} label="Enviado" value={formatDate(submission.created_at)} />
              <Info icon={<Phone size={18} />} label="Telefono" value={submission.phone} />
              <Info icon={<Phone size={18} />} label="WhatsApp" value={submission.whatsapp} />
            </div>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-zinc-950">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">Descripcion publica</h2>
            <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-600 dark:text-slate-300">
              {submission.description}
            </p>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-zinc-950">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">Checklist antes de aprobar</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-700 dark:text-slate-200">
              <CheckItem text="El nombre y negocio se leen bien." />
              <CheckItem text="El telefono y WhatsApp parecen correctos." />
              <CheckItem text="La descripcion no tiene contenido ofensivo o datos delicados innecesarios." />
              <CheckItem text="La foto es apropiada para publicarse." />
              <CheckItem text="Para salir en esta version, la ubicacion debe ser Beni." />
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Autorizacion de publicacion: {submission.publish_authorization ? "Si" : "No"}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}

async function getSubmission(id: string) {
  if (!hasSupabaseServerConfig()) {
    return null;
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("business_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as BusinessSubmission;
}

function Info({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-stone-200 bg-[#fffdf7] p-4 dark:border-stone-800 dark:bg-black">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
        {icon}
        {label}
      </div>
      <p className="mt-2 break-words font-semibold text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <p className="flex gap-2">
      <CheckCircle2 className="mt-0.5 shrink-0 text-[#b11226]" size={18} aria-hidden="true" />
      {text}
    </p>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-BO", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/La_Paz"
  }).format(new Date(value));
}
