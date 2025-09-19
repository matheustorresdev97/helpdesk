import { hash } from "bcrypt";
import { CreateClientPayload, responseClientSchema } from "../schema/client.schema";
import { prisma } from "../database/prisma";

export class ClientService {
  async create(payload: CreateClientPayload) {
    const { email, password, name } = payload;

    const hashedPassword = await hash(password, 8);

    const data = await prisma.client.create({
      data: {
        profilePhoto: '',
        name,
        email,
        password: hashedPassword,
        role: 'CLIENT',
      },
    });

    const { password: _, ...userWithoutPassword } = data;


    const client = responseClientSchema.parse(userWithoutPassword);

    return client;
  }
}
