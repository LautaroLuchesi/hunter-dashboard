# Hunter Uruguay

Aplicación web para el seguimiento y análisis de campañas de contacto y ventas de Hunter Uruguay.

El sistema obtiene información desde Google Sheets, procesa los datos mediante un backend Node.js y los presenta mediante una interfaz web desarrollada con React.

---

## 📊 Reportes

Actualmente la aplicación cuenta con tres reportes principales:

### Dashboard

Reporte diario de la actividad de las campañas.

Permite consultar información correspondiente a una fecha determinada y visualizar indicadores generales, actividad por asesor y presentismo.

Ruta:

```text
/
```

### Reporte por hora

Permite analizar la actividad de las campañas distribuida por franjas horarias.

El reporte trabaja deliberadamente desde las:

```text
09:00 → 20:00
```

utilizando 12 franjas horarias.

Ruta:

```text
/hourly-report
```

### Reporte mensual

Permite analizar la actividad acumulada durante un mes, incluyendo la evolución diaria y la actividad individual de los asesores.

Ruta:

```text
/monthly-report
```

---

## 🛠️ Tecnologías

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

### Herramientas

* Git
* GitHub

### Deploy

* Vercel — Frontend
* Render — Backend

---

## 📁 Estructura del proyecto

```text
hunter-dashboard/
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── parsers/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       ├── app.js
│       └── server.js
│
├── frontend/
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── config/
│       ├── pages/
│       ├── styles/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
│
├── docs/
│   ├── api.md
│   └── arquitectura.md
│
├── README.md
├── package.json
└── vercel.json
```

Para conocer con mayor detalle la arquitectura interna del proyecto:

* `docs/arquitectura.md`

Para consultar la documentación de la API:

* `docs/api.md`

---

## 🔄 Arquitectura general

El flujo principal de información es:

```text
Google Sheets
      ↓
Backend Node.js
      ↓
Parsers
      ↓
Services / Builders
      ↓
API REST
      ↓
Frontend React
      ↓
Usuario
```

El frontend no obtiene directamente los datos de Google Sheets. Las consultas y el procesamiento se realizan en el backend.

---

## 📡 API

El backend expone actualmente los siguientes endpoints:

```text
GET /api/report
GET /api/hourly-report
GET /api/monthly-report
```

### Reporte diario

```text
GET /api/report?fecha=YYYY-MM-DD
```

Ejemplo:

```text
GET /api/report?fecha=2026-07-17
```

### Reporte por hora

```text
GET /api/hourly-report?fecha=YYYY-MM-DD
```

Ejemplo:

```text
GET /api/hourly-report?fecha=2026-08-03
```

### Reporte mensual

```text
GET /api/monthly-report?mes=MM/YYYY
```

Ejemplo:

```text
GET /api/monthly-report?mes=08/2026
```

La documentación completa de estos endpoints se encuentra en:

```text
docs/api.md
```

---

## 📋 Fuentes de datos

Los reportes utilizan información proveniente de diferentes hojas de Google Sheets relacionadas con:

* Inbound
* Google
* Facebook
* Forms
* Ventas
* VTA/FI
* Presentismo
* Turnos

Los datos son procesados por parsers específicos antes de ser utilizados para generar los reportes.

---

## 👥 Regla de inclusión de asesores

Los reportes consideran únicamente asesores cuyo turno sea:

```text
TM
TT
```

Los asesores con turnos como:

```text
Super
BO
```

u otros turnos no válidos quedan excluidos.

Esta regla debe mantenerse consistente entre:

* Dashboard
* Reporte por hora
* Reporte mensual
* Actividad por asesor

---

## 🕐 Regla del reporte por hora

El reporte por hora utiliza 12 franjas:

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

El reporte no debe extenderse automáticamente hasta las 21:00.

---

## 📅 Normalización de fechas

Los datos provenientes de las diferentes fuentes pueden utilizar distintos formatos de fecha.

El backend normaliza las fechas cuando es necesario para poder agrupar y comparar correctamente los registros.

En particular, el reporte por hora normaliza los datos a:

```text
YYYY-MM-DD
```

Esto evita que fechas como:

```text
2/8/2026
02/08/2026
2026-08-02
```

sean interpretadas como fechas diferentes.

---

## 🚀 Desarrollo local

### Requisitos

Para ejecutar el proyecto localmente se necesita:

* Node.js
* npm
* acceso a las credenciales necesarias para Google Sheets

Las credenciales no forman parte del repositorio.

---

## Backend

Ingresar a:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor en desarrollo:

```bash
npm run dev
```

El backend utiliza el puerto configurado mediante la variable de entorno `PORT`.

Si no se especifica, utiliza:

```text
3000
```

---

## Frontend

En otra terminal:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

Iniciar Vite:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local donde estará disponible el frontend.

---

## 🔐 Variables de entorno

Las credenciales y configuraciones sensibles deben mantenerse fuera del repositorio.

No se deben subir:

```text
.env
credenciales de Google
tokens
claves privadas
```

El proyecto utiliza variables de entorno para configurar los valores sensibles necesarios para conectarse con los servicios externos.

---

## 🌿 Git

El desarrollo se realiza utilizando Git y GitHub.

La rama principal de desarrollo es:

```text
develop
```

Los cambios deben probarse primero en `develop`.

Una vez verificados, pueden llevarse a:

```text
main
```

Flujo recomendado:

```text
Modificar
   ↓
Probar localmente
   ↓
Commit
   ↓
Push a develop
   ↓
Verificar funcionamiento
   ↓
Merge a main
```

---

## 📚 Documentación

La documentación técnica del proyecto se encuentra dentro de `docs/`.

### Arquitectura

```text
docs/arquitectura.md
```

Describe:

* estructura del proyecto;
* frontend;
* backend;
* services;
* parsers;
* builders;
* flujo de datos;
* reglas generales de arquitectura.

### API

```text
docs/api.md
```

Describe:

* endpoints;
* parámetros;
* respuestas;
* fuentes de datos;
* procesamiento de los reportes.

---

## ⚠️ Consideraciones de mantenimiento

Antes de realizar cambios en una funcionalidad se debe identificar dónde se encuentra la lógica correspondiente.

El flujo general es:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Parser / Builder
  ↓
Response
  ↓
Frontend
```

Se debe evitar modificar archivos que no sean necesarios para resolver un problema.

Cuando un cambio pueda afectar otros reportes, se debe verificar previamente su impacto sobre:

* Dashboard
* Reporte por hora
* Reporte mensual
* Actividad por asesor

---

## 📌 Estado del proyecto

Hunter Uruguay se encuentra actualmente en desarrollo activo.

Las funcionalidades y reglas documentadas representan el estado actual del código y deben actualizarse cuando se incorporen nuevas funcionalidades o cambien las reglas de negocio.
