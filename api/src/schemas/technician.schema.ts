import z from "zod";
import { UserDTO } from "./user.schema";

export const createTechnicianSchema = z.object({
  email: z.email({ message: "Informe um email válido" }),
  password: z.string().min(6, { message: "Mínimo de 6 caracteres." }),
  name: z.string().min(2, { message: "Informe um nome válido." }),
  profilePhoto: z.string().optional(),
});

export const TechnicianDTO = UserDTO.extend({
  profilePhoto: z.string(),
});

export type CreateTechnicianPayload = z.infer<typeof createTechnicianSchema>;
export type TechnicianDTOSchema = z.infer<typeof TechnicianDTO>;