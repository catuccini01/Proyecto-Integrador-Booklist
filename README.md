# BookList SPA – Gestor de Libros con Vue.js

Proyecto de evaluación del **Módulo 6: Desarrollo de interfaces interactivas con framework Vue** (Alkemy).

BookList es una SPA (Single Page Application) que permite registrar libros, ver el catálogo, eliminar entradas y revisar el detalle de cada libro, todo sin recargar la página.

## Tecnologías

- Vue 3 (Options API)
- Vue Router 4 (modo hash)
- Vue CLI 5.0.9
- ESLint (solo prevención de errores)


## Funcionalidades

- Añadir libros con título, autor, categoría y descripción (opcional).
- Vista previa en tiempo real de los datos que se escriben en el formulario.
- Validación básica: título, autor y categoría son obligatorios.
- Añadir libros con el botón o presionando **Enter** en los campos Título y Autor.
- Lista reactiva de libros, con posibilidad de eliminar cada uno.
- Mensaje "No hay libros disponibles" cuando la lista está vacía.
- Mostrar u ocultar la descripción de cada libro y el catálogo completo.
- Navegación entre pantallas con Vue Router, incluyendo una ruta dinámica para el detalle.

## Rutas

| Ruta | Vista | Descripción |
|---|---|---|
| `/` | `InicioView.vue` | Pantalla de bienvenida con el total de libros registrados |
| `/libros` | `ListaLibros.vue` | Formulario para añadir libros y catálogo |
| `/libros/:id` | `DetalleLibro.vue` | Ficha de un solo libro, según el id de la URL |

Como el router usa modo hash, las URL se ven así: `http://localhost:8080/#/libros/2`.

## Estructura del proyecto

```
src/
├── components/
│   ├── FormularioLibro.vue   # Formulario con v-model y vista previa
│   └── TarjetaLibro.vue      # Tarjeta de un libro
├── router/
│   └── index.js              # Definición de rutas
├── views/
│   ├── InicioView.vue
│   ├── ListaLibros.vue
│   └── DetalleLibro.vue
├── App.vue                   # Saludo, contador, menú, <router-view> y lista de libros
└── main.js
```

## Resumen por lección

### Lección 1: Introducción a Vue.js
- `App.vue` con la estructura `template` / `script` / `style`.
- Contador con datos reactivos (`data`) y funciones que los modifican (`methods`).
- Patrón MVVM: el *Model* son los datos de `data()`, la *View* es el `<template>` y el *ViewModel* es Vue, que actualiza la pantalla cuando un dato cambia.
- Se muestra el nombre del usuario con `{{ nombreUsuario }}`.

### Lección 2: Templates y rendering
- `TarjetaLibro.vue` muestra los datos de un libro recibidos por prop y usa `v-bind` (`:libro`, `:key`, `:class`, `:title`).
- `v-for` para recorrer la lista de libros.
- `v-if` / `v-else` para mostrar el mensaje "No hay libros disponibles" y para el botón de descripción (solo existe si el libro tiene descripción).
- `v-show` para mostrar y ocultar la descripción y el catálogo.

### Lección 3: Binding de formularios
- `FormularioLibro.vue` con `input`, `select` y `textarea`.
- `v-model` conecta cada campo con el objeto `nuevoLibro`.
- Vista previa que se actualiza mientras se escribe.
- Las opciones del `select` se generan con `v-for` desde una lista de categorías.

### Lección 4: Manejo de eventos
- `@click` para añadir y eliminar libros.
- `@submit.prevent` en el formulario, para evitar que la página se recargue.
- `@keyup.enter` para añadir libros con el teclado.
- `@click.once` en el aviso de bienvenida, que solo reacciona al primer clic.
- Comunicación entre componentes con `$emit`: los componentes hijos avisan y `App.vue` es el único que modifica la lista.

### Lección 5: Manejo de rutas
- Vue Router configurado con las rutas `/`, `/libros` y `/libros/:id`.
- Vistas `InicioView`, `ListaLibros` y `DetalleLibro`.
- Ruta dinámica con `props: true`, para que `DetalleLibro` reciba el `id` como prop.
- `<router-link>` para navegar y `<router-view>` para mostrar la vista activa.
- Un dato calculado (`computed`) busca el libro que corresponde al id de la URL.

## Decisiones tomadas

- **Un solo proyecto por etapas.** Las 5 lecciones se construyeron sobre la misma app, en vez de ejercicios separados, para llegar a una SPA completa.
- **Vue 3 y Vue CLI 5.** Los enlaces de referencia del enunciado apuntan a la documentación de Vue 3, así que se usó esa versión.
- **`Libro.vue` se llama `TarjetaLibro.vue`.** Se renombró para cumplir la guía de estilo de Vue, que recomienda nombres de componente de varias palabras. Sigue el mismo estilo que `ListaLibros` y `DetalleLibro`.
- **Prop `datoLibro`.** Es el nombre con que `TarjetaLibro` recibe cada libro desde `ListaLibros`.
- **La lista de libros vive en `App.vue`.** Está fuera del `<router-view>`, así que no se pierde al cambiar de pantalla. Las vistas la reciben por props y avisan los cambios con eventos, de modo que hay una sola fuente de datos.
- **Formulario y tarjeta como componentes independientes.** Se reutilizan dentro de `ListaLibros` y no dependen de cómo se llamen las variables del padre.
- **Modo hash en el router.** Evita errores 404 al recargar o al publicar en GitHub Pages, sin configurar el servidor.
- **La lista empieza vacía.** El enunciado no pide libros de ejemplo, y así se ve el mensaje "No hay libros disponibles" al iniciar.
- **Ids con contador (`siguienteId`).** Cada libro nuevo recibe un id distinto que no se repite, aunque se eliminen libros.
- **Sin Vuex ni almacenamiento.** El enunciado no lo pide, así que el estado se maneja con props y eventos.
- **ESLint con prevención de errores solamente.** Para no llenar la pantalla de avisos de estilo.

## Limitaciones

- Los datos solo existen en memoria: al recargar la página (F5) la lista se vacía.
- Al recargar en `/#/libros/2` aparece "No se encontró el libro", porque la lista quedó vacía.
- No hay edición de libros. El enunciado pide añadir, listar, eliminar y ver el detalle.