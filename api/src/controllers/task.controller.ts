import { Request, Response } from "express";
import { TaskService } from "@/services/task.service";

const taskService = new TaskService();

export class TaskController {
  async create(request: Request, response: Response) {
    try {
      const payload = await taskService.create();
      return response.json(payload);
    } catch (error) {
      error;
    }
  }
}
