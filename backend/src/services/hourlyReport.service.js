const googleSheetsService = require("./googleSheets.service");
const { parseInboundHour } = require("../parsers/inboundHour.parser");
const { parseGoogleHour } = require("../parsers/googleHour.parser");
const { parseFacebookHour } = require("../parsers/facebookHour.parser");
const { parseFormsHour } = require("../parsers/formsHour.parser");
const { buildHourlyReport } = require("./hourlyBuilder.service");
const { parsePresentismo } = require("../parsers/presentismo.parser");

const generateHourlyReport = async (fechaSeleccionada) => {

    const [
        inboundSheet,
        googleSheet,
        facebookSheet,
        formsSheet,
        turnosSheet,
        presentismoSheet
    ] = await Promise.all([

        googleSheetsService.readSheet("Crudo_Inbound!A:Q"),

        googleSheetsService.readSheet("Crudo_Google!A:M"),

        googleSheetsService.readSheet("Crudo_Facebook!A:M"),

        googleSheetsService.readSheet("Crudo_Forms!A:K"),

        googleSheetsService.readSheet("PRESENTISMO!A:E")

    ]);

    const inbound = parseInboundHour(inboundSheet);

    const google = parseGoogleHour(googleSheet);

    console.log(
        google
            .filter(r => String(r.fecha).includes("31"))
            .slice(0, 20)
    );

    const facebook = parseFacebookHour(facebookSheet);

    console.log(
        facebook
            .filter(r => String(r.fecha).includes("31"))
            .slice(0, 20)
    );

    const forms = parseFormsHour(formsSheet);

    const presentismo = parsePresentismo(presentismoSheet);

    const fechas = [...new Set(inbound.map(r => r.fecha))]
        .sort((a, b) => {

            const [diaA, mesA, anioA] = a.split("/");
            const [diaB, mesB, anioB] = b.split("/");

            return (
                new Date(`${anioA}-${mesA}-${diaA}`) -
                new Date(`${anioB}-${mesB}-${diaB}`)
            );

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

        fecha: fechaFinal

    });

    const asesores = buildHourlyAdvisorReport({

        inbound,

        google,

        facebook,

        forms,

        presentismo,

        fecha: fechaFinal

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