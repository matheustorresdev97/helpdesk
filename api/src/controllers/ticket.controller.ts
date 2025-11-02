import { Request, Response } from "express";
import { createTicketSchema } from "../schemas/ticket.schema";
import { TicketService } from "../services/ticket.service";

const taskService = new TicketService();

export class TicketController {
  async create(request: Request, response: Response) {
    try {
      const payload = createTicketSchema.parse(request.body);
      const ticket = await taskService.create(payload);

      return response.json(ticket);
    } catch (error) {
      error;
    }
  }
}
