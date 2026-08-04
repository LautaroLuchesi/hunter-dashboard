import "../../styles/hourly/HourlyHeader.css";

function HourlyHeader({ fecha }) {

    return (

        <header className="hourly-header">

            <div>

                <h1 className="hourly-title">

                    Reporte por Hora

                </h1>

                <p className="hourly-date">

                    {fecha}

                </p>

            </div>

        </header>

    );

}

export default HourlyHeader;