import { createSupabaseServerClient, hasSupabaseServerConfig } from "@/lib/supabase/server";
import type { BusinessSubmission } from "@/types/supabase";

export type DirectoryBusiness = {
  id: string;
  name: string;
  owner: string;
  category: string;
  specialty: string;
  city: string;
  department: string;
  description: string;
  phone: string;
  whatsapp: string;
  initials: string;
  imageUrl?: string | null;
  isFictional?: boolean;
};

export type BusinessFilters = {
  q?: string;
  department?: string;
  city?: string;
};

export const defaultWhatsAppMessage =
  "Hola, encontre su contacto mediante Work DeMolay y quisiera consultar por sus servicios.";

export function createBusinessSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getPublishedBusinesses() {
  const approvedSubmissions = await getApprovedSubmissions();
  return approvedSubmissions.map(mapSubmissionToBusiness);
}

export async function findBusinessBySlug(slug: string) {
  const businesses = await getPublishedBusinesses();
  return businesses.find((business) => createBusinessSlug(business.name) === slug);
}

export async function filterBusinesses(filters: BusinessFilters) {
  const businesses = await getPublishedBusinesses();
  const query = normalizeText(filters.q ?? "");
  const department = normalizeText(filters.department ?? "");
  const city = normalizeText(filters.city ?? "");

  return businesses.filter((business) => {
    const searchableText = normalizeText(
      [
        business.name,
        business.owner,
        business.category,
        business.specialty,
        business.city,
        business.department,
        business.description
      ].join(" ")
    );

    const matchesQuery = query.length === 0 || searchableText.includes(query);
    const matchesDepartment =
      department.length === 0 || normalizeText(business.department) === department;
    const matchesCity = city.length === 0 || normalizeText(business.city) === city;

    return matchesQuery && matchesDepartment && matchesCity;
  });
}

async function getApprovedSubmissions() {
  if (!hasSupabaseServerConfig()) {
    return [];
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("business_submissions")
      .select("*")
      .eq("status", "approved")
      .eq("department", "Beni")
      .order("reviewed_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as BusinessSubmission[];
  } catch {
    return [];
  }
}

function mapSubmissionToBusiness(submission: BusinessSubmission): DirectoryBusiness {
  return {
    id: submission.id,
    name: submission.business_name,
    owner: submission.owner_name,
    category: submission.category,
    specialty: submission.specialty,
    city: submission.city,
    department: submission.department,
    description: submission.description,
    phone: submission.phone,
    whatsapp: submission.whatsapp,
    initials: createInitials(submission.business_name),
    imageUrl: submission.image_url,
    isFictional: false
  };
}

function createInitials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
