const monthlyReportService = require("../services/monthlyReport.service");

const getMonthlyReport = async (req, res) => {

    const { mes } = req.query;

    const reporte =
        await monthlyReportService.generateMonthlyReport(mes);

    res.json(reporte);

};

module.exports = {
    getMonthlyReport
};