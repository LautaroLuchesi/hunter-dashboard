import "../../styles/monthly/MonthSelector.css";

function MonthSelector({ meses, mes, onChange }) {

    const indiceActual = meses.indexOf(mes);

    const mesAnterior = () => {

        if (indiceActual > 0) {
            onChange(meses[indiceActual - 1]);
        }

    };

    const mesSiguiente = () => {

        if (indiceActual < meses.length - 1) {
            onChange(meses[indiceActual + 1]);
        }

    };

    return (

        <section className="month-selector">

            <div className="month-selector-header">

                <div className="month-selector-title">

                    <span className="month-selector-icon">
                        📅
                    </span>

                    <div>

                        <h2>
                            Mes de análisis
                        </h2>

                        <p>
                            Elegí el mes para visualizar la información.
                        </p>

                    </div>

                </div>

            </div>


            <div className="month-selector-controls">

                <button
                    className="month-selector-arrow"
                    onClick={mesAnterior}
                    disabled={indiceActual <= 0}
                >
                    ◀
                </button>


                <div className="month-selector-months">

                    {meses.map((item) => (

                        <button
                            key={item}
                            className={
                                `month-selector-month ${
                                    item === mes
                                        ? "active"
                                        : ""
                                }`
                            }
                            onClick={() => onChange(item)}
                        >
                            {item}
                        </button>

                    ))}

                </div>


                <button
                    className="month-selector-arrow"
                    onClick={mesSiguiente}
                    disabled={
                        indiceActual >= meses.length - 1
                    }
                >
                    ▶
                </button>

            </div>

        </section>

    );

}

export default MonthSelector;