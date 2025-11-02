import { Navigate, Route, Routes } from "react-router";

import { AuthLayout } from "../layouts/auth.layout";

import { SignIn } from "../pages/auth/signin";
import { SignUp } from "../pages/auth/signup";



export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}