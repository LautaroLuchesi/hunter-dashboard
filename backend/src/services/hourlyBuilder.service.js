function buildHourlyReport({
    inbound,
    google,
    facebook,
    forms,
    fecha,
    turnos
}) {

    const horas = Array.from(
        { length: 12 },
        (_, i) => i + 9
    );

    const turnosMap = new Map();

    turnos.forEach((registro) => {
        turnosMap.set(registro.idAsesor, registro.turno);
    });

    const resultado = horas.map((hora) => {

        const inboundHora = inbound.filter((registro) => {

            const turno = turnosMap.get(registro.idAsesor);

            return (
                registro.fecha === fecha &&
                registro.hora === hora &&
                (turno === "TM" || turno === "TT")
            );

        });


        const inboundCount = inboundHora.length;

        const googleHora = google.filter((registro) => {

            const turno = turnosMap.get(registro.idAsesor);

            return (
                registro.fecha === fecha &&
                registro.hora === hora &&
                (turno === "TM" || turno === "TT")
            );

        });

        const googleCount = googleHora.length;

        const facebookHora = facebook.filter((registro) => {

            const turno = turnosMap.get(registro.idAsesor);

            return (
                registro.fecha === fecha &&
                registro.hora === hora &&
                (turno === "TM" || turno === "TT")
            );

        });

        const facebookCount = facebookHora.length;

        const formsHora = forms.filter((registro) => {

            const turno = turnosMap.get(registro.idAsesor);

            return (
                registro.fecha === fecha &&
                registro.hora === hora &&
                (turno === "TM" || turno === "TT")
            );

        });

        const formsCount = formsHora.length;

        const botmaker = googleCount + facebookCount;

        const totales =
            inboundCount +
            googleCount +
            facebookCount +
            formsCount;

        const asesoresUnicos = new Set([
            ...inboundHora.map(r => r.idAsesor),
            ...googleHora.map(r => r.idAsesor),
            ...facebookHora.map(r => r.idAsesor),
            ...formsHora.map(r => r.idAsesor)
        ]);

        const asesores = asesoresUnicos.size * 7;

        return {
            hora,
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

function buildHourlyAdvisorReport({
    inbound,
    google,
    facebook,
    forms,
    ventas,
    presentismo,
    turnos,
    fecha
}) {

    const turnosMap = new Map();

    turnos.forEach((registro) => {
        turnosMap.set(registro.idAsesor, registro.turno);
    });

    const registros = [
        ...inbound,
        ...google,
        ...facebook,
        ...forms
    ].filter((registro) => {

        const turno = turnosMap.get(registro.idAsesor);

        return (
            registro.fecha === fecha &&
            (turno === "TM" || turno === "TT")
        );

    });

    const presentismoMap = new Map();

    presentismo.forEach((registro) => {

        if (!presentismoMap.has(registro.idAsesor)) {

            presentismoMap.set(registro.idAsesor, {

                nombre: registro.nombreAsesor,

                turno: registro.turno

            });

        }

    });

    const ventasMap = new Map();

    const fechaVentas = fecha
        .split("/")
        .reverse()
        .join("-");

    ventas
        .filter((venta) => venta.fecha === fechaVentas)
        .forEach((venta) => {

            if (!ventasMap.has(venta.idAsesor)) {
                ventasMap.set(venta.idAsesor, 0);
            }

            ventasMap.set(
                venta.idAsesor,
                ventasMap.get(venta.idAsesor) + venta.ventas
            );

        });

    console.log("FECHA VENTAS:", fechaVentas);
    console.log("VENTAS DEL DÍA:", Array.from(ventasMap.entries()));

    const asesores = {};

    for (const registro of registros) {

        if (!asesores[registro.idAsesor]) {

            const info = presentismoMap.get(registro.idAsesor);

            asesores[registro.idAsesor] = {

                id: registro.idAsesor,

                nombre: registro.nombreAsesor,

                turno: info?.turno || "",

                ventas: ventasMap.get(registro.idAsesor) || 0,

                horas: {}

            };

        }

        const hora = registro.hora;

        asesores[registro.idAsesor].horas[hora] =
            (asesores[registro.idAsesor].horas[hora] || 0) + 1;

    }

    Object.values(asesores).forEach((asesor) => {

        asesor.horas = Array.from(

            { length: 12 },

            (_, i) => {

                const hora = i + 9;

                return {

                    hora,

                    datos: asesor.horas[hora] || 0

                };

            }

        );

    });

    return Object.values(asesores);

}

module.exports = {
    buildHourlyReport, buildHourlyAdvisorReport
};
