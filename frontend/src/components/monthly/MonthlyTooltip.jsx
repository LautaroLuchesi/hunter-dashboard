import "../../styles/monthly/MonthlyTooltip.css";

function MonthlyTooltip({ active, payload, label }) {

    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (

        <div className="monthly-tooltip">

            <div className="monthly-tooltip-header">

                📅 {label}

            </div>

            {payload.map((item) => (

                <div
                    key={item.dataKey}
                    className="monthly-tooltip-row"
                >

                    <span
                        className="monthly-tooltip-dot"
                        style={{ background: item.color }}
                    />

                    <span className="monthly-tooltip-name">

                        {item.name}

                    </span>

                    <span className="monthly-tooltip-value">

                        {item.value}

                    </span>

                </div>

            ))}

        </div>

    );

}

export default MonthlyTooltip;