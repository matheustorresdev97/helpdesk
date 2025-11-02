import { hash } from "bcrypt";
import {
  CreateTechnicianPayload,
} from "../schemas/technician.schema";
import { prisma } from "../configs/prisma.config";
import { AppError } from "@/utils/app-error";

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
      include: {
        availability: {
          select: {
            id: true,
            time: true,
          },
        },
      },
    });

    const { password: _, ...technicianWithoutPassword } = technician;

    return {
      ...technicianWithoutPassword,
      availability: technicianWithoutPassword.availability.map((a) => a.time),
    };
  }
}
