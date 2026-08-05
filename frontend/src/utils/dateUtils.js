export function parseDate(fecha) {

    if (!fecha) return null;

    // yyyy-mm-dd
    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {

        const [anio, mes, dia] = fecha.split("-").map(Number);

        return new Date(anio, mes - 1, dia);

    }

    // dd/mm/yyyy
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(fecha)) {

        const [dia, mes, anio] = fecha.split("/").map(Number);

        return new Date(anio, mes - 1, dia);

    }

    return new Date(fecha);

}