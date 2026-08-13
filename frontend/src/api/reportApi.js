/*const API_URL = "http://localhost:3000/api/report";*/
const API_URL = "https://hunter-dashboard-api.onrender.com/api/report";

export async function getReport(fecha) {

    const url = fecha
        ? `${API_URL}?fecha=${fecha}`
        : API_URL;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("No se pudo obtener el reporte");
    }

    return response.json();

}