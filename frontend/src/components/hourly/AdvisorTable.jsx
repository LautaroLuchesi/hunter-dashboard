import "../../styles/hourly/AdvisorTable.css";
import AdvisorMiniChart from "./AdvisorMiniChart";

function AdvisorTable({

    asesores,

    asesorSeleccionado,

    onSelect

}) {

    return (

        <div className="advisor-table-container">

            <h2 className="advisor-table-title">
                Actividad por Asesor
            </h2>
            <div className="advisor-table">

                <div className="advisor-table-header">

                    <span>ID</span>
                    <span>Asesor</span>
                    <span>Turno</span>
                    <span>Actividad</span>

                </div>

                <div className="advisor-table-body">

                    {asesores.map((asesor) => (

                        <div
                            key={asesor.id}
                            className={`advisor-table-row ${asesorSeleccionado?.id === asesor.id
                                ? "selected"
                                : ""
                                }`}
                            onClick={() => onSelect(asesor)}
                        >

                            <span>{asesor.id}</span>

                            <span>{asesor.nombre}</span>

                            <span>{asesor.turno}</span>

                            <AdvisorMiniChart
                                data={asesor.horas}
                            />

                        </div> 

                    ))}
                </div>

            </div>
        </div>

    );

}

export default AdvisorTable;