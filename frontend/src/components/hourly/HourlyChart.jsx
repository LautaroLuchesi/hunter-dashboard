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
import HourlyTooltip from "./HourlyTooltip";

function HourlyChart({ data }) {

    const lineProps = {
        dot: {
            r: 3,
            fill: "#ffffff",
            strokeWidth: 2
        },
        activeDot: {
            r: 7,
            strokeWidth: 3
        },
        isAnimationActive: true,
        animationDuration: 900,
        animationEasing: "ease-out"
    };

    return (

        <div className="hourly-chart-container">

            <h2 className="hourly-chart-title">
                Contactos por Hora
            </h2>

            <ResponsiveContainer width="100%" height={500}>

                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 10,
                        bottom: 10
                    }}
                >

                    <CartesianGrid
                        stroke="#d9e5ff"
                        strokeDasharray="5 5"
                        vertical={true}
                        horizontal={true}
                    />

                    <XAxis
                        dataKey="hora"
                        label={{
                            value: "Hora del día",
                            position: "insideBottom",
                            offset: -5,
                            fill: "#1e3a8a",
                            fontWeight: 600
                        }}
                        tick={{ fill: "#1e3a8a", fontSize: 15, fontWeight: 600 }}
                        tickFormatter={(hora) =>
                            `${hora.toString().padStart(2, "0")}:00`
                        }
                        axisLine={{
                            stroke: "#9dbcf7",
                            strokeWidth: 2
                        }}
                    />

                    <YAxis
                        domain={[0, 50]}
                        label={{
                            value: "Contactos",
                            angle: -90,
                            position: "insideLeft",
                            fill: "#1e3a8a",
                            fontWeight: 600
                        }}
                        ticks={[0, 10, 20, 30, 40, 50]}
                        tick={{ fill: "#1e3a8a", fontSize: 15, fontWeight: 600 }}
                        tickLine={false}
                        axisLine={{
                            stroke: "#9dbcf7",
                            strokeWidth: 2
                        }}
                    />

                    <Tooltip
                        content={<HourlyTooltip />}
                        cursor={{
                            stroke: "#3b82f6",
                            strokeOpacity: .35,
                            strokeWidth: 2,
                            strokeDasharray: "5 5"
                        }}
                    />

                    <Legend
                        verticalAlign="top"
                        align="center"
                        iconType="circle"
                        wrapperStyle={{
                            paddingBottom: 20,
                            fontSize: "14px",
                            fontWeight: 600
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="inbound"
                        name="Inbound"
                        stroke="#3366ff"
                        strokeWidth={2.5}
                        {...lineProps}
                    />

                    <Line
                        type="monotone"
                        dataKey="google"
                        name="Google"
                        stroke="#16a34a"
                        strokeWidth={2.5}
                        {...lineProps}
                    />

                    <Line
                        type="monotone"
                        dataKey="facebook"
                        name="Facebook"
                        stroke="#9333ea"
                        strokeWidth={2.5}
                        {...lineProps}
                    />

                    <Line
                        type="monotone"
                        dataKey="botmaker"
                        stroke="#0891B2"
                        strokeWidth={4}
                        strokeDasharray="6 4"
                        name="botmaker"
                        {...lineProps}
                    />

                    <Line
                        type="monotone"
                        dataKey="forms"
                        name="Forms"
                        stroke="#f97316"
                        strokeWidth={2.5}
                        {...lineProps}
                    />

                    <Line
                        type="monotone"
                        dataKey="totales"
                        name="Total"
                        stroke="#0f172a"
                        strokeWidth={4}
                        strokeDasharray="6 4"
                        {...lineProps}
                    />

                    <Line
                        type="monotone"
                        dataKey="asesores"
                        name="Asesores"
                        stroke="#e53935"
                        strokeWidth={2.5}
                        {...lineProps}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default HourlyChart;