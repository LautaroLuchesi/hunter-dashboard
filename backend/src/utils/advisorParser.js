function capitalizeWords(texto) {
    return texto
        .toLowerCase()
        .split(" ")
        .filter(Boolean)
        .map(
            palabra =>
                palabra.charAt(0).toUpperCase() + palabra.slice(1)
        )
        .join(" ");
}

function parseAdvisor(texto) {

    if (!texto) return null;

    texto = texto.trim();

    // Acepta:
    // 3433 - PICA SERGIO
    // 3433- PICA SERGIO
    // 3433  -  PICA SERGIO

    const match = texto.match(/^(\d+)\s*-\s*(.+)$/);

    // Si no tiene ID al comienzo, no es un asesor válido
    if (!match) {
        return null;
    }

    const id = match[1];

    let nombre = match[2];

    nombre = nombre
        .replace(/,?\s*DTV[_ ]?URU/gi, "")
        .replace(/_WEB\s*URU/gi, "")
        .replace(/_WEB/gi, "")
        .trim();

    nombre = capitalizeWords(nombre);

    return {
        id,
        nombre
    };
}

module.exports = {
    parseAdvisor
};