import { Routes, Route } from "react-router";
import { AdminDashboard } from "../pages/admin-dashboard";

export function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard />} />
        </Routes>
    );
}