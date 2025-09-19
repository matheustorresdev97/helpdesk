import { Request, Response } from "express";
import { paginationSchema } from '../schema/pagination.schema';
import { TechnicianService } from "../service/technician.service";
import { createTechnicianSchema } from "../schema/technician.schema";

const technicianService = new TechnicianService();

export class TechnicianController {
  async create(request: Request, response: Response) {
    const payload = createTechnicianSchema.parse(request.body);
    const technician = await technicianService.create(payload);

    return response.status(201).json(technician);
  }

  async index(request: Request, response: Response) {
    const { page, perPage } = paginationSchema.parse(request.query);
    const technicians = await technicianService.index(page, perPage);

    return response.json(technicians);
  }
}
