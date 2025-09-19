import { Router } from 'express';

import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { verifyAuthorization } from '../middleware/verify-authorization';
import { TicketController } from '../controller/ticket.controller';

const ticketRoutes = Router();
const ticketController = new TicketController();

ticketRoutes.use(ensureAuthenticated);

ticketRoutes.post('/', verifyAuthorization(['CLIENT']), ticketController.create);

export { ticketRoutes };