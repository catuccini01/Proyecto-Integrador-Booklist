<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import FormularioLibro from '../components/FormularioLibro.vue'

const store = useStore()
const mensaje = ref('')
const error = ref('')

async function agregarLibro(libro) {
  mensaje.value = ''
  error.value = ''

  try {
    await store.dispatch('libros/agregarLibro', libro)
    mensaje.value = '¡Libro agregado correctamente!'
  } catch (err) {
    error.value = 'No se pudo agregar el libro.'
  }
}
</script>

<template>
  <div class="agregarLibro">
    <h2>Agregar libro</h2>

    <p v-if="mensaje" class="exito">{{ mensaje }}</p>
    <p v-if="error" class="error">{{ error }}</p>

    <FormularioLibro @agregar="agregarLibro" />
  </div>
</template>

<style scoped>

.agregarLibro{
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.exito {
  color: #2c7a55;
  font-weight: bold;
}

.error {
  color: #c0392b;
  font-weight: bold;
}
</style>