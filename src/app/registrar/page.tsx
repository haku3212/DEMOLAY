import { RegistrationForm } from "@/components/registration-form";

export const metadata = {
  title: "Agregar negocio",
  description: "Envia tu negocio, profesion u oficio para revision en Work DeMolay."
};

export default function RegisterPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-normal text-[#b11226] dark:text-red-300">
        Solicitud de publicacion
      </p>
      <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
        Agrega tu negocio o profesion
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
        Completa tus datos y sube una foto de perfil o logo. La solicitud queda pendiente para revision antes de aparecer en el directorio.
      </p>
      <div className="mt-8">
        <RegistrationForm />
      </div>
    </section>
  );
}
