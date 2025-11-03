import { prisma } from "../configs/prisma.config";
import {
  CreateTicketPayload,
  responseTicketSchema,
} from "@/schemas/ticket.schema";
import { getTechnicianWithLessOpenTickets } from "../utils/assign-technician";
import { normalizeTickets } from "@/utils/normalize-ticket";
import z from "zod";

export class TicketService {
  async create(payload: CreateTicketPayload) {
    const { title, description, clientId, services } = payload;
    const technicianId = await getTechnicianWithLessOpenTickets();

    const data = await prisma.ticket.create({
      data: {
        title,
        description,
        client: { connect: { id: clientId } },
        technician: { connect: { id: technicianId } },
        services: {
          connect: services.map((serviceId: string) => ({ id: serviceId })),
        },
      },
      include: {
        client: true,
        technician: true,
        services: true,
      },
    });

    const normalized = normalizeTickets([data])[0];

    const ticket = responseTicketSchema.parse(normalized);

    return ticket;
  }

  async index(page: number, perPage: number, user: any) {
    const responseTicketArraySchema = z.array(responseTicketSchema);

    const skip = (page - 1) * perPage;

    let where: any = {};
    if (user.role === "CLIENT") {
      where.clientId = user.id;
    } else if (user.role === "TECHNICIAN") {
      where.technicianId = user.id;
    }

    const data = await prisma.ticket.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { createdAt: "asc" },
      include: {
        client: { select: { id: true, name: true } },
        technician: { select: { id: true, name: true } },
        services: { select: { id: true, title: true, value: true } },
      },
    });

    const totalRecords = await prisma.ticket.count();
    const totalPages = Math.ceil(totalRecords / perPage);
    const pagination = {
      page,
      perPage,
      totalRecords,
      totalPages: totalPages > 0 ? totalPages : 1,
    };

    const normalized = normalizeTickets(data);

    const tickets = responseTicketArraySchema.parse(normalized);

    return { tickets, pagination };
  }
}
