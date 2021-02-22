<template>
    <div class="content">
        <div class="row">
            <div class="col-2 col-with-right-border">
                <SidebarAdmin style="position: sticky; top: 75px"></SidebarAdmin>
            </div>
            
            <div class="col-10">

            <div style=" float: right; margin-right:1em">
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
                    title="Alertas de Administrador"
                    filter-by="estado">
                        
                        <template v-slot:estado="{item}">
                           <template v-if="item.estado == 'Sin Atender'">  
                               <td class="bg-danger font-weight-bold text-white">Sin Atender</td>
                                 
                           </template>
                           <template v-else>
                                <td class="bg-success font-weight-bold text-white">Atendido</td> 
                            </template>                                                                
                        </template> 

                        <template v-slot:_id="{item}"> 
                            <template v-if="item.estado == 'Sin Atender'">  
                                <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                    <button v-on:click="atenderAlerta(item._id)" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Atender"><i class="fas fa-check"></i></button>                                            
                                </div>
                            </template>
                            <template v-else>
                                <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                    <button v-on:click="eliminarAlerta(item._id)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                           
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
        this.getAlertas();
    },
    components:{
        'SidebarAdmin': SidebarAdmin,
        VueyeTable
    },
   methods:{
       getAlertas: async function(){
            //console.log('Se ingresa a getalerta y se muestra el email '+email)
            await axios.get('/api/alertas_notificaciones?usuario_destino=Administrador&tipo=Alerta')
            .then(res => {
                //console.log('Se muestra respuesta get ',res.data.content)
                this.alertas = res.data.content.reverse();                    
            })
            .catch(error => { this.$toastr.e("Error al obtener las alertas: " + error ) });
        },
        atenderAlerta: async function(id){
            console.log('Se va a cambiar el estado de la Notificacion de usuario')
            await axios.put('/api/alertas_notificaciones/'+id,{estado: 'Atendido' })
                .then(res => { 
                    this.$toastr.s("Se cambió el estado correctamente")
                    this.getAlertas()
                    })
                .catch(error => { this.$toastr.e("Error al cambiar el estado de la alerta: " + error ) });
        },
        eliminarAlerta: async function(info){
            await axios.delete('/api/alertas_notificaciones?_id='+info)
            .then(res => { 
                //console.log(res)
                this.$toastr.s("Alerta eliminada correctamente")
                this.getAlertas()
                })
            .catch(error => { this.$toastr.e("Error al eliminar la alerta: " + error ) });
        }   
   }
}
</script>