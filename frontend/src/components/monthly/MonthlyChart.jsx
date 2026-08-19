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

import "../../styles/monthly/MonthlyChart.css";

import MonthlyTooltip from "./MonthlyTooltip";

function MonthlyChart({ data }) {

    const obtenerDiaSemana = (fecha) => {

        const [dia, mes, anio] = fecha.split("/");

        const fechaObj = new Date(
            Number(anio),
            Number(mes) - 1,
            Number(dia)
        );

        const dias = [
            "domingo",
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado"
        ];

        return dias[fechaObj.getDay()];
    };


    const datosGrafico = data.map(item => ({

        ...item,

        etiqueta:
            `${obtenerDiaSemana(item.fecha)} ${item.fecha.slice(0, 2)}`
    }));


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

        <div className="monthly-chart">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <LineChart
                    data={datosGrafico}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 10,
                        bottom: 20
                    }}
                >

                    <CartesianGrid
                        stroke="#d9e5ff"
                        strokeDasharray="5 5"
                        vertical={true}
                        horizontal={true}
                    />


                    <XAxis
                        dataKey="etiqueta"

                        tick={{
                            fill: "#1e3a8a",
                            fontSize: 11,
                            fontWeight: 600
                        }}

                        angle={-25}

                        textAnchor="end"

                        height={60}

                        axisLine={{
                            stroke: "#9dbcf7",
                            strokeWidth: 2
                        }}
                    />


                    <YAxis

                        domain={[
                            0,
                            (dataMax) => dataMax + 40
                        ]}

                        label={{
                            value: "Contactos",
                            angle: -90,
                            position: "insideLeft",
                            fill: "#1e3a8a",
                            fontWeight: 600
                        }}

                        tick={{
                            fill: "#1e3a8a",
                            fontSize: 13,
                            fontWeight: 600
                        }}

                        tickLine={false}

                        axisLine={{
                            stroke: "#9dbcf7",
                            strokeWidth: 2
                        }}
                    />


                    <Tooltip
                        content={<MonthlyTooltip />}
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
                        name="Botmaker"
                        stroke="#0891b2"
                        strokeWidth={4}
                        strokeDasharray="6 4"
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

export default MonthlyChart;