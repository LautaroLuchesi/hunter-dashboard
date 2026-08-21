# Hunter Uruguay — API

## 1. Descripción

El backend de Hunter Uruguay expone una API REST utilizada por el frontend React para obtener los datos de los diferentes reportes.

El backend está desarrollado con Node.js y Express.

Los datos utilizados por los reportes se obtienen principalmente desde Google Sheets, se procesan mediante parsers y builders y finalmente se entregan al frontend en formato JSON.

---

# 2. Endpoints

Actualmente la API dispone de tres endpoints principales:

```text
GET /api/report
GET /api/hourly-report
GET /api/monthly-report
```

Cada endpoint corresponde a uno de los reportes principales de la aplicación.

---

# 3. Reporte diario

## GET `/api/report`

Obtiene la información correspondiente al Dashboard diario.

### Parámetro

El endpoint acepta un parámetro opcional:

```text
fecha
```

Formato esperado:

```text
YYYY-MM-DD
```

Ejemplo:

```text
GET /api/report?fecha=2026-07-17
```

Si no se proporciona una fecha, el backend utiliza la última fecha disponible entre los registros procesados.

### Flujo

```text
/api/report
    ↓
report.controller.js
    ↓
report.service.js
    ↓
Google Sheets
    ↓
Parsers
    ↓
reportBuilder.service.js
    ↓
dashboard.service.js
    ↓
JSON
```

### Fuentes de datos

El reporte utiliza las siguientes hojas:

```text
Crudo_Inbound!A:Q
Crudo_Google!A:M
Crudo_Facebook!A:M
Crudo_Forms!A:K
Vta_Bruta!A:T
Vta_FI!A:D
PRESENTISMO!A:E
PRESENTISMO!O:P
```

### Procesamiento

Los datos de actividad se procesan mediante:

```text
parseInboundHour()
parseGoogleHour()
parseFacebookHour()
parseFormsHour()
```

Las ventas se procesan mediante:

```text
parseVentas()
```

Los datos de FI mediante:

```text
parseVtaFi()
```

Presentismo mediante:

```text
parsePresentismo()
```

Y los turnos mediante:

```text
parseTurnos()
```

Los registros de actividad se agrupan por:

```text
fecha + skill + idAsesor
```

Posteriormente se construye el reporte utilizando `buildReport()` y `buildDashboard()`.

### Filtro de asesores

El reporte aplica el siguiente criterio:

```text
TM → incluido
TT → incluido

Super → excluido
BO → excluido
Otros turnos → excluidos
```

Este filtro se aplica al construir el reporte final.

### Respuesta

La respuesta tiene la siguiente estructura:

```json
{
  "fechas": [],
  "fecha": "YYYY-MM-DD",
  "dashboard": {},
  "asesores": [],
  "presentismo": []
}
```

### Campos

#### `fechas`

Lista de fechas disponibles para seleccionar en el Dashboard.

#### `fecha`

Fecha utilizada para generar el reporte.

#### `dashboard`

Información agregada correspondiente a la fecha seleccionada.

#### `asesores`

Información de los asesores correspondientes a la fecha seleccionada.

#### `presentismo`

Registros de presentismo correspondientes a la fecha seleccionada.

---

# 4. Reporte por hora

## GET `/api/hourly-report`

Obtiene la información de actividad distribuida por franjas horarias.

### Parámetro

Acepta un parámetro opcional:

```text
fecha
```

Formato:

```text
YYYY-MM-DD
```

Ejemplo:

```text
GET /api/hourly-report?fecha=2026-08-03
```

Si no se proporciona una fecha, se utiliza la última fecha disponible.

---

## 4.1 Fuentes de datos

El reporte utiliza:

```text
Crudo_Inbound!A:Q
Crudo_Google!A:M
Crudo_Facebook!A:M
Crudo_Forms!A:K
Vta_Bruta!A:T
PRESENTISMO!A:E
PRESENTISMO!O:P
```

Los datos se procesan mediante los parsers correspondientes.

---

## 4.2 Normalización de fechas

Antes de generar el reporte, las fechas de Inbound, Google, Facebook y Forms son normalizadas.

Se aceptan formatos como:

```text
D/M/YYYY
DD/MM/YYYY
YYYY-M-D
YYYY-MM-DD
```

Todos son convertidos al formato:

```text
YYYY-MM-DD
```

Ejemplo:

```text
2/8/2026
    ↓
2026-08-02
```

Esto evita que una misma fecha sea interpretada como registros diferentes debido a diferencias de formato.

---

## 4.3 Franjas horarias

El reporte trabaja deliberadamente con **12 franjas horarias**:

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

El rango termina en las 20:00.

No se incluye una franja adicional de 21:00.

---

## 4.4 Criterio de inclusión de asesores

Para los cálculos por hora solamente se consideran registros pertenecientes a asesores cuyo turno sea:

```text
TM
TT
```

Los asesores con otros turnos son excluidos.

Este criterio se aplica tanto al reporte general por hora como a la actividad individual de los asesores.

---

## 4.5 Cálculos del reporte

Para cada hora se calculan:

```text
inbound
google
facebook
botmaker
forms
totales
asesores
```

### Botmaker

El valor de Botmaker se obtiene mediante:

```text
botmaker = google + facebook
```

### Total

El total de contactos se obtiene mediante:

```text
totales =
    inbound +
    google +
    facebook +
    forms
```

### Asesores

Se obtiene la cantidad de asesores únicos que tuvieron actividad durante esa hora y se multiplica por 7:

```text
asesores = asesoresUnicos * 7
```

---

## 4.6 Actividad por asesor

Además del gráfico horario general, el backend genera información individual por asesor.

Para cada asesor se devuelve:

