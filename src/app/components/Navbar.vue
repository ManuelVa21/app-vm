<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <a class="navbar-brand font-weight-bold" href="#">Plataforma Telco 2.0</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1" aria-controls="navbar1"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar1">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Inicio</router-link>
                </li>
                <li v-if="auth===''" class="nav-item">
                    <router-link class="nav-link" to="/Login">Login</router-link>
                </li>
                <li v-if="auth===''" class="nav-item">
                    <router-link class="nav-link" to="/Registrar">Registro</router-link>
                </li>
                <li v-if="auth==='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/PanelUsuario">Panel Usuario</router-link>
                </li>
                <li v-if="auth==='loggedin'" class="nav-item">
                    <a class="nav-link" href="" v-on:click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import EventBus from './EventBus.vue'
import VueRouter from 'vue-router'

EventBus.$on('logged-in', test => {
  console.log(test)
})

export default {
  data () {
    return {
      auth: '',
      user: ''
    }
  },

  methods: {
    logout () {
      localStorage.removeItem('usertoken');
      this.$router.push({ name: 'Inicio' })
    }
  },

  mounted () {
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
  }
}
</script>