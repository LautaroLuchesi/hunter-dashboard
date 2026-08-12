const { parseAdvisor } = require("../utils/advisorParser");
const { normalizeDate } = require("../utils/dateParser");

function parseGoogleHour(filas) {

    const registros = [];
    const unicos = new Set();

    filas.slice(1).forEach((fila) => {

        const fecha = normalizeDate(fila[1]);

        const hora = Number(fila[2]);

        const telefono = fila[5];

        const tipificacion = fila[10];

        const asesor = parseAdvisor(fila[12]);

        if (
            !fecha ||
            !hora ||
            !telefono ||
            !tipificacion ||
            tipificacion === "noTypification" ||
            !fila[12] ||
            fila[12] === "#N/A" ||
            !asesor
        ) {
            return;
        }

        // UNIQUE(B, M, F)
        const clave = `${fecha}|${asesor.id}|${telefono}`;

        if (unicos.has(clave)) {
            return;
        }

        unicos.add(clave);

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