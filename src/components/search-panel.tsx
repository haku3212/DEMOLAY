"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { citiesByDepartment, departments } from "@/lib/demo-data";

export function SearchPanel() {
  const [department, setDepartment] = useState("");
  const cities = useMemo(() => {
    return department ? citiesByDepartment[department] ?? [] : [];
  }, [department]);

  return (
    <form
      action="/buscar"
      className="grid gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 sm:grid-cols-[1.5fr_1fr_1fr_auto] dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
    >
      <label className="sr-only" htmlFor="q">
        Buscar servicio, producto o profesional
      </label>
      <div className="flex min-h-12 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 dark:border-slate-700 dark:bg-slate-950">
        <Search size={18} className="text-slate-500" aria-hidden="true" />
        <input
          id="q"
          name="q"
          type="search"
          placeholder="Medico, mecanico, jabones..."
          className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-500 dark:text-white"
        />
      </div>

      <label className="sr-only" htmlFor="department">
        Departamento
      </label>
      <select
        id="department"
        name="department"
        value={department}
        onChange={(event) => setDepartment(event.target.value)}
        className="min-h-12 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-800 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
      >
        <option value="">Departamento</option>
        {departments.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor="city">
        Ciudad
      </label>
      <select
        id="city"
        name="city"
        className="min-h-12 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-800 outline-none focus:border-slate-400 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        disabled={!department}
      >
        <option value="">Ciudad</option>
        {cities.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <Button type="submit" className="min-h-12">
        Buscar
      </Button>
    </form>
  );
}
