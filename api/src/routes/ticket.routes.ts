import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller";
import { ensureAuthenticated } from "../middleware/ensure-authenticated";
import { verifyAuthorization } from "../middleware/verify-authorization";

const ticketRoutes = Router();
const ticketController = new TicketController();

ticketRoutes.use(ensureAuthenticated);

ticketRoutes.post('/', verifyAuthorization(['CLIENT']), ticketController.create);

export { ticketRoutes };
