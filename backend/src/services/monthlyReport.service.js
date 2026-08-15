const googleSheetsService = require("./googleSheets.service");

const {
    parseInboundHour
} = require("../parsers/inboundHour.parser");

const {
    parseGoogleHour
} = require("../parsers/googleHour.parser");

const {
    parseFacebookHour
} = require("../parsers/facebookHour.parser");

const {
    parseFormsHour
} = require("../parsers/formsHour.parser");

const {
    buildMonthlyReport,
    buildMonthlyAdvisorReport
} = require("./monthlyBuilder.service");

const {
    parsePresentismo
} = require("../parsers/presentismo.parser");

const {
    parseTurnos
} = require("../parsers/turnos.parser");

const {
    parseVentas
} = require("../parsers/ventas.parser");


const generateMonthlyReport = async (
    mesSeleccionado
) => {

    const [
        inboundSheet,
        googleSheet,
        facebookSheet,
        formsSheet,
        ventasSheet,
        presentismoSheet,
        turnosSheet
    ] = await Promise.all([

        googleSheetsService.readSheet(
            "Crudo_Inbound!A:Q"
        ),

        googleSheetsService.readSheet(
            "Crudo_Google!A:M"
        ),

        googleSheetsService.readSheet(
            "Crudo_Facebook!A:M"
        ),

        googleSheetsService.readSheet(
            "Crudo_Forms!A:K"
        ),

        googleSheetsService.readSheet(
            "Vta_Bruta!A:T"
        ),

        googleSheetsService.readSheet(
            "PRESENTISMO!A:E"
        ),

        googleSheetsService.readSheet(
            "PRESENTISMO!O:P"
        )

    ]);


    /*
     * PARSERS
     */

    const inbound =
        parseInboundHour(inboundSheet);

    const google =
        parseGoogleHour(googleSheet);

    const facebook =
        parseFacebookHour(facebookSheet);

    const forms =
        parseFormsHour(formsSheet);

    const ventas =
        parseVentas(ventasSheet);

    const presentismo =
        parsePresentismo(presentismoSheet);

    const turnos =
        parseTurnos(turnosSheet);


    /*
     * OBTENER TODOS LOS MESES DISPONIBLES
     *
     * Las fechas de actividad vienen
     * en formato DD/MM/YYYY.
     */

    const fechas = [
        ...new Set([
            ...inbound.map(r => r.fecha),
            ...google.map(r => r.fecha),
            ...facebook.map(r => r.fecha),
            ...forms.map(r => r.fecha)
        ])
    ].filter(Boolean);


    const meses = [
        ...new Set(

            fechas.map((fecha) => {

                const [
                    dia,
                    mes,
                    anio
                ] = fecha.split("/");

                return `${mes}/${anio}`;

            })

        )
    ].sort((a, b) => {

        const [
            mesA,
            anioA
        ] = a.split("/");

        const [
            mesB,
            anioB
        ] = b.split("/");

        return new Date(
            `${anioA}-${mesA}-01`
        ) - new Date(
            `${anioB}-${mesB}-01`
        );

    });


    /*
     * MES POR DEFECTO
     *
     * Si no llega un mes seleccionado,
     * utilizamos el último disponible.
     */

    const mesFinal =
        mesSeleccionado ||
        meses[meses.length - 1];


    /*
     * REPORTE GENERAL DEL MES
     */

    const grafico =
        buildMonthlyReport({

            inbound,

            google,

            facebook,

            forms,

            turnos,

            mes: mesFinal

        });


    /*
     * REPORTE POR ASESOR
     */

    const asesores =
        buildMonthlyAdvisorReport({

            inbound,

            google,

            facebook,

            forms,

            ventas,

            turnos,

            presentismo,

            mes: mesFinal

        });


    console.log(
        "MES REPORTE MENSUAL:",
        mesFinal
    );

    console.log({
        mes: mesFinal,
        meses: meses.length,
        grafico: grafico.length,
        asesores: asesores.length
    });


    /*
     * RESPUESTA
     */

    return {

        mes: mesFinal,

        meses,

        grafico,

        asesores

    };

};


module.exports = {
    generateMonthlyReport
};