import { hash } from "bcrypt";
import { prisma } from "@/configs/prisma.config";
import { AppError } from "@/utils/app-error";
import {
  CreateClientPayload,
  responseClientSchema,
  UpdateClientPayload,
} from "@/schemas/client.schema";
import z from "zod";
import { Role } from "@prisma/client";

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

  async index(page: number, perPage: number) {
    const responseTechnicianArraySchema = z.array(responseClientSchema);

    const skip = (page - 1) * perPage;

    const whereClause = {
      role: Role.CLIENT,
    };

    const data = await prisma.user.findMany({
      where: whereClause,
      skip,
      take: perPage,
      orderBy: { createdAt: "asc" },
      include: { availability: true },
    });

    const totalRecords = await prisma.user.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(totalRecords / perPage);
    const pagination = {
      page,
      perPage,
      totalRecords,
      totalPages: totalPages > 0 ? totalPages : 1,
    };

    const list = data.map((tech) => ({
      ...tech,
      availability: tech.availability.map((a) => a.time),
    }));

    const technicians = responseTechnicianArraySchema.parse(list);

    return { technicians, pagination };
  }

  async update(id: string, payload: UpdateClientPayload) {
    const { email, password, name, profilePhoto } = payload;
    const hashedPassword = password ? await hash(password, 8) : undefined;

    const data = await prisma.user.update({
      where: { id },
      data: {
        profilePhoto: profilePhoto ?? "",
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    const { password: _, ...userWithoutPassword } = data;
    const client = responseClientSchema.parse(userWithoutPassword);

    return client;
  }

  async show(id: string) {
    const data = await prisma.user.findUnique({
      where: { id },
    });

    if (!data) {
      throw new AppError("Cliente não localizado", 404);
    }

    const { password: _, ...userWithoutPassword } = data;

    return userWithoutPassword;
  }
}
