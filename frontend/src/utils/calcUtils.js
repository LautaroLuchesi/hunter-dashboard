export function calcularConversion(dto, ventas) {

    if (dto === 0) return 0;

    return (ventas / dto) * 100;

}

export function calcularTotales(registros) {

    const dto = registros.reduce(
        (total, asesor) => total + asesor.dto,
        0
    );

    const ventas = registros.reduce(
        (total, asesor) => total + asesor.ventas,
        0
    );

    return {
        dto,
        ventas,
        conversion: calcularConversion(dto, ventas),
    };

}

export function obtenerColorConversion(conversion) {

    if (conversion >= 25) {
        return "conv-alta";
    }

    if (conversion >= 15) {
        return "conv-media";
    }

    return "conv-baja";

}