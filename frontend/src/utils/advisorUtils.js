export function agruparAsesores(registros) {

    const mapa = new Map();

    registros.forEach((r) => {

        if (!mapa.has(r.idAsesor)) {

            mapa.set(r.idAsesor, {

                idAsesor: r.idAsesor,
                nombreAsesor: r.nombreAsesor,

                inbound: 0,
                google: 0,
                facebook: 0,
                formulario: 0,

                dto: 0,
                ventas: 0,

                estado: r.estado,
                horas: r.horas,
                turno: r.turno

            });

        }

        const asesor = mapa.get(r.idAsesor);

        switch (r.skill.toUpperCase()) {

            case "INBOUND":
                asesor.inbound += r.dto;
                break;

            case "GOOGLE":
                asesor.google += r.dto;
                break;

            case "FACEBOOK":
                asesor.facebook += r.dto;
                break;

            case "FORMULARIO":
                asesor.formulario += r.dto;
                break;

        }

        asesor.dto += r.dto;
        asesor.ventas += r.ventas;

    });

    return [...mapa.values()].map((asesor) => ({
        ...asesor,
        conversion:
            asesor.dto > 0
                ? (asesor.ventas / asesor.dto) * 100
                : 0
    }));

}