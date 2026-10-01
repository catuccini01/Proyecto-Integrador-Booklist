<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { CircleEllipsis, Trash, BookOpenText, BookAlert } from '@lucide/vue'

const props = defineProps({
  datoLibro: {
    type: Object,
    required: true
  }
})

const store = useStore()
const mostrarDescripcion = ref(false)

function eliminar() {
  store.dispatch('libros/eliminarLibro', props.datoLibro.id)
}
</script>

<template>
  <div class="libro row align-items-center" :class="{ abierto: mostrarDescripcion }">

    <div class="col-3">
    <img :src=" datoLibro.img" :alt="datoLibro.titulo">
    </div>

    <div class="col-9 d-flex flex-column justify-content-between">
      <div>
        <h3 :title="datoLibro.titulo">{{ datoLibro.titulo }}</h3>
        <p class="autor">Autor: {{ datoLibro.autor }}</p>
        <span class="categoria">{{ datoLibro.categoria }}</span>
      </div>
       <div class="d-flex gap-2 align-items-center pt-2">
        <button class="btn-descripcion"
          v-if="datoLibro.descripcion"
          @click="mostrarDescripcion = !mostrarDescripcion">
          <BookOpenText v-if="mostrarDescripcion" />
          <BookAlert v-else />
         </button>
        <button class="btn-eliminar" @click="eliminar">
          <Trash />
        </button>
        <router-link class="btn-detalle-link" :to="{ name: 'detalle', params: { id: datoLibro.id } }">
           <CircleEllipsis />
        </router-link>
 
      </div>
      <p v-show="mostrarDescripcion" class="descripcion">
        {{ datoLibro.descripcion }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.libro{
  background-color: white;
  max-width: 25rem;
  box-shadow: 1px 1px 9px #00000030;
  border-radius: 10px;
  padding: 10px 2px;
  text-align: start;
  margin-inline: 2px;
}


.libro img{
  width: 100%;
  height: auto;
  object-fit: cover;
}

h3{
  font-family: "novecento-sans", sans-serif;
  font-weight: 500;
  font-size: 20px;
}
p{
  margin: 0;
  font-family: "novecento-sans", sans-serif;
}

.autor{
  font-size: 14px;
}

.categoria{
  font-size: 12px;
  background-color:#98293B;
  color: white;
  border-radius: 50px;
  padding: 2px 8px;
}
.btn-detalle-link{
  color: white;
  background-color: #CCBC9E;
  padding: 3px 5px;
  border-radius: 5px;
}

.btn-eliminar{
  color: white;
  background-color: #98293B;
  padding: 3px 5px;
  border-radius: 5px;
  border: none;
}
.btn-descripcion{
  color: white;
  background-color: #655142;
  padding: 3px 5px;
  border-radius: 5px;
  border: none;
}

.btn-detalle-link svg,
.btn-eliminar svg,
.btn-descripcion svg{
  width: 20px;
}



</style>