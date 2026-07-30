import "../styles/kpi-card.css";

function KpiCard({ titulo, valor }) {

    const esConversion = titulo === "Conversión";

    return (

        <div className="kpi-card">

            <h3 className="kpi-title">
                {titulo}
            </h3>

            <h2 className="kpi-value">
                {valor}
            </h2>

        </div>

    );

}

export default KpiCard;