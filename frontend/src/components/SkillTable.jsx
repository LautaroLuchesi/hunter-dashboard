import { useEffect } from "react";
import { ordenarAsesores } from "../utils/sortUtils";
import { calcularTotales } from "../utils/calcUtils";
import TurnoTable from "./TurnoTable";
import TotalCard from "./TotalCard";

function SkillTable({
    titulo,
    skill,
    color,
    datos = [],
}) {

    useEffect(() => {
        console.log(`${titulo}:`, datos);
    }, [datos, titulo]);

    const registros = datos.filter(
        (asesor) => asesor.skill === skill
    );

    const tm = ordenarAsesores(
        registros.filter((asesor) => asesor.turno === "TM")
    );

    const tt = ordenarAsesores(
        registros.filter((asesor) => asesor.turno === "TT")
    );

    const totalTM = calcularTotales(tm);

    const totalTT = calcularTotales(tt);

    const totalDiario = calcularTotales(registros);

    return (

        <div className={`skill-table ${color}`}>

            <h2 className="skill-title">{titulo}</h2>

            <div className="turnos-container">

                <TurnoTable
                    titulo="TM"
                    color={color}
                    registros={tm}
                    total={totalTM}
                />

                <TurnoTable
                    titulo="TT"
                    color={color}
                    registros={tt}
                    total={totalTT}
                />

            </div>

            <TotalCard
                color={color}
                total={totalDiario}
            />

        </div>

    );

}

export default SkillTable;