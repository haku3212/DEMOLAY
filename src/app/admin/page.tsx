import { FilePenLine, ShieldCheck, UsersRound } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { demoBusinesses } from "@/lib/demo-data";

export const metadata = {
  title: "Panel admin",
  description: "Panel administrativo de Work DeMolay."
};

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-normal text-[#9b0000] dark:text-yellow-200">
        Administracion
      </p>
      <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
        Panel de carga y mejoras
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
        En esta version inicial se muestra una vista ficticia del panel. La carga real de datos quedara protegida con Supabase Auth y permisos administrativos.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Metric icon={<UsersRound size={22} />} label="Perfiles ficticios" value={demoBusinesses.length.toString()} />
        <Metric icon={<ShieldCheck size={22} />} label="Publicacion" value="Admin" />
        <Metric icon={<FilePenLine size={22} />} label="Mejoras" value="Privadas" />
      </div>

      <div className="mt-8 rounded-xl border border-yellow-300/70 bg-white p-5 shadow-sm dark:border-yellow-300/30 dark:bg-zinc-950">
        <h2 className="text-2xl font-black text-slate-950 dark:text-white">Proxima fase</h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
          Aqui se conectaran formularios internos para crear, editar, aprobar, suspender y actualizar fichas sin exponer registro publico.
        </p>
        <ButtonLink href="/buscar" variant="secondary" className="mt-5">
          Ver directorio publico
        </ButtonLink>
      </div>
    </section>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-3 text-[#00145f] dark:text-yellow-200">
        {icon}
        <p className="text-sm font-bold uppercase tracking-normal">{label}</p>
      </div>
      <p className="mt-4 text-3xl font-black text-[#9b0000] dark:text-white">{value}</p>
    </div>
  );
}