```text
id
nombre
turno
ventas
horas
```

Las horas contienen 12 posiciones, correspondientes al rango 09:00–20:00.

Ejemplo conceptual:

```json
{
  "id": "1234",
  "nombre": "Nombre Apellido",
  "turno": "TM",
  "ventas": 3,
  "horas": [
    {
      "hora": 9,
      "datos": 4
    },
    {
      "hora": 10,
      "datos": 7
    }
  ]
}
```

Las horas sin actividad reciben:

```text
datos: 0
```

---

## 4.7 Respuesta

La respuesta general tiene la siguiente estructura:

```json
{
  "fecha": "YYYY-MM-DD",
  "fechas": [],
  "grafico": [],
  "asesores": []
}
```

### `fecha`

Fecha utilizada para generar el reporte.

### `fechas`

Lista de fechas disponibles.

### `grafico`

Información agregada por hora.

Cada elemento contiene:

```json
{
  "hora": 9,
  "asesores": 0,
  "inbound": 0,
  "google": 0,
  "facebook": 0,
  "botmaker": 0,
  "forms": 0,
  "totales": 0
}
```

### `asesores`

Actividad horaria individual de los asesores.

---

# 5. Reporte mensual

## GET `/api/monthly-report`

Obtiene la información correspondiente al reporte mensual.

### Parámetro

Acepta un parámetro opcional:

```text
mes
```

Formato:

```text
MM/YYYY
```

Ejemplo:

```text
GET /api/monthly-report?mes=08/2026
```

Si no se proporciona un mes, se utiliza el último mes disponible.

---

## 5.1 Fuentes de datos

El reporte mensual utiliza:

```text
Crudo_Inbound!A:Q
Crudo_Google!A:M
Crudo_Facebook!A:M
Crudo_Forms!A:K
Vta_Bruta!A:T
PRESENTISMO!A:E
PRESENTISMO!O:P
```

---

## 5.2 Meses disponibles

Los meses disponibles se obtienen a partir de las fechas existentes en:

```text
Inbound
Google
Facebook
Forms
```

Los meses se convierten al formato:

```text
MM/YYYY
```

y se ordenan cronológicamente.

---

## 5.3 Reporte general del mes

El reporte genera información diaria para las fechas correspondientes al mes seleccionado.

Para cada día calcula:

```text
fecha
asesores
inbound
google
facebook
botmaker
forms
totales
```

### Botmaker

```text
botmaker = google + facebook
```

### Total

```text
totales =
    inbound +
    google +
    facebook +
    forms
```

### Asesores

Se obtiene la cantidad de asesores únicos con actividad durante el día y se multiplica por 7:

```text
asesores = asesoresUnicos * 7
```

---

## 5.4 Actividad mensual por asesor

El reporte mensual también genera actividad individual de los asesores.

Se consideran únicamente asesores con turno:

```text
TM
TT
```

Para cada asesor se devuelve:

```text
id
nombre
turno
ventas
dias
```

### `ventas`

Las ventas se agrupan por asesor para el mes seleccionado.

Las ventas provienen de:

```text
Vta_Bruta!A:T
```

### `dias`

Contiene la actividad diaria del asesor.

Cada elemento tiene:

```json
{
  "fecha": "DD/MM/YYYY",
  "datos": 0
}
```

El valor de `datos` representa la cantidad de registros de actividad del asesor en esa fecha.

---

## 5.5 Respuesta

La respuesta tiene la siguiente estructura:

```json
{
  "mes": "MM/YYYY",
  "meses": [],
  "grafico": [],
  "asesores": []
}
```

### `mes`

Mes utilizado para generar el reporte.

### `meses`

Lista de meses disponibles.

### `grafico`

Información diaria correspondiente al mes seleccionado.

### `asesores`

Actividad mensual individual de los asesores.

---

# 6. Reglas comunes

Los reportes deben mantener consistencia en el criterio de inclusión de asesores.

Se consideran válidos:

```text
TM
TT
```

Se excluyen:

```text
Super
BO
Otros turnos no válidos
```

Esta regla debe mantenerse consistente entre:

* Dashboard
* Reporte por hora
* Reporte mensual
* Actividad por asesor

---

# 7. Flujo de procesamiento

Todos los reportes siguen una arquitectura similar:

```text
HTTP Request
     ↓
Route
     ↓
Controller
     ↓
Service
     ↓
Google Sheets
     ↓
Parsers
     ↓
Builder
     ↓
JSON Response
     ↓
Frontend React
```

### Reporte diario

```text
report.routes.js
        ↓
report.controller.js
        ↓
report.service.js
        ↓
reportBuilder.service.js
        ↓
dashboard.service.js
```

### Reporte por hora

```text
hourlyReport.routes.js
        ↓
hourlyReport.controller.js
        ↓
hourlyReport.service.js
        ↓
hourlyBuilder.service.js
```

### Reporte mensual

```text
monthlyReport.routes.js
        ↓
monthlyReport.controller.js
        ↓
monthlyReport.service.js
        ↓
monthlyBuilder.service.js
```

---

# 8. Consideraciones

Los endpoints actualmente no implementan validaciones explícitas de parámetros en los controllers.

Los controllers reciben directamente los valores desde `req.query` y los pasan al service correspondiente.

Por ejemplo:

```text
GET /api/report?fecha=2026-07-17
```

recibe `fecha` y la envía a `generateReport()`.

De igual manera:

```text
GET /api/hourly-report?fecha=2026-08-03
```

envía `fecha` a `generateHourlyReport()`.

Y:

```text
GET /api/monthly-report?mes=08/2026
```

envía `mes` a `generateMonthlyReport()`.

La lógica de procesamiento y selección del período se encuentra principalmente en los services y builders, no en las rutas.
