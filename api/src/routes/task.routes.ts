import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post("/", taskController.create);

export { taskRoutes };
