import { Route, Routes } from "react-router";
import { AuthLayout } from "../layouts/auth.layout";

import { SignIn } from "../pages/sign-in";
import { SignUp } from "../pages/sign-up";

import { NotFound } from "../pages/not-found";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
