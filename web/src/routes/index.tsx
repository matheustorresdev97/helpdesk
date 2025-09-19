import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/useAuth";

import { AdminRoutes } from "./admin.routes";
import { TechnicianRoutes } from "./technician.routes";
import { ClientRoutes } from "./client.routes";

export function Routes() {
  function Route() {
    const { session, isLoading } = useAuth();
    switch (session?.user.role) {
      case 'ADMIN':
        return <AdminRoutes />;
      case 'CLIENT':
        return <ClientRoutes />;
      case 'TECHNICIAN':
        return <TechnicianRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
