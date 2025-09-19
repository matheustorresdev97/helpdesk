import { hash } from "bcrypt";
import { CreateClientPayload, responseClientSchema, UpdateClientPayload } from "../schema/client.schema";
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

  async update(id: string, payload: UpdateClientPayload) {
    const { email, password, name, profilePhoto } = payload;
    const hashedPassword = password ? await hash(password, 8) : undefined;

    const data = await prisma.client.update({
      where: { id },
      data: {
        profilePhoto: profilePhoto ?? '',
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    const { password: _, ...userWithoutPassword } = data;
    const client = responseClientSchema.parse(userWithoutPassword);

    return client;
  }
}
