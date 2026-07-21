import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminPassword,
  getAdminSessionMaxAge
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const adminPassword = getAdminPassword();

  if (!adminPassword) {
    return NextResponse.json(
      { ok: false, message: "ADMIN_PASSWORD no esta configurado." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  if (password !== adminPassword) {
    return NextResponse.json(
      { ok: false, message: "Contrasena incorrecta." },
      { status: 401 }
    );
  }

  const token = await createAdminSessionToken();
  const response = NextResponse.json({ ok: true });

  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAdminSessionMaxAge()
  });

  return response;
}
