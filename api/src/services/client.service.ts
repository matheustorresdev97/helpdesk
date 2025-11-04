import { compare, hash } from "bcrypt";
import { Role } from "@prisma/client";
import z from "zod";
import { prisma } from "@/configs/prisma.config";
import { AppError } from "@/utils/app-error";
import {
  CreateClientPayload,
  UpdateClientPayload,
  responseClientSchema,
} from "@/schemas/client.schema";
import { UpdatePasswordPayload } from "@/schemas/user.schema";

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

    const data = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: Role.CLIENT,
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

    const client = responseClientSchema.parse(data);

    return client;
  }

  async index(page: number, perPage: number) {
    const responseClientArraySchema = z.array(responseClientSchema);

    const skip = (page - 1) * perPage;

    const whereClause = {
      role: Role.CLIENT,
    };

    const [data, totalRecords] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        skip,
        take: perPage,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          profilePhoto: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.user.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalRecords / perPage);
    const pagination = {
      page,
      perPage,
      totalRecords,
      totalPages: totalPages > 0 ? totalPages : 1,
    };

    const clients = responseClientArraySchema.parse(data);

    return { clients, pagination };
  }

  async show(id: string) {
    const data = await prisma.user.findUnique({
      where: { id, role: Role.CLIENT },
    });

    if (!data) {
      throw new AppError("Cliente não localizado", 404);
    }

    const client = responseClientSchema.parse(data);

    return client;
  }

  async update(id: string, payload: UpdateClientPayload) {
    const { email, password, name, profilePhoto } = payload;

    await this.show(id);

    const hashedPassword = password ? await hash(password, 8) : undefined;

    const data = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    const client = responseClientSchema.parse(data);

    return client;
  }

  async delete(id: string) {
    await this.show(id);

    await prisma.user.delete({
      where: { id },
    });

    return { message: "Cliente excluído com sucesso" };
  }

  async updatePassword(id: string, payload: UpdatePasswordPayload) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError("Usuario não encontrado", 404);
    }

    const isOldPasswordValid = await compare(payload.password, user.password);
    if (!isOldPasswordValid) {
      throw new AppError("Senha atual incorreta");
    }

    if (payload.newPassword.length < 6) {
      throw new AppError("Mínimo de 6 caracteres", 409);
    }

    const newPassword = await hash(payload.newPassword, 8);

    await prisma.user.update({
      where: { id },
      data: { password: newPassword },
    });

    return;
  }
}
