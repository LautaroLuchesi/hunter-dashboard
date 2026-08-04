function normalizeDate(fecha) {

    if (!fecha) return "";

    fecha = String(fecha).trim();

    // Si viene con hora: 02/01/2026 9:15
    if (fecha.includes(" ")) {
        fecha = fecha.split(" ")[0];
    }

    // Si viene yyyy-mm-dd
    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {

        const [anio, mes, dia] = fecha.split("-");

        return `${dia}/${mes}/${anio}`;
    }

    // Si viene yyyy/mm/dd
    if (/^\d{4}\/\d{2}\/\d{2}$/.test(fecha)) {

        const [anio, mes, dia] = fecha.split("/");

        return `${dia}/${mes}/${anio}`;
    }

    // Si viene dd-mm-yyyy
    if (/^\d{2}-\d{2}-\d{4}$/.test(fecha)) {

        return fecha.replace(/-/g, "/");

    }

    // Si ya viene dd/mm/yyyy
    return fecha;
}

module.exports = {
    normalizeDate
};