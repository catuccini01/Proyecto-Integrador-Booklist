<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useStore()

const datoLibro = computed(() =>
  store.getters['libros/libros'].find((libro) => libro.id === Number(props.id))
)
</script>

<template>
  <div class="detalle m-auto">
   

    <div v-if="datoLibro" class="ficha row">
<div class="col-4">
        <img
          :src="datoLibro.img"
          :alt="datoLibro.titulo"
          class="portada"
        >
        </div>
        <div class="col-8 d-flex flex-column justify-content-between">
          <div>
              <h2>{{ datoLibro.titulo }}</h2>
              <p><strong>Autor:</strong> {{ datoLibro.autor }}</p>
              <p><strong>Categoría:</strong> {{ datoLibro.categoria }}</p>

              <p v-if="datoLibro.descripcion">
                <strong>Descripción:</strong> {{ datoLibro.descripcion }}
              </p>

              <p v-else class="vacio">
                Este libro no tiene descripción.
              </p>
              </div>

               <router-link to="/" class="btn btn-volver">← Volver a la lista</router-link>
        </div>
    </div>

    <p v-else class="vacio">
      No se encontró el libro con id {{ props.id }}.
    </p>


    
    </div>


</template>

<style scoped>
.detalle{
  height: 100vh;
  display: flex;
  align-items: center;

}
.ficha {
  margin: 20px auto;
  text-align: left;
  border-radius: 8px;
  padding: 12px 16px;
}

.ficha img{
  object-fit: cover;
  width: 100%;
}

h2{
  font-size: 40px;
  font-weight: 900;
}

.btn-volver{
  background-color: #98293B;
  color: white;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 5px;
  max-width: 200px;
}
</style>