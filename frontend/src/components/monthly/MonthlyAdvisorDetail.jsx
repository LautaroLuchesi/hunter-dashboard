import {
    ResponsiveContainer,
    LineChart,
    Line,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceLine
} from "recharts";

import {
    FiBarChart2,
    FiCalendar,
    FiUser,
    FiShoppingCart
} from "react-icons/fi";

import "../../styles/monthly/MonthlyAdvisorDetail.css";


function MonthlyAdvisorDetail({ asesor }) {

    if (!asesor) return null;


    const total = asesor.dias.reduce(
        (acc, dia) => acc + dia.datos,
        0
    );


    const diaPico = asesor.dias.reduce(
        (max, actual) =>
            actual.datos > max.datos
                ? actual
                : max
    );


    const obtenerDiaSemana = (fecha) => {

        const [dia, mes, anio] = fecha.split("/");

        const date = new Date(
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

        return dias[date.getDay()];

    };


    const datosGrafico = asesor.dias.map((dia) => ({

        ...dia,

        etiqueta:
            `${obtenerDiaSemana(dia.fecha)} ${dia.fecha.slice(0, 2)}`

    }));


    return (

        <div className="monthly-advisor-detail">

            <div
                className="monthly-advisor-detail-content"
                key={asesor.id}
            >

                <div className="monthly-advisor-detail-header">

                    <h2>
                        {asesor.nombre}
                    </h2>


                    <div className="monthly-advisor-detail-sales">

                        <FiShoppingCart
                            className="monthly-advisor-sales-icon"
                        />

                        <div>

                            <span>
                                Ventas del mes
                            </span>

                            <strong>
                                {asesor.ventas || 0}
                            </strong>

                        </div>

                    </div>

                </div>


                <div className="monthly-advisor-detail-kpis">

                    <div>

                        <FiBarChart2
                            className="monthly-advisor-kpi-icon"
                        />

                        <h4>
                            Total datos
                        </h4>

                        <span>
                            {total}
                        </span>

                    </div>


                    <div className="monthly-advisor-kpi-pico">

                        <FiCalendar
                            className="monthly-advisor-kpi-icon"
                        />

                        <h4>
                            Día pico
                        </h4>

                        <span>
                            {diaPico.fecha}
                        </span>


                        <div className="monthly-advisor-kpi-pico-info">

                            <div
                                className="monthly-advisor-kpi-pico-bar"
                                style={{
                                    width: `${Math.min(
                                        (diaPico.datos /
                                            Math.max(total, 1)) *
                                        100,
                                        100
                                    )}%`
                                }}
                            />

                        </div>


                        <small>
                            {diaPico.datos}{" "}
                            {diaPico.datos === 1
                                ? "dato"
                                : "datos"}
                        </small>

                    </div>


                    <div>

                        <FiUser
                            className="monthly-advisor-kpi-icon"
                        />

                        <h4>
                            Turno
                        </h4>

                        <span>
                            {asesor.turno || "—"}
                        </span>

                    </div>

                </div>


                <div className="monthly-advisor-detail-chart">

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart
                            data={datosGrafico}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 5
                            }}
                        >

                            <defs>

                                <linearGradient
                                    id={`actividadGradient-${asesor.id}`}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >

                                    <stop
                                        offset="0%"
                                        stopColor="#2954d1"
                                        stopOpacity={0.25}
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#2954d1"
                                        stopOpacity={0}
                                    />

                                </linearGradient>

                            </defs>


                            <CartesianGrid
                                strokeDasharray="5 5"
                                stroke="#d7e0ef"
                            />


                            <XAxis
                                dataKey="etiqueta"
                                tick={{
                                    fill: "#64748b",
                                    fontSize: 11
                                }}
                                axisLine={{
                                    stroke: "#94a3b8"
                                }}
                                tickLine={false}
                                angle={-25}
                                textAnchor="end"
                                height={55}
                            />


                            <YAxis
                                allowDecimals={false}
                                tick={{
                                    fill: "#64748b",
                                    fontSize: 13
                                }}
                                axisLine={{
                                    stroke: "#94a3b8"
                                }}
                                tickLine={false}
                            />


                            <Tooltip
                                contentStyle={{
                                    background: "#ffffff",
                                    border: "1px solid #d8e4ff",
                                    borderRadius: "12px",
                                    boxShadow:
                                        "0 8px 20px rgba(25,60,130,.12)"
                                }}
                                labelStyle={{
                                    color: "#21439d",
                                    fontWeight: 700
                                }}
                            />


                            <Area
                                type="monotone"
                                dataKey="datos"
                                stroke="none"
                                fill={`url(#actividadGradient-${asesor.id})`}
                            />


                            <Line
                                type="monotone"
                                dataKey="datos"
                                stroke="#2954d1"
                                strokeWidth={3}
                                dot={{
                                    r: 4,
                                    fill: "#ffffff",
                                    stroke: "#2954d1",
                                    strokeWidth: 2
                                }}
                                activeDot={{
                                    r: 7,
                                    fill: "#2954d1",
                                    stroke: "#ffffff",
                                    strokeWidth: 3
                                }}
                            />


                            <ReferenceLine
                                x={`${obtenerDiaSemana(diaPico.fecha)} ${diaPico.fecha.slice(0, 2)}`}
                                stroke="#2954d1"
                                strokeDasharray="4 4"
                                strokeOpacity={0.6}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>

    );

}


export default MonthlyAdvisorDetail;