import { hash } from "bcrypt";
import z from "zod";
import {
  CreateClientPayload,
  responseClientSchema,
  UpdateClientPayload,
} from "../schemas/client.schema";
import { prisma } from "../config/prisma.config";
import { AppError } from "../util/app-error";

export class ClientService {
  async create(payload: CreateClientPayload) {
    const { email, password, name, profilePhoto } = payload;

    const hashedPassword = await hash(password, 8);

    const data = await prisma.client.create({
      data: {
        profilePhoto: "",
        name,
        email,
        password: hashedPassword,
        role: "CLIENT",
      },
    });

    const client = responseClientSchema.parse(data);

    return client;
  }

  async update(id: string, payload: UpdateClientPayload) {
    const { email, password, name, profilePhoto } = payload;
    const hashedPassword = password ? await hash(password, 8) : undefined;

    const data = await prisma.client.update({
      where: { id },
      data: {
        profilePhoto: profilePhoto ?? "",
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    const client = responseClientSchema.parse(data);

    return client;
  }

  async index(page: number, perPage: number) {
    const responseArrayClientSchema = z.array(responseClientSchema);

    const skip = (page - 1) * perPage;

    const data = await prisma.client.findMany({
      skip,
      take: perPage,
      orderBy: { createdAt: "asc" },
    });

    const totalRecords = await prisma.client.count();
    const totalPages = Math.ceil(totalRecords / perPage);
    const pagination = {
      page,
      perPage,
      totalRecords,
      totalPages: totalPages > 0 ? totalPages : 1,
    };

    const clients = responseArrayClientSchema.parse(data);

    return { clients, pagination };
  }

  async show(id: string) {
    const data = await prisma.client.findUnique({
      where: { id },
    });

    if (!data) {
      throw new AppError("Cliente não localizado", 404);
    }

    const client = responseClientSchema.parse(data);

    return client;
  }

  async delete(id: string) {
    const data = await prisma.client.delete({
      where: { id },
    });
  }
}
