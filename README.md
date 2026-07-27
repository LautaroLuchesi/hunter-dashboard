# hunter-dashboard

Dashboard de métricas comerciales de Hunter Uruguay. Lee los datos desde una
planilla de Google Sheets, los procesa en el backend y los muestra en un
dashboard web.

```
Google Sheets  ──►  Backend (Express :3000)  ──►  Frontend (React :5173)
   (datos)          lee, parsea y calcula          tablas y KPIs
```

## Requisitos

- Node.js 20 o superior (probado en 24.x)
- Una service account de Google con acceso de lectura a la planilla

## Puesta en marcha

### 1. Clonar e instalar

```bash
git clone https://github.com/LautaroLuchesi/hunter-dashboard.git
cd hunter-dashboard

cd backend  && npm install
cd ../frontend && npm install
```

### 2. Configurar las credenciales del backend

Estos dos pasos son obligatorios: sin ellos el backend levanta, pero
`/api/report` devuelve error 500.

**a) Variables de entorno**

```bash
cd backend
cp .env.example .env        # PowerShell: Copy-Item .env.example .env
```

Editá `.env` y completá `SPREADSHEET_ID` con el ID de la planilla. Se saca de
la URL:

```
https://docs.google.com/spreadsheets/d/<ESTE_ES_EL_ID>/edit
```

**b) Clave de la service account**

Descargá el JSON de la service account desde Google Cloud Console
(*IAM y administración → Cuentas de servicio → Claves → Crear clave nueva → JSON*)
y guardalo en:

```
backend/credentials/credentials.json
```

Después compartí la planilla con el email de la service account (el campo
`client_email` del JSON), con permiso de **Lector**. Sin esto, Google responde
403 aunque la clave sea válida.

> **Los secretos nunca se suben al repo.** `.env` y `credentials/` están en el
> `.gitignore`. Si necesitás pasarle las credenciales a alguien del equipo,
> usá un canal privado — nunca un commit, un issue ni un chat público.

### 3. Levantar los servidores

Hacen falta dos terminales.

```bash
# Terminal 1 — backend
cd backend && npm run dev      # http://localhost:3000

# Terminal 2 — frontend
cd frontend && npm run dev     # http://localhost:5173
```

Abrí **http://localhost:5173** en el navegador.

## Estructura

```
backend/
  src/
    routes/       GET /api/report?fecha=YYYY-MM-DD
    controllers/  recibe el request
    services/     googleSheets (conexión), report, reportBuilder, dashboard
    parsers/      uno por pestaña: datos, ventas, vtaFi, presentismo, turnos
    utils/        cálculos, fechas, columnas
frontend/
  src/
    pages/        Dashboard.jsx (página única)
    hooks/        useReport.js (fetch al backend)
    components/   tablas y tarjetas de KPIs
    config/       skills.js y kpis.js (configuración sin tocar componentes)
docs/
```

## Pestañas de la planilla que se leen

| Pestaña | Rango | Contenido |
|---|---|---|
| `Datos` | `A:S` | Datos base de asesores |
| `Vta_Bruta` | `A:T` | Ventas brutas |
| `Vta_FI` | `A:D` | Ventas FI |
| `PRESENTISMO` | `A:E` | Presentismo |
| `PRESENTISMO` | `O:P` | Turnos |

Si cambia la estructura de la planilla, hay que ajustar el parser
correspondiente en `backend/src/parsers/`.

## Problemas comunes

| Síntoma | Causa |
|---|---|
| `Missing required parameters: spreadsheetId` | Falta `SPREADSHEET_ID` en `backend/.env` |
| `ENOENT ... credentials.json` | Falta el JSON en `backend/credentials/` |
| Error 403 de Google | La planilla no está compartida con el `client_email` de la service account |
| "Error al cargar los datos." en pantalla | El backend no está corriendo, o falla `/api/report` |
