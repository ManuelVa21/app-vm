<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">Registro</h1>
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="nombre" v-model="nombre" class="form-control" name="nombre" placeholder="Ingresar Nombre">
          </div>
          <div class="form-group">
            <label for="nombre">Categoria Usuario</label>
            <input type="nombre" v-model="categoria_us" class="form-control" name="categoria_us" placeholder="Ingresar Categoria de Usuario">
          </div>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" v-model="correo" class="form-control" name="email" placeholder="Ingresar Correo Electrónico">
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" v-model="contrasena" class="form-control" name="password" placeholder="Ingresar Contraseña">
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Registrar</button>
        </form>
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
    register () {
      console.log('Se procede a crear el usuario  registrar')
      axios.post('/usuarios/registro', {
        nombre: this.nombre,
        categoria_us: this.categoria_us,
        correo: this.correo,
        contrasena: this.contrasena
      })
      .then(function (res) {
        //this.$router.push({ name: 'PanelUsuario' })
        console.log('Mostar respuesta')
        console.log(res); 
        if (res.data) {
          console.log('se encontro el correo')
        }
        else{
          console.log('No se encontro el correo')
        }
      })
      .catch(function (error) { console.log(error);});
    },
  }
}
</script>
