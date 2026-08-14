import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import HourlyReport from "./pages/HourlyReport";
import MonthlyReport from "./pages/MonthlyReport";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/hourly-report" element={<HourlyReport />} />
                <Route path="/monthly-report" element={<MonthlyReport />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;