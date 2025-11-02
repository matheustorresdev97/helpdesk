import { Request, Response } from "express";
import { createAdminSchema } from "@/schemas/admin.schema";
import { AdminService } from "@/services/admin.service";

const adminService = new AdminService();

export class AdminController {
  async create(request: Request, response: Response) {
    try {
      const payload = createAdminSchema.parse(request.body);

      const admin = await adminService.create(payload);

      return response.status(201).json(admin);
    } catch (error) {
      error;
    }
  }
}
