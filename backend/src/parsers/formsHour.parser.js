const { parseAdvisor } = require("../utils/advisorParser");
const { normalizeDate } = require("../utils/dateParser");

function parseFormsHour(filas) {

    const registros = [];

    filas.slice(1).forEach((fila) => {

        // J = Fecha
        const fecha = normalizeDate(fila[9]);

        // K = Hora
        const hora = Number(fila[10]);

        // E = Asesor
        const asesor = parseAdvisor(fila[4]);

        // C = Teléfono
        const telefono = fila[2];

        if (
            !fecha ||
            !hora ||
            !asesor ||
            !telefono
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
    parseFormsHour
};