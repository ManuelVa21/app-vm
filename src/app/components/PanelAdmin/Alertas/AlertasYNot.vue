<template>
  <div class="content">    
    <div class="row">

        <div class="col-2">
          <SidebarAdmin></SidebarAdmin>
        </div>

        <div class="col-10" style="padding-left: 0;">

          <div>
            <router-link to="/PanelAdmin">Panel Admin</router-link>
            <span>/</span>
            <strong class="final-path">Alertas y Notificaciones</strong>
            <span>/</span>
          </div>

           <br><br><br><br>
            <div class="btn-group-vertical btn-group-lg" style="display: flex; align-items: center">   
                <button @click="$router.push('/PanelAdmin/AlertasYNot/Alertas')" class="btn btn-outline-info">Alertas</button>
                <button @click="$router.push('/PanelAdmin/AlertasYNot/Notificaciones')" class="btn btn-outline-info ">Notificaciones</button>
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
    components:{
        'SidebarAdmin': SidebarAdmin
    }
}
</script>