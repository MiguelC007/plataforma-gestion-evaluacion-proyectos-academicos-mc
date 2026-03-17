# Sistema Académico EvalPro

Plataforma Web para la Gestión y Evaluación de Proyectos Académicos construida con React + Node.js + Express + MongoDB/Mongoose.

## Base documental usada
Este proyecto aterriza el enfoque del documento final del curso, que exige una aplicación web cliente-servidor, parametrizable, con mínimo 5 mantenimientos y 5 salidas de información, frontend consumiendo backend, componentes, CSS y MongoDB/Express/React/Node fileciteturn0file2L1-L4. También respeta el Avance 2 del proyecto donde definiste la plataforma educativa, los módulos de usuarios/roles, periodos, proyectos, rúbricas, evaluaciones transaccionales y dashboard/reportes fileciteturn0file1L4-L6 fileciteturn0file1L7-L12.

## Nombre final del sistema
**Sistema Académico EvalPro**

## Stack tecnológico
- Frontend: React + Vite + React Router + Axios + Recharts
- Backend: Node.js + Express + JWT + Mongoose
- Base de datos: MongoDB local (usable desde VS Code y 3T Community)
- Arquitectura: Cliente-Servidor + API REST + patrón MVC

## Arquitectura general
### Frontend
React consume servicios REST del backend, maneja autenticación, rutas protegidas, dashboards, CRUDs y flujo de evaluación.

### Backend
Express recibe peticiones HTTP, enruta hacia controladores, aplica middlewares de autenticación/autorización, usa modelos Mongoose y devuelve JSON.

### Base de datos
MongoDB almacena usuarios, carreras, periodos académicos, tipos de proyecto, proyectos, rúbricas, preguntas, asignaciones, evaluaciones y respuestas.

## Módulos implementados
- Autenticación JWT con sesión persistente en frontend
- CRUD de usuarios por rol
- CRUD de carreras
- CRUD de periodos académicos parametrizables
- CRUD de tipos de proyecto
- CRUD de proyectos académicos
- CRUD de rúbricas y preguntas
- Asignación transaccional de evaluadores
- Evaluación de proyectos con validación de rangos
- Resultados por proyecto y por estudiante
- Dashboard con estadísticas y reportes

## Estructura
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
- `frontend/src/styles`
- `frontend/src/App.jsx`
- `frontend/src/main.jsx`

## Colecciones MongoDB
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

## Credenciales de prueba
- Admin: `admin@demo.com` / `Password123*`
- Coordinador: `coordinador@demo.com` / `Password123*`
- Docente evaluador: `evaluador1@demo.com` / `Password123*`
- Estudiante: `estudiante1@demo.com` / `Password123*`

## Instalación y ejecución
### 1. Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

### 2. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 3. URLS
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

## Flujo funcional recomendado para defensa
1. Iniciar sesión como Admin
2. Mostrar dashboard general
3. Mostrar CRUD de carreras, periodos y tipos de proyecto
4. Mostrar CRUD de usuarios y la parametrización por rol/categoría
5. Mostrar creación/edición de rúbrica dinámica con rangos distintos
6. Mostrar registro de proyecto con documento URL externo
7. Mostrar asignación transaccional de evaluadores
8. Entrar como docente evaluador y realizar una evaluación
9. Mostrar resultados consolidados por proyecto/estudiante
10. Cerrar con dashboard/reportes

## Endpoints principales
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET/POST/PUT/DELETE /api/users`
- `GET/POST/PUT/DELETE /api/careers`
- `GET/POST/PUT/DELETE /api/academic-periods`
- `GET/POST/PUT/DELETE /api/project-types`
- `GET/POST/PUT/DELETE /api/projects`
- `GET/POST/PUT/DELETE /api/rubrics`
- `GET /api/assignments`
- `POST /api/assignments`
- `GET /api/evaluations`
- `GET /api/evaluations/:id`
- `PUT /api/evaluations/:id`
- `GET /api/results`
- `GET /api/results/students/summary`
- `GET /api/dashboard`

## Postman rápido
### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@demo.com",
  "password": "Password123*"
}
```

### Crear proyecto
```http
POST /api/projects
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "title": "Nuevo Proyecto Web",
  "description": "Proyecto final cliente-servidor",
  "projectTypeId": "{{projectTypeId}}",
  "careerId": "{{careerId}}",
  "periodId": "{{periodId}}",
  "studentIds": ["{{studentId}}"],
  "methodologyTeacherId": "{{methodTeacherId}}",
  "thematicTeacherIds": ["{{thematicTeacherId}}"],
  "documentUrl": "https://drive.google.com/file/d/example",
  "status": "BORRADOR"
}
```

### Asignar evaluadores
```http
POST /api/assignments
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "projectId": "{{projectId}}",
  "evaluatorIds": ["{{evaluator1}}", "{{evaluator2}}"],
  "rubricTemplateId": "{{rubricId}}"
}
```

## Cómo defender la parte parametrizable
- Los periodos se crean por mantenimiento y no están quemados.
- Los tipos de proyecto se crean por catálogo.
- Las categorías y roles cambian el comportamiento del sistema.
- Las rúbricas se construyen dinámicamente con preguntas, orden, min, max y peso.
- Las evaluaciones usan la rúbrica asignada y validan rangos por pregunta.

## Recomendación para MongoDB y 3T Community
Crear una conexión local a `mongodb://127.0.0.1:27017/academic_project_platform` para inspeccionar las colecciones, relaciones y datos semilla durante la defensa.
