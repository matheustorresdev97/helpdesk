import { Request, Response } from "express";
import { ClientService } from "@/services/client.service";
import {
  createClientSchema,
  updateClientSchema,
} from "@/schemas/client.schema";
import { paginationSchema } from "@/schemas/pagination.schema";

const clientService = new ClientService();

export class ClientController {
  async create(request: Request, response: Response) {
    try {
      const payload = createClientSchema.parse(request.body);

      const admin = await clientService.create(payload);

      return response.status(201).json(admin);
    } catch (error) {
      error;
    }
  }

  async update(request: Request, response: Response) {
    try {
      const payload = updateClientSchema.parse(request.body);
      const { id } = request.params;
      const client = await clientService.update(id, payload);

      return response.json(client);
    } catch (error) {
      error;
    }
  }

  async index(request: Request, response: Response) {
    try {
      const { page, perPage } = paginationSchema.parse(request.query);
      const clients = await clientService.index(page, perPage);

      return response.json(clients);
    } catch (error) {
      error;
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const client = await clientService.show(id);

      return response.json(client);
    } catch (error) {
      error;
    }
  }
}
