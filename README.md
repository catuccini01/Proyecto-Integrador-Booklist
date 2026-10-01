# BookList – Proyecto integrador (Módulos 6 y 7)

Proyecto de evaluación de Alkemy, construido sobre dos módulos:

- **Módulo 6: Desarrollo de interfaces interactivas con framework Vue** (componentes, directivas, formularios, eventos y rutas).
- **Módulo 7: Desarrollo de aplicaciones front-end con framework Vue** (consumo de API, Vuex y Composition API).

BookList es una SPA (Single Page Application) para gestionar un catálogo de libros: permite registrarse e iniciar sesión, ver el catálogo filtrado por categoría, agregar libros, eliminarlos y ver el detalle de cada uno, todo sin recargar la página.

## Tecnologías

- Vue 3 (mezcla de Options API y Composition API con `<script setup>`)
- Vue Router 4 (modo hash), con una guarda de rutas (`beforeEach`) para proteger `/agregar`
- Vuex 4, con 3 módulos independientes (`libros`, `filtros`, `auth`)
- Axios + json-server, como API REST simulada
- Bootstrap 5 (grid y clases utilitarias)
- `@lucide/vue` (iconos)
- Vue CLI 5

## Funcionalidades

- Registro e inicio de sesión de usuarios, contra una colección `usuarios` en la API simulada. La sesión se guarda en `sessionStorage`, así que se mantiene mientras la pestaña esté abierta.
- Ruta protegida: `/agregar` solo es accesible si hay sesión iniciada; si no, redirige a `/login` y, al iniciar sesión, vuelve a la página que se quería visitar.
- Catálogo de libros en la página de Inicio, con imagen de portada, filtrable por categoría.
- Agregar un libro nuevo desde un formulario en una vista aparte (`/agregar`).
- Eliminar un libro desde su tarjeta en el catálogo.
- Ver el detalle de un libro en una ruta dinámica (`/libros/:id`).
- Vista 404 para cualquier URL que no coincida con una ruta definida.
- Los libros y los usuarios se guardan a través de una API simulada con `json-server`, no en memoria.

## Rutas

| Ruta | Vista | Descripción |
|---|---|---|
| `/` | `InicioView.vue` | Bienvenida, catálogo de libros y filtro por categoría |
| `/agregar` | `AgregarLibros.vue` | Formulario para agregar un libro (ruta protegida) |
| `/libros/:id` | `DetalleLibro.vue` | Ficha de un libro, según el id de la URL |
| `/login` | `LoginView.vue` | Inicio de sesión |
| `/registro` | `RegistroView.vue` | Creación de cuenta |
| `/:pathMatch(.*)*` | `NoEncontradoView.vue` | Página 404, para cualquier URL no definida |

Como el router usa modo hash, las URL se ven así: `http://localhost:8080/#/libros/2`.

## Estructura del proyecto

```
src/
├── api/
│   └── index.js               # Instancia de axios (baseURL: http://localhost:3001)
├── components/
│   ├── FormularioLibro.vue    # Formulario con v-model y vista previa (Options API)
│   └── TarjetaLibro.vue       # Tarjeta de un libro, con imagen y acciones
├── router/
│   └── index.js               # Rutas y guarda de autenticación
├── store/
│   ├── index.js
│   └── modules/
│       ├── libros.js          # Estado y acciones de los libros (vía API)
│       ├── filtros.js         # Categoría seleccionada en el filtro
│       └── auth.js            # Sesión del usuario (login, registro, logout)
├── views/
│   ├── InicioView.vue
│   ├── AgregarLibros.vue
│   ├── DetalleLibro.vue
│   ├── LoginView.vue
│   ├── RegistroView.vue
│   └── NoEncontradoView.vue
├── App.vue                    # Menú lateral, sesión y <router-view>
└── main.js
db.json                        # "Base de datos" de json-server: libros y usuarios
```

## Cómo ejecutarlo

Requiere Node.js y npm. Hacen falta **dos terminales abiertas**: una para la API simulada y otra para la app.

```bash
git clone https://github.com/catuccini01/Proyecto-Integrador-Booklist.git
cd Proyecto-Integrador-Booklist
npm install
```

Terminal 1 (API simulada, puerto 3001):
```bash
npm run mock
```

Terminal 2 (la app, puerto 8080):
```bash
npm run serve
```

Luego abre `http://localhost:8080`.

## Vuex: los 3 módulos

- **`libros`**: guarda la lista de libros, si está cargando y si hubo un error. Las acciones (`cargarLibros`, `agregarLibro`, `eliminarLibro`) son las que hablan con la API a través de `axios`; los componentes nunca llaman a la API directamente, pasan siempre por el store.
- **`filtros`**: guarda la categoría seleccionada en el `<select>` de Inicio.
- **`auth`**: guarda el usuario que inició sesión (o `null`), y expone las acciones `login`, `registrar` y `cerrarSesion`. El usuario se persiste en `sessionStorage` para no perder la sesión al recargar la página.

## Cómo funciona el acceso

`router/index.js` define una guarda (`router.beforeEach`) que revisa, antes de entrar a cualquier ruta, si esa ruta tiene `meta: { requiereAuth: true }` (como `/agregar`). Si la tiene y no hay sesión iniciada, redirige a `/login` guardando a dónde se quería ir, en `query.redirect`. Al iniciar sesión, `LoginView.vue` lee ese dato y redirige de vuelta.

## Limitaciones

- Las contraseñas se guardan en texto plano en `db.json`, sin encriptar. Es aceptable para un proyecto de práctica con una API simulada, pero no es así como se manejaría en una app real.
- La sesión vive en `sessionStorage`, así que se cierra sola al cerrar la pestaña del navegador.
- No hay edición de libros, solo agregar, listar, eliminar y ver el detalle.
- `json-server` guarda los cambios directamente en `db.json`; si compartes el proyecto, cualquiera que lo clone ve los libros (y usuarios) que haya en ese archivo en ese momento.