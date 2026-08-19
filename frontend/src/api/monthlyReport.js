const API_URL = "http://localhost:3000/api/monthly-report";
/*const API_URL = "https://hunter-dashboard-api.onrender.com/api/monthly-report";*/

export async function getMonthlyReport(mes) {

    const url = mes
        ? `${API_URL}?mes=${encodeURIComponent(mes)}`
        : API_URL;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("No se pudo obtener el reporte mensual");
    }

    return response.json();

}