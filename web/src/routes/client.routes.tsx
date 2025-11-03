import { Route, Routes } from "react-router";
import { AppLayout } from "../layouts/app.layout";
import { Ticket } from "../pages/ticket";
import { AddTicket } from "../pages/add-ticket";
import { NotFound } from "../pages/not-found";
import { TicketDetails } from "../pages/ticket-details";

export function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index path="/" element={<Ticket />} />
        <Route path="/ticket/new" element={<AddTicket />} />
        <Route path="/ticket" element={<TicketDetails />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
