import { z } from "zod";

export const MAX_PROFILE_IMAGE_SIZE = 2 * 1024 * 1024;
export const ALLOWED_PROFILE_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const submissionSchema = z.object({
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

export type SubmissionFormValues = z.infer<typeof submissionSchema>;
