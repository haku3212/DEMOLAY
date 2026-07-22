"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

export function ShareProfileButton({
  title,
  path
}: {
  title: string;
  path: string;
}) {
  const [message, setMessage] = useState("");

  async function handleShare() {
    const url = `${window.location.origin}${path}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: `Mira este perfil en Work DeMolay: ${title}`,
          url
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      setMessage("Link copiado");
    } catch {
      setMessage("No se pudo compartir");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <Share2 size={16} aria-hidden="true" />
        Compartir perfil
      </button>
      {message ? <p className="mt-2 text-center text-xs font-semibold text-slate-500">{message}</p> : null}
    </div>
  );
}
