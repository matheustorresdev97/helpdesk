import { Router } from "express";

import { ensureAuthenticated } from "../middleware/ensure-authenticated";
import { TechnicianController } from "../controllers/technician.controller";
import { verifyAuthorization } from "../middleware/verify-authorization";

const technicianRoutes = Router();
const technicianController = new TechnicianController();

technicianRoutes.use(ensureAuthenticated);

technicianRoutes.post("/", technicianController.create);
technicianRoutes.use(verifyAuthorization(["ADMIN"]));

export { technicianRoutes };
