import { Route, Routes } from "react-router";
import { AppLayout } from "../layouts/app.layout";
import { Tickets } from "../pages/tickets";

export function ClientRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<Tickets />} />
            </Route>
        </Routes>
    );
}