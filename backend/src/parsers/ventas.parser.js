const { parseAdvisor } = require("../utils/advisorParser");

function parseVentas(filas) {

    const registros = [];

    filas.slice(2).forEach((fila) => {

        const columnas = [
            { inicio: 0, skill: "Inbound", ventas: 2 },
            { inicio: 4, skill: "Google", ventas: 6 },
            { inicio: 8, skill: "Facebook", ventas: 10 },
            { inicio: 12, skill: "Formulario", ventas: 14 }
        ];

        columnas.forEach(({ inicio, skill, ventas }) => {

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
                    ventas: Number(fila[ventas] || 0)
                });

            }

        });

    });

    return registros;

}

module.exports = {
    parseVentas
};