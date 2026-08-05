const { parseAdvisor } = require("../utils/advisorParser");
const { normalizeDate } = require("../utils/dateParser");

function parseInboundHour(filas) {

    const registros = [];

    filas.slice(1).forEach((fila) => {

        const fecha = normalizeDate(fila[1]);

        const hora = Number(fila[16]);

        const asesor = parseAdvisor(fila[0]);

        if (!fecha || !hora || !asesor) {
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