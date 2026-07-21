"use client";

import { CheckCircle2, ImagePlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { featuredCategories, departments, citiesByDepartment } from "@/lib/demo-data";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

const registrationSchema = z.object({
  owner: z.string().min(3, "Escribe tu nombre completo."),
  businessName: z.string().min(3, "Escribe el nombre del negocio o profesion."),
  category: z.string().min(1, "Selecciona una categoria."),
  specialty: z.string().min(3, "Describe tu especialidad u oficio."),
  department: z.string().min(1, "Selecciona un departamento."),
  city: z.string().min(1, "Selecciona una ciudad."),
  phone: z.string().min(7, "Escribe un telefono valido."),
  whatsapp: z.string().min(7, "Escribe un WhatsApp valido."),
  description: z.string().min(20, "Agrega una descripcion de al menos 20 caracteres."),
  authorization: z.boolean().refine((value) => value, {
    message: "Debes autorizar el envio de esta informacion."
  })
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const defaultValues: Partial<RegistrationFormValues> = {
  owner: "",
  businessName: "",
  category: "",
  specialty: "",
  department: "",
  city: "",
  phone: "",
  whatsapp: "",
  description: "",
  authorization: false
};

export function RegistrationForm() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues
  });

  const cities = selectedDepartment ? citiesByDepartment[selectedDepartment] ?? [] : [];

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setImageError("");

    if (!file) {
      setImageName("");
      setImagePreview("");
      return;
    }

    if (!allowedImageTypes.includes(file.type)) {
      setImageError("La foto debe ser JPG, PNG o WebP.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("La foto no debe superar 2 MB.");
      event.target.value = "";
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageName(file.name);
    setImagePreview(URL.createObjectURL(file));
  }

  function onSubmit(values: RegistrationFormValues) {
    const storedRequests = JSON.parse(
      window.localStorage.getItem("work-demolay-requests") ?? "[]"
    ) as unknown[];

    window.localStorage.setItem(
      "work-demolay-requests",
      JSON.stringify([
        {
          ...values,
          id: crypto.randomUUID(),
          imageName,
          status: "pendiente",
          createdAt: new Date().toISOString()
        },
        ...storedRequests
      ])
    );

    setSubmitted(true);
    reset(defaultValues);
    setSelectedDepartment("");
    setImageName("");
    setImagePreview("");
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-[#b08a2e]/50 bg-white p-6 text-center shadow-sm dark:bg-stone-950">
        <CheckCircle2 className="mx-auto text-[#b11226]" size={44} aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">
          Solicitud enviada
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          Tu negocio o profesion quedo guardado como solicitud de prueba en este navegador. En la siguiente fase se conectara a Supabase para revision administrativa real.
        </p>
        <Button className="mt-6" onClick={() => setSubmitted(false)}>
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-950"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nombre completo" error={errors.owner?.message}>
          <input {...register("owner")} className={inputClassName} placeholder="Ej. Juan Perez" />
        </Field>
        <Field label="Negocio o profesion" error={errors.businessName?.message}>
          <input
            {...register("businessName")}
            className={inputClassName}
            placeholder="Ej. Taller San Juan"
          />
        </Field>
        <Field label="Categoria" error={errors.category?.message}>
          <select {...register("category")} className={inputClassName}>
            <option value="">Seleccionar</option>
            {featuredCategories.map((category) => (
              <option key={category.slug} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Especialidad u oficio" error={errors.specialty?.message}>
          <input
            {...register("specialty")}
            className={inputClassName}
            placeholder="Ej. Electricista domiciliario"
          />
        </Field>
        <Field label="Departamento" error={errors.department?.message}>
          <select
            {...register("department")}
            className={inputClassName}
            onChange={(event) => {
              setSelectedDepartment(event.target.value);
              setValue("department", event.target.value, { shouldValidate: true });
              setValue("city", "", { shouldValidate: true });
            }}
          >
            <option value="">Seleccionar</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Ciudad" error={errors.city?.message}>
          <select {...register("city")} className={inputClassName} disabled={!selectedDepartment}>
            <option value="">Seleccionar</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Telefono" error={errors.phone?.message}>
          <input {...register("phone")} className={inputClassName} placeholder="Ej. 70000000" />
        </Field>
        <Field label="WhatsApp" error={errors.whatsapp?.message}>
          <input {...register("whatsapp")} className={inputClassName} placeholder="Ej. 70000000" />
        </Field>
      </div>

      <Field label="Descripcion" error={errors.description?.message}>
        <textarea
          {...register("description")}
          className={`${inputClassName} min-h-32 resize-y py-3`}
          placeholder="Cuenta que servicio ofreces, horarios generales o zona de atencion."
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-[180px_1fr] md:items-center">
        <div className="grid aspect-square place-items-center overflow-hidden rounded-xl border border-stone-200 bg-[#fffdf7] dark:border-stone-800 dark:bg-black">
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Vista previa de foto de perfil"
              width={180}
              height={180}
              className="h-full w-full object-cover"
              unoptimized
            />
          ) : (
            <ImagePlus className="text-[#b11226]" size={42} aria-hidden="true" />
          )}
        </div>
        <div>
          <label className="text-sm font-bold text-slate-950 dark:text-white" htmlFor="profileImage">
            Foto de perfil o logo
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="mt-2 block w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#b11226] file:px-3 file:py-2 file:text-sm file:font-bold file:text-white dark:border-stone-800 dark:bg-black"
          />
          <p className="mt-2 text-sm text-slate-500">
            Opcional. Formatos JPG, PNG o WebP. Maximo 2 MB.
          </p>
          {imageName ? <p className="mt-1 text-sm font-semibold text-slate-700">{imageName}</p> : null}
          {imageError ? <p className="mt-1 text-sm font-semibold text-[#b11226]">{imageError}</p> : null}
        </div>
      </div>

      <label className="flex gap-3 rounded-lg border border-stone-200 bg-[#fffdf7] p-4 text-sm leading-6 text-slate-700 dark:border-stone-800 dark:bg-black dark:text-slate-200">
        <input type="checkbox" {...register("authorization")} className="mt-1 size-4 accent-[#b11226]" />
        <span>
          Autorizo enviar mi nombre, negocio, numero de contacto, foto y demas informacion para revision antes de publicarse en Work DeMolay.
          {errors.authorization?.message ? (
            <span className="mt-1 block font-semibold text-[#b11226]">
              {errors.authorization.message}
            </span>
          ) : null}
        </span>
      </label>

      <Button type="submit" disabled={isSubmitting}>
        Enviar solicitud
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-950 dark:text-white">
      {label}
      {children}
      {error ? <span className="font-semibold text-[#b11226]">{error}</span> : null}
    </label>
  );
}

const inputClassName =
  "min-h-11 rounded-lg border border-stone-200 bg-[#fffdf7] px-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[#b08a2e] disabled:text-slate-400 dark:border-stone-800 dark:bg-black dark:text-white";
