import { Router } from "express";

import { ensureAuthenticated } from "../middleware/ensure-authenticated";
import { verifyAuthorization } from "../middleware/verify-authorization";
import { TicketController } from "../controller/ticket.controller";

const ticketRoutes = Router();
const ticketController = new TicketController();

ticketRoutes.use(ensureAuthenticated);

ticketRoutes.post(
  "/",
  verifyAuthorization(["CLIENT"]),
  ticketController.create
);
ticketRoutes.get("/", ticketController.index);
ticketRoutes.patch("/:id/status", ticketController.updateStatus);
ticketRoutes.patch("/:id/services", ticketController.updateServices);

export { ticketRoutes };
