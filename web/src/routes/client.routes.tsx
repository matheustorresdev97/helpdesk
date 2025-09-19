import { Route, Routes } from "react-router";
import { AppLayout } from "../layouts/app.layout";
import { Ticket } from "../pages/ticket";
import { NotFound } from "../pages/not-found";
import { AddTicket } from "../pages/add-ticket";

export function ClientRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<Ticket />} />
                <Route path="/tickets" element={<AddTicket />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}