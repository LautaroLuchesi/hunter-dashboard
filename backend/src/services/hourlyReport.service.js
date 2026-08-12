const googleSheetsService = require("./googleSheets.service");
const { parseInboundHour } = require("../parsers/inboundHour.parser");
const { parseGoogleHour } = require("../parsers/googleHour.parser");
const { parseFacebookHour } = require("../parsers/facebookHour.parser");
const { parseFormsHour } = require("../parsers/formsHour.parser");
const { buildHourlyReport, buildHourlyAdvisorReport } = require("./hourlyBuilder.service");
const { parsePresentismo } = require("../parsers/presentismo.parser");
const { parseTurnos } = require("../parsers/turnos.parser");

const generateHourlyReport = async (fechaSeleccionada) => {

    const [
        inboundSheet,
        googleSheet,
        facebookSheet,
        formsSheet,
        presentismoSheet,
        turnosSheet
    ] = await Promise.all([

        googleSheetsService.readSheet("Crudo_Inbound!A:Q"),

        googleSheetsService.readSheet("Crudo_Google!A:M"),

        googleSheetsService.readSheet("Crudo_Facebook!A:M"),

        googleSheetsService.readSheet("Crudo_Forms!A:K"),

        googleSheetsService.readSheet("PRESENTISMO!A:E"),

        googleSheetsService.readSheet("PRESENTISMO!O:P")

    ]);

    const inbound = parseInboundHour(inboundSheet);

    const google = parseGoogleHour(googleSheet);

    const facebook = parseFacebookHour(facebookSheet);

    const forms = parseFormsHour(formsSheet);

    const presentismo = parsePresentismo(presentismoSheet);

    const turnos = parseTurnos(turnosSheet);

    const fechas = [
        ...new Set([
            ...inbound.map(r => r.fecha),
            ...google.map(r => r.fecha),
            ...facebook.map(r => r.fecha),
            ...forms.map(r => r.fecha)
        ])
    ].filter(Boolean).sort((a, b) => {

        return new Date(a) - new Date(b);

    });

    const presentismoMap = new Map();

    presentismo.forEach((registro) => {

        if (!presentismoMap.has(registro.idAsesor)) {

            presentismoMap.set(registro.idAsesor, {

                nombre: registro.nombreAsesor,

                turno: registro.turno

            });

        }

    });
    console.log(
        presentismoMap.get("1354")
    );

    const fechaFinal = fechaSeleccionada || fechas[fechas.length - 1];

    const grafico = buildHourlyReport({

        inbound,

        google,

        facebook,

        forms,

        turnos,

        fecha: fechaFinal

    });

    const asesores = buildHourlyAdvisorReport({

        inbound,

        google,

        facebook,

        forms,

        turnos,

        presentismo,

        fecha: fechaFinal

    });

    console.log({
        fecha: fechaFinal,
        fechas: fechas.length,
        grafico: grafico.length,
        asesores: asesores.length
    });

    return {

        fecha: fechaFinal,

        fechas,

        grafico,

        asesores

    };

};

module.exports = {
    generateHourlyReport
};