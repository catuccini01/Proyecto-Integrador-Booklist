<template>
  <div class="detalle">
    <router-link to="/libros">← Volver a la lista</router-link>

    <div v-if="datoLibro" class="ficha">
      <h2>{{ datoLibro.titulo }}</h2>
      <p><strong>Autor:</strong> {{ datoLibro.autor }}</p>
      <p><strong>Categoría:</strong> {{ datoLibro.categoria }}</p>
      <p v-if="datoLibro.descripcion"><strong>Descripción:</strong> {{ datoLibro.descripcion }}</p>
      <p v-else class="vacio">Este libro no tiene descripción.</p>
    </div>

    <p v-else class="vacio">No se encontró el libro con id {{ id }}.</p>
  </div>
</template>

<script>
export default {
  name: 'DetalleLibro',
  props: {
    id: {
      type: String,
      required: true
    },
    libros: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    datoLibro() {
      return this.libros.find((datoLibro) => datoLibro.id === Number(this.id))
    }
  }
}
</script>

<style scoped>
.ficha {
  max-width: 420px;
  margin: 20px auto;
  text-align: left;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px 16px;
}
</style>