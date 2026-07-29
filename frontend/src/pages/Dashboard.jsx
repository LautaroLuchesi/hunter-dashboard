import { useEffect, useState } from "react";
import { useReport } from "../hooks/useReport";
import DateSelector from "../components/DateSelector";
import AdvisorTable from "../components/AdvisorTable";
import ResumenSkillTurno from "../components/ResumenSkillTurno";
import "../styles/dashboard.css";
import "../styles/skillTable.css";
import GeneralKpi from "../components/GeneralKpi";
import { skills } from "../config/skills";
import SkillTable from "../components/SkillTable";
import { agruparAsesores } from "../utils/advisorUtils";

function Dashboard() {

    const [fechaSeleccionada, setFechaSeleccionada] = useState("");

    const {
        fechas,
        dashboard,
        asesores,
        loading,
        error,
        presentismo
    } = useReport(fechaSeleccionada);

    const asesoresAgrupados = agruparAsesores(asesores);

    useEffect(() => {

        if (fechas.length > 0 && !fechaSeleccionada) {
            setFechaSeleccionada(fechas[0]);
        }

    }, [fechas, fechaSeleccionada]);

    if (loading) {
        return <h2>Cargando...</h2>;
    }

    if (error) {
        return <h2>Error al cargar los datos.</h2>;
    };

    return (

        <div className="dashboard">

            <header className="dashboard-header">

                <h1 className="dashboard-title">
                    Hunter Uruguay
                </h1>

            </header>

            <section className="dashboard-section">

                <DateSelector
                    fechas={fechas}
                    fecha={fechaSeleccionada}
                    onChange={setFechaSeleccionada}
                />

                <GeneralKpi dashboard={dashboard} />

            </section>


            <section className="dashboard-section">

                <h2 className="section-title">
                    Rendimiento por Skill
                </h2>

                <div className="resumen-grid">

                    {skills.map((skill) => (

                        <ResumenSkillTurno
                            key={skill.key}
                            titulo={skill.titulo}
                            datos={dashboard[skill.key]}
                        />

                    ))}

                </div>

            </section>

            <section className="dashboard-section">

                <h2 className="section-title">
                    Detalle por Skill
                </h2>

                <SkillTable
                    titulo="Inbound"
                    skill="INBOUND"
                    color="blue"
                    datos={asesores}
                    presentismo={presentismo}
                />

                <SkillTable
                    titulo="Google"
                    skill="Google"
                    color="green"
                    datos={asesores}
                    presentismo={presentismo}
                />

                <SkillTable
                    titulo="Facebook"
                    skill="Facebook"
                    color="purple"
                    datos={asesores}
                    presentismo={presentismo}
                />

            </section>


            <section className="dashboard-section">

                <h2 className="section-title">
                    Detalle de Asesores
                </h2>

                <AdvisorTable
                    datos={asesoresAgrupados}
                />

            </section>

        </div>

    );

}

export default Dashboard;