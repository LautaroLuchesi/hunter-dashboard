import "../styles/advisorTable.css";
import { Fragment } from "react";

function AdvisorTable({ datos }) {

    const datosOrdenados = [...datos].sort((a, b) => {

        if (a.turno === b.turno) {
            return a.nombreAsesor.localeCompare(b.nombreAsesor);
        }

        return a.turno === "TM" ? -1 : 1;

    });

    const totalTM = datosOrdenados
        .filter(a => a.turno === "TM")
        .reduce((total, asesor) => ({
            dto: total.dto + asesor.dto,
            google: total.google + asesor.google,
            facebook: total.facebook + asesor.facebook,
            inbound: total.inbound + asesor.inbound,
            formulario: total.formulario + asesor.formulario,
            ventas: total.ventas + asesor.ventas
        }), {
            dto: 0,
            google: 0,
            facebook: 0,
            inbound: 0,
            formulario: 0,
            ventas: 0
        });

    const totalTT = datosOrdenados
        .filter(a => a.turno === "TT")
        .reduce((total, asesor) => ({
            dto: total.dto + asesor.dto,
            google: total.google + asesor.google,
            facebook: total.facebook + asesor.facebook,
            inbound: total.inbound + asesor.inbound,
            formulario: total.formulario + asesor.formulario,
            ventas: total.ventas + asesor.ventas
        }), {
            dto: 0,
            google: 0,
            facebook: 0,
            inbound: 0,
            formulario: 0,
            ventas: 0
        });

    return (

        <table className="advisor-table">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Asesor</th>

                    <th>DTO</th>

                    <th>GOO</th>
                    <th>FB</th>
                    <th>INB</th>
                    <th>FORM.</th>

                    <th>Ventas</th>
                    <th>Conv.</th>

                    <th>Estado</th>
                    <th>Horas</th>
                    <th>Turno</th>
                </tr>
            </thead>

            <tbody>

                {datosOrdenados.map((registro, index) => {

                    const esUltimoTM =
                        registro.turno === "TM" &&
                        (
                            index === datosOrdenados.length - 1 ||
                            datosOrdenados[index + 1].turno !== "TM"
                        );

                    const esUltimoTT =
                        registro.turno === "TT" &&
                        index === datosOrdenados.length - 1;

                    const totalGeneral = {
                        dto: totalTM.dto + totalTT.dto,
                        google: totalTM.google + totalTT.google,
                        facebook: totalTM.facebook + totalTT.facebook,
                        inbound: totalTM.inbound + totalTT.inbound,
                        formulario: totalTM.formulario + totalTT.formulario,
                        ventas: totalTM.ventas + totalTT.ventas
                    };

                    return (

                        <Fragment key={registro.idAsesor}>

                            <tr>

                                <td>{registro.idAsesor}</td>
                                <td>{registro.nombreAsesor}</td>
                                <td>{registro.dto}</td>

                                <td>{registro.google}</td>
                                <td>{registro.facebook}</td>
                                <td>{registro.inbound}</td>
                                <td>{registro.formulario}</td>

                                <td>{registro.ventas}</td>
                                <td
                                    className={
                                        registro.dto === 0
                                            ? "conv-rojo"
                                            : registro.ventas / registro.dto >= 0.20
                                                ? "conv-verde"
                                                : registro.ventas / registro.dto >= 0.10
                                                    ? "conv-amarillo"
                                                    : "conv-rojo"
                                    }
                                >
                                    {registro.dto > 0
                                        ? `${((registro.ventas / registro.dto) * 100).toFixed(1)}%`
                                        : "0%"}
                                </td>
                                <td>
                                    <span className={`estado estado-${registro.estado}`}>
                                        {registro.estado}
                                    </span>
                                </td>
                                <td>{registro.horas}</td>
                                <td>{registro.turno}</td>

                            </tr>

                            {esUltimoTM && (

                                <tr className="fila-total">

                                    <td colSpan={2}>
                                        <strong>TOTAL TM</strong>
                                    </td>

                                    <td>{totalTM.dto}</td>
                                    <td>{totalTM.google}</td>
                                    <td>{totalTM.facebook}</td>
                                    <td>{totalTM.inbound}</td>
                                    <td>{totalTM.formulario}</td>
                                    <td>{totalTM.ventas}</td>

                                    <td>
                                        {totalTM.dto > 0
                                            ? `${((totalTM.ventas / totalTM.dto) * 100).toFixed(1)}%`
                                            : "0%"}
                                    </td>

                                    <td colSpan={3}></td>

                                </tr>

                            )}

                            {esUltimoTT && (

                                <>
                                    <tr className="fila-total">

                                        <td colSpan={2}>
                                            <strong>TOTAL TT</strong>
                                        </td>

                                        <td>{totalTT.dto}</td>
                                        <td>{totalTT.google}</td>
                                        <td>{totalTT.facebook}</td>
                                        <td>{totalTT.inbound}</td>
                                        <td>{totalTT.formulario}</td>
                                        <td>{totalTT.ventas}</td>

                                        <td>
                                            {totalTT.dto > 0
                                                ? `${((totalTT.ventas / totalTT.dto) * 100).toFixed(1)}%`
                                                : "0%"}
                                        </td>

                                        <td colSpan={3}></td>

                                    </tr>

                                    <tr className="fila-total-general">

                                        <td colSpan={2}>
                                            <strong>TOTAL GENERAL</strong>
                                        </td>

                                        <td>{totalGeneral.dto}</td>
                                        <td>{totalGeneral.google}</td>
                                        <td>{totalGeneral.facebook}</td>
                                        <td>{totalGeneral.inbound}</td>
                                        <td>{totalGeneral.formulario}</td>
                                        <td>{totalGeneral.ventas}</td>

                                        <td>
                                            {totalGeneral.dto > 0
                                                ? `${((totalGeneral.ventas / totalGeneral.dto) * 100).toFixed(1)}%`
                                                : "0%"}
                                        </td>

                                        <td colSpan={3}></td>

                                    </tr>

                                </>

                            )}




                        </Fragment>

                    );

                })}
            </tbody>

        </table>

    );

}

export default AdvisorTable;

