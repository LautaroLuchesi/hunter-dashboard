import MonthlyAdvisorMiniChart from "./MonthlyAdvisorMiniChart";

import "../../styles/monthly/MonthlyAdvisorTable.css";


function MonthlyAdvisorTable({
    asesores,
    asesorSeleccionado,
    onSelect
}) {

    if (!asesores || asesores.length === 0) {

        return (

            <div className="monthly-advisor-table-container">

                <div className="monthly-advisor-table-empty">
                    No hay datos de asesores para este mes.
                </div>

            </div>

        );

    }


    return (

        <div className="monthly-advisor-table-container">

            <h2 className="monthly-advisor-table-title">
                Actividad por Asesor
            </h2>


            <div className="monthly-advisor-table">

                <div className="monthly-advisor-table-header">

                    <span>ID</span>
                    <span>Asesor</span>
                    <span>Turno</span>
                    <span>Datos</span>
                    <span>Actividad</span>

                </div>


                <div className="monthly-advisor-table-body">

                    {asesores.map((asesor) => (

                        <div
                            key={asesor.id}

                            className={`monthly-advisor-table-row ${
                                asesorSeleccionado?.id === asesor.id
                                    ? "selected"
                                    : ""
                            }`}

                            onClick={() => onSelect(asesor)}

                        >

                             <span>{asesor.id}</span>


                            <span className="monthly-advisor-name">

                                {asesor.nombre}

                            </span>


                            <span>

                                {asesor.turno || "—"}

                            </span>


                            <span className="monthly-advisor-data">

                                {asesor.dias?.reduce(
                                    (total, dia) =>
                                        total + dia.datos,
                                    0
                                ) || 0}

                            </span>


                            <MonthlyAdvisorMiniChart
                                data={asesor.dias || []}
                            />

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}


export default MonthlyAdvisorTable;