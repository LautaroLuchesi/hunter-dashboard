const { parseAdvisor } = require("../utils/advisorParser");

function parsePresentismo(filas) {

    const registros = [];

    filas.slice(2).forEach((fila) => {


        const asesor = parseAdvisor(fila[1]);

        if (!asesor) return;


        function normalizeDate(fecha) {

            if (!fecha) return "";

            // Si ya viene en formato YYYY-MM-DD
            if (fecha.includes("-")) {
                return fecha;
            }

            const partes = fecha.split("/");

            if (partes.length !== 3) {
                return "";
            }

            const [dia, mes, anio] = partes;

            return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        }

        registros.push({

            fecha: normalizeDate(fila[0]),

            idAsesor: asesor.id,

            nombreAsesor: asesor.nombre,

            estado: fila[2],

            horas: Number(fila[3] || 0)

        });

    });

    return registros;

}

module.exports = {
    parsePresentismo
};