import { Request, Response } from "express";
import { createAdminSchema } from "@/schemas/admin.schema";
import { AdminService } from "@/services/admin.service";
import { ZodError } from "zod";
import { updateTechnicianSchema } from "@/schemas/technician.schema";
import { TechnicianService } from "@/services/technician.service";

const adminService = new AdminService();
const technicianService = new TechnicianService();

export class AdminController {
  async create(request: Request, response: Response) {
    try {
      const payload = createAdminSchema.parse(request.body);

      const admin = await adminService.create(payload);

      return response.status(201).json(admin);
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(400).json({
          message: "Erro de validação",
          errors: error.issues,
        });
      }

      return response.status(400).json({
        message: error instanceof Error ? error.message : "Erro desconhecido",
      });
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
}