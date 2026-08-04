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

    console.log(
        forms
            .filter(r => String(r.fecha).includes("31"))
            .slice(0, 20)
    );


    const fechas = [...new Set(inbound.map(r => r.fecha))]
        .sort((a, b) => {

            const [diaA, mesA, anioA] = a.split("/");
            const [diaB, mesB, anioB] = b.split("/");

            return (
                new Date(`${anioA}-${mesA}-${diaA}`) -
                new Date(`${anioB}-${mesB}-${diaB}`)
            );

        });

    const fechaFinal = fechaSeleccionada || fechas[fechas.length - 1];

    console.log("Fecha:", fechaFinal);

    console.log(
        "Google:",
        google.filter(r => r.fecha === fechaFinal).length
    );

    console.log(
        "Facebook:",
        facebook.filter(r => r.fecha === fechaFinal).length
    );

    console.log(
        "Forms:",
        forms.filter(r => r.fecha === fechaFinal).length
    );

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