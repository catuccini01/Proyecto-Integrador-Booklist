import { createStore } from 'vuex'

import libros from './modules/libros'
import filtros from './modules/filtros'
import auth from './modules/auth'

export default createStore({
  modules: { libros, filtros, auth }
})