import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeBolivianPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("591")) {
    return digits;
  }

  if (digits.length === 8) {
    return `591${digits}`;
  }

  return digits;
}

export function createWhatsAppUrl(phone: string, message: string) {
  const normalizedPhone = normalizeBolivianPhone(phone);
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

export function createPhoneUrl(phone: string) {
  return `tel:+${normalizeBolivianPhone(phone)}`;
}
