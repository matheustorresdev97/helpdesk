import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";
import { verifyAuthorization } from "../middlewares/verify-authorization";

const ticketRoutes = Router();
const ticketController = new TicketController();

ticketRoutes.use(ensureAuthenticated);

ticketRoutes.post('/', verifyAuthorization(['CLIENT']), ticketController.create);
ticketRoutes.get('/', ticketController.index);
ticketRoutes.patch('/:id', ticketController.updateStatus);


export { ticketRoutes };
