import { hash } from "bcrypt";
import { Role } from "@prisma/client";
import z from "zod";
import { prisma } from "@/configs/prisma.config";
import { AppError } from "@/utils/app-error";
import {
  CreateClientPayload,
  UpdateClientPayload,
  responseClientSchema,
} from "@/schemas/client.schema";

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
        profilePhoto: profilePhoto ?? "",
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
        orderBy: { createdAt: "asc" },
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
        profilePhoto: profilePhoto ?? undefined,
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
}
