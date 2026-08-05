import "../../styles/hourly/HourlyCards.css";

function HourlyCards({ grafico }) {

    const totalInbound = grafico.reduce((acc, item) => acc + item.inbound, 0);
    const totalGoogle = grafico.reduce((acc, item) => acc + item.google, 0);
    const totalFacebook = grafico.reduce((acc, item) => acc + item.facebook, 0);
    const totalBotmaker = grafico.reduce((acc, item) => acc + item.botmaker, 0);
    const totalForms = grafico.reduce((acc, item) => acc + item.forms, 0);
    const totalGeneral = grafico.reduce((acc, item) => acc + item.totales, 0);

    const cards = [
        {
            title: "Inbound",
            value: totalInbound,
            color: "#2563eb"

        },
        {
            title: "Google",
            value: totalGoogle,
            color: "#16a34a"
        },
        {
            title: "Facebook",
            value: totalFacebook,
            color: "#9333ea"
        },
        {
            title: "Botmaker",
            value: totalBotmaker,
            color: "#0891b2"
        },
        {
            title: "Forms",
            value: totalForms,
            color: "#ea580c"
        },
        {
            title: "Totales",
            value: totalGeneral,
            color: "#111827"
        }
    ];

    return (

        <div className="hourly-cards">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="hourly-card"
                >
                    <div
                        className="hourly-card-top"
                        style={{ backgroundColor: card.color }}
                    />

                    <span className="hourly-card-title">
                        {card.title}
                    </span>

                    <div className="hourly-card-box">
                        <h2
                            className="hourly-card-value"
                            style={{ color: card.color }}
                        >
                            {card.value}
                        </h2>
                    </div>
                </div>
    ))
}
        </div >

    );

}

export default HourlyCards;