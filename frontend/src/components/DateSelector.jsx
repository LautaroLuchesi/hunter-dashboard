import "../styles/date-selector.css";

function DateSelector({ fechas, fecha, onChange }) {

    return(

        <div className="date-selector">

            {fechas.map((f) => {

                const dia = Number(f.split("-")[2]);

                return (

                    <button
                        key={f}
                        className={fecha === f ? "day-button active" : "day-button"}
                        onClick={() => onChange(f)}
                    >
                        {dia}
                    </button>

                );

            })}

        </div>

    );

}

export default DateSelector;