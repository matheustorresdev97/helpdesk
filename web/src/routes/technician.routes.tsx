import { Route, Routes } from "react-router";

import { AppLayout } from "../layouts/app.layout";
import { Tickets } from "../pages/tickets";

export function TechnicianRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<Tickets />} />
            </Route>
        </Routes>
    );
}