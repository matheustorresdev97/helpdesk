import { Router } from "express";

import { sessionRoutes } from "./session.routes";
import { technicianRoutes } from "./technician.routes";
import { clientRoutes } from "./client.routes";
import { taskRoutes } from "./task.routes";
import { serviceRoutes } from "./service.routes";

const routes = Router();
routes.use("/sessions", sessionRoutes);
routes.use("/technicians", technicianRoutes);
routes.use("/clients", clientRoutes);
routes.use("/tasks", taskRoutes);
routes.use("/services", serviceRoutes);

export { routes };
