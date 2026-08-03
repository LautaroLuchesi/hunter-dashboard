const { parseAdvisor } = require("../utils/advisorParser");

function parseFormsHour(filas) {

    const registros = [];

    filas.slice(1).forEach((fila) => {

        const fecha = fila[0];

        const hora = Number(fila[10]);

        const asesor = parseAdvisor(fila[4]);

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
    parseFormsHour
};