<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">Registro</h1>
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
      correo: '',
      contrasena: ''
    }
  },

  methods: {
    register () {
      console.log('Se procede a crear el usuario desde registrar')
      axios.post('usuarios/registro', {
        correo: this.correo,
        contrasena: this.contrasena
      }).then(res => {
        this.$router.push({ name: 'Login' })
      }).catch(err => {
        console.log(err)
      });
    }
  }
}
</script>
