import { Request, Response } from "express";
import { createTicketSchema } from "../schemas/ticket.schema";
import { TicketService } from "../services/ticket.service";
import { paginationSchema } from "@/schemas/pagination.schema";

const taskService = new TicketService();

export class TicketController {
  async create(request: Request, response: Response) {
    try {
      const payload = createTicketSchema.parse(request.body);
      const ticket = await taskService.create(payload);

      return response.status(201).json(ticket);
    } catch (error) {
      error;
    }
  }

  async index(request: Request, response: Response) {
    try {
      const { page, perPage } = paginationSchema.parse(request.query);
      const { user } = request;
      const tickets = await taskService.index(page, perPage, user);

      return response.json(tickets);
    } catch (error) {
      error;
    }
  }
}
