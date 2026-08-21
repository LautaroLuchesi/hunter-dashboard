# Hunter Uruguay — Arquitectura

## 1. Descripción del proyecto

Hunter Uruguay es una aplicación web desarrollada para el seguimiento y análisis de campañas de contacto y ventas.

La aplicación permite consultar información proveniente de Google Sheets y visualizarla mediante diferentes reportes orientados al análisis operativo de las campañas.

Actualmente cuenta con tres reportes principales:

* Dashboard diario
* Reporte por hora
* Reporte mensual

La aplicación está dividida en dos partes principales:

* `frontend/`: aplicación web desarrollada con React y Vite.
* `backend/`: API desarrollada con Node.js y Express.

---

## 2. Stack tecnológico

### Frontend

* React
* Vite
* React Router
* Recharts
* React Icons
* CSS

### Backend

* Node.js
* Express
* Google APIs
* CORS
* dotenv

### Desarrollo y control de versiones

* Git
* GitHub

### Deploy

* Frontend: Vercel
* Backend: Render

---

## 3. Estructura general

```text
hunter-dashboard/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── parsers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── config/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── api.md
│   └── arquitectura.md
│
├── package.json
├── package-lock.json
├── README.md
└── vercel.json
```

---

## 4. Arquitectura general

La aplicación utiliza una arquitectura cliente-servidor.

El frontend se encarga principalmente de:

* Mostrar la información.
* Manejar la navegación.
* Renderizar tablas, tarjetas y gráficos.
* Solicitar información a la API del backend.
* Manejar la interacción del usuario.

El backend se encarga principalmente de:

* Obtener información desde Google Sheets.
* Procesar y normalizar los datos.
* Aplicar las reglas de negocio.
* Construir los datos necesarios para cada reporte.
* Exponer los resultados mediante una API REST.

El flujo general es:

```text
Google Sheets
      │
      ▼
googleSheets.service.js
      │
      ▼
Parsers
      │
      ▼
Services / Builders
      │
      ▼
Controllers
      │
      ▼
Routes / API
      │
      ▼
Frontend React
      │
      ▼
Usuario
```

---

## 5. Frontend

El frontend se encuentra dentro de:

```text
frontend/src/
```

### 5.1 Punto de entrada

```text
main.jsx
```

Es el punto de entrada de la aplicación React.

Carga la aplicación principal y los estilos globales.

### 5.2 Aplicación principal

```text
App.jsx
```

Define la estructura principal de la aplicación y las rutas disponibles.

Actualmente existen las siguientes rutas:

```text
/                  → Dashboard
/hourly-report     → Reporte por hora
/monthly-report    → Reporte mensual
```

---

## 6. Páginas

Las páginas principales están dentro de:

```text
frontend/src/pages/
```

Actualmente existen:

```text
Dashboard.jsx
HourlyReport.jsx
MonthlyReport.jsx
```

Cada página representa una sección principal de la aplicación.

### Dashboard

Muestra el reporte diario y sus principales indicadores.

### Reporte por hora

Muestra la actividad de las campañas distribuida por franjas horarias.

El reporte trabaja deliberadamente desde las **09:00 hasta las 20:00**, utilizando 12 franjas horarias.

### Reporte mensual

Permite analizar la actividad acumulada durante un mes, incluyendo contactos y actividad por asesor.

---

## 7. Componentes

Los componentes generales se encuentran en:

```text
frontend/src/components/
```

Además existen componentes específicos para cada reporte:

```text
frontend/src/components/hourly/
frontend/src/components/monthly/
```

Esta separación permite modificar un reporte sin afectar innecesariamente a los demás.

Por ejemplo:

```text
components/hourly/
```

contiene componentes utilizados específicamente por el reporte por hora.

Mientras que:

```text
components/monthly/
```

contiene componentes utilizados específicamente por el reporte mensual.

---

## 8. Estilos

Los estilos generales se encuentran dentro de:

```text
frontend/src/styles/
```

Los reportes que poseen una interfaz específica tienen sus propios directorios de estilos:

```text
frontend/src/styles/hourly/
frontend/src/styles/monthly/
```

Esto permite mantener separados los estilos de cada sección.

---

## 9. Comunicación con el backend

El frontend contiene una capa específica para realizar las solicitudes a la API:

```text
frontend/src/api/
```

Actualmente incluye:

```text
reportApi.js
hourlyReport.js
monthlyReport.js
```

Estos archivos permiten que los componentes React soliciten información al backend sin tener que implementar directamente la comunicación HTTP en cada componente.

---

## 10. Backend

El backend se encuentra dentro de:

```text
backend/src/
```

Está desarrollado utilizando Node.js y Express.

Su responsabilidad principal es obtener, procesar y preparar los datos que serán enviados al frontend.

---

## 11. Routes

Las rutas de la API se encuentran en:

