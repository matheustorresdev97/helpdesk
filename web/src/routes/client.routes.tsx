import { Route, Routes } from "react-router";
import { AppLayout } from "../layouts/app.layout";
import { Ticket } from "../pages/ticket";
import { CreateTicket } from "../pages/create-ticket";
import { NotFound } from "../pages/not-found";
import { TicketDetails } from "../pages/ticket-details";

export function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Ticket />} />
        
        <Route path="tickets/new" element={<CreateTicket />} />
        
        <Route path="ticket/:id" element={<TicketDetails />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}