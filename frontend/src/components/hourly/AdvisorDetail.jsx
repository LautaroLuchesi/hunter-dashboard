import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

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

            <h2>{asesor.nombre}</h2>

            <div className="advisor-detail-kpis">

                <div>

                    <h4>Total datos</h4>

                    <span>{total}</span>

                </div>

                <div>

                    <h4>Hora pico</h4>

                    <span>{horaPico.hora}:00</span>

                </div>

                <div>

                    <h4>Turno</h4>

                    <span>{asesor.turno}</span>

                </div>

            </div>

            <div
                style={{
                    width: "100%",
                    height: 270,
                    overflow: "hidden"
                }}
            >
                <ResponsiveContainer
                    width="99%"
                    height="100%"
                >
                    <LineChart data={asesor.horas}>

                        <CartesianGrid strokeDasharray="5 5" />

                        <XAxis dataKey="hora" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="datos"
                            stroke="#2954d1"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                        />

                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

}

            export default AdvisorDetail;