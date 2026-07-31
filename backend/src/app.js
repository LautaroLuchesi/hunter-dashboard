const express = require("express");
const cors = require("cors");

const reportRoutes = require("./routes/report.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Hunter funcionando");
});

app.use("/api/report", reportRoutes);

module.exports = app;