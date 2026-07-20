import { PageShell } from "@/components/page-shell";

export const metadata = {
  title: "Contacto",
  description: "Contacta al equipo de Work DeMolay."
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contacto"
      title="Hablemos de Work DeMolay"
      description="Esta pagina reunira canales de soporte, reportes y consultas generales del directorio."
    />
  );
}
