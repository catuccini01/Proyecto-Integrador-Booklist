import { createRouter, createWebHashHistory } from "vue-router";
import InicioView from "@/views/InicioView.vue";
import AgregarLibros from "@/views/AgregarLibros.vue";
import DetalleLibro from "@/views/DetalleLibro.vue";
import NoEncontradoView from "@/views/NoEncontradoView.vue";
import LoginView from "@/views/LoginView.vue";
import RegistroView from "@/views/RegistroView.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "inicio",
    component: InicioView,
  },

  {
    path: "/agregar",
    name: "agregar",
    component: AgregarLibros,
    meta: { requiereAuth: true },
  },

  {
    path: "/libros/:id",
    name: "detalle",
    component: DetalleLibro,
    props: true,
  },

  {
    path: "/login",
    name: "login",
    component: LoginView,
  },

  {
    path: "/registro",
    name: "registro",
    component: RegistroView,
  },

  {
    path: "/:pathMatch(.*)*",
    name: "no-encontrado",
    component: NoEncontradoView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  const estaAutenticado = store.getters["auth/estaAutenticado"];

  if (to.meta.requiereAuth && !estaAutenticado) {
    return {
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    };
  }

  if (
    (to.name === "login" || to.name === "registro") &&
    estaAutenticado
  ) {
    return { name: "inicio" };
  }

  return true;
});

export default router;