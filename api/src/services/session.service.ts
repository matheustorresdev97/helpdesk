import { compare } from "bcrypt";
import { prisma } from "../config/prisma.config";
import { AppError } from "../util/app-error";
import { authConfig } from "../config/auth.config";
import { sign } from "jsonwebtoken";
import { UserDTO } from "../schemas/user.schema";

export class SessionService {
    async login(email: string, password: string) {
        const data = await prisma.user.findUnique({ where: { email } });

        if (!data) {
            throw new AppError('Credenciais inválidas.');
        }

        const isPasswordValid = await compare(password, data.password);
        if (!isPasswordValid) {
            throw new AppError('Credenciais inválidas.');
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({ role: data.role ?? 'CLIENT' }, secret, {
            subject: data.id,
            expiresIn,
        });

        const { password: _, ...userWithoutPassword } = data;
        const user = UserDTO.parse(userWithoutPassword);

        return { user, token };
    }
}