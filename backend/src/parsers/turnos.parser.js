const { parseAdvisor } = require("../utils/advisorParser");

function parseTurnos(filas) {

    const registros = [];

    filas.forEach((fila) => {

        const asesor = parseAdvisor(fila[0]);

        if (!asesor) return;

        registros.push({

            idAsesor: asesor.id,

            turno: fila[1]

        });

    });

    return registros;

}

module.exports = {
    parseTurnos
};