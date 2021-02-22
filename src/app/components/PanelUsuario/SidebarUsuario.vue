<template>
  <div>
  <div class="d-flex" id="wrapper">
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading text-center text-primary">Telco 2.0 </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelUsuario">Mi Proyecto</router-link></li>
          <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelUsuario/SolicitudesUsuario">Solicitudes</router-link></li>
          
  <!--Verificar si hay notificaciones   --> 
          <template v-if="notificaciones.length == 0">
            <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelUsuario/Notificaciones">Notificaciones</router-link></li>
          </template>
          <template v-else>                    
            <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelUsuario/Notificaciones">Notificaciones <span class="badge badge-danger">{{notificaciones.length}}</span></router-link></li>
          </template>
      
  <!--Verificar si hay alertas   --> 
          <template v-if="alertas.length == 0">
            <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelUsuario/AlertasUsuario">Alertas</router-link></li>
          </template>
          <template v-else>                    
            <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelUsuario/AlertasUsuario">Alertas <span class="badge badge-danger">{{alertas.length}}</span></router-link></li>
          </template>
          
          <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelUsuario/SugerenciasUsuario">Sugerencias <span ></span></router-link></li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import axios from 'axios'
const configG = require('../../../config')

export default {
  data(){
    return{
      notificaciones: [],
      storage:{},
      alertas:[]

    }
  },
  created(){
    this.getStorage()

  },
  methods:{
    getStorage: async function(){
      
      try {
        if (localStorage.getItem) {
          this.storage = JSON.parse(localStorage.getItem('userInfo'))
          
          this.getNotificaciones(this.storage.email)
          this.getAlertas(this.storage.email)
        }
      } catch(e) {
          storage = {};
      }
    },
    getNotificaciones: async function(correo){
      await axios.get('/api/alertas_notificaciones?correo_usuario='+correo+'&tipo=Notificación&estado=Sin Atender')
      .then(res => {
          this.notificaciones = res.data.content;                    
      })
      .catch(error => { 
        this.$toastr.e("Error al obtener las notificaciones: " + error ) 
        console.log(error)});
    },
    getAlertas: async function(correo){
      await axios.get('/api/alertas_notificaciones?correo_usuario='+correo+'&tipo=Alerta&estado=Sin Atender')
      .then(res => {
          this.alertas = res.data.content;                    
      })
      .catch(error => { 
        this.$toastr.e("Error al obtener las alertas: " + error )
        console.log(error)});
    } 
  }
  
};
  

</script>