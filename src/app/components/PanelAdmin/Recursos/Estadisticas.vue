<template>
    
    <div class="content">
    <div class="row">
        <div class="col-2">
          <SidebarAdmin></SidebarAdmin>
        </div>
        <div class="col-10" style="padding-left: 0;">
          
             <div class="btn-group btn-group-lg" style="display: flex; align-items: center;">   
            <button @click="$router.push('/PanelAdmin/Recursos/RecursosTelco')" class="btn btn-outline-info">Recursos Telco</button>
            <button @click="$router.push('/PanelAdmin/Recursos/Proyectos')" class="btn btn-outline-info">Proyectos</button>
            <button @click="$router.push('/PanelAdmin/Recursos/MaquinasVirtuales')" class="btn btn-outline-info">Máquinas Virtuales</button>
            </div> 

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