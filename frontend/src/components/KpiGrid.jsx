import KpiCard from "./KpiCard";
import "../styles/kpi-card.css";

function KpiGrid({ totales }) {

    return (

        <div className="kpi-grid">

            <KpiCard
                titulo="Inbound"
                valor={totales.Inbound}
            />

            <KpiCard
                titulo="Google"
                valor={totales.Google}
            />

            <KpiCard
                titulo="Facebook"
                valor={totales.Facebook}
            />

            <KpiCard
                titulo="Formulario"
                valor={totales.Formulario}
            />

        </div>

    );

}

export default KpiGrid;