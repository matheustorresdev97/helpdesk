import { Routes, Route } from "react-router";

import { AppLayout } from "../layouts/app.layout";
import { Tickets } from "../pages/tickets";

export function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<Tickets />} />
            </Route>
        </Routes>
    );
}