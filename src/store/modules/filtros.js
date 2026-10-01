export default {
    namespaced: true,
    state: () => ({
        categoria: ''
    }),
    mutations: {
        SET_CATEGORIA(state, valor) {
            state.categoria = valor
        }
    },
    getters: {
        categoria: (state) => state.categoria
    }
}