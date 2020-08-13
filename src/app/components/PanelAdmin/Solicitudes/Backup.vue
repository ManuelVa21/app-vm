<template>
    
    <div class="content">
    <div class="row">
        <div class="col-2">
          <SidebarAdmin></SidebarAdmin>
        </div>
        <div class="col-10" style="padding-left: 0;">
          
             <div class="btn-group btn-group-lg" style="display: flex; align-items: center;">   
            <button @click="$router.push('/PanelAdmin/Solicitudes/PoolRecursos')" class="btn btn-outline-info">Solicitudes de recursos</button>
            <button @click="$router.push('/PanelAdmin/Solicitudes/AumentoPool')" class="btn btn-outline-info">Aumento de recursos</button>
            </div> 

            <div class="table-responsive">     
              <VueyeTable 
                   :data="solicitudes" 
                   :columns="columns" 
                    title="Solicitudes de backup"                           
                    filter-by="estado"
                    >  
<!-- Mostrar estado solicitud --> 
                    <template v-slot:estado="{item}">
                            <template v-if="item.estado == 'true'">                                        
                         <td class="bg-success text-white"><b>Resuelto</b></td>                                        
                            </template>
                        <template v-else>
                         <td class="bg-danger text-white"><b> Pendiente </b></td>
                        </template>                                                                      
                    </template> 

<!-- Ver recursos solicitados -->
                    <template v-slot:_id="{item}">                                                                                                                                 
                                <button v-on:click="getUnaSolicitud(item._id)" class="btn-sm btn-primary" data-toggle="modal" data-target="#modalRecursos" data-placement="top" title="Ver y aceptar recursos"><i class="far fa-eye"></i></button>                                            
                                                                   
                                 <div class="modal fade" id="modalRecursos" tabindex="-1" role="dialog" aria-labelledby="ModalRecursosLabel" aria-hidden="true">
                                  <div class="modal-dialog modal-dialog-centered" role="document">
                                   <div class="modal-content">
                                    <div class="modal-header text-white bg-primary"> 
                                        <h5 class="modal-title modal-dark" id="modalID"><b>Recursos solicitados</b></h5>
                                        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>                                        
                                    </div>
                                    <div class="modal-body">
                                     <div class="container">
                                           
                                        
                                             Aqui va la información de la VM a realizar backup                               
                                        
                                     </div>                                         
                                    </div>

                                    <div class="modal-footer">

                                     <template v-if="solicitud.estado == 'true'">  
                                        <button type="button" class="btn btn-success" data-dismiss="modal" aria-label="Close">
                                         Solicitud Aceptada
                                        </button>                                                                                                
                                         
                                     </template>
                                     <template v-else>
                                      <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                       <button  type="button" class="btn btn-success" data-dismiss="modal" aria-label="Close"><b>Aceptar solicitud </b></button>
                                       <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close"> <b>Negar solicitud </b></button>                                            
                                      </div>
                                     </template> 

                                    </div>                                  
                                   </div>
                                  </div>
                                 </div>                                                                                                       
                            </template>                            
       
       
                </VueyeTable>
            </div>
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
        this.getSolicitudes('Pool de Recursos');

    },
   
    methods:{
        

        getSolicitudes: async function(tipo){
            //console.log('Se ingresa a getSolicitudesPool')
            await axios.get('/api/solicitudes?tipo='+tipo)            
            .then(res => {
                //console.log('Se muestra respuesta get')
                //console.log(res.data.content);
                this.solicitudes = res.data.content;                
    // Cambiar de true a resuelto y de false a pendiente
                                 
                console.log(this.solicitudes);
            })            
            .catch(error => { console.log('Error en get solicitudes',error); });
        },
         getUnaSolicitud: async function(id){
            //console.log('Se ingresa a get una solicitud' + id)
            await axios.get('/api/solicitudes/unasolicitud?_id='+id)            
            .then(res => {
                //console.log('Se muestra respuesta get')
                //console.log(res.data.content);
                this.solicitud = res.data.content;    
                //console.log(this.solicitud);
            })            
            .catch(error => { console.log('Error en get solicitudes',error); });
        },
    }
    
}
</script>