import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { authConfig } from "@/configs/auth.config";
import { prisma } from "@/configs/prisma.config";
import { UserDTO } from "@/schemas/user.schema";
import { AppError } from "@/utils/app-error";

export class SessionService {
  async login(email: string, password: string) {
    const data = await prisma.user.findUnique({ where: { email } });
    const isPasswordValid = data
      ? await compare(password, data.password)
      : false;

    if (!data || !isPasswordValid) {
      throw new AppError("Credenciais inválidas.");
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ role: data.role }, secret, {
      subject: data.id,
      expiresIn,
    });

    const { password: _, ...userWithoutPassword } = data;
    const user = UserDTO.parse(userWithoutPassword);

    return { user, token };
  }
}
