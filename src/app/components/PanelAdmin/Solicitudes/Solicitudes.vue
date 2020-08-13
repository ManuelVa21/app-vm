<template>
  <div class="content">    
    <div class="row">

        <div class="col-2">
          <SidebarAdmin></SidebarAdmin>
        </div>

        <div class="col-10" style="padding-left: 0;">
           <br><br><p>
            <div class="btn-group-vertical btn-group-lg" style="display: flex; align-items: center">   
            <button @click="$router.push('/PanelAdmin/Solicitudes/PoolRecursos')" class="btn btn-outline-info">Pool de recursos</button>
            <button @click="$router.push('/PanelAdmin/Solicitudes/AumentoPool')" class="btn btn-outline-info ">Aumento pool de recursos</button>
            <button @click="$router.push('/PanelAdmin/Solicitudes/Backup')" class="btn btn-outline-info ">Backup</button>
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
        }
    },
    created(){
        //this.getSolicitudes();

    },
    components:{
        'SidebarAdmin': SidebarAdmin,
       

    },
    methods:{
        }  
    }

</script>
    <!--   -->