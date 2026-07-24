const reportService = require("../services/report.service");

const getReport = async (req, res) => {

    const { fecha } = req.query;

    const reporte = await reportService.generateReport(fecha);

    res.json(reporte);

};

module.exports = {
    getReport,
};