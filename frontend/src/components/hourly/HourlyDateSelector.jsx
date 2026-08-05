function HourlyDateSelector({

    fechas,
    fechaSeleccionada,
    onChange

}) {

    return (

        <div className="hourly-date-selector">

            <label>Fecha</label>

            <select
                value={fechaSeleccionada}
                onChange={(e) => onChange(e.target.value)}
            >

                {fechas.map((fecha) => (

                    <option
                        key={fecha}
                        value={fecha}
                    >

                        {fecha}

                    </option>

                ))}

            </select>

        </div>

    );

}

export default HourlyDateSelector;