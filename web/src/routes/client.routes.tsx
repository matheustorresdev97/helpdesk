import { Route, Routes } from "react-router";
import { AppLayout } from "../layouts/app.layout";
import { CreateTicket } from "../pages/CreateTicket";
import { Ticket } from "../pages/Ticket";
import { NotFound } from "../pages/NotFound";
import { TicketDetails } from "../pages/TicketDetails";

export function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Ticket />} />
        <Route path="/ticket/new" element={<CreateTicket />} />
        <Route path="/ticket" element={<TicketDetails />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
