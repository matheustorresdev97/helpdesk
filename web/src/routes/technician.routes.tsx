import { Route, Routes } from "react-router";
import { TechnicianDashboard } from "../pages/technician-dashboard";


export function TechnicianRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TechnicianDashboard />} />
    </Routes>
  );
}
