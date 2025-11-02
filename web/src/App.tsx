import { AuthProvider } from "./context/auth.context";
import { Routes } from "./routes";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
