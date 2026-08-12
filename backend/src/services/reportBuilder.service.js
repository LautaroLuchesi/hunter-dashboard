function buildReport({ datos, ventas, fi, presentismo, turnos }) {

    // ============================
    // Mapa de Ventas
    // ============================

    const ventasMap = new Map();

    ventas.forEach((venta) => {

        const key = `${venta.fecha}|${venta.skill}|${venta.idAsesor}`;

        ventasMap.set(key, venta);

    });


    // ============================
    // Mapa de FI
    // ============================

    const fiMap = new Map();

    fi.forEach((registro) => {

        const key = `${registro.fecha}|${registro.idAsesor}`;

        fiMap.set(key, registro);

    });


    // ============================
    // Mapa de Presentismo
    // ============================

    const presentismoMap = new Map();

    presentismo.forEach((registro) => {

        const key = `${registro.fecha}|${registro.idAsesor}`;

        presentismoMap.set(key, registro);

    });


    // ============================
    // Mapa de Turnos
    // ============================

    const turnosMap = new Map();

    turnos.forEach((registro) => {

        turnosMap.set(
            registro.idAsesor,
            registro
        );

    });


    // ============================
    // Construcción del reporte
    // ============================

    console.log("Registros de presentismo:", presentismoMap.size);

    return datos
        .map((registro) => {

            const ventaKey =
                `${registro.fecha}|${registro.skill}|${registro.idAsesor}`;

            const venta = ventasMap.get(ventaKey);

            const fiKey =
                `${registro.fecha}|${registro.idAsesor}`;

            const fiRegistro = fiMap.get(fiKey);

            const presente =
                presentismoMap.get(fiKey);

            const turnoRegistro =
                turnosMap.get(registro.idAsesor);

            // Mismo criterio que Datos por Hora:
            // solamente operadores TM o TT
            if (
                !turnoRegistro ||
                (turnoRegistro.turno !== "TM" &&
                    turnoRegistro.turno !== "TT")
            ) {
                return null;
            }

            return {

                ...registro,

                ventas: venta
                    ? venta.ventas
                    : 0,

                fi: fiRegistro
                    ? fiRegistro.fi
                    : 0,

                estado: presente
                    ? presente.estado
                    : "",

                horas: presente
                    ? presente.horas
                    : 0,

                turno: turnoRegistro.turno

            };

        })
        .filter(Boolean);


}


module.exports = {
    buildReport
};