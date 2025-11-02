import { Request, Response } from "express";
import { ServiceService } from "@/services/service.service";
import {
  createServiceSchema,
  updateServiceSchema,
} from "@/schemas/service.schema";

const serviceService = new ServiceService();

export class ServiceController {
  async create(request: Request, response: Response) {
    try {
      const payload = createServiceSchema.parse(request.body);
      const service = await serviceService.create(payload);

      return response.status(201).json(service);
    } catch (error) {
      error;
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const payload = updateServiceSchema.parse(request.body);
      const service = await serviceService.update(id, payload);

      return response.json(service);
    } catch (error) {
      error;
    }
  }

  async index(request: Request, response: Response) {
    try {
      const services = await serviceService.index();

      return response.json(services);
    } catch (error) {
      error;
    }
  }
}
