import { Route, Routes } from "react-router";
import { AppLayout } from "../layouts/app.layout";
import { Ticket } from "../pages/Ticket";
import { NotFound } from "../pages/NotFound";

export function TechnicianRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Ticket />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
