const express = require("express");
const cors = require("cors");

const reportRoutes = require("./routes/report.routes");
const hourlyReportRoutes = require("./routes/hourlyReport.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Hunter funcionando");
});

app.use("/api/report", reportRoutes);
app.use("/api/hourly-report", hourlyReportRoutes);
module.exports = app;