function obtenerMes(fecha) {
    const [dia, mes, anio] = fecha.split("/");

    return `${mes}/${anio}`;
}


function buildMonthlyReport({
    inbound,
    google,
    facebook,
    forms,
    mes,
    turnos
}) {

    const turnosMap = new Map();

    turnos.forEach((registro) => {
        turnosMap.set(
            registro.idAsesor,
            registro.turno
        );
    });

    const fechas = [
        ...new Set([
            ...inbound.map(r => r.fecha),
            ...google.map(r => r.fecha),
            ...facebook.map(r => r.fecha),
            ...forms.map(r => r.fecha)
        ])
    ]
        .filter(Boolean)
        .filter(fecha => obtenerMes(fecha) === mes)
        .sort((a, b) => {

            const [diaA, mesA, anioA] = a.split("/");
            const [diaB, mesB, anioB] = b.split("/");

            return new Date(
                `${anioA}-${mesA}-${diaA}`
            ) - new Date(
                `${anioB}-${mesB}-${diaB}`
            );

        });


    const resultado = fechas.map((fecha) => {

        const inboundDia = inbound.filter((registro) => {

            const turno = turnosMap.get(
                registro.idAsesor
            );

            return (
                registro.fecha === fecha &&
                (turno === "TM" || turno === "TT")
            );

        });

        const inboundCount = inboundDia.length;


        const googleDia = google.filter((registro) => {

            const turno = turnosMap.get(
                registro.idAsesor
            );

            return (
                registro.fecha === fecha &&
                (turno === "TM" || turno === "TT")
            );

        });

        const googleCount = googleDia.length;


        const facebookDia = facebook.filter((registro) => {

            const turno = turnosMap.get(
                registro.idAsesor
            );

            return (
                registro.fecha === fecha &&
                (turno === "TM" || turno === "TT")
            );

        });

        const facebookCount = facebookDia.length;


        const formsDia = forms.filter((registro) => {

            const turno = turnosMap.get(
                registro.idAsesor
            );

            return (
                registro.fecha === fecha &&
                (turno === "TM" || turno === "TT")
            );

        });

        const formsCount = formsDia.length;


        const botmaker =
            googleCount +
            facebookCount;


        const totales =
            inboundCount +
            googleCount +
            facebookCount +
            formsCount;


        const asesoresUnicos = new Set([
            ...inboundDia.map(r => r.idAsesor),
            ...googleDia.map(r => r.idAsesor),
            ...facebookDia.map(r => r.idAsesor),
            ...formsDia.map(r => r.idAsesor)
        ]);


        const asesores =
            asesoresUnicos.size * 7;


        return {

            fecha,

            asesores,

            inbound: inboundCount,

            google: googleCount,

            facebook: facebookCount,

            botmaker,

            forms: formsCount,

            totales

        };

    });


    return resultado;

}


function buildMonthlyAdvisorReport({
    inbound,
    google,
    facebook,
    forms,
    ventas,
    presentismo,
    turnos,
    mes
}) {

    const turnosMap = new Map();

    turnos.forEach((registro) => {

        turnosMap.set(
            registro.idAsesor,
            registro.turno
        );

    });


    const registros = [
        ...inbound,
        ...google,
        ...facebook,
        ...forms
    ].filter((registro) => {

        const turno = turnosMap.get(
            registro.idAsesor
        );

        return (
            obtenerMes(registro.fecha) === mes &&
            (turno === "TM" || turno === "TT")
        );

    });


    const presentismoMap = new Map();

    presentismo.forEach((registro) => {

        if (!presentismoMap.has(registro.idAsesor)) {

            presentismoMap.set(
                registro.idAsesor,
                {
                    nombre: registro.nombreAsesor,
                    turno: registro.turno
                }
            );

        }

    });


    /*
     * VENTAS DEL MES
     *
     * Las ventas vienen con fecha YYYY-MM-DD.
     * El reporte horario ya utiliza esta misma fuente.
     */

    const ventasMap = new Map();

    ventas.forEach((venta) => {

        const [anio, mesVenta] =
            venta.fecha.split("-");

        const mesVentaFormato =
            `${mesVenta}/${anio}`;

        if (mesVentaFormato !== mes) {
            return;
        }

        if (!ventasMap.has(venta.idAsesor)) {

            ventasMap.set(
                venta.idAsesor,
                0
            );

        }

        ventasMap.set(
            venta.idAsesor,
            ventasMap.get(venta.idAsesor) +
            venta.ventas
        );

    });


    const asesores = {};


    /*
     * ACTIVIDAD DIARIA POR ASESOR
     */

    for (const registro of registros) {

        if (!asesores[registro.idAsesor]) {

            const info =
                presentismoMap.get(
                    registro.idAsesor
                );

            asesores[registro.idAsesor] = {

                id: registro.idAsesor,

                nombre:
                    registro.nombreAsesor,

                turno:
                    info?.turno || "",

                ventas:
                    ventasMap.get(
                        registro.idAsesor
                    ) || 0,

                dias: {}

            };

        }


        const fecha =
            registro.fecha;


        asesores[
            registro.idAsesor
        ].dias[fecha] =

            (
                asesores[
                    registro.idAsesor
                ].dias[fecha] || 0
            ) + 1;

    }


    /*
     * Convertimos el objeto de días
     * en un array ordenado.
     */

    Object.values(asesores).forEach((asesor) => {

        const fechasAsesor = [
            ...new Set(
                registros
                    .filter(
                        r =>
                            r.idAsesor ===
                            asesor.id
                    )
                    .map(r => r.fecha)
            )
        ]
            .filter(
                fecha =>
                    obtenerMes(fecha) === mes
            )
            .sort((a, b) => {

                const [
                    diaA,
                    mesA,
                    anioA
                ] = a.split("/");

                const [
                    diaB,
                    mesB,
                    anioB
                ] = b.split("/");

                return new Date(
                    `${anioA}-${mesA}-${diaA}`
                ) - new Date(
                    `${anioB}-${mesB}-${diaB}`
                );

            });


        asesor.dias = fechasAsesor.map(
            (fecha) => ({

                fecha,

                datos:
                    asesor.dias[fecha] || 0

            })
        );

    });


    return Object.values(asesores);

}


module.exports = {
    buildMonthlyReport,
    buildMonthlyAdvisorReport
};