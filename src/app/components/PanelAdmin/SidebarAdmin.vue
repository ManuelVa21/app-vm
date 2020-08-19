<!-- -->
<!-- Sidebar Admin -->
<template>
    <div>
        <div class="d-flex" id="wrapper">
          <!-- Sidebar -->
          <div class="bg-light border-right" id="sidebar-wrapper">
            <!-- <img src="..." alt="..." class="rounded-circle"> -->
            <div class="sidebar-heading text-center text-primary">Admin Telco 2.0</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelAdmin/InfoUsuarios">Información usuarios</router-link></li>
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelAdmin/Recursos">Recursos</router-link></li>
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelAdmin/Solicitudes">Solicitudes <span class="badge badge-danger">{{solicitudes.length}}</span></router-link></li>
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelAdmin/AlertasYNot">Alertas y notificaciones <span class="badge badge-danger">{{alertas.length}}</span></router-link></li>
                <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelAdmin/Sugerencias">Sugerencias <span class="badge badge-danger">{{sugerencias.length}}</span></router-link></li>
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
      solicitudes: [],
      alertas:[],
      sugerencias: [],
      storage:{}    
    }
  },
  created(){
    this.getStorage()
    this.getSugerencias()
    this.getSolicitudes()
  },
  methods:{
    getStorage: async function(){
      //console.log('Se ingresa a get storage')            
      var storage;
      try {
        if (localStorage.getItem) {
          storage = JSON.parse(localStorage.getItem('userInfo'))
          this.storage = storage
          this.getAlertas(this.storage.email)
        }
      } catch(e) {
          storage = {};
      }
    },
    getSolicitudes: async function(){
      //console.log('Se ingresa a getNotificaciones')
      await axios.get('/api/solicitudes?estado=Sin Atender')
      .then(res => {
          //console.log('Se muestra respuesta get del sidebar usuario get solicitudes')
          //console.log(res.data);
          this.solicitudes = res.data.content;                    
      })
      .catch(error => { console.log('Error en get solicitudes',error); });
    },
    getAlertas: async function(correo){
      //console.log('Se ingresa a getAlertas')
      await axios.get('/api/alertas_notificaciones?correo_usuario='+correo+'&estado=Sin atender')
      .then(res => {
          //console.log('Se muestra respuesta get del sidebar usuario get alertas')
          //console.log(res.data.content);
          this.alertas = res.data.content;                    
      })
      .catch(error => { console.log('Error en get alertas',error); });
    },
    getSugerencias: async function(){
      //console.log('Se ingresa a getAlertas')
      await axios.get('/api/sugerencias?estado=Sin atender')
      .then(res => {
          //console.log('Se muestra respuesta get del sidebar usuario get sugerencias')
          //console.log(res.data.content);
          this.sugerencias = res.data.content;                    
      })
      .catch(error => { console.log('Error en get sugerencias',error); });
    }

  }

}
</script>