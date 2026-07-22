import { FilePenLine, ShieldCheck, UsersRound } from "lucide-react";

import { AdminLogoutButton } from "@/components/admin-logout-button";
import { LocalSubmissionsPanel } from "@/components/local-submissions-panel";
import { ButtonLink } from "@/components/ui/button";
import { demoBusinesses } from "@/lib/demo-data";
import { createSupabaseServerClient, hasSupabaseServerConfig } from "@/lib/supabase/server";
import type { BusinessSubmission } from "@/types/supabase";

export const metadata = {
  title: "Panel admin",
  description: "Panel administrativo de Work DeMolay."
};

export default async function AdminPage() {
  const submissions = await getSubmissions();
  const pendingCount = submissions.filter((submission) => submission.status === "pending").length;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-[#b11226] dark:text-stone-100">
            Administracion
          </p>
          <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
            Panel de solicitudes
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Este panel esta protegido por contrasena administrativa. Desde aqui puedes revisar las solicitudes recibidas.
          </p>
        </div>
        <AdminLogoutButton />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Metric icon={<UsersRound size={22} />} label="Perfiles ficticios" value={demoBusinesses.length.toString()} />
        <Metric icon={<ShieldCheck size={22} />} label="Solicitudes" value={submissions.length.toString()} />
        <Metric icon={<FilePenLine size={22} />} label="Mejoras" value="Privadas" />
      </div>

      <div className="mt-8 rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">
              Solicitudes pendientes
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Pendientes: {pendingCount}. Con Supabase conectado, aqui apareceran los envios reales del formulario.
            </p>
          </div>
          <ButtonLink href="/registrar" variant="secondary">
            Probar formulario
          </ButtonLink>
        </div>

        {hasSupabaseServerConfig() ? (
          <div className="mt-5 grid gap-3">
            {submissions.length > 0 ? (
              submissions.map((submission) => (
                <article
                  key={submission.id}
                  className="rounded-lg border border-stone-200 bg-[#fffdf7] p-4 dark:border-stone-800 dark:bg-black"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-black text-slate-950 dark:text-white">
                        {submission.business_name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {submission.owner_name} - {submission.category} - {submission.city},{" "}
                        {submission.department}
                      </p>
                    </div>
                    <span className="w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-black uppercase tracking-normal text-[#b11226]">
                      {submission.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {submission.description}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    WhatsApp: {submission.whatsapp} / Telefono: {submission.phone}
                  </p>
                </article>
              ))
            ) : (
              <p className="rounded-lg border border-dashed border-stone-300 p-5 text-center text-slate-600 dark:border-stone-700 dark:text-slate-300">
                Todavia no hay solicitudes en Supabase.
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="mt-5 rounded-lg border border-dashed border-[#b08a2e]/60 bg-[#fffdf7] p-5 dark:bg-black">
              <h3 className="font-black text-slate-950 dark:text-white">
                Falta conectar Supabase
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Agrega `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y
                `SUPABASE_SERVICE_ROLE_KEY` en Vercel para guardar y revisar solicitudes reales.
              </p>
            </div>
            <LocalSubmissionsPanel />
          </>
        )}
      </div>

      <div className="mt-8 rounded-xl border border-[#b08a2e]/50 bg-white p-5 shadow-sm dark:border-[#b08a2e]/30 dark:bg-zinc-950">
        <h2 className="text-2xl font-black text-slate-950 dark:text-white">Siguiente mejora</h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
          El siguiente paso es agregar botones para aprobar, rechazar y publicar automaticamente cada solicitud como perfil visible.
        </p>
        <ButtonLink href="/buscar" variant="secondary" className="mt-5">
          Ver directorio publico
        </ButtonLink>
      </div>
    </section>
  );
}

async function getSubmissions(): Promise<BusinessSubmission[]> {
  if (!hasSupabaseServerConfig()) {
    return [];
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("business_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error || !data) {
    return [];
  }

  return data as BusinessSubmission[];
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-3 text-[#b11226] dark:text-stone-100">
        {icon}
        <p className="text-sm font-bold uppercase tracking-normal">{label}</p>
      </div>
      <p className="mt-4 text-3xl font-black text-black dark:text-white">{value}</p>
    </div>
  );
}
