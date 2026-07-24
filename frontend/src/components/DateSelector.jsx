import "../styles/date-selector.css";

function DateSelector({ fechas, fecha, onChange }) {

    return (

        <select  className="date-selector"
            value={fecha}
            onChange={(e) => onChange(e.target.value)}
        >

            {fechas.map((f) => (

                <option
                    key={f}
                    value={f}
                >
                    {f}
                </option>

            ))}

        </select>

    );

}

export default DateSelector;