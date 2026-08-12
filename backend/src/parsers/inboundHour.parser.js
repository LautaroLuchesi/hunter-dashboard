const { parseAdvisor } = require("../utils/advisorParser");
const { normalizeDate } = require("../utils/dateParser");

function parseInboundHour(filas) {

    const registros = [];

    filas.slice(1).forEach((fila) => {

        // B = Fecha
        const fecha = normalizeDate(fila[1]);

        // Q = Hora
        const hora = Number(fila[16]);

        // A = Asesor
        const asesor = parseAdvisor(fila[0]);

        // F = Teléfono
        const telefono = String(fila[5] ?? "").trim();

        // O = Dirección
        const direccion = String(fila[14] ?? "").trim().toUpperCase();

        // Solo llamadas entrantes
        if (
            !fecha ||
            !hora ||
            !asesor ||
            !telefono ||
            direccion !== "ENTRANTE"
        ) {
            return;
        }

        registros.push({

            fecha,

            hora,

            idAsesor: asesor.id,

            nombreAsesor: asesor.nombre

        });

    });

    return registros;
}

module.exports = {
    parseInboundHour
};