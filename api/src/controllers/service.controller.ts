import { Request, Response } from "express";
import {
  createServiceSchema,
  updateServiceSchema,
} from "../schemas/service.schema";
import { ServiceService } from "../services/service.service";
import { paginationSchema } from "../schemas/pagination.schema";

const serviceService = new ServiceService();

export class ServiceController {
  async create(request: Request, response: Response) {
    const payload = createServiceSchema.parse(request.body);
    const service = await serviceService.create(payload);

    return response.status(201).json(service);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const payload = updateServiceSchema.parse(request.body);
    const service = await serviceService.update(id, payload);

    return response.json(service);
  }

  async index(request: Request, response: Response) {
    const { page, perPage } = paginationSchema.parse(request.query);
    const services = await serviceService.index(page, perPage);

    return response.json(services);
  }
}
