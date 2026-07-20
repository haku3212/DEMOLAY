import { demoBusinesses } from "@/lib/demo-data";

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

export function findBusinessBySlug(slug: string) {
  return demoBusinesses.find((business) => createBusinessSlug(business.name) === slug);
}

export function filterBusinesses(filters: BusinessFilters) {
  const query = normalizeText(filters.q ?? "");
  const department = normalizeText(filters.department ?? "");
  const city = normalizeText(filters.city ?? "");

  return demoBusinesses.filter((business) => {
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

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
