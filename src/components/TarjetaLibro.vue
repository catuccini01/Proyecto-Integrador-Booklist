<template>
  <div class="libro" :class="{ abierto: mostrarDescripcion }">
    <h3 :title="datoLibro.titulo">{{ datoLibro.titulo }}</h3>
    <p>Autor: {{ datoLibro.autor }}</p>
    <span class="categoria">{{ datoLibro.categoria }}</span>

    <div>
      <button v-if="datoLibro.descripcion" @click="mostrarDescripcion = !mostrarDescripcion">
        {{ mostrarDescripcion ? 'Ocultar descripción' : 'Ver descripción' }}
      </button>
      <button class="eliminar" @click="eliminar">Eliminar</button>
      <router-link class="detalle-link" :to="{ name: 'detalle', params: { id: datoLibro.id } }">
            Ver detalle
      </router-link>
    </div>

    <p v-show="mostrarDescripcion" class="descripcion">
      {{ datoLibro.descripcion }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TarjetaLibro',
  emits: ['eliminar'],
  props: {
    datoLibro: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      mostrarDescripcion: false
    }
  },
  methods: {
     eliminar() {
        this.$emit('eliminar', this.datoLibro.id)
    }
  }
}
</script>

<style scoped>
.libro {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 12px auto;
  max-width: 420px;
  text-align: left;
}
.libro.abierto {
  border-color: #42b983;
}
.categoria {
  background: #e8f5ee;
  color: #2c7a55;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.85rem;
}
.descripcion {
  font-style: italic;
}
.eliminar {
  margin-left: 8px;
  color: #c0392b;
}
.detalle-link {
  margin-left: 8px;
}
</style>