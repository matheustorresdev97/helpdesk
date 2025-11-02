import z from "zod";
import { UserDTO } from "./user.schema";

export const ClientDTO = UserDTO;

export type ClientDTOSchema = z.infer<typeof ClientDTO>;

export const createClientSchema = z.object({
  email: z.string().email({ message: "Informe um email válido" }),
  password: z.string().min(6, { message: "Mínimo de 6 caracteres" }),
  name: z.string().min(2, { message: "Mínimo de 2 caracteres" }),
  profilePhoto: z.string().url().nullable().optional(),
});

export type CreateClientPayload = z.infer<typeof createClientSchema>;
