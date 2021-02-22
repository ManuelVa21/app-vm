<template>
    <div>
      <div class="d-flex" id="wrapper">
        <div class="bg-light border-right" id="sidebar-wrapper">
          <div class="sidebar-heading text-center text-primary">Admin Telco 2.0</div>
            <ul class="list-group list-group-flush">
              
              <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelAdmin/InfoUsuarios">Información usuarios</router-link></li>
              <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelAdmin/Recursos">Recursos</router-link></li>
  <!--Verificar si hay solicitudes   --> 
              <template v-if="solicitudes.length == 0">
                  <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelAdmin/Solicitudes">Solicitudes </router-link></li>
              </template>
              <template v-else>                    
                  <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelAdmin/Solicitudes">Solicitudes <span class="ml-1 badge badge-danger">{{solicitudes.length}}</span></router-link></li>
              </template>
  <!--Verificar si hay alertas   -->            
              <template v-if="alertas.length == 0">
                  <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelAdmin/AlertasYNot">Alertas y notificaciones </router-link></li>
              </template>
              <template v-else>                    
                   <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelAdmin/AlertasYNot">Alertas y notificaciones <span class="ml-1 badge badge-danger">{{alertas.length}}</span></router-link></li>
              </template>
  <!--Verificar si hay sugerencias   --> 
              <template v-if="sugerencias.length == 0">
                  <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelAdmin/Sugerencias">Sugerencias </router-link></li>
              </template>
              <template v-else>                    
                  <li class="list-group-item list-group-item-action bg-light"><router-link to="/PanelAdmin/Sugerencias">Sugerencias <span class="ml-1 badge badge-danger">{{sugerencias.length}}</span></router-link></li>
              </template>
              
              
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
    this.getAlertas()
  },
  methods:{
    getStorage: async function(){          
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
      await axios.get('/api/solicitudes?estado=Sin Atender')
      .then(res => {
          this.solicitudes = res.data.content;                    
      })
      .catch(error => { console.log('Error en get solicitudes',error); });
    },
    getAlertas: async function(){
      await axios.get('/api/alertas_notificaciones?usuario_destino=Administrador&estado=Sin Atender')
      .then(res => {
          this.alertas = res.data.content;                    
      })
      .catch(error => { console.log('Error en get alertas',error); });
    },
    getSugerencias: async function(){
      await axios.get('/api/sugerencias?estado=Sin Atender')
      .then(res => {
          this.sugerencias = res.data.content;                    
      })
      .catch(error => { console.log('Error en get sugerencias',error); });
    }

  }

}
</script>