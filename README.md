# Sylcot React Tailwind Frontend

Frontend de **Sylcot** (*Simplify Your Life by Crossing Out Tasks*), una aplicación de tareas para organizar tus prioridades, desarrollada por **Alexis Manuel Hurtado Garcia**. Permite registrarse, verificar el email, iniciar sesión y gestionar tareas con categorías, prioridades, filtros y tema oscuro. Consume la API de [Sylcot-Go-Gin-Backend](https://github.com/A4GOD-AMHG/Sylcot-Go-Gin-Backend).

## Tech Stack

<div style="display: flex; align-items: center;">
  <img src="https://raw.githubusercontent.com/A4GOD-AMHG/Utils-for-repos/refs/heads/main/icons/react/react-original.svg" alt="react" width="65" height="65" />
  <img src="https://raw.githubusercontent.com/A4GOD-AMHG/Utils-for-repos/refs/heads/main/icons/tailwindcss/tailwindcss-original.svg" alt="tailwindcss" width="65" height="65" />
  <img src="https://raw.githubusercontent.com/A4GOD-AMHG/Utils-for-repos/refs/heads/main/icons/js/javascript-original.svg" alt="javascript" width="65" height="65" />
  <img src="https://raw.githubusercontent.com/A4GOD-AMHG/Utils-for-repos/refs/heads/main/icons/npm/npm-original-wordmark.svg" alt="npm" width="65" height="65" />
</div>

## Características

- **Autenticación completa**: registro, verificación por email, login, recuperación y restablecimiento de contraseña.
- **Sesión persistente**: el token JWT y el usuario se guardan en `localStorage` y el token se renueva con la cabecera `X-Refresh-Token`.
- **Gestión de tareas**: crear, editar, completar y eliminar tareas con categoría y prioridad.
- **Filtros y orden**: búsqueda por título, filtros por categoría, estado y prioridad, y orden por fecha, título o categoría.
- **Progreso**: barra con el porcentaje de tareas completadas.
- **Tema claro/oscuro**: respeta la preferencia del sistema y se recuerda entre visitas.
- **Diseño responsive**: rejilla adaptable, estados vacíos y animaciones suaves.

## Dependencias

### Dependencias Principales

- `react` / `react-dom`: librería de UI.
- `react-router-dom`: enrutado y rutas protegidas.
- `axios`: cliente HTTP con interceptores para el token y los errores.
- `react-toastify`: notificaciones.
- `react-icons`: iconos.
- `tailwindcss` / `@tailwindcss/vite`: estilos utilitarios.

### Dependencias de Desarrollo

- `vite` / `@vitejs/plugin-react`: servidor de desarrollo y build.
- `eslint` y plugins de React: linting.

## Cómo usar

```bash
git clone https://github.com/A4GOD-AMHG/Sylcot-React-Tailwind-Frontend.git
cd Sylcot-React-Tailwind-Frontend
npm install
cp example.env .env
```

### Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_GO_GIN_BACKEND` | URL base de la API, p. ej. `http://localhost:8080/api/v1` |

El backend debe tener `FRONT_URL=http://localhost:5173` para permitir CORS y generar los enlaces de los emails.

### Ejecutar

```bash
npm run dev       # desarrollo en http://localhost:5173
npm run build     # build de producción en dist/
npm run preview   # previsualizar el build
```

## Estructura del Proyecto

```
Sylcot-React-Tailwind-Frontend/
├── public/                  # Favicon e ilustraciones SVG
├── src/
│   ├── components/
│   │   ├── auth/            # Login, registro, verificación y contraseña
│   │   ├── layout/          # Layout principal y de autenticación
│   │   ├── shared/          # Header, Footer, spinner
│   │   └── tasks/           # Tarjeta y modal de tareas
│   ├── context/             # Contextos de auth y tema
│   ├── hooks/               # useTasks, useCategories, useTheme
│   ├── pages/               # Home, Dashboard, 404
│   ├── providers/           # AuthProvider y ThemeProvider
│   ├── routes/              # Configuración de rutas
│   ├── services/            # Cliente axios y servicios de la API
│   ├── utils/               # Iconos de categoría/prioridad y toasts
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            # Tailwind, tema y animaciones
├── example.env
├── index.html
└── vite.config.js
```

## Licencia

Este proyecto es de uso libre con fines educativos y personales.

## Autor

**Alexis Manuel Hurtado Garcia** - [GitHub](https://github.com/A4GOD-AMHG)
