"use client";

import { deleteSubmission } from "@/app/admin/actions";

export function AdminDeleteForm({ id }: { id: string }) {
  return (
    <form
      action={deleteSubmission}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          "Esta accion elimina definitivamente la solicitud. No se podra recuperar. Deseas continuar?"
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-[#b11226] transition hover:bg-red-100 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
      >
        Eliminar definitivamente
      </button>
    </form>
  );
}
