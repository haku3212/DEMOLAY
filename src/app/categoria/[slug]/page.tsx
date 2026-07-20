import { notFound } from "next/navigation";

import { BusinessCard } from "@/components/business-card";
import { demoBusinesses, featuredCategories } from "@/lib/demo-data";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = featuredCategories.find((item) => item.slug === slug);

  return {
    title: category ? category.name : "Categoria",
    description: category?.description ?? "Categoria de Work DeMolay."
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = featuredCategories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const relatedBusinesses = demoBusinesses.filter((business) => {
    return business.category.toLowerCase().includes(category.name.toLowerCase());
  });
  const businesses = relatedBusinesses.length > 0 ? relatedBusinesses : demoBusinesses.slice(0, 2);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-normal text-[#b11226] dark:text-red-300">
        Categoria
      </p>
      <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">{category.name}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
        {category.description} Los resultados actuales son ficticios hasta conectar la base de datos.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </section>
  );
}
