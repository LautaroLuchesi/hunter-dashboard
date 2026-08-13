import "../../styles/hourly/HourlySummaryTable.css";

function HourlySummaryTable({ data }) {

    return (
        <div className="hourly-summary-table">

            <div className="hourly-summary-table-header">

                <span className="hourly-summary-header-hora">
                    Hora
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

            <div className="hourly-summary-table-body">

                {data.map((item) => (

                    <div
                        className="hourly-summary-row"
                        key={item.hora}
                    >

                        <span className="hourly-summary-hora">
                            {item.hora}:00
                        </span>

                        <span className="hourly-summary-asesores">
                            {item.asesores}
                        </span>

                        <span className="hourly-summary-inbound">
                            {item.inbound}
                        </span>

                        <span className="hourly-summary-google">
                            {item.google}
                        </span>

                        <span className="hourly-summary-facebook">
                            {item.facebook}
                        </span>

                        <span className="hourly-summary-botmaker">
                            {item.botmaker}
                        </span>

                        <span className="hourly-summary-forms">
                            {item.forms}
                        </span>

                        <span className="hourly-summary-totales">
                            {item.totales}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default HourlySummaryTable;