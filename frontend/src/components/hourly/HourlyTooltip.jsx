import "../../styles/hourly/HourlyTooltip.css";

function HourlyTooltip({ active, payload, label }) {

    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (

        <div className="hourly-tooltip">

            <div className="hourly-tooltip-header">

                🕒 {label}:00 hs

            </div>

            {payload.map((item) => (

                <div
                    key={item.dataKey}
                    className="hourly-tooltip-row"
                >

                    <span
                        className="hourly-tooltip-dot"
                        style={{ background: item.color }}
                    />

                    <span className="hourly-tooltip-name">

                        {item.name}

                    </span>

                    <span className="hourly-tooltip-value">

                        {item.value}

                    </span>

                </div>

            ))}

        </div>

    );

}

export default HourlyTooltip;