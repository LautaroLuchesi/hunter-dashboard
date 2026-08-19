import { useEffect, useState } from "react";
import { getMonthlyReport } from "../api/monthlyReport";

import "../styles/monthly/MonthlyReport.css";

import Header from "../components/layout/Header";
import { FiArrowLeft } from "react-icons/fi";

import MonthlyCards from "../components/monthly/MonthlyCards";
import MonthSelector from "../components/monthly/MonthSelector";
import MonthlySummaryTable from "../components/monthly/MonthlySummaryTable";
import MonthlyChart from "../components/monthly/MonthlyChart";

import LoadingScreen from "../components/LoadingScreen";
import "../styles/LoadingScreen.css";

import MonthlyAdvisorTable from "../components/monthly/MonthlyAdvisorTable";
import MonthlyAdvisorDetail from "../components/monthly/MonthlyAdvisorDetail";


function MonthlyReport() {

    const [data, setData] = useState(null);
    const [mesSeleccionado, setMesSeleccionado] = useState(null);
    const [asesorSeleccionado, setAsesorSeleccionado] = useState(null);


    useEffect(() => {

        async function cargarDatos() {

            try {

                const reporte =
                    await getMonthlyReport(mesSeleccionado);

                setData(reporte);

                if (reporte.asesores?.length) {

                    setAsesorSeleccionado(
                        reporte.asesores[0]
                    );

                }

            } catch (error) {

                console.error(
                    "Error cargando reporte mensual:",
                    error
                );

            }

        }

        cargarDatos();

    }, [mesSeleccionado]);


    if (!data) {
        return <LoadingScreen />;
    }


    return (

        <div className="monthly-page">

            <Header
                title="Reporte Mensual"
                date={data.mes}

                buttonText={
                    <>
                        <FiArrowLeft />
                        <span>Dashboard</span>
                    </>
                }

                buttonLink="/"

                navigation={[
                    {
                        label: "Reporte por Hora",
                        link: "/hourly-report"
                    }
                ]}
            />


            <MonthSelector
                meses={data.meses}
                mes={data.mes}
                onChange={setMesSeleccionado}
            />


            <MonthlyCards
                grafico={data.grafico}
                asesores={data.asesores}
            />


            <div className="monthly-daily-section">

                <div className="monthly-daily-table">

                    <div className="monthly-daily-title">

                        <h2>
                            Contactos por Día
                        </h2>

                        <p>
                            Resumen de contactos por día y skill
                        </p>

                    </div>

                    <MonthlySummaryTable
                        data={data.grafico}
                    />

                </div>


                <div className="monthly-daily-chart">

                    <MonthlyChart
                        data={data.grafico}
                    />

                </div>

            </div>

            <div className="monthly-advisor-section">

                <MonthlyAdvisorTable
                    asesores={data.asesores}
                    asesorSeleccionado={asesorSeleccionado}
                    onSelect={setAsesorSeleccionado}
                />

                <MonthlyAdvisorDetail
                    asesor={asesorSeleccionado}
                />

            </div>


        </div>

    );

}


export default MonthlyReport;