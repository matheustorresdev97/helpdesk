import { hash } from "bcrypt";
import {
  CreateTechnicianPayload,
  responseTechnicianSchema,
  UpdateTechnicianPayload,
} from "../schemas/technician.schema";
import { prisma } from "../configs/prisma.config";
import { AppError } from "@/utils/app-error";
import z from "zod";

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
        profilePhoto,
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

  async update(id: string, payload: UpdateTechnicianPayload) {
    const { email, password, name, profilePhoto, availability } = payload;

    const hashedPassword = password ? await hash(password, 8) : undefined;

    const data = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
        profilePhoto: profilePhoto ?? "",
        availability: {
          deleteMany: {},
          create: availability.map((time) => ({ time })),
        },
      },

      select: {
        id: true,
        name: true,
        email: true,
        profilePhoto: true,
        role: true,
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

    const technician = responseTechnicianSchema.parse({
      ...data,
      availability: data.availability.map((a) => a.time),
    });

    return technician;
  }

  async index() {
    const responseTechnicianArraySchema = z.array(responseTechnicianSchema);
    const data = await prisma.user.findMany({
      include: { availability: true },
    });

    const technicians = data.map((tech) => ({
      ...tech,
      availability: tech.availability.map((a) => a.time),
    }));

    return responseTechnicianArraySchema.parse(technicians);
  }
}
