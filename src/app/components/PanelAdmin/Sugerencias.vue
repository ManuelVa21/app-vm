<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-2 col-with-right-border">
                    <SidebarAdmin></SidebarAdmin>
                </div>
                <div class="col-10">
                    
                    <div>
                        <router-link to="/PanelAdmin">Panel Admin</router-link>
                        <span>/</span>
                        <strong class="final-path">Sugerencias</strong>
                        <span>/</span>
                    </div>
                    
                    <div class="table-responsive">
                    <VueyeTable 
                        :data="sugerencias" 
                        :columns="columns" 
                        title="Sugerencias"
                        filter-by="estado">
<!-- Mostrar estado sugerencias-->
                        <template v-slot:estado="{item}">
                            <template v-if="item.estado === 'Sin atender'">                                        
                             <td class="bg-danger text-white"><b>Sin atender</b></td>                                        
                            </template>
                            <template v-else-if="item.estado === 'Atendiendo'">
                             <td class="bg-warning text-white"><b> Atendiendo </b></td>
                            </template>     
                            <template v-else>
                             <td class="bg-success text-white"><b> Atendido </b></td>
                            </template>                                                                    
                        </template> 
<!-- Mostrar acciones "_id" solicitud -->
                        <template v-slot:_id="{item}">
                            <template v-if="item.estado === 'Sin atender'">                                        
                                <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                    <button v-on:click="cambiarEstado(item._id,'Atendiendo')" type="button" class="btn btn-warning" data-toggle="tooltip" data-placement="top" title="Atendiendo"><i class="fas fa-spinner"></i></button>
                                    <button v-on:click="cambiarEstado(item._id,'Atendido')" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Atendido"><i class="fas fa-check"></i></button>                                            
                                </div>                                        
                            </template>
                            <template v-else-if="item.estado === 'Atendiendo'">
                                <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                    <button v-on:click="cambiarEstado(item._id,'Atendido')" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Terminado"><i class="fas fa-check"></i></button>                                            
                                </div>
                           </template>     
                           <template v-else>
                                <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                    <button v-on:click="eliminar(item._id)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                            
                                </div>
                           </template>                                                                    
                        </template>                            


                    </VueyeTable>
                                              
                                                                         
                                            
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import VueRouter from 'vue-router'
import axios from 'axios'
import VueyeTable from 'vueye-table'
import VueToastr from 'vue-toastr'
import SidebarAdmin from './SidebarAdmin.vue'

export default{
    data(){
        return{
            sugerencias: [],
            columns:[
                {key: "nombre", label: "Usuario", display: true},                
                {key: "fecha", label: "Fecha", display: true},
                {key: "descripcion", label: "Descripción", display: true},
                {key: "estado", label: "Estado", display: true, sortable: true},                
                {key: "_id", label: "Acciones", display: true},   
            ]
        }
    },
    components:{
        'SidebarAdmin': SidebarAdmin,
        VueyeTable
    },
    created(){
        this.getSugerencias();
    },

    methods:{
        getSugerencias: async function(){
            //console.log('Se ingresa a getAlertas')
            await axios.get('/api/sugerencias')
            .then(res => {
                //console.log('Se muestra respuesta get del sidebar usuario get notificaciones')
                //console.log(res.data.content);
                this.sugerencias = res.data.content;                    
            })
            .catch(error => { console.log('Error en get sugerencias',error); });
        },
        cambiarEstado: async function(id,info){
            console.log('Se va a cambiar el estado de la sugerencia')
            await axios.put('/api/sugerencias/'+id,{estado: info },configG.headersDataBase)
                .then(res => { 
                    this.getSugerencias()
                    this.$toastr.s("Sugerencia atendida")
                    console.log(res)
                    })
                .catch(error => { console.log('Error en cambiar estado',error); });
        },
        eliminar: async function(id){
            //console.log('Se ingresa a eliminar sugerencia')
            await axios.delete('/api/sugerencias?_id='+id, configG.headersDataBase)
            .then(res => { 
                //console.log(res)
                this.$toastr.s("Sugerencia eliminada")
                this.getSugerencias()
                })
            .catch(error => {
                //console.log('Error en eliminar sugerencia',error);  
                this.$toastr.e("Error al eliminar sugerencia:"+ error)});
                
        }
    }
   
}
</script>