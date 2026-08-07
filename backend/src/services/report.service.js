const googleSheetsService = require("./googleSheets.service");
const { parseDatos } = require("../parsers/datos.parser");
const { parseVentas } = require("../parsers/ventas.parser");
const { parseVtaFi } = require("../parsers/vtaFi.parser");
const { buildReport } = require("./reportBuilder.service");
const { buildDashboard } = require("./dashboard.service");
const { parsePresentismo } = require("../parsers/presentismo.parser");
const { parseTurnos } = require("../parsers/turnos.parser");

const generateReport = async (fechaSeleccionada) => {

    const [
        datosSheet,
        ventasSheet,
        vtaFiSheet,
        presentismoSheet,
        turnosSheet
    ] = await Promise.all([

        googleSheetsService.readSheet("Datos!A:S"),

        googleSheetsService.readSheet("Vta_Bruta!A:T"),

        googleSheetsService.readSheet("Vta_FI!A:D"),

        googleSheetsService.readSheet("PRESENTISMO!A:E"),

        googleSheetsService.readSheet("PRESENTISMO!O:P")

    ]);

    const datos = parseDatos(datosSheet);

    const ventas = parseVentas(ventasSheet);

    const fi = parseVtaFi(vtaFiSheet);

   

    const presentismo = parsePresentismo(presentismoSheet);

    const turnos = parseTurnos(turnosSheet);



    const reporte = buildReport({
        datos,
        ventas,
        fi,
        presentismo,
        turnos
    });

    const fechas = [...new Set(reporte.map(r => r.fecha))].sort();

    const fechaFinal = fechaSeleccionada || fechas[0];

    const dashboard = buildDashboard(
        reporte,
        fechaFinal
    );

    const asesores = reporte.filter(
        r => r.fecha === fechaFinal
    );

    console.table(
        asesores.map(a => ({
            fecha: a.fecha,
            skill: a.skill,
            id: a.idAsesor
        }))
    );

    const presentismoDia = presentismo.filter(
        p => p.fecha === fechaFinal
    );

    return {

        fechas,

        fecha: fechaFinal,

        dashboard,

        asesores,

        presentismo: presentismoDia

    };

};

module.exports = {
    generateReport
};