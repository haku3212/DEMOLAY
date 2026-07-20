import { PageShell } from "@/components/page-shell";

export const metadata = {
  title: "Privacidad",
  description: "Politica de privacidad de Work DeMolay."
};

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Privacidad"
      title="Politica de privacidad"
      description="La plataforma solo debe mostrar datos autorizados para publicacion y proteger informacion sensible mediante permisos y RLS."
    />
  );
}
