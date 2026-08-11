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
    FiClock,
    FiUser
} from "react-icons/fi";

import "../../styles/hourly/AdvisorDetail.css";

function AdvisorDetail({ asesor }) {

    if (!asesor) return null;

    const total = asesor.horas.reduce(
        (acc, hora) => acc + hora.datos,
        0
    );

    const horaPico = asesor.horas.reduce((max, actual) =>
        actual.datos > max.datos
            ? actual
            : max
    );

    return (

        <div className="advisor-detail">

            <div className="advisor-detail-content" key={asesor.id}>

                <h2>{asesor.nombre}</h2>

                <div className="advisor-detail-kpis">

                    <div>
                        <FiBarChart2 className="advisor-kpi-icon" />

                        <h4>Total datos</h4>

                        <span>{total}</span>
                    </div>

                    <div className="advisor-kpi-pico">

                        <FiClock className="advisor-kpi-icon" />

                        <h4>Hora pico</h4>

                        <span>{horaPico.hora}:00</span>

                        <div className="advisor-kpi-pico-info">
                            <div
                                className="advisor-kpi-pico-bar"
                                style={{
                                    width: `${Math.min((horaPico.datos / Math.max(total, 1)) * 100, 100)}%`
                                }}
                            />
                        </div>

                        <small>
                            {horaPico.datos} {horaPico.datos === 1 ? "dato" : "datos"}
                        </small>

                    </div>

                    <div>
                        <FiUser className="advisor-kpi-icon" />

                        <h4>Turno</h4>

                        <span>{asesor.turno || "—"}</span>
                    </div>

                </div>

                <div className="advisor-detail-chart">
                    <ResponsiveContainer width="100%" height={270}>

                        <LineChart
                            data={asesor.horas}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 5
                            }}
                        >
                            <defs>
                                <linearGradient id="actividadGradient" x1="0" y1="0" x2="0" y2="1">
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
                                dataKey="hora"
                                tick={{ fill: "#64748b", fontSize: 13 }}
                                axisLine={{ stroke: "#94a3b8" }}
                                tickLine={false}
                            />

                            <YAxis
                                allowDecimals={false}
                                tick={{ fill: "#64748b", fontSize: 13 }}
                                axisLine={{ stroke: "#94a3b8" }}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    background: "#ffffff",
                                    border: "1px solid #d8e4ff",
                                    borderRadius: "12px",
                                    boxShadow: "0 8px 20px rgba(25,60,130,.12)"
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
                                fill="url(#actividadGradient)"
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
                                x={horaPico.hora}
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

export default AdvisorDetail;