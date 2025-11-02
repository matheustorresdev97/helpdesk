import { Route, Routes } from "react-router";
import { AppLayout } from "../layouts/app.layout";
import { Ticket } from "../pages/ticket";
import { Technician } from "../pages/adm/technician";
import { Client } from "../pages/adm/client";
import { Service } from "../pages/adm/service";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Ticket />} />
        <Route path="/technicians" element={<Technician />} />
        <Route path="/clients" element={<Client />} />
        <Route path="/services" element={<Service />} />
      </Route>
    </Routes>
  );
}
