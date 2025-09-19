import { Route, Routes } from "react-router";

import { AppLayout } from "../layouts/app.layout";

import { TicketDetails } from "../pages/ticket-details";
import { NotFound } from "../pages/not-found";
import { TechnicianDashboard } from "../pages/technician-dashboard";

export function TechnicianRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<TechnicianDashboard />} />
        <Route path="/ticket" element={<TicketDetails />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
