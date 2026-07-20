import { PageShell } from "@/components/page-shell";

export const metadata = {
  title: "Registro publico desactivado",
  description: "Work DeMolay no permite registro publico de negocios en esta version."
};

export default function RegisterPage() {
  return (
    <PageShell
      eyebrow="Acceso controlado"
      title="Registro publico desactivado"
      description="Los perfiles se cargan y mejoran solamente desde administracion. Esta pagina queda como aviso para evitar formularios publicos."
    />
  );
}
