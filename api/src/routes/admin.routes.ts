import { Router } from "express";
import { AdminController } from "@/controllers/admin.controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyAuthorization } from "@/middlewares/verify-authorization";

const adminRoutes = Router();
const adminController = new AdminController();

adminRoutes.post("/", adminController.create);

adminRoutes.use(ensureAuthenticated);

adminRoutes.put(
  "/:id/technician",
  verifyAuthorization(["ADMIN"]),
  adminController.update
);

export { adminRoutes };
