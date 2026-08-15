const express = require("express");

const router = express.Router();

const monthlyReportController =
    require("../controllers/monthlyReport.controller");

router.get(
    "/",
    monthlyReportController.getMonthlyReport
);

module.exports = router;