export const ADMIN_SESSION_COOKIE = "work_demolay_admin";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

export function getAdminPassword() {
  if (process.env.ADMIN_PASSWORD) {
    return process.env.ADMIN_PASSWORD;
  }

  if (process.env.NODE_ENV !== "production") {
    return "admin123";
  }

  return null;
}

export function getAdminSecret() {
  if (process.env.ADMIN_SESSION_SECRET) {
    return process.env.ADMIN_SESSION_SECRET;
  }

  if (process.env.NODE_ENV !== "production") {
    return "dev-secret-change-me";
  }

  return null;
}

export async function createAdminSessionToken() {
  const secret = getAdminSecret();

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET no esta configurado.");
  }

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const payload = `admin.${expiresAt}`;
  const signature = await sign(payload, secret);

  return `${payload}.${signature}`;
}

export async function verifyAdminSessionToken(token?: string | null) {
  const secret = getAdminSecret();

  if (!token || !secret) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    return false;
  }

  const [subject, expiresAt, signature] = parts;

  if (subject !== "admin") {
    return false;
  }

  const expiration = Number(expiresAt);

  if (!Number.isFinite(expiration) || expiration < Math.floor(Date.now() / 1000)) {
    return false;
  }

  const expectedSignature = await sign(`${subject}.${expiresAt}`, secret);
  return timingSafeEqual(signature, expectedSignature);
}

export function getAdminSessionMaxAge() {
  return SESSION_DURATION_SECONDS;
}

async function sign(value: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
}
