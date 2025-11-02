import { Router } from "express";
import { AdminController } from "@/controllers/admin.controller";

const adminRoutes = Router();
const adminController = new AdminController();

adminRoutes.post("/", adminController.create);

export { adminRoutes };
