import { Router } from "express";

import { TechnicianController } from "../controllers/technician.controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyAuthorization } from "@/middlewares/verify-authorization";

const technicianRoutes = Router();
const technicianController = new TechnicianController();

technicianRoutes.use(ensureAuthenticated);

technicianRoutes.get('/', verifyAuthorization(['ADMIN']), technicianController.index);
technicianRoutes.post('/', verifyAuthorization(['ADMIN']), technicianController.create);
technicianRoutes.put(
  '/:id',
  verifyAuthorization(['TECHNICIAN', 'ADMIN']),
  technicianController.update,
);

export { technicianRoutes };
