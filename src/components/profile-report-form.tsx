"use client";

import { ShieldAlert } from "lucide-react";
import { useState } from "react";

export function ProfileReportForm({
  profileId,
  profileName,
  profileSlug
}: {
  profileId: string;
  profileName: string;
  profileSlug: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          profileId,
          profileName,
          profileSlug,
          reporterName: String(formData.get("reporterName") ?? ""),
          reporterContact: String(formData.get("reporterContact") ?? ""),
          reason: String(formData.get("reason") ?? "")
        })
      });

      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setStatus(result?.message ?? "No se pudo enviar el reporte.");
        return;
      }

      event.currentTarget.reset();
      setStatus("Reporte enviado. El administrador lo revisara.");
      setIsOpen(false);
    } catch {
      setStatus("No se pudo conectar con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <ShieldAlert size={16} aria-hidden="true" />
        Reportar informacion
      </button>

      {isOpen ? (
        <form onSubmit={handleSubmit} className="mt-3 grid gap-3">
          <label className="grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Tu nombre (opcional)
            <input name="reporterName" className={inputClassName} placeholder="Ej. Juan" />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Contacto (opcional)
            <input name="reporterContact" className={inputClassName} placeholder="WhatsApp o correo" />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Que esta mal?
            <textarea
              name="reason"
              required
              minLength={10}
              maxLength={1200}
              className={`${inputClassName} min-h-28 resize-y py-3`}
              placeholder="Explica si el numero esta mal, la informacion no corresponde, la foto no es adecuada, etc."
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#b11226] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#8f0d1e] disabled:pointer-events-none disabled:opacity-60"
          >
            {isSubmitting ? "Enviando..." : "Enviar reporte"}
          </button>
        </form>
      ) : null}

      {status ? <p className="mt-3 text-sm font-semibold text-[#b11226]">{status}</p> : null}
    </div>
  );
}

const inputClassName =
  "min-h-10 rounded-lg border border-stone-200 bg-[#fffdf7] px-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[#b08a2e] dark:border-stone-800 dark:bg-black dark:text-white";
