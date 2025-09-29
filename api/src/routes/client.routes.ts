import { Router } from "express";
import { ClientController } from "../controllers/client.controller";
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { verifyAuthorization } from '../middleware/verify-authorization';

const clientRoutes = Router();
const clientController = new ClientController();

clientRoutes.post("/", clientController.create);
clientRoutes.use(ensureAuthenticated);
clientRoutes.put('/:id', verifyAuthorization(['ADMIN', 'CLIENT']), clientController.update);
clientRoutes.get('/', verifyAuthorization(['ADMIN']), clientController.index);
clientRoutes.get('/:id', verifyAuthorization(['ADMIN', 'CLIENT']), clientController.show);
clientRoutes.delete('/:id', verifyAuthorization(['ADMIN']), clientController.delete);

export { clientRoutes };
