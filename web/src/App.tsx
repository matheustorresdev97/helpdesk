import { AuthProvider } from "./contexts/auth.context";
import { AuthLayout } from "./layouts/auth.layout";

export default function App() {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
}
