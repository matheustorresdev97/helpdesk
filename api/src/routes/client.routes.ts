import { Router } from "express";
import { ClientController } from "@/controllers/client.controller";

const clientRoutes = Router();
const clientController = new ClientController();

clientRoutes.post("/", clientController.create);

export { clientRoutes };