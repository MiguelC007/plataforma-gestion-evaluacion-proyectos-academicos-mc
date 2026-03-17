# Sistema Académico EvalPro

Plataforma web para la gestión y evaluación de proyectos académicos, desarrollada con React, Node.js, Express y MongoDB bajo una arquitectura cliente-servidor.

## Descripción general

Sistema orientado a la administración integral de proyectos académicos dentro de una institución educativa. Permite gestionar usuarios, carreras, periodos académicos, tipos de proyecto, rúbricas de evaluación, asignaciones de evaluadores, resultados y reportes, manteniendo trazabilidad en cada fase del proceso.

## Objetivo

Centralizar el registro, seguimiento y evaluación de proyectos académicos mediante una solución web estructurada, parametrizable y alineada a un entorno académico real.

## Nombre del sistema

**Sistema Académico EvalPro**

## Tecnologías utilizadas

- React
- Vite
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Axios
- Recharts

## Arquitectura general

### Frontend
Aplicación web desarrollada en React para la gestión visual del sistema, navegación, formularios, dashboards, tablas y consumo de la API.

### Backend
API REST construida con Node.js y Express, encargada de la lógica de negocio, autenticación, validaciones, controladores, rutas y conexión con MongoDB.

### Base de datos
MongoDB almacena la información principal del sistema mediante colecciones modeladas con Mongoose.

## Funcionalidades principales

- Autenticación con control de acceso por roles
- Gestión de usuarios
- Gestión de carreras
- Gestión de periodos académicos parametrizables
- Gestión de tipos de proyecto
- Gestión de proyectos académicos
- Gestión de rúbricas y preguntas de evaluación
- Asignación de docentes evaluadores
- Evaluación de proyectos
- Resultados por proyecto y por estudiante
- Dashboard con indicadores y reportes

## Roles del sistema

- Administrador
- Coordinador
- Docente
- Estudiante

### Categorías docentes
- Docente metodológico
- Docente temático
- Docente evaluador

## Estructura del proyecto

### Backend
- `backend/src/config`
- `backend/src/models`
- `backend/src/controllers`
- `backend/src/routes`
- `backend/src/middlewares`
- `backend/src/services`
- `backend/src/utils`
- `backend/src/seed`
- `backend/src/app.js`
- `backend/src/server.js`

### Frontend
- `frontend/src/api`
- `frontend/src/components`
- `frontend/src/context`
- `frontend/src/hooks`
- `frontend/src/layouts`
- `frontend/src/pages`
- `frontend/src/routes`
- `frontend/src/styles`
- `frontend/src/utils`
- `frontend/src/App.jsx`
- `frontend/src/main.jsx`

## Base de datos

### Colecciones principales
- users
- careers
- academicperiods
- projecttypes
- projects
- rubrictemplates
- rubricquestions
- evaluatorassignments
- evaluations
- evaluationanswers

## Módulos implementados

- Autenticación y acceso
- Usuarios y roles
- Carreras
- Periodos académicos
- Tipos de proyecto
- Proyectos académicos
- Rúbricas de evaluación
- Asignación de evaluadores
- Evaluación de proyectos
- Resultados académicos
- Dashboard y reportes

## Ejecución del proyecto

### Backend
```bash
cd backend
npm install
npm run seed
npm run dev
