const API_URL = "http://localhost:3000/api/report";

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