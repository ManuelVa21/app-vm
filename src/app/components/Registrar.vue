<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="registrar">
          <h1 class="h3 mb-3 font-weight-normal">Registro</h1>
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" v-model="nombre" class="form-control" name="nombre" placeholder="Ingresar Nombre">
          </div>
          <div class="form-group">
            <label for="CategoriaUsuario">Categoria Usuario</label>
            <select type="categoria_us" v-model="categoria_us" class="form-control" id="CategoriaUsuario">
              <option>Estudiante</option>
              <option>Docente</option>
              <option>Curso</option>
            </select>
          </div>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" v-model="correo" class="form-control" name="email" placeholder="Ingresar Correo Electrónico">
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" v-model="contrasena" class="form-control" name="password" placeholder="Ingresar Contraseña">
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit" @click="registrar()">Registrar</button>
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
    registrar () {
      console.log('Se busca si el correo esta registrado')
      const buscar = this.buscaruno(this.correo)
      if (buscar== true) {
        console.log('El correo ya existe previamente')
        //this.$router.push({ name: 'PanelUsuario' })
      } else {
        console.log('No existe el correo, se procede a crear')
        axios.post('/usuarios/registro', {
          nombre: this.nombre,
          categoria_us: this.categoria_us,
          correo: this.correo,
          contrasena: this.contrasena
        })
        .then(function (res) {
          console.log('Mostar respuesta')
          console.log(res)
          this.$router.push({ name: 'PanelUsuario' })
        })
        .catch(function (error) { console.log(error);}); 
      }
    },
    buscaruno:function(dato){
      console.log('Buscar uno')
      console.log(dato)
      axios.get('/usuarios/unusuario', { params: { correo: dato } })
      .then(function (res) { 
        console.log('Mostar respuesta')
        console.log(res); 
        if (res.data) {
          console.log('se encontro el correo')
          return true;
        }
        else{
          console.log('No se encontro el correo')
          return false;
        }
      })
      .catch(function (error) { console.log(error); })            
    }
  }
}
</script>
