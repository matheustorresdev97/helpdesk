import { Request, Response } from "express";
import { TechnicianService } from "../services/technician.service";
import { createTechnicianSchema } from "../schemas/technician.schema";

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
}
