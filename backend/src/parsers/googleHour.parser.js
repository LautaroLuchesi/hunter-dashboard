const { parseAdvisor } = require("../utils/advisorParser");
const { normalizeDate } = require("../utils/dateParser");

function parseGoogleHour(filas) {

    const registros = [];

    filas.slice(1).forEach((fila) => {

        const fecha = normalizeDate(fila[1]);

        const hora = Number(fila[2]);

        const asesor = parseAdvisor(fila[12]);

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
    parseGoogleHour
};