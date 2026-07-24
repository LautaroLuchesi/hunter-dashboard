const { parseAdvisor } = require("../utils/advisorParser");

function parseVtaFi(filas) {

    const registros = [];

    filas.slice(2).forEach((fila) => {

        if (fila[1] && fila[2]) {

            const asesor = parseAdvisor(fila[2]);
            
            if (!asesor) {
                return;
            }

            registros.push({

                fecha: fila[1],

                idAsesor: asesor.id,

                nombreAsesor: asesor.nombre,

                fi: Number(fila[3] || 0)

            });

        }

    });

    return registros;

}

module.exports = {
    parseVtaFi
};