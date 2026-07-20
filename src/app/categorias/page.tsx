import { featuredCategories } from "@/lib/demo-data";

export const metadata = {
  title: "Categorias",
  description: "Explora categorias de profesionales, negocios y emprendimientos."
};

export default function CategoriesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-normal text-red-700 dark:text-red-300">
        Categorias
      </p>
      <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
        Rubros destacados
      </h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCategories.map((category) => {
          const Icon = category.icon;
          return (
            <a
              key={category.slug}
              href={`/categoria/${category.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="grid size-11 place-items-center rounded-lg border border-yellow-300/70 bg-[#00145f] text-yellow-200">
                <Icon size={20} aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-white">{category.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{category.description}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
}
