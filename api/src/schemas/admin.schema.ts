import z from "zod";
import { UserDTO } from "./user.schema";

export const AdminDTO = UserDTO;
export type AdminDTOSchema = z.infer<typeof AdminDTO>;

export const createAdminSchema = z.object({
  email: z.string().email({ message: "Informe um email válido" }),
  password: z.string().min(6, { message: "Mínimo de 6 caracteres" }),
  name: z.string().min(2, { message: "Mínimo de 2 caracteres" }),
  profilePhoto: z.string().nullable().optional(),
});

export type CreateAdminPayload = z.infer<typeof createAdminSchema>;
