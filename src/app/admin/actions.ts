"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BusinessSubmissionStatus } from "@/types/supabase";

export async function updateSubmissionStatus(formData: FormData) {
  const cookieStore = await cookies();
  const isAdmin = await verifyAdminSessionToken(
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  );

  if (!isAdmin) {
    throw new Error("No autorizado.");
  }

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as BusinessSubmissionStatus;

  if (!id || !["approved", "rejected", "suspended"].includes(status)) {
    throw new Error("Accion invalida.");
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase no esta configurado.");
  }

  const { error } = await supabase
    .from("business_submissions")
    .update({
      status,
      reviewed_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/buscar");
  revalidatePath("/categorias");
}
