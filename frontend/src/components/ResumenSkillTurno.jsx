import "../styles/ResumenSkillTurno.css";

function ResumenSkillTurno({ titulo, datos = {} }) {

    const color =
        titulo.includes("Inbound") ? "inbound" :
            titulo.includes("Google") ? "google" :
                titulo.includes("Facebook") ? "facebook" :
                    "formulario";

    return (

        <div className={`resumen-card ${color}`}>

            <div className="resumen-header">

                <div className="header-left">
                    <span className="header-dot"></span>
                    <span>{titulo}</span>
                </div>

            </div>

            <div className="resumen-body">

                <div className="resumen-item">
                    <span>Asesores</span>
                    <strong>{datos.operadores ?? 0}</strong>
                </div>

                <div className="resumen-item">
                    <span>Datos del dia</span>
                    <strong>{datos.dto ?? 0}</strong>
                </div>

                <div className="resumen-item">
                    <span>Horas</span>
                    <strong>{datos.horas ?? 0}</strong>
                </div>

                <div className="resumen-item ventas">
                    <span>Ventas brutas</span>
                    <strong>{datos.ventas ?? 0}</strong>
                </div>

                <div className="resumen-item">
                    <span>Ventas FI</span>
                    <strong>{datos.fi ?? 0}</strong>
                </div>

                <hr className="resumen-divider" />

                <div className="resumen-item efectividad">
                    <span>Conversión</span>
                    <strong>{datos.efectividad ?? 0}%</strong>
                </div>

            </div>

        </div>

    );

}

export default ResumenSkillTurno;