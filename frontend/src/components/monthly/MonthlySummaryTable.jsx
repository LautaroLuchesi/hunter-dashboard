import "../../styles/monthly/MonthlySummaryTable.css";

function MonthlySummaryTable({ data }) {

    return (
        <div className="monthly-summary-table">

            <div className="monthly-summary-table-header">

                <span className="monthly-summary-header-fecha">
                    Fecha
                </span>

                <span className="hourly-summary-header-asesores">
                    Asesores
                </span>

                <span className="hourly-summary-header-inbound">
                    Inbound
                </span>

                <span className="hourly-summary-header-google">
                    Google
                </span>

                <span className="hourly-summary-header-facebook">
                    Facebook
                </span>

                <span className="hourly-summary-header-botmaker">
                    Botmaker
                </span>

                <span className="hourly-summary-header-forms">
                    Forms
                </span>

                <span className="hourly-summary-header-totales">
                    Totales
                </span>

            </div>

            <div className="monthly-summary-table-body">

                {data.map((item) => (

                    <div
                        className="monthly-summary-row"
                        key={item.fecha}
                    >

                        <span className="monthly-summary-fecha">
                            {item.fecha}
                        </span>

                        <span className="monthly-summary-asesores">
                            {item.asesores}
                        </span>

                        <span className="monthly-summary-inbound">
                            {item.inbound}
                        </span>

                        <span className="monthly-summary-google">
                            {item.google}
                        </span>

                        <span className="monthly-summary-facebook">
                            {item.facebook}
                        </span>
 
                        <span className="monthly-summary-botmaker">
                            {item.botmaker}
                        </span>

                        <span className="monthly-summary-forms">
                            {item.forms}
                        </span>

                        <span className="monthly-summary-total">
                            {item.totales}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default MonthlySummaryTable;