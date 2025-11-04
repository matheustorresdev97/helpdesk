import z from "zod";
import { UserDTO } from "./user.schema";

export const TechnicianDTO = UserDTO.extend({
  availability: z.array(z.date()),
});

export type TechnicianDTOSchema = z.infer<typeof TechnicianDTO>;

export const createTechnicianSchema = z.object({
  email: z.string().email({ message: "Informe um email válido" }),
  password: z.string().min(6, { message: "Mínimo de 6 caracteres" }),
  name: z.string().min(2, { message: "Mínimo de 2 caracteres" }),
  profilePhoto: z.string().nullable().optional(),
  availability: z
    .array(z.coerce.date())
    .min(1, { message: "Informe pelo menos um horário disponível" }),
});

export type CreateTechnicianPayload = z.infer<typeof createTechnicianSchema>;

export const updateTechnicianByAdminSchema = z.object({
  email: z.email({ message: 'Informe um email válido' }),
  password: z.string().min(6, { message: 'Mínimo de 6 caracteres.' }).optional(),
  name: z.string().min(2, { message: 'Informe um nome válido.' }),
  profilePhoto: z.string().nullable().optional(),
  availability: z.array(z.coerce.date()).nonempty({ message: 'Informe pelo menos um horário' }),
});

export type UpdateTechnicianByAdminPayload = z.infer<typeof updateTechnicianByAdminSchema>;

export const updateTechnicianSchema = z.object({
  email: z.email({ message: "Informe um email válido" }),
  password: z
    .string()
    .min(6, { message: "Mínimo de 6 caracteres." })
    .optional(),
  name: z.string().min(2, { message: "Informe um nome válido." }),
  profilePhoto: z.string().nullable().optional(),
});

export type UpdateTechnicianPayload = z.infer<typeof updateTechnicianSchema>;

export const responseTechnicianSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string(),
  role: z.string(),
  profilePhoto: z.string().nullable().optional(),
  availability: z.array(z.coerce.date()),
});
