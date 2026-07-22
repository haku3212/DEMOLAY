"use client";

import { LockKeyhole } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        setError(data.message ?? "No se pudo iniciar sesion.");
        return;
      }

      router.push(searchParams.get("next") ?? "/admin");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-md rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-950"
    >
      <div className="grid size-12 place-items-center rounded-lg border border-black bg-white text-[#b11226] dark:border-stone-200">
        <LockKeyhole size={22} aria-hidden="true" />
      </div>
      <label className="mt-5 grid gap-2 text-sm font-bold text-slate-950 dark:text-white">
        Contrasena de administrador
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="min-h-11 rounded-lg border border-stone-200 bg-[#fffdf7] px-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[#b08a2e] dark:border-stone-800 dark:bg-black dark:text-white"
          placeholder="Escribe la contrasena"
        />
      </label>
      {error ? <p className="mt-3 text-sm font-semibold text-[#b11226]">{error}</p> : null}
      <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Ingresando..." : "Entrar al panel"}
      </Button>
    </form>
  );
}
