import { NextResponse } from "next/server";

import { createSupabaseServerClient, hasSupabaseServerConfig } from "@/lib/supabase/server";
import {
  ALLOWED_PROFILE_IMAGE_TYPES,
  MAX_PROFILE_IMAGE_SIZE,
  submissionSchema
} from "@/lib/validations/submission";
import type { BusinessSubmissionInsert } from "@/types/supabase";

export async function POST(request: Request) {
  if (!hasSupabaseServerConfig()) {
    return NextResponse.json(
      {
        ok: false,
        mode: "local",
        message: "Supabase no esta configurado todavia."
      },
      { status: 503 }
    );
  }

  const formData = await request.formData();
  const values = {
    owner: String(formData.get("owner") ?? ""),
    businessName: String(formData.get("businessName") ?? ""),
    category: String(formData.get("category") ?? ""),
    specialty: String(formData.get("specialty") ?? ""),
    department: String(formData.get("department") ?? ""),
    city: String(formData.get("city") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    whatsapp: String(formData.get("whatsapp") ?? ""),
    description: String(formData.get("description") ?? ""),
    authorization: formData.get("authorization") === "true"
  };

  const parsed = submissionSchema.safeParse(values);

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
      {
        ok: false,
        mode: "local",
        message: "Supabase no esta configurado todavia."
      },
      { status: 503 }
    );
  }

  let imagePath: string | null = null;
  let imageUrl: string | null = null;
  const image = formData.get("profileImage");

  if (image instanceof File && image.size > 0) {
    if (!ALLOWED_PROFILE_IMAGE_TYPES.includes(image.type)) {
      return NextResponse.json(
        { ok: false, message: "La foto debe ser JPG, PNG o WebP." },
        { status: 400 }
      );
    }

    if (image.size > MAX_PROFILE_IMAGE_SIZE) {
      return NextResponse.json(
        { ok: false, message: "La foto no debe superar 2 MB." },
        { status: 400 }
      );
    }

    const extension = image.name.split(".").pop()?.toLowerCase() ?? "webp";
    imagePath = `pending/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("business-profile-images")
      .upload(imagePath, image, {
        contentType: image.type,
        upsert: false
      });

    if (uploadError) {
      return NextResponse.json(
        { ok: false, message: uploadError.message },
        { status: 500 }
      );
    }

    const { data } = supabase.storage
      .from("business-profile-images")
      .getPublicUrl(imagePath);
    imageUrl = data.publicUrl;
  }

  const submission: BusinessSubmissionInsert = {
    owner_name: parsed.data.owner,
    business_name: parsed.data.businessName,
    category: parsed.data.category,
    specialty: parsed.data.specialty,
    department: parsed.data.department,
    city: parsed.data.city,
    phone: parsed.data.phone,
    whatsapp: parsed.data.whatsapp,
    description: parsed.data.description,
    image_url: imageUrl,
    image_path: imagePath,
    publish_authorization: parsed.data.authorization,
    status: "pending"
  };

  const { data, error } = await supabase
    .from("business_submissions")
    .insert(submission)
    .select("id,status")
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, mode: "supabase", submission: data });
}
