import { NextResponse } from "next/server";

import { notifyProfileReport } from "@/lib/notifications";
import { createSupabaseServerClient, hasSupabaseServerConfig } from "@/lib/supabase/server";
import { profileReportSchema } from "@/lib/validations/report";

export async function POST(request: Request) {
  if (!hasSupabaseServerConfig()) {
    return NextResponse.json(
      { ok: false, message: "Supabase no esta configurado." },
      { status: 503 }
    );
  }

  const payload = (await request.json().catch(() => null)) as unknown;
  const parsed = profileReportSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Hay campos invalidos.",
        issues: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json(
      { ok: false, message: "Supabase no esta configurado." },
      { status: 503 }
    );
  }

  const { error } = await supabase.from("profile_reports").insert({
    profile_id: parsed.data.profileId,
    profile_name: parsed.data.profileName,
    profile_slug: parsed.data.profileSlug,
    reporter_name: parsed.data.reporterName || null,
    reporter_contact: parsed.data.reporterContact || null,
    reason: parsed.data.reason,
    status: "pending"
  });

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  await notifyProfileReport({
    profileName: parsed.data.profileName,
    profileSlug: parsed.data.profileSlug,
    reason: parsed.data.reason
  });

  return NextResponse.json({ ok: true });
}
