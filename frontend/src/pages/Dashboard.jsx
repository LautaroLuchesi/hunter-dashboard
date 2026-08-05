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
import logoGout from "../assets/Logo_gout.png";
import logoHunter from "../assets/Logo_hunter.png";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

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
            setFechaSeleccionada(fechas[fechas.length - 1]);
        }

    }, [fechas, fechaSeleccionada]);

    if (loading) {
        return <h2>Cargando...</h2>;
    }

    if (error) {
        return <h2>Error al cargar los datos.</h2>;
    };

    console.log("Fechas:", fechas);
    console.log("Primera:", fechas[0]);

    return (

        <div className="dashboard">

            <header className="dashboard-header">

                <div className="dashboard-logos">

                    <img
                        src={logoGout}
                        alt="GOUT"
                        className="dashboard-logo"
                    />

                    <img
                        src={logoHunter}
                        alt="Hunter"
                        className="dashboard-logo"
                    />

                </div>

                <div className="dashboard-title-group">

                    <span className="dashboard-company">
                        GOUT ARGENTINA
                    </span>

                    <h1>
                        Seguimiento Hunter Uruguay
                    </h1>

                </div>

                <div className="dashboard-actions">

                    <button
                        className="hourly-report-button"
                        onClick={() => navigate("/hourly-report")}
                    >
                        📈 Ver reporte por hora
                    </button>

                </div>

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
                    Rendimiento detallado por asesor y skill
                </h2>

                <SkillTable
                    titulo="Inbound"
                    skill="INBOUND"
                    color="inbound"
                    datos={asesores}
                    presentismo={presentismo}
                />

                <SkillTable
                    titulo="Google"
                    skill="Google"
                    color="google"
                    datos={asesores}
                    presentismo={presentismo}
                />

                <SkillTable
                    titulo="Facebook"
                    skill="Facebook"
                    color="facebook"
                    datos={asesores}
                    presentismo={presentismo}
                />

                <SkillTable
                    titulo="Formulario"
                    skill="Formulario"
                    color="formulario"
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