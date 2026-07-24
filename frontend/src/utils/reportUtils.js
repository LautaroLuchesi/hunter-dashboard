export function getTotalsBySkill(datos) {

    const totales = {
        Inbound: 0,
        Google: 0,
        Facebook: 0,
        Formulario: 0
    };

    datos.forEach((registro) => {

        if (totales.hasOwnProperty(registro.skill)) {
            totales[registro.skill] += registro.dto;
        }

    });

    return totales;
}

export function getAvailableDates(datos) {

    const fechas = [...new Set(datos.map(d => d.fecha))];

    fechas.sort();

    return fechas;
}

export function filterByDate(datos, fecha) {

    if (!fecha) return datos;

    return datos.filter(d => d.fecha === fecha);

}