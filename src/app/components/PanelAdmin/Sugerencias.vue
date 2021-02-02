<template>
    <div class="content">
        <div class="row">
                
            <div class="col-2 col-with-right-border">
                <SidebarAdmin style="position: sticky; top: 75px"></SidebarAdmin>
            </div>
            
            <div class="col-10">
                    
            <div style=" float: right;">
                <span>/</span>
                <router-link to="/PanelAdmin">Panel Admin</router-link>
                <span>/</span>
                <strong class="final-path">Sugerencias</strong>
                <span>/</span>
            </div><br>
                    
                <div class="table-responsive">
                    <VueyeTable 
                        :data="sugerencias" 
                        :columns="columns" 
                        title="Sugerencias"
                        filter-by="estado">
<!-- Mostrar estado sugerencias-->
                        <template v-slot:estado="{item}">
                            <template v-if="item.estado === 'Sin Atender'">                                        
                             <td class="bg-danger text-white"><b>Sin Atender</b></td>                                        
                            </template>
                            <template v-else-if="item.estado === 'Atendiendo'">
                             <td style="background-color: #ff9800 ; color: white"><b> Atendiendo </b></td>
                            </template>     
                            <template v-else>
                              <div class="pl-2">
                              <td class="bg-success text-white"><b> Atendido </b></td>
                              </div>
                            </template>                                                                    
                        </template> 
<!-- Mostrar acciones "_id" solicitud -->
                        <template v-slot:_id="{item}">
                            <template v-if="item.estado === 'Sin Atender'">                                        
                                <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                    <button v-on:click="cambiarEstado(item._id,'Atendiendo')" type="button" style="background-color: #ff9800" class="btn" data-toggle="tooltip" data-placement="top" title="Atendiendo"><i class="fas fa-spinner"></i></button>
                                    <button v-on:click="cambiarEstado(item._id,'Atendido')" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Atendido"><i class="fas fa-check"></i></button>                                            
                                </div>                                        
                            </template>
                            <template v-else-if="item.estado === 'Atendiendo'">
                                <div class="pl-3 btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                    <button v-on:click="cambiarEstado(item._id,'Atendido')" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Terminado"><i class="fas fa-check"></i></button>                                            
                                </div>
                           </template>     
                           <template v-else>
                                <div class="pl-3 btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                    <button v-on:click="eliminar(item._id)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                            
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
import VueyeTable from 'vueye-table'
import VueToastr from 'vue-toastr'
import SidebarAdmin from './SidebarAdmin.vue'
const configG = require('../../../config')

export default{
    data(){
        return{
            sugerencias: [],
            columns:[
                {key: "usuario", label: "Usuario", display: true},                
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
                console.log(res.data.content);
                this.sugerencias = res.data.content;
               /* sugerencias1.forEach(element => {
                    element.fecha = new Date (this.element.fecha)                    
                    element.fecha = element.fechafecha.toLocaleDateString()                    
                }); 
                this.sugerencias = this.sug */
            })
            .catch(error => { this.$toastr.e("Error al obtener las sugerencias: "+ error) });
        },
        cambiarEstado: async function(id,info){
            console.log('Se va a cambiar el estado de la sugerencia')
            await axios.put('/api/sugerencias/'+id,{estado: info },this.configG)
                .then(res => { 
                    this.getSugerencias()
                    this.$toastr.s("Sugerencia revisada")
                    console.log(res)
                    })
                .catch(error => { this.$toastr.e("Error al cambiar estado: "+ error) });
        },
        eliminar: async function(id){
            //console.log('Se ingresa a eliminar sugerencia')
            await axios.delete('/api/sugerencias?_id='+id, this.configG)
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