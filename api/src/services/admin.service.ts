import { hash } from "bcrypt";
import { prisma } from "@/configs/prisma.config";
import { AppError } from "@/utils/app-error";
import { CreateAdminPayload } from "@/schemas/admin.schema";
import { responseTechnicianSchema, UpdateTechnicianByAdminPayload } from "@/schemas/technician.schema";

export class AdminService {
  async create(payload: CreateAdminPayload) {
    const { email, password, name, profilePhoto } = payload;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new AppError("Email já cadastrado.");
    }

    const hashedPassword = await hash(password, 8);

    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "ADMIN",
        profilePhoto: profilePhoto ?? null,
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

    return admin;
  }

  async update(id: string, payload: UpdateTechnicianByAdminPayload) {
    const { email, password, name, profilePhoto, availability } = payload;

    const hashedPassword = password ? await hash(password, 8) : undefined;

    const parsedAvailability = availability.map((t) =>
      t instanceof Date ? t : new Date(t)
    );

    await prisma.availability.deleteMany({
      where: { userId: id },
    });

    const data = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
        profilePhoto: profilePhoto ?? "",
        availability: {
          create: parsedAvailability.map((time) => ({ time })),
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
        availability: { select: { id: true, time: true } },
      },
    });

    const technician = responseTechnicianSchema.parse({
      ...data,
      availability: data.availability.map((a) => a.time),
    });

    return technician;
  }
}