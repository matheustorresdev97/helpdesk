import { MainLayout } from "./main.layout";
import { SidebarLayout } from "./sidebar.layout";

export function AppLayout() {
  return (
    <div className="grid grid-cols-[200px_1fr] w-full min-h-screen bg-gray-100">
      <SidebarLayout />
      <MainLayout />
    </div>
  );
}
