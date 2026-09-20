<template>

  <div id="app">
    <h1>Booklist</h1>
    <p>Bienvenido/a, {{ nombreUsuario }}</p>

    <div class="contador">
      <button @click="restar">-</button>
      <span>{{ contador }}</span>
      <button @click="sumar">+</button>
    </div>
    
    <hr>
    
    <nav class="menu">
      <router-link to="/">Inicio</router-link>
      <router-link to="/libros">Libros</router-link>
    </nav>

    <hr>

    <router-view :libros="libros" @agregar="agregarLibro" @eliminar="eliminarLibro" />
  </div>
</template>

<script>
export default{
  name: "App",
    data(){
    return{
      nombreUsuario: 'Cata',
      contador: 0,
      mostrarCatalogo: true,
      siguienteId: 4,
      libros: [
        {
          id: 1,
          titulo: 'Cien años de soledad',
          autor: 'Gabriel García Márquez',
          categoria: 'Novela',
          descripcion: 'La historia de la familia Buendía en el pueblo de Macondo.'
        },
        {
          id: 2,
          titulo: 'El principito',
          autor: 'Antoine de Saint-Exupéry',
          categoria: 'Fábula',
          descripcion: 'Un piloto se encuentra con un pequeño príncipe en el desierto.'
        },
        {
          id: 3,
          titulo: 'Sapiens',
          autor: 'Yuval Noah Harari',
          categoria: 'Historia',
          descripcion: ''
        }
      ]
    }
  },
  methods:{
    sumar(){
      this.contador++
    },
    restar(){
      this.contador--
    },
    agregarLibro(libro){
      this.libros.push({id: this.siguienteId,  ...libro})
      this.siguienteId++
    },
    eliminarLibro(id){
      this.libros = this.libros.filter((libro) => libro.id !== id)
    },
    cargarEjemplos(){
      this.libros.push(
       {
          id: 1,
          titulo: 'Cien años de soledad',
          autor: 'Gabriel García Márquez',
          categoria: 'Novela',
          descripcion: 'La historia de la familia Buendía en el pueblo de Macondo.'
        },
        {
          id: 2,
          titulo: 'El principito',
          autor: 'Antoine de Saint-Exupéry',
          categoria: 'Fábula',
          descripcion: 'Un piloto se encuentra con un pequeño príncipe en el desierto.'
        },
        {
          id: 3,
          titulo: 'Sapiens',
          autor: 'Yuval Noah Harari',
          categoria: 'Historia',
          descripcion: ''
        }
      )
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 40px;
}
.contador button {
  font-size: 1.2rem;
  padding: 4px 14px;
  background-color:blueviolet;
  border: none;
  box-shadow: 1px 1px 2px #00000040;
  color: white;
  border-radius: 3px;
}
.contador span {
  margin: 0 16px;
  font-size: 1.5rem;
}
.vacio {
  color: #888;
  font-style: italic;
}
.menu{
  display: flex;
  column-gap: 20px;
  justify-content: center;
  margin: 10px;
}

.menu a{
  text-decoration: none;
  color: black;
}
</style>
