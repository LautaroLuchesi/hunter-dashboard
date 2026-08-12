const googleSheetsService = require("./googleSheets.service");

const { parseInboundHour } = require("../parsers/inboundHour.parser");
const { parseGoogleHour } = require("../parsers/googleHour.parser");
const { parseFacebookHour } = require("../parsers/facebookHour.parser");
const { parseFormsHour } = require("../parsers/formsHour.parser");

const { parseVentas } = require("../parsers/ventas.parser");
const { parseVtaFi } = require("../parsers/vtaFi.parser");

const { buildReport } = require("./reportBuilder.service");
const { buildDashboard } = require("./dashboard.service");

const { parsePresentismo } = require("../parsers/presentismo.parser");
const { parseTurnos } = require("../parsers/turnos.parser");


function fechaDashboard(fecha) {

    if (!fecha) {
        return fecha;
    }

    // Ya está en formato YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        return fecha;
    }

    // Convierte DD/MM/YYYY → YYYY-MM-DD
    const partes = fecha.split("/");

    if (partes.length === 3) {

        const [dia, mes, anio] = partes;

        return `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;

    }

    return fecha;
}

const generateReport = async (fechaSeleccionada) => {

    // =====================================================
    // LEER DATOS
    // =====================================================

    const [
        inboundSheet,
        googleSheet,
        facebookSheet,
        formsSheet,
        ventasSheet,
        vtaFiSheet,
        presentismoSheet,
        turnosSheet
    ] = await Promise.all([

        googleSheetsService.readSheet("Crudo_Inbound!A:Q"),

        googleSheetsService.readSheet("Crudo_Google!A:M"),

        googleSheetsService.readSheet("Crudo_Facebook!A:M"),

        googleSheetsService.readSheet("Crudo_Forms!A:K"),

        googleSheetsService.readSheet("Vta_Bruta!A:T"),

        googleSheetsService.readSheet("Vta_FI!A:D"),

        googleSheetsService.readSheet("PRESENTISMO!A:E"),

        googleSheetsService.readSheet("PRESENTISMO!O:P")

    ]);


    // =====================================================
    // PARSERS DE DATOS
    // =====================================================

    const inbound = parseInboundHour(inboundSheet);

    const google = parseGoogleHour(googleSheet);

    const facebook = parseFacebookHour(facebookSheet);

    const forms = parseFormsHour(formsSheet);

    console.log("========== DATOS CRUDOS PARSEADOS ==========");
    console.log("Inbound:", inbound.length);
    console.log("Google:", google.length);
    console.log("Facebook:", facebook.length);
    console.log("Forms:", forms.length);


    // =====================================================
    // CONSTRUIR DATOS PARA EL DASHBOARD
    //
    // Los mismos registros que utiliza Reporte por Hora
    // se agrupan por:
    //
    // fecha + skill + asesor
    // =====================================================

    const datosMap = new Map();

    const agregarDatos = (registros, skill) => {

        registros.forEach((registro) => {

            const fecha = fechaDashboard(registro.fecha);

            const key =
                `${fecha}|${skill}|${registro.idAsesor}`;

            if (!datosMap.has(key)) {

                datosMap.set(key, {

                    fecha,

                    skill,

                    idAsesor: registro.idAsesor,

                    nombreAsesor: registro.nombreAsesor,

                    dto: 0

                });

            }

            datosMap.get(key).dto++;

        });

    };


    agregarDatos(inbound, "Inbound");

    agregarDatos(google, "Google");

    agregarDatos(facebook, "Facebook");

    agregarDatos(forms, "Formulario");


    const datos = Array.from(datosMap.values());

    console.log("========== DATOS DASHBOARD ==========");

    console.log(
        datos
            .filter(r => r.fecha === "2026-07-17")
            .reduce((acc, r) => {

                acc[r.skill] = (acc[r.skill] || 0) + r.dto;

                return acc;

            }, {})
    );

    console.log("====================================");

    // =====================================================
    // VENTAS / FI / PRESENTISMO / TURNOS
    // =====================================================

    const ventas = parseVentas(ventasSheet);

    const fi = parseVtaFi(vtaFiSheet);

    const presentismo = parsePresentismo(presentismoSheet);

    const turnos = parseTurnos(turnosSheet);


    // =====================================================
    // CONSTRUIR REPORTE
    // =====================================================

    const reporte = buildReport({
        datos,
        ventas,
        fi,
        presentismo,
        turnos
    });

    const fechas = [
        ...new Set(
            reporte
                .filter(r => r)
                .map(r => r.fecha)
        )
    ].sort();

    const fechaFinal =
        fechaSeleccionada || fechas[fechas.length - 1];

    const dashboard = buildDashboard(
        reporte.filter(r => r),
        fechaFinal
    );

    const asesores = reporte.filter(
        r => r && r.fecha === fechaFinal
    );

    const presentismoDia = presentismo.filter(
        p => p.fecha === fechaFinal
    );


    // =====================================================
    // RESPUESTA
    // =====================================================

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