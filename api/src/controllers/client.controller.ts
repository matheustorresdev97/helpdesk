import { Request, Response } from "express";
import {
  createClientSchema,
  updateClientSchema,
} from "../schemas/client.schema";
import { ClientService } from "../services/client.service";
import { paginationSchema } from "../schemas/pagination.schema";
import { updatePasswordSchema } from '../schemas/user.schema';

const clientService = new ClientService();

export class ClientController {
  async create(request: Request, response: Response) {
    const payload = createClientSchema.parse(request.body);
    const client = await clientService.create(payload);

    return response.status(201).json(client);
  }

  async update(request: Request, response: Response) {
    const payload = updateClientSchema.parse(request.body);
    const { id } = request.params;
    const client = await clientService.update(id, payload);

    return response.json(client);
  }

  async index(request: Request, response: Response) {
    const { page, perPage } = paginationSchema.parse(request.query);
    const clients = await clientService.index(page, perPage);

    return response.json(clients);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const client = await clientService.show(id);

    return response.json(client);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    await clientService.delete(id);

      return response.status(204).end();
  }

    async updatePassword(request: Request, response: Response) {
    const payload = updatePasswordSchema.parse(request.body);
    const { id } = request.params;
    await clientService.updatePassword(id, payload);

    return response.end();
  }
}
