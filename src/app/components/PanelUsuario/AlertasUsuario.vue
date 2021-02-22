<template>
    <div class="content">
        <div class="row">
                
            <div class="col-2 col-with-right-dorder">
                <SidebarUsuario style="position: sticky; top: 70px"></SidebarUsuario> 
            </div>
                
            <div class="col-10">
                    
            <div style=" float: right">
                <span>/</span>
                <router-link to="/PanelUsuario">Mi Proyecto</router-link>
                <span>/</span>
                <strong class="final-path">Alertas</strong>
                <span>/</span>
            </div><br>

                <div class="table-responsive">
                    <VueyeTable 
                    :data="alertas" 
                    :columns="columns" 
                    title="Alertas de Usuario"
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
import VueyeTable from 'vueye-table'
import VueToastr from 'vue-toastr'
import axios from 'axios'
import SidebarUsuario from './SidebarUsuario.vue'
const configG = require('../../../config')

export default {
    data(){
        return{
            alertas: [],
            storage: {},
            columns:[
                {key: "fecha", label: "Fecha", display: true},
                {key: "descripcion", label: "Descripcion", display: true, sortable: true},
                {key: "estado", label: "Estado", display: true},                
                {key: "_id", label: "Acciones", display: true},
            ]
        }
    },
    created(){
        this.getStorage();
    },
    components:{
        'SidebarUsuario': SidebarUsuario,
        VueyeTable    
    },
    methods:{
        getStorage: async function(){
            //console.log('Se ingresa a get storage')            
            var storage;
            try {
            if (localStorage.getItem) {
                this.storage = JSON.parse(localStorage.getItem('userInfo'))
                console.log('se muestra el storage ', this.storage)
                this.getAlertas(this.storage.email)
            }
            } catch(e) {
                storage = {};
            }
        },
        getAlertas: async function(correo){
            //console.log('Se ingresa a getalerta y se muestra el email '+email)
            await axios.get('/api/alertas_notificaciones?correo_usuario='+correo+'&tipo=Alerta')
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
                    this.getAlertas(this.storage.email)
                    })
                .catch(error => { this.$toastr.e("Error al cambiar el estado de la alerta: " + error ) });
        },
        eliminarAlerta: async function(info){
            await axios.delete('/api/alertas_notificaciones?_id='+info)
            .then(res => { 
                //console.log(res)
                this.$toastr.s("Alerta eliminada correctamente")
                this.getAlertas(this.storage.email)
                })
            .catch(error => { this.$toastr.e("Error al eliminar la alerta: " + error ) });
        }        
    }
}
</script>