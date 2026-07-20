import { PageShell } from "@/components/page-shell";

export const metadata = {
  title: "Terminos",
  description: "Terminos de uso de Work DeMolay."
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terminos de uso"
      description="Work DeMolay publica informacion cargada por administracion, con autorizacion correspondiente, y no procesa pagos internos en esta primera version."
    />
  );
}
