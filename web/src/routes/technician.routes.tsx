import { Route, Routes } from "react-router";

import { AppLayout } from "../layouts/app.layout";

import { Ticket } from "../pages/ticket";
import { NotFound } from "../pages/not-found";

export function TechnicianRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<Ticket />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}