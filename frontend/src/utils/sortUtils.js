export const ordenarAsesores = (lista) => {

    return [...lista].sort((a, b) => {

        const convA = a.dto > 0 ? a.ventas / a.dto : 0;
        const convB = b.dto > 0 ? b.ventas / b.dto : 0;

        // 1° Conversión
        if (convB !== convA) {
            return convB - convA;
        }

        // 2° Ventas
        if (b.ventas !== a.ventas) {
            return b.ventas - a.ventas;
        }

        // 3° DTO
        return b.dto - a.dto;

    });

};