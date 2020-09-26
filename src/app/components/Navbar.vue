<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/"><img class="img" src="../../assets/telcoLOGO.png" alt="Telco" style="max-height: 50px;"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1" aria-controls="navbar1" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar1">
      <ul class="navbar-nav mr-auto">        
        <li class="nav-item" routerLinkActive="active">
          <router-link class="nav-link" to="/">Nosotros</router-link>
          <!-- <a class="nav-link" [routerLink]="['about']">Nosotros</a> --> 
        </li>
        <li class="nav-item" routerLinkActive="active">
          <router-link class="nav-link" to="/">Contacto</router-link>
          <!-- <a class="nav-link" [routerLink]="['contact']" tabindex="-1">Contacto</a> --> 
        </li>
        <li v-if="auth==='user'" class="nav-item">
          <router-link class="nav-link" to="/PanelUsuario">Mi Proyecto</router-link>
        </li>
        <li v-if="auth==='admin'" class="nav-item">
          <router-link class="nav-link" to="/PanelAdmin">Panel Admin</router-link>
          </li>
      </ul>
      <div class="input-group-append">
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="Buscar..." placeholder="Search" aria-label="Search" hidden>
          <button class="btn "><i class="fas fa-search fa-2x text-white"></i></button>
        </form>
      </div>
      <div  class="dropdown">
        <div>     <!-- <div *ngIf="_users.userActive != null"> -->
          <button class="btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-user-circle fa-2x text-white"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item">usuario</a>
            <router-link class="dropdown-item" to="/"><small class="m-auto">Politicas de uso</small></router-link>
            <a v-on:click="logout()" class="dropdown-item" href="http://10.55.6.31:4200/home">Salir</a>
          </div>
        </div>
      </div>
     </div>
  </nav>
</template>

<script>
//import EventBus from './EventBus.vue'
import VueRouter from 'vue-router'
/*
EventBus.$on('logged-in', test => {
  console.log('Se ingresa al eventBus.on ',test)
})
*/

export default {
  data () {
    return {
      auth: '',
      user: ''
    }
  },
  created(){
    this.getStorage();
  },

  methods: {
    logout: async function() {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
    },
    getStorage: async function(){
      var storage;
      try {
      if (localStorage.getItem) {
        storage = JSON.parse(localStorage.getItem('userInfo'))
        //console.log('se muestra el storage ',storage)
        if (storage.role=='admin') {
          //console.log('Se ingresa como admin')
          this.auth= 'admin'
        }else{
          //console.log('Se ingresa como guest')
          this.auth= 'user'
        }
      }
      } catch(e) {
        storage = {};
      }
    }
  },

  mounted () {
  }
}
</script>