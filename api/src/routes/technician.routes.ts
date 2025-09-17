import { Router } from "express";
import { TechnicianController } from "../controller/technician.controller";
import { ensureAuthenticated } from "../middleware/ensure-authenticated";

const technicianRoutes = Router();
const technicianController = new TechnicianController();

technicianRoutes.use(ensureAuthenticated);

technicianRoutes.post("/", technicianController.create);

export { technicianRoutes };
