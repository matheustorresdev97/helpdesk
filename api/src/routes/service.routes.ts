import { Router } from "express";
import { ServiceController } from "@/controllers/service.controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyAuthorization } from "@/middlewares/verify-authorization";

const serviceRoutes = Router();
const serviceController = new ServiceController();

serviceRoutes.use(ensureAuthenticated);

serviceRoutes.get("/", serviceController.index);
serviceRoutes.post(
  "/",
  verifyAuthorization(["ADMIN"]),
  serviceController.create
);
serviceRoutes.put(
  "/:id",
  verifyAuthorization(["ADMIN"]),
  serviceController.update
);

export { serviceRoutes };
