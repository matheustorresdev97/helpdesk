import { BrowserRouter } from "react-router";
import { useAuth } from "../hooks/useAuth";

import { TechnicianRoutes } from "./technician.routes";
import { AuthRoutes } from "./auth.routes";
import { AdminRoutes } from "./admin.routes";
import { ClientRoutes } from "./client.routes";

export function Routes() {
  function Route() {
    const { session } = useAuth();

    switch (session?.user.role) {
      case "ADMIN":
        return <AdminRoutes />;
      case "CLIENT":
        return <ClientRoutes />;
      case "TECHNICIAN":
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
