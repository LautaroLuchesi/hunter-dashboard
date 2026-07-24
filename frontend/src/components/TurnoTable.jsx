import {
    calcularConversion,
    obtenerColorConversion,
} from "../utils/calcUtils";

export default function TurnoTable({
    titulo,
    color,
    registros,
    total,
}) {

    return (

        <div className="turno-card">

            <h3 className={`turno-title ${color}`}>{titulo}</h3>

            <table className="turno-table">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Asesor</th>
                        <th>DTO</th>
                        <th>Ventas</th>
                        <th>Conv %</th>
                    </tr>
                </thead>

                <tbody>

                    {registros.map((asesor) => {

                        const conv = calcularConversion(
                            asesor.dto,
                            asesor.ventas
                        );

                        return (

                            <tr key={asesor.idAsesor}>

                                <td>{asesor.idAsesor}</td>

                                <td>{asesor.nombreAsesor}</td>

                                <td>{asesor.dto}</td>

                                <td>{asesor.ventas}</td>

                                <td className={obtenerColorConversion(conv)}>
                                    {conv.toFixed(2)}%
                                </td>

                            </tr>

                        );

                    })}

                    <tr className="total-turno">

                        <td colSpan={2}>
                            <strong>TOTAL {titulo}</strong>
                        </td>

                        <td>{total.dto}</td>

                        <td>{total.ventas}</td>

                        <td>{total.conversion.toFixed(2)}%</td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

}