```text
backend/src/routes/
```

Actualmente existen:

```text
report.routes.js
hourlyReport.routes.js
monthlyReport.routes.js
```

Las principales APIs son:

```text
GET /api/report
GET /api/hourly-report
GET /api/monthly-report
```

---

## 12. Controllers

Los controllers se encuentran en:

```text
backend/src/controllers/
```

Actualmente existen:

```text
report.controller.js
hourlyReport.controller.js
monthlyReport.controller.js
```

Los controllers reciben las solicitudes HTTP y delegan el procesamiento a los services correspondientes.

El controller no debería concentrar la lógica principal del procesamiento de datos.

---

## 13. Services

Los services se encuentran en:

```text
backend/src/services/
```

Los principales grupos son:

### Reporte diario

```text
report.service.js
reportBuilder.service.js
dashboard.service.js
```

### Reporte por hora

```text
hourlyReport.service.js
hourlyBuilder.service.js
```

### Reporte mensual

```text
monthlyReport.service.js
monthlyBuilder.service.js
```

### Google Sheets

```text
googleSheets.service.js
```

Los services contienen la mayor parte de la lógica necesaria para obtener y construir la información de los reportes.

---

## 14. Parsers

Los parsers se encuentran en:

```text
backend/src/parsers/
```

Su función es transformar los datos obtenidos desde las hojas de Google Sheets a estructuras que puedan ser utilizadas por los services.

Actualmente existen parsers para:

* Datos generales
* Inbound por hora
* Google por hora
* Facebook por hora
* Forms por hora
* Presentismo
* Turnos
* Ventas
* VTA/FI

También existen utilidades específicas para normalización de asesores y fechas.

---

## 15. Normalización de fechas

La aplicación recibe datos de diferentes fuentes y las fechas pueden llegar en distintos formatos.

Por ejemplo:

```text
2/01/2026
3/01/2026
2026-01-10
```

Antes de utilizar estas fechas para agrupar o comparar información, deben normalizarse al formato:

```text
YYYY-MM-DD
```

La normalización de fechas se encuentra centralizada en:

```text
backend/src/utils/dateParser.js
```

Esto evita que una misma fecha sea interpretada como registros diferentes debido a diferencias de formato.

---

## 16. Normalización de asesores

La normalización de nombres e identificadores de asesores se encuentra centralizada en:

```text
backend/src/utils/advisorParser.js
```

Esta utilidad permite mantener un formato consistente de los asesores antes de utilizarlos en los diferentes reportes.

---

## 17. Reglas generales de negocio

Los reportes deben aplicar de forma consistente las reglas de negocio definidas para Hunter Uruguay.

Una regla fundamental es la inclusión de asesores según su turno.

Se consideran válidos únicamente los asesores cuyo turno sea:

```text
TM
TT
```

Los asesores con otros turnos, como:

```text
Super
BO
```

u otros valores no válidos deben quedar excluidos de los datos correspondientes.

Esta regla debe mantenerse consistente entre:

* Dashboard
* Reporte por hora
* Reporte mensual
* Actividad por asesor

---

## 18. Reporte por hora

El reporte por hora utiliza información de las diferentes habilidades/canales de contacto.

Las franjas horarias se encuentran deliberadamente limitadas a:

```text
09:00
10:00
11:00
12:00
13:00
14:00
15:00
16:00
17:00
18:00
19:00
20:00
```

El reporte utiliza parsers específicos para procesar los datos horarios.

---

## 19. Separación de responsabilidades

Como regla general del proyecto:

* Los componentes React se encargan de la interfaz.
* Los archivos de `api/` del frontend se encargan de comunicarse con el backend.
* Las `routes` definen los endpoints.
* Los `controllers` reciben las solicitudes y delegan el procesamiento.
* Los `services` contienen la lógica de procesamiento.
* Los `builders` construyen las estructuras finales de los reportes.
* Los `parsers` transforman los datos de entrada.
* Los `utils` contienen funciones reutilizables de normalización y soporte.

Se debe evitar modificar múltiples capas cuando un cambio puede resolverse correctamente dentro de una sola.

---

## 20. Principio de mantenimiento

Antes de modificar una funcionalidad se debe identificar:

1. De dónde provienen los datos.
2. Qué parser los procesa.
3. Qué service los utiliza.
4. Qué builder construye el resultado.
5. Qué controller expone la información.
6. Qué endpoint consume el frontend.
7. Qué componente muestra el resultado.

Esto permite realizar cambios controlados y reducir el riesgo de afectar otros reportes.

---

## 21. Deploy

La aplicación está dividida en dos servicios durante el despliegue:

```text
Frontend → Vercel
Backend  → Render
```

El frontend consume las APIs expuestas por el backend.

Las credenciales y variables sensibles no forman parte del repositorio y deben mantenerse fuera del código fuente.
