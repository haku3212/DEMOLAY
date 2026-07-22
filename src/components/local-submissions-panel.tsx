"use client";

import { useState } from "react";

type LocalSubmission = {
  id: string;
  owner: string;
  businessName: string;
  category: string;
  specialty: string;
  department: string;
  city: string;
  phone: string;
  whatsapp: string;
  description: string;
  imageName?: string;
  status: string;
  createdAt: string;
};

export function LocalSubmissionsPanel() {
  const [submissions] = useState<LocalSubmission[]>(() => readLocalSubmissions());

  if (submissions.length === 0) {
    return (
      <div className="mt-5 rounded-lg border border-dashed border-stone-300 bg-white p-5 text-center dark:border-stone-700 dark:bg-black">
        <p className="font-semibold text-slate-700 dark:text-slate-200">
          No hay solicitudes locales en este navegador.
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Si enviaste una solicitud desde otro navegador o dispositivo, conecta Supabase para verla aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 grid gap-3">
      <div className="rounded-lg border border-[#b08a2e]/60 bg-[#fffdf7] p-4 dark:bg-black">
        <p className="font-black text-slate-950 dark:text-white">
          Solicitudes guardadas en este navegador
        </p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Esto es modo prueba local. Para produccion, conecta Supabase.
        </p>
      </div>
      {submissions.map((submission) => (
        <article
          key={submission.id}
          className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-black"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-950 dark:text-white">
                {submission.businessName}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {submission.owner} - {submission.category} - {submission.city},{" "}
                {submission.department}
              </p>
            </div>
            <span className="w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-black uppercase tracking-normal text-[#b11226]">
              {submission.status}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {submission.description}
          </p>
          <div className="mt-3 grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <p>Especialidad: {submission.specialty}</p>
            <p>WhatsApp: {submission.whatsapp}</p>
            <p>Telefono: {submission.phone}</p>
            {submission.imageName ? <p>Foto: {submission.imageName}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}

function readLocalSubmissions() {
  if (typeof window === "undefined") {
    return [];
  }

  const storedRequests = window.localStorage.getItem("work-demolay-requests");

  if (!storedRequests) {
    return [];
  }

  try {
    return JSON.parse(storedRequests) as LocalSubmission[];
  } catch {
    return [];
  }
}
