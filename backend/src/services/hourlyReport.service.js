const googleSheetsService = require("./googleSheets.service");
const { parseInboundHour } = require("../parsers/inboundHour.parser");
const { parseGoogleHour } = require("../parsers/googleHour.parser");
const { parseFacebookHour } = require("../parsers/facebookHour.parser");
const { parseFormsHour } = require("../parsers/formsHour.parser");
const { buildHourlyReport, buildHourlyAdvisorReport } = require("./hourlyBuilder.service");
const { parsePresentismo } = require("../parsers/presentismo.parser");
const { parseTurnos } = require("../parsers/turnos.parser");
const { parseVentas } = require("../parsers/ventas.parser");


function normalizeHourlyDate(fecha) {

    if (!fecha) return null;

    const texto = String(fecha).trim();

    // YYYY-MM-DD
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(texto)) {

        const [anio, mes, dia] = texto.split("-");

        return `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;

    }

    // D/M/YYYY o DD/MM/YYYY
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(texto)) {

        const [dia, mes, anio] = texto.split("/");

        return `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;

    }

    return texto;
}

const generateHourlyReport = async (fechaSeleccionada) => {

    const [
        inboundSheet,
        googleSheet,
        facebookSheet,
        formsSheet,
        ventasSheet,
        presentismoSheet,
        turnosSheet
    ] = await Promise.all([

        googleSheetsService.readSheet("Crudo_Inbound!A:Q"),

        googleSheetsService.readSheet("Crudo_Google!A:M"),

        googleSheetsService.readSheet("Crudo_Facebook!A:M"),

        googleSheetsService.readSheet("Crudo_Forms!A:K"),

        googleSheetsService.readSheet("Vta_Bruta!A:T"),

        googleSheetsService.readSheet("PRESENTISMO!A:E"),

        googleSheetsService.readSheet("PRESENTISMO!O:P")

    ]);

    const inbound = parseInboundHour(inboundSheet).map(r => ({
        ...r,
        fecha: normalizeHourlyDate(r.fecha)
    }));


    const google = parseGoogleHour(googleSheet).map(r => ({
        ...r,
        fecha: normalizeHourlyDate(r.fecha)
    }));

    const facebook = parseFacebookHour(facebookSheet).map(r => ({
        ...r,
        fecha: normalizeHourlyDate(r.fecha)
    }));

    const forms = parseFormsHour(formsSheet).map(r => ({
        ...r,
        fecha: normalizeHourlyDate(r.fecha)
    }));

    const ventas = parseVentas(ventasSheet);

    const presentismo = parsePresentismo(presentismoSheet);

    const turnos = parseTurnos(turnosSheet);

    const fechas = [
        ...new Set([
            ...inbound.map(r => normalizeHourlyDate(r.fecha)),
            ...google.map(r => normalizeHourlyDate(r.fecha)),
            ...facebook.map(r => normalizeHourlyDate(r.fecha)),
            ...forms.map(r => normalizeHourlyDate(r.fecha))
        ])
    ]
        .filter(Boolean)
        .sort();

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

        ventas,

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