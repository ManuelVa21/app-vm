<template>
  <div class="content">    
    <div class="row">

        <div class="col-2">
          <SidebarAdmin></SidebarAdmin>
        </div>

        <div class="col-10" style="padding-left: 0;">

        <div style=" float: right;">
          <span>/</span>
          <router-link to="/PanelAdmin">Panel Admin</router-link>
          <span>/</span>            
          <strong class="final-path">Solicitudes</strong>
          <span>/</span>
        </div><br>

           <br><br><p>
            <div class="btn-group-vertical btn-group-lg" style="display: flex; align-items: center">   
            <button @click="$router.push('/PanelAdmin/Solicitudes/PoolRecursos')" class="btn btn-outline-info">Pool de recursos <span class="badge badge-danger">{{solicitudesPool.length}}</span></button>
            <button @click="$router.push('/PanelAdmin/Solicitudes/AumentoPool')" class="btn btn-outline-info ">Aumento pool de recursos <span class="badge badge-danger">{{solicitudesAumento.length}}</span></button>
            <button @click="$router.push('/PanelAdmin/Solicitudes/Backup')" class="btn btn-outline-info ">Backup <span class="badge badge-danger">{{solicitudesBackup.length}}</span></button>
            </div>
        </div>

    </div>  
  </div>
</template>

<script>

import VueRouter from 'vue-router'
import axios from 'axios'
import SidebarAdmin from '../SidebarAdmin.vue'

export default{
    data(){
        return{

          solicitudesPool: [],
          solicitudesAumento: [],
          solicitudesBackup: [],
        }
    },
    created(){
        this.getSolicitudesPool();
        this.getSolicitudesAumento();
        this.getSolicitudesBackup();

    },
    components:{
      'SidebarAdmin': SidebarAdmin,
    },
    methods:{
      getSolicitudesPool: async function(){
        //console.log('Se ingresa a getNotificaciones')
        await axios.get('/api/solicitudes?estado=Sin Atender&tipo=Pool de Recursos')
        .then(res => {
            //console.log('Se muestra respuesta get del sidebar usuario get solicitudes')
            //console.log(res.data);
            this.solicitudesPool = res.data.content;                    
        })
        .catch(error => { console.log('Error en get solicitudes',error); });
      },
      getSolicitudesAumento: async function(){
        //console.log('Se ingresa a getNotificaciones')
        await axios.get('/api/solicitudes?estado=Sin Atender&tipo=Aumento Pool de Recursos')
        .then(res => {
            //console.log('Se muestra respuesta get del sidebar usuario get solicitudes')
            //console.log(res.data);
            this.solicitudesAumento = res.data.content;                    
        })
        .catch(error => { console.log('Error en get solicitudes',error); });
      },
      getSolicitudesBackup: async function(){
        //console.log('Se ingresa a getNotificaciones')
        await axios.get('/api/solicitudes?estado=Sin Atender&tipo=Backup')
        .then(res => {
            //console.log('Se muestra respuesta get del sidebar usuario get solicitudes')
            //console.log(res.data);
            this.solicitudesBackup = res.data.content;                    
        })
        .catch(error => { console.log('Error en get solicitudes',error); });
      }

    }  
  }

</script>
    <!--   -->