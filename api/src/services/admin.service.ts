import { hash } from "bcrypt";
import { prisma } from "@/configs/prisma.config";
import { AppError } from "@/utils/app-error";
import { CreateAdminPayload } from "@/schemas/admin.schema";

export class AdminService {
  async create(payload: CreateAdminPayload) {
    const { email, password, name, profilePhoto } = payload;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new AppError("Email já cadastrado.");
    }

    const hashedPassword = await hash(password, 8);

    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "ADMIN",
        profilePhoto: profilePhoto ?? null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profilePhoto: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return admin;
  }
}
