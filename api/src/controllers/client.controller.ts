import { Request, Response } from "express";
import { ClientService } from "@/services/client.service";
import { createClientSchema } from "@/schemas/client.schema";

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
}
