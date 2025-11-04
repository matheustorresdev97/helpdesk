import { Request, Response } from "express";
import { createTicketSchema } from "../schemas/ticket.schema";
import { TicketService } from "../services/ticket.service";
import { paginationSchema } from "@/schemas/pagination.schema";
import z from "zod";

const ticketService = new TicketService();

export class TicketController {
  async create(request: Request, response: Response) {
    try {
      const payload = createTicketSchema.parse(request.body);
      const { user } = request;
      const ticket = await ticketService.create(payload, user);
      return response.status(201).json(ticket);
    } catch (error) {
      error;
    }
  }

  async index(request: Request, response: Response) {
    try {
      const { page, perPage } = paginationSchema.parse(request.query);
      const { user } = request;
      const tickets = await ticketService.index(page, perPage, user);

      return response.json(tickets);
    } catch (error) {
      error;
    }
  }

  async updateStatus(request: Request, response: Response) {
    try {
      const idSchema = z.coerce.number({ message: "Id de chamado inválido" });
      const id = idSchema.parse(request.params.id);

      const statusSchema = z.enum(["OPEN", "PROCESSING", "CLOSED"]);
      const status = statusSchema.parse(request.body.status);

      const ticket = await ticketService.updateStatus(id, status);

      return response.json(ticket);
    } catch (error) {
      error;
    }

  }

  async updateServices(request: Request, response: Response) {
    try {
      const idSchema = z.coerce.number({ message: "Id de chamado inválido" });
      const id = idSchema.parse(request.params.id);

      const { serviceId } = request.body;
      const ticket = await ticketService.updateServices(id, serviceId);

      return response.json(ticket);
    } catch (error) {
      error;
    }
  }
}
