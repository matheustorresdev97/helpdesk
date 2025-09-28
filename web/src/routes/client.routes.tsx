import { Route, Routes } from "react-router";
import { AppLayout } from "../layouts/app.layout";
import { AddTicket } from "../pages/AddTicket";
import { Ticket } from "../pages/Ticket";
import { NotFound } from "../pages/NotFound";

export function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Ticket />} />
        <Route path="/tickets" element={<AddTicket />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
