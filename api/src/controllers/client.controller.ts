import { Request, Response } from "express";
import { createClientSchema } from "../schemas/client.schema";
import { ClientService } from "../services/client.service";

const clientService = new ClientService();

export class ClientController {
  async create(request: Request, response: Response) {
    const payload = createClientSchema.parse(request.body);
    const client = await clientService.create(payload);

    return response.status(201).json(client);
  }
}
