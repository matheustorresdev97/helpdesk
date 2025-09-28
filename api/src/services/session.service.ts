import { compare } from "bcrypt";
import { prisma } from "../config/prisma.config";
import { AppError } from "../util/app-error";
import { authConfig } from "../config/auth.config";
import { sign } from "jsonwebtoken";
import { responseUserSchema } from "../schemas/user.schema";

export class SessionService {
  async login(email: string, password: string) {
    let data: any = await prisma.admin.findUnique({ where: { email } });
    let role = "ADMIN";

    if (!data) {
      data = await prisma.client.findUnique({ where: { email } });
      role = "CLIENT";
    }

    if (!data) {
      data = await prisma.technician.findUnique({ where: { email } });
      role = "TECHNICIAN";
    }

    if (!data) {
      throw new AppError("Credenciais inválidas.");
    }

    const isPasswordValid = await compare(password, data.password);
    if (!isPasswordValid) {
      throw new AppError("Credenciais inválidas.");
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ role }, secret, {
      subject: data.id,
      expiresIn,
    });

    const { password: _, ...userWithoutPassword } = data;
    const user = responseUserSchema.parse(userWithoutPassword);

    return { user, token };
  }
}
