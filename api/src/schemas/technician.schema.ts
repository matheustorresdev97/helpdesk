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
  profilePhoto: z.string().url().nullable().optional(),
  availability: z
    .array(z.coerce.date())
    .min(1, { message: "Informe pelo menos um horário disponível" }),
});

export type CreateTechnicianPayload = z.infer<typeof createTechnicianSchema>;

export const responseTechnicianSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string(),
  role: z.string(),
  availability: z.array(z.coerce.date()),
});

export type ResponseTechnicianPayload = z.infer<typeof responseTechnicianSchema>;