import "../../styles/monthly/MonthlyCards.css";

function MonthlyCards({ grafico, asesores }) {

    const dias = grafico?.length || 0;

    const totalDatos = grafico?.reduce(
        (total, dia) => total + (dia.totales || 0),
        0
    );

    const totalInbound = grafico?.reduce(
        (total, dia) => total + (dia.inbound || 0),
        0
    );

    const totalGoogle = grafico?.reduce(
        (total, dia) => total + (dia.google || 0),
        0
    );

    const totalFacebook = grafico?.reduce(
        (total, dia) => total + (dia.facebook || 0),
        0
    );

    const totalBotmaker = grafico?.reduce(
        (total, dia) => total + (dia.botmaker || 0),
        0
    );

    return (

        <div className="monthly-cards">

            <div className="monthly-card monthly-card-inbound">

                <h3>Inbound</h3>

                <div className="monthly-card-value">
                    {totalInbound}
                </div>

            </div>


            <div className="monthly-card monthly-card-google">

                <h3>Google</h3>

                <div className="monthly-card-value">
                    {totalGoogle}
                </div>

            </div>


            <div className="monthly-card monthly-card-facebook">

                <h3>Facebook</h3>

                <div className="monthly-card-value">
                    {totalFacebook}
                </div>

            </div>


            <div className="monthly-card monthly-card-botmaker">

                <h3>Botmaker</h3>

                <div className="monthly-card-value">
                    {totalBotmaker}
                </div>

            </div>


            <div className="monthly-card monthly-card-days">

                <h3>Días</h3>

                <div className="monthly-card-value">
                    {dias}
                </div>

            </div>


            <div className="monthly-card monthly-card-total">

                <h3>Totales</h3>

                <div className="monthly-card-value">
                    {totalDatos}
                </div>

            </div>

        </div>

    );

}

export default MonthlyCards;