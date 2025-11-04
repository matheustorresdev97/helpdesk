import { compare, hash } from "bcrypt";
import {
  CreateTechnicianPayload,
  responseTechnicianSchema,
  UpdateTechnicianPayload,
  updateTechnicianSchema,
} from "../schemas/technician.schema";
import { prisma } from "../configs/prisma.config";
import { AppError } from "@/utils/app-error";
import z from "zod";
import { Role } from "@prisma/client";
import { UpdatePasswordPayload } from "@/schemas/user.schema";

export class TechnicianService {
  async create(payload: CreateTechnicianPayload) {
    const { email, password, name, availability, profilePhoto } = payload;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new AppError("Email já cadastrado.");
    }

    const hashedPassword = await hash(password, 8);

    const technician = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "TECHNICIAN",
        availability: {
          create: availability.map((time) => ({ time })),
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profilePhoto: true,
        createdAt: true,
        updatedAt: true,
        availability: {
          select: {
            id: true,
            time: true,
          },
        },
      },
    });

    return {
      ...technician,
      availability: technician.availability.map((a) => a.time),
    };
  }

  async index(page: number, perPage: number) {
    const responseTechnicianArraySchema = z.array(responseTechnicianSchema);

    const skip = (page - 1) * perPage;

    const whereClause = {
      role: Role.TECHNICIAN,
    };

    const data = await prisma.user.findMany({
      where: whereClause,
      skip,
      take: perPage,
      orderBy: { createdAt: "desc" },
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

  async show(id: string) {

  const data = await prisma.user.findFirst({
    where: {
      id,
      role: Role.TECHNICIAN,
    },
    include: {
      availability: {
        select: { time: true },
      },
    },
  });
    if (!data) {
      throw new AppError("Tecnico não localizado", 404);
    }

    const technicianMapped = {
      ...data,
      availability: data.availability.map((a) => a.time),
    };

    const technician = responseTechnicianSchema.parse(technicianMapped);

    return technician;
  }

  async update(id: string, payload: UpdateTechnicianPayload) {
    const { email, name, profilePhoto } = payload;

    const data = await prisma.user.update({
      where: { id },
      data: {
        profilePhoto: profilePhoto ?? null,
        name,
        email,
      },
    });

    const technician = updateTechnicianSchema.parse(data);

    return technician;
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
