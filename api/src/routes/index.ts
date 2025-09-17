import { Router } from "express";
import { sessionRoutes } from "./session.routes";
import { technicianRoutes } from "./technician.routes";
import { clientRoutes } from "./client.routes";

const routes = Router();
routes.use("/sessions", sessionRoutes);
routes.use("/technicians", technicianRoutes);
routes.use("/clients", clientRoutes);

export { routes };
