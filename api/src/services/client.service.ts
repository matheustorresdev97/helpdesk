import { hash } from "bcrypt";
import {
  CreateClientPayload,
  responseClientSchema,
} from "../schemas/client.schema";
import { prisma } from "../config/prisma.config";

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

    const { password: _, ...userWithoutPassword } = data;

    const client = responseClientSchema.parse(userWithoutPassword);

    return client;
  }
}
