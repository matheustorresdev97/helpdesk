import z from "zod";

export const UserDTO = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["ADMIN", "CLIENT", "TECHNICIAN"]),
  profilePhoto: z.string().nullable()
});
