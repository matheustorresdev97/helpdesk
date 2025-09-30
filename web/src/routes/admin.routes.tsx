import { Route, Routes } from "react-router";
import { AppLayout } from "../layouts/app.layout";
import { Ticket } from "../pages/Ticket";

import { Technician } from "../pages/adm/Technician";
import { Client } from "../pages/adm/Client";
import { Service } from "../pages/adm/Service";
import { TechnicianForm } from "../components/TechnicianForm";
import { TicketDetails } from "../pages/TicketDetails";

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
    </Routes>
  );
}
