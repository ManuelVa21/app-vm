<template>
    <div class="content">
        <div class="row">
            <div class="col-2">
                <SidebarAdmin style="position: sticky; top: 75px"></SidebarAdmin>
            </div>
            <div class="col-10">
            
            <div style=" float: right; margin-right:1em">
                <span>/</span>
                <router-link to="/PanelAdmin">Panel Admin</router-link>
                <span>/</span>
                <router-link to="/PanelAdmin/AlertasYNot">Alertas y Notificaciones</router-link>
                <span>/</span>
                <strong class="final-path">Notificaciones</strong>
                <span>/</span>
            </div><br>

                
            <div class="table-responsive">
            <VueyeTable 
            :data="notificaciones" 
            :columns="columns" 
            title="Notificaciones de Administrador"
            filter-by="estado">


                <template v-slot:estado="{item}">
                    <template v-if="item.estado == 'Atendido'">  
                        <td class="bg-success font-weight-bold text-white">Atendido</td>
                          
                    </template>
                    <template v-else>
                         <td class="bg-danger font-weight-bold text-white">Sin Atender</td> 
                     </template>                                                                
                 </template> 

                <template v-slot:_id="{item}"> 
                    <template v-if="item.estado == 'Sin Atender'">  
                        <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                            <button v-on:click="atenderNotificacion(item._id)" type="button" class="btn btn-success ml-3" data-toggle="tooltip" data-placement="top" title="Aceptar"><i class="fas fa-check"></i></button>                                            
                        </div>
                    </template>
                    <template v-else>
                        <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                            <button v-on:click="eliminarNotificacion(item._id)" type="button" class="btn btn-danger ml-3" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                           
                        </div>
                    </template>
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
            notificaciones:[],
            notificacion:[],          
            columns:[
                {key: "tipo", label: "Tipo", display: true},                
                {key: "fecha", label: "Fecha", display: true},
                {key: "usuario_destino", label: "Destinatario", display: true, sortable: true},
                {key: "estado", label: "Estado", display: true},                
                {key: "_id", label: "Acciones", display: true},
            ]
        }
    },    
    created(){  
        this.getNotificaciones();
    },
    components:{
        'SidebarAdmin': SidebarAdmin,
        VueyeTable
    },
   methods:{
       getNotificaciones: async function(){
            //console.log('Se ingresa a getnotificaciones y se muestra el email '+email)
            await axios.get('/api/alertas_notificaciones?usuario_destino=Administrador&tipo=Notificación')
            .then(res => {
                //console.log('Se muestra respuesta get ',res.data.content)
                this.notificaciones = res.data.content.reverse();                   
            })
            .catch(error => {this.$toastr.e("Error al obtener las notificaciones: " + error ) });
        },
        atenderNotificacion: async function(id){
            //console.log('Se va a cambiar el estado de la Notificacion de usuario, id: ',id)
            await axios.put('/api/alertas_notificaciones/'+id,{estado: 'Atendido' },configG.headersDataBase)
                .then(res => { 
                    this.$toastr.s("Notificación atendida")
                    this.getNotificaciones()
                    })
                .catch(error => {this.$toastr.e("Error al cambiar estado de la notificación: " + error )});
        },
        eliminarNotificacion: async function(id){
            await axios.delete('/api/alertas_notificaciones?_id='+id, configG.headersDataBase)
            .then(res => { 
                //console.log(res)
                this.$toastr.s("Notificación eliminada")
                this.getNotificaciones()
                })
            .catch(error => { this.$toastr.e("Error al eliminar la notificación: " + error )});
        }
   }
}
</script>