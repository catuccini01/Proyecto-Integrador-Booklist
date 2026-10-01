<template>
  <div class="container py-4 loginView">
    <div class="card m-auto">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Iniciar sesión</h2>

        <form @submit.prevent="iniciarSesion">
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

          <p v-if="error" class="text-danger">
            {{ error }}
          </p>

          <button type="submit" class="btn btn-loginView w-100">
            Iniciar sesión
          </button>
        </form>

        <p class="text-center mt-3 mb-0">
          ¿No tienes una cuenta?
          <router-link to="/registro" class="link">
            Regístrate
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

const email = ref('')
const password = ref('')
const error = ref('')

async function iniciarSesion() {
  error.value = ''

  try {
    await store.dispatch('auth/login', {
      email: email.value,
      password: password.value
    })

    const destino = router.currentRoute.value.query.redirect || '/'

router.push(destino)
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
  .loginView{
    display: flex;
    height: 100vh;
    background-color: #F1E0C6;
  }

  .loginView .card{
    max-width: 500px;
    max-height: 500px;
    width: 100%;
    border: none;
    box-shadow: 1px 1px 9px #00000020;
  
  }

  .btn-loginView{
    background-color: #98293B;
    color: white;
    font-family: "novecento-sans", sans-serif;
  }

  .link{
    color: #98293B;
  }


</style>