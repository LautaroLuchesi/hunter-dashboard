import { useEffect } from "react";
import { ordenarAsesores } from "../utils/sortUtils";
import { calcularTotales } from "../utils/calcUtils";
import TurnoTable from "./TurnoTable";
import TotalCard from "./TotalCard";
import PresentismoCard from "./PresentismoCard";

function SkillTable({
    titulo,
    skill,
    color,
    datos = [],
    presentismo = []
}) {

    useEffect(() => {

    }, [datos, titulo]);

    const registros = datos.filter(
        (asesor) =>
            asesor.skill.toUpperCase() === skill.toUpperCase()
    );


    console.log("========== DEBUG SKILL ==========");
    console.log("Skill:", skill);
    console.log("Datos recibidos:", datos.length);
    console.log("Registros de este skill:", registros.length);

    console.log(
        "DTO de este skill:",
        registros.reduce(
            (total, asesor) => total + Number(asesor.dto || 0),
            0
        )
    );

    console.table(
        registros.map(r => ({
            id: r.idAsesor,
            nombre: r.nombreAsesor,
            skill: r.skill,
            dto: r.dto,
            turno: r.turno
        }))
    );

    console.log("================================");

    console.log("========== SKILLS RECIBIDOS ==========");

    console.log(
        [...new Set(datos.map(r => r.skill))]
    );

    console.log(
        "DTO TOTAL RECIBIDO:",
        datos.reduce(
            (total, r) => total + Number(r.dto || 0),
            0
        )
    );

    console.log("======================================");

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

            <div className="cards-container">

                <PresentismoCard
                    color={color}
                    registros={presentismo}
                />

                <TotalCard
                    color={color}
                    total={totalDiario}
                />

            </div>

        </div>

    );

}

export default SkillTable;