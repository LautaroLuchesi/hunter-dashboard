const { parseAdvisor } = require("../utils/advisorParser");

function parseGoogleHour(filas) {

    const registros = [];

    filas.slice(1).forEach((fila) => {

        const fecha = fila[0];

        const hora = Number(fila[2]);

        const asesor = parseAdvisor(fila[1]);

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