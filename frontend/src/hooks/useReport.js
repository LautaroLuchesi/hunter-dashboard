import { useEffect, useState } from "react";
import { getReport } from "../api/reportApi";

export function useReport(fechaSeleccionada) {

    const [fechas, setFechas] = useState([]);
    const [dashboard, setDashboard] = useState({});
    const [asesores, setAsesores] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function cargar() {

            try {

                setLoading(true);

                const reporte = await getReport(fechaSeleccionada);

                setFechas(reporte.fechas);
                setDashboard(reporte.dashboard);
                setAsesores(reporte.asesores);

            } catch (err) {

                setError(err);

            } finally {

                setLoading(false);

            }

        }

        cargar();

    }, [fechaSeleccionada]);

    return {

        fechas,
        dashboard,
        asesores,

        loading,
        error

    };

}