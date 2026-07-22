import { createClient } from "@supabase/supabase-js";

export function hasSupabaseServerConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  );
}

export function getSupabaseServerDiagnostics() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";
  let host = "sin URL";
  let validUrl = false;

  try {
    const parsedUrl = new URL(supabaseUrl);
    host = parsedUrl.host;
    validUrl = parsedUrl.protocol === "https:";
  } catch {
    host = "URL invalida";
  }

  return {
    hasUrl: Boolean(supabaseUrl),
    validUrl,
    host,
    hasServiceRoleKey: Boolean(supabaseServiceRoleKey),
    serviceRoleKeyStart: supabaseServiceRoleKey.slice(0, 9)
  };
}

export function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false
    }
  });
}
