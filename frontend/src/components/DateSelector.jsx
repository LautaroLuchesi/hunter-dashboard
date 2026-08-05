import { useEffect, useState } from "react";
import "../styles/date-selector.css";
import { FiCalendar } from "react-icons/fi";
import { parseDate } from "../utils/dateUtils";

function DateSelector({ fechas, fecha, onChange }) {

    const [mesActual, setMesActual] = useState(new Date());

    useEffect(() => {

        if (fecha) {
            setMesActual(parseDate(fecha));
        }

    }, [fecha]);

    const nombreMes = mesActual.toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric"
    });

    const anio = mesActual.getFullYear();
    const mes = mesActual.getMonth();

    const mesesDisponibles = [
        ...new Set(
            fechas.map((f) => {

                const fechaTemp = parseDate(f);

                return `${fechaTemp.getFullYear()}-${fechaTemp.getMonth()}`;

            })
        )
    ];

    const indiceMes = mesesDisponibles.indexOf(
        `${anio}-${mes}`
    );

    const fechasDelMes = fechas.filter((f) => {

        const fechaTemp = parseDate(f);

        return (
            fechaTemp.getFullYear() === anio &&
            fechaTemp.getMonth() === mes
        );

    });

    function mesAnterior() {

        if (indiceMes <= 0) return;

        const [nuevoAnio, nuevoMes] =
            mesesDisponibles[indiceMes - 1]
                .split("-")
                .map(Number);

        setMesActual(new Date(nuevoAnio, nuevoMes, 1));

    }

    function mesSiguiente() {

        if (indiceMes >= mesesDisponibles.length - 1) return;

        const [nuevoAnio, nuevoMes] =
            mesesDisponibles[indiceMes + 1]
                .split("-")
                .map(Number);

        setMesActual(new Date(nuevoAnio, nuevoMes, 1));

    }

    return (

        <div className="date-panel">

            <div className="date-panel-header">

                <h3 className="date-panel-title">
                    <FiCalendar />
                    <span>Fecha de análisis</span>
                </h3>

                <p>
                    Elegí el día para visualizar la información.
                </p>

            </div>
            <div className="month-selector">

                <button
                    type="button"
                    onClick={mesAnterior}
                    disabled={indiceMes === 0}
                    className="month-button"
                >
                    ◀
                </button>

                <span className="month-title">
                    {nombreMes}
                </span>

                <button
                    type="button"
                    onClick={mesSiguiente}
                    disabled={indiceMes === mesesDisponibles.length - 1}
                    className="month-button"
                >
                    ▶
                </button>

            </div>

            <div className="date-selector">

                {fechasDelMes.map((f) => {

                    const fechaTemp = parseDate(f);

                    const dia = fechaTemp.getDate();

                    const esHoy =
                        fechaTemp.toDateString() === new Date().toDateString();

                    return (

                        <button
                            key={f}
                            type="button"
                            className={`day-button ${fecha === f ? "active" : ""} ${esHoy ? "today" : ""}`}
                            onClick={() => onChange(f)}
                        >
                            {dia}
                        </button>

                    );

                })}
            </div>

        </div>

    );

}

export default DateSelector;