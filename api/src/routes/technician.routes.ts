import { Router } from "express";

import { ensureAuthenticated } from "../middleware/ensure-authenticated";
import { TechnicianController } from "../controllers/technician.controller";
import { verifyAuthorization } from "../middleware/verify-authorization";

const technicianRoutes = Router();
const technicianController = new TechnicianController();

technicianRoutes.use(ensureAuthenticated);

technicianRoutes.get(
  "/",
  verifyAuthorization(["ADMIN"]),
  technicianController.index
);
technicianRoutes.post(
  "/",
  verifyAuthorization(["ADMIN"]),
  technicianController.create
);
technicianRoutes.put(
  "/:id",
  verifyAuthorization(["TECHNICIAN", "ADMIN"]),
  technicianController.update
);
technicianRoutes.patch(
  "/:id",
  verifyAuthorization(["TECHNICIAN"]),
  technicianController.updatePassword
);

export { technicianRoutes };
