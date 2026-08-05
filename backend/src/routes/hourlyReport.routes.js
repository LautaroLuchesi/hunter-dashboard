const express = require("express");

const router = express.Router();

const hourlyReportController = require("../controllers/hourlyReport.controller");

router.get("/", hourlyReportController.getHourlyReport);

module.exports = router;