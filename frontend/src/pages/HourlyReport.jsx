import { useEffect, useState } from "react";
import { getHourlyReport } from "../api/hourlyReport";
import "../styles/hourly/HourlyReport.css";
import "../styles/hourly/HourlyCards.css";
import "../styles/hourly/HourlyHeader.css";
import HourlyHeader from "../components/hourly/HourlyHeader";
import HourlyCards from "../components/hourly/HourlyCards";

function HourlyReport() {

    const [data, setData] = useState(null);

    useEffect(() => {

        async function cargarDatos() {

            try {

                const reporte = await getHourlyReport();

                setData(reporte);

            } catch (error) {

                console.error(error);

            }

        }

        cargarDatos();

    }, []);

    if (!data) {

        return <h2>Cargando...</h2>;

    }

    return (

        <div className="hourly-page">

            <HourlyHeader
                fecha={data.fecha}

            />

            <HourlyCards
                grafico={data.grafico}
            />

        </div>



    );

}

export default HourlyReport;