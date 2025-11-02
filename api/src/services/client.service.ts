import { hash } from "bcrypt";
import { prisma } from "@/configs/prisma.config";
import { AppError } from "@/utils/app-error";
import { CreateClientPayload } from "@/schemas/client.schema";

export class ClientService {
  async create(payload: CreateClientPayload) {
    const { email, password, name, profilePhoto } = payload;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new AppError("Email já cadastrado.");
    }

    const hashedPassword = await hash(password, 8);

    const client = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "CLIENT",
        profilePhoto: "",
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

    return client;
  }
}
