<template>
    
    <div class="content">
    <div class="row">
        <div class="col-2">
          <SidebarAdmin style="position: sticky; top: 70px"></SidebarAdmin>
        </div>
        <div class="col-10" style="padding-left: 0;">
          
            <div style=" float: right;">
                <span>/</span>
                <router-link to="/PanelAdmin">Panel Admin</router-link>
                <span>/</span>
                <router-link to="/PanelAdmin/Recursos">Recursos</router-link>
                <span>/</span>
                <strong class="final-path">Estadísticas</strong>
                <span>/</span>
            </div> <br>

            <p> Aquí va la información de estadístias </p>

            
        </div>
    </div>
  </div>  
</template>


<script>
import VueRouter from 'vue-router'
import axios from 'axios'
import VueComp from '@vue/composition-api'
import SidebarAdmin from '../SidebarAdmin.vue'
import VueyeTable from 'vueye-table'

import Token from '!!raw-loader!../../PanelAdmin/Token.txt'
const configG = require('../../../../config') 

export default {
    
    components:{        
        VueyeTable,
        SidebarAdmin
    },

    data(){
        return{
            solicitudes:[],
            solicitud:[],
            columns:[              
                {key: "usuario", label: "Usuario", display: true, sortable: true},
                {key: "correo", label: "Correo usuario", display: true},
                {key: "nombre_proyecto", label: "Proyecto", display: true},                
                {key: "motivo", label: "Motivo", display: true},
                //{key: "correo_tutor", label: "Correo director", display: true},
                //{key: "numvm", label: "# VM's", display: true},                             
                {key: "estado", label: "Estado", display: true, sortable: true},
                //{key: "_id", label: "Recursos", display: true},
                {key: "_id", label: "Acciones", display: true},
                //{key: "fecha", label: "fecha", display: true}                               
            ]
        }


    },
    created(){
        //this.getSolicitudes('Pool de Recursos');

    },
   
    methods:{
        

    }
}
</script>