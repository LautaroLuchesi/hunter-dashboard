import {
    ResponsiveContainer,
    LineChart,
    Line
} from "recharts";


function MonthlyAdvisorMiniChart({ data }) {

    return (

        <div
            style={{
                width: "100%",
                maxWidth: 170,
                height: 45,
                minWidth: 0
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


export default MonthlyAdvisorMiniChart;