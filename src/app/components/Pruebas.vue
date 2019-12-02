<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <div>
            <button type="submit" class="btn btn-lg btn-primary btn-block" @click="usuarios()"> Mostrar todos</button>
        </div>
        <div>
            <button type="submit" class="btn btn-lg btn-primary btn-block" @click="borrar()"> Borrar un usuario por id</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueRouter from 'vue-router';

export default {
  data () {
    return {
      nombre:'',
      categoria_us: '',
      correo: '',
      contrasena: ''
    }
  },

  methods: {
    usuarios(){
        console.log('Buscar todos')
        axios.get('/usuarios/usuarios')
        .then(function (res) { 
            console.log('Mostar respuesta')
            console.log(res); 
            })
        .catch(function (error) { console.log(error); })            
    },
    borrar(){
      console.log('borrar')
      axios.delete('/usuarios/delete', {params:{_id:'5da4043d1027a7225c50ba0a'}} );

    }
  }
}
</script>
