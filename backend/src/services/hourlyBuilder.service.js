function buildHourlyReport({
    inbound,
    google,
    facebook,
    forms,
    fecha
}) {

    const horas = Array.from(
        { length: 12 },
        (_, i) => i + 9
    );

    const resultado = horas.map((hora) => {

        const inboundHora = inbound.filter((registro) => {

            return (
                registro.fecha === fecha &&
                registro.hora === hora
            );

        });

        const inboundCount = inboundHora.length;

        const googleHora = google.filter((registro) => {

            return (
                registro.fecha === fecha &&
                registro.hora === hora
            );

        });

        const googleCount = googleHora.length;

        const facebookHora = facebook.filter((registro) => {

            return (
                registro.fecha === fecha &&
                registro.hora === hora
            );

        });

        const facebookCount = facebookHora.length;

        const formsHora = forms.filter((registro) => {

            return (
                registro.fecha === fecha &&
                registro.hora === hora
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
    presentismo,
    fecha
}) {

    const registros = [
        ...inbound,
        ...google,
        ...facebook,
        ...forms
    ].filter(registro => registro.fecha === fecha);

    const presentismoMap = new Map();

    presentismo.forEach((registro) => {

        if (!presentismoMap.has(registro.idAsesor)) {

            presentismoMap.set(registro.idAsesor, {

                nombre: registro.nombreAsesor,

                turno: registro.turno

            });

        }

    });

    console.log("Registros:", registros.length);

    console.log(
        presentismoMap.get("1354")
    );

    return [];

}

