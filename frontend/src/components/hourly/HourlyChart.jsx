import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";

import "../../styles/hourly/HourlyChart.css";

function HourlyChart({ data }) {

    return (

        <div className="hourly-chart-container">

            <h2 className="hourly-chart-title">
                Contactos por Hora
            </h2>

            <ResponsiveContainer width="100%" height={420}>

                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 10,
                        bottom: 10
                    }}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="hora" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="inbound"
                        stroke="#3366ff"
                        strokeWidth={3}
                    />

                    <Line
                        type="monotone"
                        dataKey="google"
                        stroke="#16a34a"
                        strokeWidth={3}
                    />

                    <Line
                        type="monotone"
                        dataKey="facebook"
                        stroke="#9333ea"
                        strokeWidth={3}
                    />

                    <Line
                        type="monotone"
                        dataKey="botmaker"
                        stroke="#0891B2"
                        strokeWidth={4}
                        strokeDasharray="6 4"
                        name="Botmaker"
                    />

                    <Line
                        type="monotone"
                        dataKey="forms"
                        stroke="#f97316"
                        strokeWidth={3}
                    />

                    <Line
                        type="monotone"
                        dataKey="totales"
                        stroke="#0f172a"
                        strokeDasharray="6 4"
                        strokeWidth={4}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default HourlyChart;