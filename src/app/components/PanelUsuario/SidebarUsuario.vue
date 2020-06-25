<!-- -->
<!-- Sidebar Usuario -->
<template>
    <div>
        <div class="d-flex" id="wrapper">
          <!-- Sidebar -->
          <div class="bg-light border-right" id="sidebar-wrapper">
            <!-- <img src="..." alt="..." class="rounded-circle"> -->
            <div class="sidebar-heading text-center text-primary">Telco 2.0 </div>
              <ul class="list-group list-group-flush">
                <!--<li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelUsuario/PerfilUsuario">Perfil Usuario</router-link></li>-->
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelUsuario/MiProyecto">Mi Proyecto</router-link></li>
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelUsuario/SolicitudesUsuario">Solicitudes</router-link></li>
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelUsuario/Notificaciones">Notificaciones <span class="badge badge-danger">{{notificaciones.length}}</span></router-link></li>
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelUsuario/AlertasUsuario">Alertas <span class="badge badge-danger">{{alertas.length}}</span></router-link></li>
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
      //console.log('Se ingresa a get storage')            
      var storage;
      try {
        if (localStorage.getItem) {
          storage = JSON.parse(localStorage.getItem('userInfo'))
          this.user = storage
          this.getNotificaciones(this.user.email)
          this.getAlertas(this.user.email)
        }
      } catch(e) {
          storage = {};
      }
    },
    getNotificaciones: async function(correo){
      //console.log('Se ingresa a getNotificaciones')
      await axios.get('/api/alertas_notificaciones?correo_usuario='+correo+'&tipo=Notificación&estado=Sin atender')
      .then(res => {
          //console.log('Se muestra respuesta get del sidebar usuario get notificaciones')
          //console.log(res.data.content);
          this.notificaciones = res.data.content;                    
      })
      .catch(error => { console.log('Error en get notificaciones',error); });
    },
    getAlertas: async function(correo){
      //console.log('Se ingresa a getAlertas')
      await axios.get('/api/alertas_notificaciones?correo_usuario='+correo+'&tipo=Alerta&estado=false')
      .then(res => {
          //console.log('Se muestra respuesta get del sidebar usuario get notificaciones')
          //console.log(res.data.content);
          this.alertas = res.data.content;                    
      })
      .catch(error => { console.log('Error en get notificaciones',error); });
    }

  }

}
</script>