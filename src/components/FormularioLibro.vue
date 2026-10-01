<template>
    <div class="container">
    <div class="formulario row">
        
<div class="col">
        <div class="campo">
            <label for="titulo">Título</label>
            <input 
                id="titulo" 
                type="text" 
                v-model="nuevoLibro.titulo" 
                placeholder="Ej: El principito"
                @keyup.enter="agregar"
                >
        </div>

        <div class="campo">
            <label for="autor">Autor</label>
            <input id="autor" type="text" v-model="nuevoLibro.autor" placeholder="Ej: Antoine de Saint-Exupéry" @keyup.enter="agregar">
        </div>

         <div class="campo">
            <label for="categoria">Categoría</label>
            <select id="categoria" v-model="nuevoLibro.categoria">
                <option disabled value="">Seleccione una categoría</option>
                <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                    {{ categoria }}
                </option>
            </select>
        </div>

        <div class="campo">
            <label for="descripcion">Descripción</label>
            <textarea id="descripcion" rows="3" v-model="nuevoLibro.descripcion"></textarea>
        </div>


        <p v-if="error" class="error">{{ error }}</p>

        </div>
        <div class="vista-previa col">
            <h3>Vista previa</h3>
            <p><strong>Título:</strong>{{ nuevoLibro.titulo }}</p>
            <p><strong>Autor:</strong>{{ nuevoLibro.autor }}</p>
            <p><strong>Categoría:</strong>{{ nuevoLibro.categoria }}</p>
            <p><strong>Descripción:</strong>{{ nuevoLibro.descripcion }}</p>
        </div>
    </div>
            <button class="btn-agregar btn mt-4" type="button" @click="agregar">Agregar libro</button>

    </div>
</template>

<script>
export default{
    name: 'FormularioLibro',
    emits: ['agregar'],
    data(){
        return{
            nuevoLibro: {
                titulo: '',
                autor: '',
                categoria: '',
                descripcion: ''
            },
           categorias:['Ciencia Ficción', 'Drama', 'Fantasía', 'Romance', 'Novela', 'Otro'],
            error: ''
        }
    },
    methods:{
        agregar(){
            const {titulo, autor, categoria, descripcion} = this.nuevoLibro
            if(!titulo.trim() || !autor.trim() || !categoria){
                this.error = 'Completa el título, el autor y la categoría.'
                return
            }
            this.$emit('agregar', {
                titulo: titulo.trim(),
                autor: autor.trim(),
                categoria,
                descripcion: descripcion.trim()
            })

            this.nuevoLibro = {titulo: '', autor: '', categoria: '', descripcion: ''}
            this.error = ''
        }
    }
}
</script>

<style scoped>
.formulario {
  width: 100%;
  margin: 20px auto;
  text-align: left;

}
.campo {
  margin-bottom: 12px;
}
.campo label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}
.campo input,
.campo select,
.campo textarea {
  width: 100%;
  padding: 6px 8px;
  box-sizing: border-box;
}
.error {
  color: #c0392b;
}
.vista-previa {
  border: 1px dashed #999;
  border-radius: 8px;
  padding: 8px 16px;
  margin-top: 16px;
}
 .btn-agregar{
  background-color: #98293B;
  color: white;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 5px;
  max-width: 200px;

 }
</style>