import { useEffect, useState } from "react";
import { getHourlyReport } from "../api/hourlyReport";
import "../styles/hourly/HourlyReport.css";
import "../styles/hourly/HourlyCards.css";
import "../styles/hourly/HourlyHeader.css";
import HourlyHeader from "../components/hourly/HourlyHeader";
import HourlyCards from "../components/hourly/HourlyCards";
import HourlyChart from "../components/hourly/HourlyChart";
import DateSelector from "../components/DateSelector";

function HourlyReport() {

    const [data, setData] = useState(null);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

    useEffect(() => {

        async function cargarDatos() {

            try {

                const reporte = await getHourlyReport(fechaSeleccionada);

                setData(reporte);

            } catch (error) {

                console.error(error);

            }

        }

        cargarDatos();

    }, [fechaSeleccionada]);

    if (!data) {

        return <h2>Cargando...</h2>;

    }

    return (

        <div className="hourly-page">

            <HourlyHeader fecha={data.fecha} />

            <DateSelector
                fechas={data.fechas}
                fecha={data.fecha}
                onChange={setFechaSeleccionada}
            />

            <HourlyCards
                grafico={data.grafico}
            />

            <HourlyChart
                data={data.grafico}
            />

        </div>

    );
}

export default HourlyReport;