import { hash } from "bcrypt";
import z from "zod";
import {
  CreateTechnicianPayload,
  responseTechnicianSchema,
} from "../schemas/technician.schema";
import { prisma } from "../config/prisma.config";

export class TechnicianService {
  async create(payload: CreateTechnicianPayload) {
    const { email, password, name, availability } = payload;

    const hashedPassword = await hash(password, 8);

    const data = await prisma.technician.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "TECHNICIAN",
        availability: {
          create: availability.map((time) => ({ time })),
        },
      },
      include: { availability: true },
    });

    const { password: _, ...userWithoutPassword } = data;
    const technician = responseTechnicianSchema.parse({
      ...userWithoutPassword,
      availability: userWithoutPassword.availability.map((a) => a.time),
    });

    return technician;
  }

  async index() {
    const responseTechnicianArraySchema = z.array(responseTechnicianSchema);
    const data = await prisma.technician.findMany({
      include: { availability: true },
    });

    const technicians = data.map((tech) => ({
      ...tech,
      availability: tech.availability.map((a) => a.time),
    }));

    return responseTechnicianArraySchema.parse(technicians);
  }
}
