import { BusinessCard } from "@/components/business-card";
import { SearchPanel } from "@/components/search-panel";
import { filterBusinesses } from "@/lib/directory";

export const metadata = {
  title: "Buscar",
  description: "Busca negocios, profesionales, productos y servicios en Work DeMolay."
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    department?: string;
    city?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const filters = await searchParams;
  const businesses = await filterBusinesses(filters);
  const hasFilters = Boolean(filters.q || filters.department || filters.city);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-normal text-[#b11226] dark:text-red-300">
        Directorio
      </p>
      <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
        Buscar servicios y emprendimientos
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
        Esta version piloto muestra servicios del Beni aprobados por administracion.
      </p>
      <div className="mt-8">
        <SearchPanel />
      </div>
      {businesses.length > 0 ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            No encontramos resultados
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            Prueba con otra palabra o limpia la ciudad. Por ahora el piloto esta enfocado solo en el Beni.
          </p>
        </div>
      )}
      {hasFilters ? (
        <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
          Resultados encontrados: {businesses.length}
        </p>
      ) : null}
    </section>
  );
}
