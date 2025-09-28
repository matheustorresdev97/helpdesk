import z from "zod";
import { responseUserSchema } from "./user.schema";

export const createClientSchema = z.object({
  email: z.email({ message: "Informe um email válido" }),
  password: z.string().min(6, { message: "Mínimo de 6 caracteres." }),
  name: z.string().min(2, { message: "Informe um nome válido." }),
  profilePhoto: z.string().optional(),
});

export type CreateClientPayload = z.infer<typeof createClientSchema>;

export const responseClientSchema = responseUserSchema.extend({});
