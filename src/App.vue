<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import {SquareArrowRightExit} from '@lucide/vue'

const store = useStore()

const usuario = computed(() => store.getters['auth/usuario'])
const estaAutenticado = computed(() => store.getters['auth/estaAutenticado'])

onMounted(() => {
  store.dispatch('libros/cargarLibros')
})

function cerrarSesion() {
  store.dispatch('auth/cerrarSesion')
}
</script>

<template>
  <div id="app">
    
    <nav class="menu">
      <template v-if="estaAutenticado">
        <div>
          <router-link class="btn-inicio" to="/">
            <h1>Booklist</h1>
         </router-link>
        <p v-if="estaAutenticado">
           Bienvenido/a, {{ usuario.nombre }}
        </p>
        </div>
        <div class="menu-register">

         
        <router-link to="/" class="btn-login">Inicio</router-link>
        <router-link to="/agregar" class="btn-registro">Agregar libro</router-link>

        <button @click="cerrarSesion" class="btn-cerrar-sesion">
          Cerrar sesión 
          <SquareArrowRightExit />
        </button>
        </div>
      </template>

      <template v-else>
       <router-link class="btn-inicio" to="/">
            <h1>Booklist</h1>
         </router-link>
        <div class="row align-items-center justify-content-center">
          <router-link class="btn-login" to="/login">Iniciar sesión</router-link>
          <router-link class="btn-registro" to="/registro">Registrarse</router-link>
        </div>
      </template>
    </nav>



    <div class="vista-general">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: "novecento-sans", sans-serif;
  text-align: center;
}

nav{
  background-color: #fffbf5;
  position: fixed;
  height: 100vh;
  width: 15% !important;
  z-index: 3;
  box-shadow: 1px 4px 8px #00000010;
  padding-block: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

h1{
  font-family: "novecento-sans", sans-serif;
  font-weight: 400 !important;
  color: #98293B !important;
}

.vista-general{
  width: 85% !important;
  position: absolute;
  right: 0 !important;
  z-index: 2;
 background-color: #fffcf8;
  min-height: 100vh;
}

.btn-login{
  background-color: #888;
  color: white;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 5px;
  width: 100% !important;
  margin-bottom: 15px;
  max-width: 180px !important;
}

.btn-registro{
  background-color: #98293B;
  color: white;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 5px;
  width: 100% !important;
    margin-bottom: 15px;
    max-width: 180px !important;
}

.vacio {
  color: #888;
  font-style: italic;
}

.btn-inicio{
  text-decoration: none;
}

.menu-register{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

}

.btn-cerrar-sesion{
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;

}

</style>