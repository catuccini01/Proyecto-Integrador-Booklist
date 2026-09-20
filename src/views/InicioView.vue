<template>
  <div class="inicio">
    <h2>Bienvenido a BookList</h2>
    <p>Aquí puedes registrar libros, ver el catálogo y revisar el detalle de cada uno.</p>
    <p>Libros registrados: {{ libros.length }}</p>
    <router-link to="/libros">Ir a la lista de libros</router-link>
  </div>
</template>

<script>
export default {
  name: 'InicioView',
  props: {
    libros: {
      type: Array,
      default: () => []
    }
  }
}
</script>