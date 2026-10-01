<template>
  <div class="container py-4 registerView">
    <div class="card m-auto" style="max-width: 420px;">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Crear cuenta</h2>

        <form @submit.prevent="registrarse">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input
              id="nombre"
              v-model="nombre"
              type="text"
              class="form-control"
              required
            >
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Correo</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control"
              required
            >
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              required
            >
          </div>

          <div class="mb-3">
            <label for="confirmarPassword" class="form-label">
              Confirmar contraseña
            </label>

            <input
              id="confirmarPassword"
              v-model="confirmarPassword"
              type="password"
              class="form-control"
              required
            >
          </div>

          <p v-if="error" class="text-danger">
            {{ error }}
          </p>

          <button type="submit" class="btn btn-registerView w-100">
            Registrarme
          </button>
        </form>

        <p class="text-center mt-3 mb-0">
          ¿Ya tienes una cuenta?
          <router-link to="/login" class="link">
            Inicia sesión
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const nombre = ref('')
const email = ref('')
const password = ref('')
const confirmarPassword = ref('')
const error = ref('')

async function registrarse() {
  error.value = ''

  if (password.value !== confirmarPassword.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }

  try {
    await store.dispatch('auth/registrar', {
      nombre: nombre.value.trim(),
      email: email.value.trim(),
      password: password.value
    })

    router.push('/')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style>
h2, p{
  font-family: "novecento-sans", sans-serif;
  font-weight: 400 !important;
}
  .registerView{
    display: flex;
    height: 100vh;
    background-color: #F1E0C6;
  }

  .registerView .card{
    max-width: 500px;
    max-height: 550px;
    width: 100%;
    border: none;
    box-shadow: 1px 1px 9px #00000020;
  
  }

    .btn-registerView{
    background-color: #98293B;
    color: white;
    font-family: "novecento-sans", sans-serif;
  }

  .link{
    color: #98293B;
  }


</style>