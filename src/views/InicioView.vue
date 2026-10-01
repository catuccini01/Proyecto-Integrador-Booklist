<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import TarjetaLibro from '../components/TarjetaLibro.vue'

const store = useStore()

const libros = computed(() => store.getters['libros/libros'])
const categoria = computed(() => store.getters['filtros/categoria'])

const categorias = ['Ciencia Ficción', 'Drama', 'Fantasía', 'Romance', 'Novela', 'Otro']

const librosFiltrados = computed(() => {
  if (!categoria.value) {
    return libros.value
  }

  return libros.value.filter(
    (libro) => libro.categoria === categoria.value
  )
})

function cambiarCategoria(event) {
  store.commit('filtros/SET_CATEGORIA', event.target.value)
}
</script>

<template>
  <div class="inicio container">
    <img src="/assets/imagen-bienvenida.jpg" alt="">

    <div class="row align-items-center justify-content-between">
        <p class="col-8 m-0 text-start">Libros registrados: {{ libros.length }}</p>

        <router-link to="/agregar" class="btn-agregar col-4">
          Agregar un libro
        </router-link>
    </div>

<div class="d-flex align-items-center justify-content-between my-3">
    <h2>Catálogo de libros</h2>

    <div class="filtro">
      <label for="categoria">Filtrar por categoría:</label>

      <select
        id="categoria"
        :value="categoria"
        @change="cambiarCategoria"
      >
        <option value="">Todas las categorías</option>

        <option
          v-for="categoriaItem in categorias"
          :key="categoriaItem"
          :value="categoriaItem"
        >
          {{ categoriaItem }}
        </option>
      </select>
    </div>

    </div>

    <div v-if="librosFiltrados.length > 0" class="catalogo row gap-2 justify-content-center">
      <TarjetaLibro
        v-for="datoLibro in librosFiltrados"
        :key="datoLibro.id"
        :datoLibro="datoLibro"
        class="col-4"
      />
    </div>

    <p v-else class="vacio">
      No hay libros en esta categoría.
    </p>
  </div>
</template>

<style scoped>
.inicio{
  margin-block: 20px;
}
 .inicio img{
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
 }
 .btn-agregar{
  background-color: #98293B;
  color: white;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 5px;
  max-width: 200px;
  margin-right: 1%;
 }

 h2{
    font-family: "novecento-sans", sans-serif;
  font-weight: 400 !important;
  color: #98293B !important;
 }
</style>