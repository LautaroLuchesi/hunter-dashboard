const googleSheetsService = require("./googleSheets.service");

const { parseInboundHour } = require("../parsers/inboundHour.parser");
const { parseGoogleHour } = require("../parsers/googleHour.parser");
const { parseFacebookHour } = require("../parsers/facebookHour.parser");
const { parseFormsHour } = require("../parsers/formsHour.parser");

const { buildHourlyReport } = require("./hourlyBuilder.service");

const generateHourlyReport = async (fechaSeleccionada) => {

    const [
        inboundSheet,
        googleSheet,
        facebookSheet,
        formsSheet
    ] = await Promise.all([

        googleSheetsService.readSheet("Crudo_Inbound!A:Q"),

        googleSheetsService.readSheet("Crudo_Google!A:M"),

        googleSheetsService.readSheet("Crudo_Facebook!A:M"),

        googleSheetsService.readSheet("Crudo_Forms!A:K")

    ]);

    const inbound = parseInboundHour(inboundSheet);

    const google = parseGoogleHour(googleSheet);

    const facebook = parseFacebookHour(facebookSheet);

    const forms = parseFormsHour(formsSheet);

    console.log("Inbound:", inbound.length);
    console.log("Google:", google.length);
    console.log("Facebook:", facebook.length);
    console.log("Forms:", forms.length);

    console.log(inbound.slice(0, 5));

    const fechas = [
        ...new Set(
            inbound.map(r => r.fecha)
        )
    ].sort();

    const fechaFinal = fechaSeleccionada || fechas[0];

    const grafico = buildHourlyReport({

        inbound,

        google,

        facebook,

        forms,

        fecha: fechaFinal

    });

    return {

        fecha: fechaFinal,

        fechas,

        grafico

    };

};

module.exports = {
    generateHourlyReport
};