import { z } from "zod";

export const profileReportSchema = z.object({
  profileId: z.string().uuid("Perfil invalido."),
  profileName: z.string().min(2).max(160),
  profileSlug: z.string().min(2).max(180),
  reporterName: z.string().max(120).optional(),
  reporterContact: z.string().max(120).optional(),
  reason: z
    .string()
    .min(10, "Escribe un detalle de al menos 10 caracteres.")
    .max(1200, "El reporte no debe superar 1200 caracteres.")
});

export type ProfileReportValues = z.infer<typeof profileReportSchema>;
