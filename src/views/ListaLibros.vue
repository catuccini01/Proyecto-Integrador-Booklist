<template>
  <div>
    <FormularioLibro @agregar="$emit('agregar', $event)" />

    <hr />

    <h2>Catálogo de libros</h2>
    <button @click="mostrarCatalogo = !mostrarCatalogo">
      {{ mostrarCatalogo ? 'Ocultar catálogo' : 'Mostrar catálogo' }}
    </button>

    <div v-show="mostrarCatalogo" class="catalogo">
      <div v-if="libros.length > 0">
        <TarjetaLibro
          v-for="datoLibro in libros"
          :key="datoLibro.id"
          :datoLibro="datoLibro"
          @eliminar="$emit('eliminar', $event)"
        />
      </div>
      <p v-else class="vacio">No hay libros disponibles.</p>
    </div>
  </div>
</template>

<script>
import TarjetaLibro from '../components/TarjetaLibro.vue'
import FormularioLibro from '../components/FormularioLibro.vue'

export default {
  name: 'ListaLibros',
  components: { TarjetaLibro, FormularioLibro },
  emits: ['agregar', 'eliminar'],
  props: {
    libros: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      mostrarCatalogo: true
    }
  }
}
</script>