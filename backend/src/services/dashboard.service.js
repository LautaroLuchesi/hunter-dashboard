function buildSkillTurno(registros, skill, turno) {

    const filtrados = registros.filter((registro) =>
        registro.skill === skill &&
        registro.turno === turno
    );

    const operadores = new Set();

    let dto = 0;
    let ventas = 0;
    let fi = 0;
    let horas = 0;

    filtrados.forEach((registro) => {

        operadores.add(registro.idAsesor);

        dto += registro.dto;
        ventas += registro.ventas;
        fi += registro.fi;
        horas += Number(registro.horas || 0);

    });

    return {

        operadores: operadores.size,

        dto,

        ventas,

        fi,

        horas,

        efectividad:
            dto > 0
                ? Number(((ventas / dto) * 100).toFixed(2))
                : 0

    };

}

function buildDashboard(registros, fecha) {

    // Solo registros del día seleccionado
    const registrosFecha = registros.filter(
        r => r.fecha === fecha
    );

    return {

        inboundTM: buildSkillTurno(registrosFecha, "Inbound", "TM"),

        inboundTT: buildSkillTurno(registrosFecha, "Inbound", "TT"),

        googleTM: buildSkillTurno(registrosFecha, "Google", "TM"),

        googleTT: buildSkillTurno(registrosFecha, "Google", "TT"),

        facebookTM: buildSkillTurno(registrosFecha, "Facebook", "TM"),

        facebookTT: buildSkillTurno(registrosFecha, "Facebook", "TT"),

        formularioTM: buildSkillTurno(registrosFecha, "Formulario", "TM"),

        formularioTT: buildSkillTurno(registrosFecha, "Formulario", "TT")

    };

}

module.exports = {
    buildDashboard
};