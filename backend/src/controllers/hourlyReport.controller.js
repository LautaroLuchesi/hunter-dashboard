const hourlyReportService = require("../services/hourlyReport.service");

const getHourlyReport = async (req, res) => {

    const { fecha } = req.query;

    const reporte = await hourlyReportService.generateHourlyReport(fecha);

    res.json(reporte);

};

module.exports = {
    getHourlyReport
};