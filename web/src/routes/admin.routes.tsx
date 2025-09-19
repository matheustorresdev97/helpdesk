import { Routes, Route } from "react-router";

import { AppLayout } from "../layouts/app.layout";

import { Ticket } from "../pages/ticket";
import { Technician } from "../pages/admin/technician";
import { Client } from "../pages/admin/client";
import { Service } from "../pages/admin/service";

import { NotFound } from "../pages/not-found";
import { TechnicianForm } from "../components/TechnicianForm";
import { TicketDetails } from "../pages/ticket-details";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Ticket />} />
        <Route path="/technicians" element={<Technician />} />
        <Route path="/technicians/:mode" element={<TechnicianForm />} />
        <Route path="/clients" element={<Client />} />
        <Route path="/services" element={<Service />} />
        <Route path="/ticket" element={<TicketDetails />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
