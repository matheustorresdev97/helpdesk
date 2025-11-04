import z from "zod";

export const UserDTO = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["ADMIN", "CLIENT", "TECHNICIAN"]),
  profilePhoto: z.string().nullable().optional()
});

export const updatePasswordSchema = z.object({
  password: z.string(),
  newPassword: z.string(),
});

export type UpdatePasswordPayload = z.infer<typeof updatePasswordSchema>;