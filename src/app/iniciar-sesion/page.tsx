import { PageShell } from "@/components/page-shell";

export const metadata = {
  title: "Iniciar sesion",
  description: "Accede a tu cuenta de Work DeMolay."
};

export default function SignInPage() {
  return (
    <PageShell
      eyebrow="Acceso"
      title="Iniciar sesion"
      description="La autenticacion con Supabase se conectara en la Fase 4 para que solo administradores autorizados gestionen los datos."
    />
  );
}
