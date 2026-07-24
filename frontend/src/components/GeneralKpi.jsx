import KpiCard from "./KpiCard";
import "../styles/GeneralKpi.css";
import { kpis } from "../config/kpis";

function GeneralKpi({ dashboard = {} }) {

    // Suma un campo de todas las skills
    const total = (campo) =>
        Object.values(dashboard).reduce(
            (acum, skill) => acum + (skill?.[campo] ?? 0),
            0
        );

    const tarjetas = kpis.map((kpi) => {

        let valor;

        if (kpi.porcentaje) {

            const dto = total("dto");
            const ventas = total("ventas");

            valor = dto > 0
                ? `${((ventas / dto) * 100).toFixed(2)}%`
                : "0%";

        } else {

            valor = total(kpi.campo);

        }

        return {
            titulo: kpi.titulo,
            valor,
        };

    });

    return (

        <div className="general-kpi">

            {tarjetas.map((item) => (

                <KpiCard
                    key={item.titulo}
                    titulo={item.titulo}
                    valor={item.valor}
                />

            ))}

        </div>

    );

}

export default GeneralKpi;