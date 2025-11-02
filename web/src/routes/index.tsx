import { BrowserRouter } from "react-router";
import { useAuth } from "../hooks/useAuth";

import { TechnicianRoutes } from "./technician.routes";
import { AuthRoutes } from "./auth.routes";
import { AdminRoutes } from "./admin.routes";
import { ClientRoutes } from "./client.routes";
import { Loading } from "../components/Loading";

export function Routes() {
  const { session, isLoading } = useAuth();

  function Route() {
    if (!session) {
      return <AuthRoutes />;
    }

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
