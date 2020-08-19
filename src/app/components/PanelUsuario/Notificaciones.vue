<template>
    <div class="content">
        <div class="row">
            <div class="col-2">
                <SidebarUsuario></SidebarUsuario> 
            </div>
            <div class="col-10">
            
            <div style=" float: right">
                <router-link to="/PanelUsuario">Panel Usuario</router-link>
                <span>/</span>
                <strong class="final-path">Notificaciones</strong>
                <span>/</span>
            </div><br>
            
                <div class="table-responsive">
                <VueyeTable 
                :data="notificaciones" 
                :columns="columns" 
                title="Notificaciones"
                filter-by="estado">

                    <template v-slot:_id="{item}"> 
                        <template v-if="item.estado == 'Sin atender'">  
                            <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                <button v-on:click="atenderNotificacion(item._id)" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Aceptar"><i class="fas fa-check"></i></button>                                            
                            </div>
                        </template>
                        <template v-else>
                            <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                <button v-on:click="eliminarNotificacion(item._id)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                           
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
            notificaciones: [],
            storage:{},
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
                //console.log('se muestra el storage ',storage.email)
                this.getNotificaciones(this.storage.email)
            }
            } catch(e) {
                storage = {};
            }
        },
        getNotificaciones: async function(email){
            //console.log('Se ingresa a getnotificaciones y se muestra el email '+email)
            await axios.get('/api/alertas_notificaciones?correo_usuario='+email+'&tipo=Notificación')
            .then(res => {
                //console.log('Se muestra respuesta get ',res.data.content)
                this.notificaciones = res.data.content;                    
            })
            .catch(error => { console.log('Error en get notificaciones',error); });
        },
        atenderNotificacion: async function(id){
            //console.log('Se va a cambiar el estado de la Notificacion de usuario, id: ',id)
            await axios.put('/api/alertas_notificaciones/'+id,{estado: 'Atendido' },configG.headersDataBase)
                .then(res => { 
                    this.getNotificaciones(this.storage.email)
                    })
                .catch(error => { console.log('Error en cambiar estado',error); });
        },
        eliminarNotificacion: async function(id){
            await axios.delete('/api/alertas_notificaciones?_id='+id, configG.headersDataBase)
            .then(res => { 
                //console.log(res)
                this.getNotificaciones(this.storage.email)
                })
            .catch(error => { console.log('Error en eliminar notificacion',error); });
        }
    }
}
</script>