import { Router } from "express";
import { ClientController } from "../controllers/client.controller";
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { verifyAuthorization } from '../middlewares/verify-authorization';
import multer from "multer";
import uploadConfig from '../configs/upload';

const clientRoutes = Router();
const clientController = new ClientController();

const upload = multer(uploadConfig.MULTER);


clientRoutes.post("/", clientController.create);
clientRoutes.use(ensureAuthenticated);
clientRoutes.put(
  '/:id',
  verifyAuthorization(['ADMIN', 'CLIENT']),
  upload.single('file'),
  clientController.update,
);
clientRoutes.get('/', verifyAuthorization(['ADMIN']), clientController.index);
clientRoutes.get('/:id', verifyAuthorization(['ADMIN', 'CLIENT']), clientController.show);
clientRoutes.delete('/:id', verifyAuthorization(['ADMIN']), clientController.delete);
clientRoutes.patch('/:id', verifyAuthorization(['CLIENT']), clientController.updatePassword);


export { clientRoutes };
