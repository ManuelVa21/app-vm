<template>
  <div class="content">    
    <div class="row">

        <div class="col-2">
          <SidebarAdmin style="position: sticky; top: 75px"></SidebarAdmin>
        </div>

        <div class="col-10 pl-0">

          <div class="mr-2" style=" float: right;">
            <span>/</span>
            <router-link to="/PanelAdmin">Panel Admin</router-link>
            <span>/</span>
            <strong class="final-path">Alertas y Notificaciones</strong>
            <span>/</span>
          </div><br>


          <br><br><p>
          <div class="btn-group-vertical btn-group-lg mr-2" style="display: flex; align-items: center">   
              <button @click="$router.push('/PanelAdmin/AlertasYNot/Alertas')" class="btn btn-outline-info">Alertas <span class="ml-3 badge badge-danger">{{alertas.length}}</span></button>
              <button @click="$router.push('/PanelAdmin/AlertasYNot/Notificaciones')" class="btn btn-outline-info ">Notificaciones <span class="ml-3 badge badge-danger">{{notificaciones.length}}</span></button>
          </div>


        </div>
    </div>  
  </div>
</template>

<script>

import VueRouter from 'vue-router'
import axios from 'axios'
import SidebarAdmin from '../SidebarAdmin.vue'
import VueyeTable from 'vueye-table'
import VueToastr from 'vue-toastr'

export default{
  data(){
    return{
      alertas:[],
      notificaciones:[],
      storage:{}
    }
  },
  components:{
    'SidebarAdmin': SidebarAdmin
  },
  created(){
    this.getStorage();
  },
  methods:{
    getStorage: async function(){
      //console.log('Se ingresa a get storage')            
      var storage;
      try {
        if (localStorage.getItem) {
          storage = JSON.parse(localStorage.getItem('userInfo'))
          this.storage = storage
          this.getAlertas(this.storage.email);
          this.getNotificaciones(this.storage.email);
        }
      } catch(e) {
          storage = {};
      }
    },
    getAlertas: async function(correo){
      //console.log('Se ingresa a getAlertas')
      await axios.get('/api/alertas_notificaciones?correo_usuario='+correo+'estado=Sin Atender&tipo=Alerta')
      .then(res => {
          //console.log('La respuesta en getAlertas es ',res.data.content);
          this.alertas = res.data.content;                    
      })
      .catch(error => { this.$toastr.e("Error al cargar las alertas: " + error) });
    },
    getNotificaciones: async function(correo){
      //console.log('Se ingresa a getNotificaciones')
      await axios.get('/api/alertas_notificaciones?correo_usuario='+correo+'estado=Sin Atender&tipo=Notificación')
      .then(res => {
          //console.log('La respuesta en getNotificacion es ',res.data.content);
          this.notificaciones = res.data.content;                    
      })
      .catch(error => { this.$toastr.e("Error al cargar las notificaciones: " + error) });
    }
  }
}
</script>