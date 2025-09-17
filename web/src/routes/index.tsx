import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  function Route() {
    return <AuthRoutes />;
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
