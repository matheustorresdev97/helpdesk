import { Router } from "express";

import { adminRoutes } from "./admin.routes";
import { technicianRoutes } from "./technician.routes";
import { sessionRoutes } from "./session.routes";
import { clientRoutes } from "./client.routes";
import { serviceRoutes } from "./service.routes";

const routes = Router();

routes.use("/admins", adminRoutes);
routes.use("/technicians", technicianRoutes);
routes.use("/clients", clientRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/services", serviceRoutes);


export { routes };
