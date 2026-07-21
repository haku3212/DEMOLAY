"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);
    await fetch("/api/auth/admin-logout", { method: "POST" });
    router.push("/iniciar-sesion");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-stone-50 disabled:opacity-60 dark:border-stone-800 dark:bg-black dark:text-white"
    >
      <LogOut size={16} aria-hidden="true" />
      Salir
    </button>
  );
}
