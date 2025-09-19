import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/useAuth";

import { AdminRoutes } from "./admin.routes";
import { TechnicianRoutes } from "./technician.routes";
import { ClientRoutes } from "./client.routes";

import { Loading } from "../components/Loading";

export function Routes() {
  const { session, isLoading } = useAuth();


  function Route() {
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
