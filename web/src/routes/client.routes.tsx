import { Route, Routes } from "react-router";
import { AppLayout } from "../layouts/app.layout";
import { Ticket } from "../pages/ticket";
import { AddTicket } from "../pages/add-ticket";
import { NotFound } from "../pages/not-found";

export function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index path="/" element={<Ticket />} />
        <Route path="/tickets" element={<AddTicket />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
