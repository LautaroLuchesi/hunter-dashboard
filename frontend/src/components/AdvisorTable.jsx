import "../styles/table.css";

function AdvisorTable({ datos }) {

    return (

        <table className="advisor-table">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Asesor</th>
                    <th>Skill</th>
                    <th>DTO</th>
                    <th>Ventas</th>
                    <th>Estado</th>
                    <th>Horas</th>
                    <th>Turno</th>
                </tr>
            </thead>

            <tbody>

                {datos.map((registro, index) => (

                    <tr key={index}>

                        <td>{registro.idAsesor}</td>
                        <td>{registro.nombreAsesor}</td>
                        <td>{registro.skill}</td>
                        <td>{registro.dto}</td>
                        <td>{registro.ventas}</td>
                        <td>{registro.estado}</td>
                        <td>{registro.horas}</td>
                        <td>{registro.turno}</td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default AdvisorTable;