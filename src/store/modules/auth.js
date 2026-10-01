import api from "@/api";

export default {
  namespaced: true,

  state: () => ({
    usuario: JSON.parse(sessionStorage.getItem("usuario")) || null,
    loading: false,
    error: null,
  }),

  mutations: {
    SET_USUARIO(state, usuario) {
      state.usuario = usuario;

      if (usuario) {
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
      } else {
        sessionStorage.removeItem("usuario");
      }
    },

    SET_LOADING(state, valor) {
      state.loading = valor;
    },

    SET_ERROR(state, valor) {
      state.error = valor;
    },
  },

  actions: {
    async registrar({ commit }, datos) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const respuesta = await api.get("/usuarios", {
          params: {
            email: datos.email,
          },
        });

        if (respuesta.data.length > 0) {
          throw new Error("Ya existe un usuario con ese correo.");
        }

        const { data } = await api.post("/usuarios", {
          nombre: datos.nombre,
          email: datos.email,
          password: datos.password,
        });

        const usuario = {
          id: data.id,
          nombre: data.nombre,
          email: data.email,
        };

        commit("SET_USUARIO", usuario);

        return usuario;
      } catch (error) {
        commit(
          "SET_ERROR",
          error.message || "No se pudo registrar el usuario.",
        );

        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async login({ commit }, datos) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const { data } = await api.get("/usuarios", {
          params: {
            email: datos.email,
          },
        });

        if (data.length === 0) {
          throw new Error("Usuario no válido. Debes registrarte.");
        }

        const usuarioEncontrado = data[0];

        if (usuarioEncontrado.password !== datos.password) {
          throw new Error("Contraseña incorrecta.");
        }

        const usuario = {
          id: usuarioEncontrado.id,
          nombre: usuarioEncontrado.nombre,
          email: usuarioEncontrado.email,
        };

        commit("SET_USUARIO", usuario);

        return usuario;
      } catch (error) {
        commit("SET_ERROR", error.message || "No se pudo iniciar sesión.");

        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    cerrarSesion({ commit }) {
      commit("SET_USUARIO", null);
    },
  },

  getters: {
    usuario: (state) => state.usuario,
    estaAutenticado: (state) => !!state.usuario,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
};
