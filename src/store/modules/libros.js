import api from '../../api'

export default {
  namespaced: true,
  state: () => ({
    libros: [],
    loading: false,
    error: null
  }),
  mutations: {
    SET_LIBROS(state, libros) {
      state.libros = libros
    },
    AGREGAR_LIBRO(state, libro) {
      state.libros.push(libro)
    },
    ELIMINAR_LIBRO(state, id) {
      state.libros = state.libros.filter((libro) => libro.id !== id)
    },
    SET_LOADING(state, valor) {
      state.loading = valor
    },
    SET_ERROR(state, valor) {
      state.error = valor
    }
  },
  actions: {
    async cargarLibros({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const { data } = await api.get('/libros')
        commit('SET_LIBROS', data)
      } catch (error) {
        commit('SET_ERROR', 'No se pudieron cargar los libros.')
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async agregarLibro({ commit }, libro) {
      const { data } = await api.post('/libros', libro)
      commit('AGREGAR_LIBRO', data)
    },
    async eliminarLibro({ commit }, id) {
      await api.delete(`/libros/${id}`)
      commit('ELIMINAR_LIBRO', id)
    }
  },
  getters: {
    libros: (state) => state.libros,
    loading: (state) => state.loading,
    error: (state) => state.error
  }
}