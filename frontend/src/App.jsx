import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import HourlyReport from "./pages/HourlyReport";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/hourly-report"
                    element={<HourlyReport />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;