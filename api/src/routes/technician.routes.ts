import { Router } from "express";

import { TechnicianController } from "../controllers/technician.controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyAuthorization } from "@/middlewares/verify-authorization";

const technicianRoutes = Router();
const technicianController = new TechnicianController();

technicianRoutes.use(ensureAuthenticated);

technicianRoutes.post("/", technicianController.create);
technicianRoutes.use(verifyAuthorization(["ADMIN"]));

export { technicianRoutes };
