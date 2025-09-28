import z from "zod";
import {
  CreateServicePayload,
  responseServiceSchema,
  UpdateServicePayload,
} from "../schemas/service.schema";
import { prisma } from "../config/prisma.config";

export class ServiceService {
  async create(payload: CreateServicePayload) {
    const data = await prisma.service.create({
      data: payload,
    });

    return responseServiceSchema.parse(data);
  }

  async update(id: string, payload: UpdateServicePayload) {
    const data = await prisma.service.update({
      where: { id },
      data: payload,
    });

    return responseServiceSchema.parse(data);
  }

  async index() {
    const responseServiceArraySchema = z.array(responseServiceSchema);
    const data = await prisma.service.findMany();

    return responseServiceArraySchema.parse(data);
  }
}
