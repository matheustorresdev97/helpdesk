import { prisma } from "../configs/prisma.config";
import { AppError } from "./app-error";

export async function getTechnicianWithLessOpenTickets(): Promise<string> {
  const technicians = await prisma.user.findMany({
    where: { role: "TECHNICIAN" },
    select: { id: true },
  });

  if (technicians.length === 0) {
    throw new AppError("Nenhum técnico disponível");
  }

  const tickets = await prisma.ticket.groupBy({
    by: ["technicianId"],
    where: { status: "OPEN" },
    _count: { technicianId: true },
  });

  const ticketCountMap = new Map<string, number>();
  tickets.forEach((t: any) => {
    ticketCountMap.set(t.technicianId, t._count.technicianId);
  });

  let minCount = Infinity;
  let selectedTechnicians: string[] = [];

  technicians.forEach((t: any) => {
    const count = ticketCountMap.get(t.id) ?? 0;

    if (count < minCount) {
      minCount = count;
      selectedTechnicians = [t.id];
    } else if (count === minCount) {
      selectedTechnicians.push(t.id);
    }
  });

  const randomIndex = Math.floor(Math.random() * selectedTechnicians.length);
  return selectedTechnicians[randomIndex];
}
