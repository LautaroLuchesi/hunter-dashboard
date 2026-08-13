/*const API_URL = "http://localhost:3000/api/hourly-report";*/
const API_URL = "https://hunter-dashboard-api.onrender.com/api/hourly-report";

export async function getHourlyReport(fecha) {

    const url = fecha
        ? `${API_URL}?fecha=${encodeURIComponent(fecha)}`
        : API_URL;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("No se pudo obtener el gráfico");
    }

    return await response.json();

}