import {
    ResponsiveContainer,
    LineChart,
    Line
} from "recharts";

function AdvisorMiniChart({ data }) {

    return (

        <div
            style={{
                width: 170,
                height: 45
            }}
        >

            <ResponsiveContainer>

                <LineChart data={data}>

                    <Line
                        type="monotone"
                        dataKey="datos"
                        stroke="#2954d1"
                        strokeWidth={2.5}
                        dot={false}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default AdvisorMiniChart;