import { useEffect, useState } from "react";
import { getHourlyReport } from "../api/hourlyReport";
import "../styles/hourly/HourlyReport.css";
import "../styles/hourly/HourlyCards.css";
import "../styles/hourly/HourlyHeader.css";
import HourlyHeader from "../components/hourly/HourlyHeader";
import HourlyCards from "../components/hourly/HourlyCards";
import HourlyChart from "../components/hourly/HourlyChart";
import DateSelector from "../components/DateSelector";
import Header from "../components/layout/Header";
import { FiArrowLeft } from "react-icons/fi";
import AdvisorTable from "../components/hourly/AdvisorTable";
import AdvisorDetail from "../components/hourly/AdvisorDetail";
import HourlySummaryTable from "../components/hourly/HourlySummaryTable";

function HourlyReport() {

    const [data, setData] = useState(null);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [asesorSeleccionado, setAsesorSeleccionado] = useState(null);

    useEffect(() => {

        async function cargarDatos() {

            try {

                const reporte = await getHourlyReport(fechaSeleccionada);

                setData(reporte);

                if (reporte.asesores?.length) {

                    setAsesorSeleccionado(reporte.asesores[0]);

                }

            } catch (error) {

                console.error(error);

            }

        }

        cargarDatos();

    }, [fechaSeleccionada]);

    if (!data) {

        return <h2>Generando reporte...</h2>;

    }

    return (

        <div className="hourly-page">

            <Header
                title="Reporte por Hora"
                date={data.fecha}
                buttonText={
                    <>
                        <FiArrowLeft />
                        <span>Dashboard</span>
                    </>
                }
                buttonLink="/"
            />

            <DateSelector
                fechas={data.fechas}
                fecha={data.fecha}
                onChange={setFechaSeleccionada}
            />

            <div className="hourly-cards-wrapper">

                <HourlyCards
                    grafico={data.grafico}
                />

            </div>

            <div className="hourly-chart-summary">

                <div className="hourly-summary-container">

                    <h2 className="hourly-summary-title">
                        Contactos por Hora
                    </h2>

                    <p className="hourly-summary-subtitle">
                        Resumen de contactos por hora y skill
                    </p>

                    <HourlySummaryTable
                        data={data.grafico}
                    />

                </div>

                <div className="hourly-chart-area">

                    <HourlyChart
                        data={data.grafico}
                    />

                </div>

            </div>

            <div className="advisor-section">

                <AdvisorTable
                    asesores={data.asesores}
                    asesorSeleccionado={asesorSeleccionado}
                    onSelect={setAsesorSeleccionado}
                />

                <AdvisorDetail
                    asesor={asesorSeleccionado}
                />

            </div>

        </div>
    );
}

export default HourlyReport;