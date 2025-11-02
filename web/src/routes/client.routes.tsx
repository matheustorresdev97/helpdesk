import { Route, Routes } from "react-router";
import { ClientDashboard } from "../pages/client-dashboard";


export function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ClientDashboard />} />
    </Routes>
  );
}
