import { Router } from "express";

import { sessionRoutes } from "./session.routes";
import { technicianRoutes } from "./technician.routes";
import { clientRoutes } from "./client.routes";
import { ticketRoutes } from "./ticket.routes";
import { serviceRoutes } from "./service.routes";
import { adminRoutes } from "./admin.routes";
import { uploadRoutes } from "./uploads.routes";

const routes = Router();

routes.use("/sessions", sessionRoutes);
routes.use("/technicians", technicianRoutes);
routes.use("/clients", clientRoutes);
routes.use("/tickets", ticketRoutes);
routes.use("/services", serviceRoutes);
routes.use("/admin", adminRoutes);
routes.use("/uploads", uploadRoutes);

export { routes };
