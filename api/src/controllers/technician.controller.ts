import { Request, Response } from "express";
import { TechnicianService } from "../services/technician.service";
import {
  createTechnicianSchema,
  updateTechnicianSchema,
} from "../schemas/technician.schema";
import { paginationSchema } from "@/schemas/pagination.schema";

const technicianService = new TechnicianService();

export class TechnicianController {
  async create(request: Request, response: Response) {
    try {
      const payload = createTechnicianSchema.parse(request.body);

      const technician = await technicianService.create(payload);

      return response.status(201).json(technician);
    } catch (error) {
      error;
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const payload = updateTechnicianSchema.parse(request.body);

      const technician = await technicianService.update(id, payload);

      return response.json(technician);
    } catch (error) {
      error;
    }
  }

  async index(request: Request, response: Response) {
    try {
      const { page, perPage } = paginationSchema.parse(request.query);
      const technicians = await technicianService.index(page, perPage);

      return response.json(technicians);
    } catch (error) {
      error;
    }
  }
}
