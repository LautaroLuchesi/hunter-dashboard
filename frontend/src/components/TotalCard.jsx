export default function TotalCard({ total, color }) {

    return (

        <div className={`total-diario-card ${color}`}>

            <div className="total-header">
                TOTAL DIARIO
            </div>

            <div className="total-grid">

                <div className="total-item">
                    <span>DTO</span>
                    <strong>{total.dto}</strong>
                </div>

                <div className="total-item">
                    <span>Ventas</span>
                    <strong>{total.ventas}</strong>
                </div>

                <div className="total-item conversion">
                    <span>Conversión</span>
                    <strong>{total.conversion.toFixed(2)}%</strong>
                </div>

            </div>

        </div>

    );

}