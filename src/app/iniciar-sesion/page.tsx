import { Suspense } from "react";

import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata = {
  title: "Iniciar sesion",
  description: "Accede a tu cuenta de Work DeMolay."
};

export default function SignInPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-normal text-[#b11226] dark:text-red-300">
        Acceso protegido
      </p>
      <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
        Iniciar sesion de administrador
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
        Solo quien tenga la contrasena administrativa puede entrar a revisar solicitudes.
      </p>
      <Suspense fallback={<LoginFallback />}>
        <AdminLoginForm />
      </Suspense>
    </section>
  );
}

function LoginFallback() {
  return (
    <div className="mt-8 max-w-md rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-950">
      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
        Cargando acceso...
      </p>
    </div>
  );
}
