<template>
    <div class="content">
        <div class="row">
            <div class="col-2 col-with-right-border">
                <SidebarAdmin style="position: sticky; top: 70px"></SidebarAdmin>
            </div>
            
            <div class="col-10">

            <div style=" float: right;">
                <span>/</span>
                <router-link to="/PanelAdmin">Panel Admin</router-link>
                <span>/</span>
                <router-link to="/PanelAdmin/AlertasYNot">Alertas y Notificaciones</router-link>
                <span>/</span>
                <strong class="final-path">Alertas</strong>
                <span>/</span>
            </div><br>
            
            <div class="table-responsive">
                
                <VueyeTable 
                :data="alertas" 
                :columns="columns" 
                title="Alertas"
                filter-by="estado">
                </VueyeTable>

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
            config:{
                headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin":"*"
                }
            },
            alertas:[],
            alerta: [],            
            columns:[
                {key: "tipo", label: "Tipo", display: true},                
                {key: "fecha", label: "Fecha", display: true},
                {key: "descripcion", label: "Descripción", display: true, sortable: true},
                {key: "estado", label: "Estado", display: true},                
                {key: "_id", label: "Acciones", display: true},             
                
            ]


            
        }
    },    
    created(){  
        //this.getAlertas();
    },
    components:{
        'SidebarAdmin': SidebarAdmin,
        VueyeTable
    },
   methods:{}
}
</script>