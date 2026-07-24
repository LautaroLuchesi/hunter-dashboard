const { parseAdvisor } = require("../utils/advisorParser");

function parseDatos(filas) {

    const registros = [];

    filas.slice(5).forEach((fila) => {

        const columnas = [
            { inicio: 0, skill: "Inbound", dto: 2 },
            { inicio: 4, skill: "Google", dto: 6 },
            { inicio: 8, skill: "Facebook", dto: 10 },
            { inicio: 12, skill: "Formulario", dto: 14 }
        ];

        columnas.forEach(({ inicio, skill, dto }) => {

            if (fila[inicio] && fila[inicio + 1]) {

                const asesor = parseAdvisor(fila[inicio + 1]);

                if (!asesor) {
                    return;
                }

                registros.push({
                    fecha: fila[inicio],
                    skill,
                    idAsesor: asesor.id,
                    nombreAsesor: asesor.nombre,
                    dto: Number(fila[dto] || 0)
                });

            }

        });

    });

    return registros;

}

module.exports = {
    parseDatos
};