export default function PresentismoCard({ registros = [], color }) {

    const equipo = registros.length;

    const presentes = registros.filter(
        (a) => a.estado === "P"
    ).length;

    const ausentes = equipo - presentes;

    const porcentaje =
        equipo === 0
            ? 0
            : (presentes / equipo) * 100;

    const colorBarra =
        porcentaje >= 90
            ? "#36b24a"
            : porcentaje >= 75
                ? "#f5b400"
                : "#ef4444";

    console.table(
        registros.map(r => ({
            id: r.idAsesor,
            nombre: r.nombreAsesor,
            estado: r.estado
        }))
    );

    return (

        <div className={`total-diario-card presentismo ${color}`}>

            <div className="total-header">
                PRESENTISMO
            </div>

            <div className="presentismo-content">

                <div className="presentismo-grid">

                    <div className="presentismo-item">
                        <span>Equipo</span>
                        <strong>{equipo}</strong>
                    </div>

                    <div className="presentismo-item">
                        <span>Presentes</span>
                        <strong className="verde">{presentes}</strong>
                    </div>

                    <div className="presentismo-item">
                        <span>Ausentes</span>
                        <strong className="rojo">{ausentes}</strong>
                    </div>

                </div>

            </div>

        </div>

    );

}