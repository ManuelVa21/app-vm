<template>
    <div>
        <section>
            <div class="row">
                <div class="col-sm-2 col-with-right-dorder">
                    <SidebarUsuario></SidebarUsuario> 
                </div>
                <div class="col-sm-8">
                    <p>Descripción de las funciones que se pueden realizar en esta sección</p>
                    <div class="container">
                        <div class="accordion" id="accordionA">
                            <!-- Alertas al usuario -->
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button v-on:click="getNotificaciones(storage.email)" class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Notificaciones
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionA">
                                    <div class="card-body">
                                        <p>Esta es la lista de alertas y su respectivo estado:</p>
                                        <h3>Alertas</h3>
                                        <div class="table-responsive">
                                        <table class="table table-striped table-hover w-auto">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Tipo</th>
                                                <th scope="col">Fecha</th>
                                                <th scope="col">Descripción</th>
                                                <th scope="col">Estado</th>
                                                <th scope="col">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody v-for="(notificacion, index) in notificaciones" v-bind:key="notificacion._id">
                                                <template v-if="notificacion.estado === 'Sin atender'">
						                            <tr class="table-danger">
                                                    <th>{{index+1}}</th>
                                                    <td>{{notificacion.tipo}}</td>
                                                    <td>{{notificacion.fecha}}</td>
                                                    <td>{{notificacion.descripcion}}</td>
                                                    <td>{{notificacion.estado}}</td>
                                                    <td>
                                                        <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                                            <button v-on:click="atenderNotificacion(notificacion)" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Aceptar"><i class="fas fa-check"></i></button>
                                                        </div>
                                                    </td>
                                                    </tr>
                                                </template>
                                                <template v-else>
                                                    <tr class="table-success">
                                                    <th>{{index+1}}</th>
                                                    <td>{{notificacion.tipo}}</td>
                                                    <td>{{notificacion.fecha}}</td>
                                                    <td>{{notificacion.descripcion}}</td>
                                                    <td>{{notificacion.estado}}</td>
                                                    <td>
                                                        <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                                            <button v-on:click="eliminarNotificacion(notificacion)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                        
                                                        </div>
                                                    </td>
                                                    </tr>
                                                    </template>                                                
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><!-- Fin card -->
                    </div>
                </div>
            </div> 
        </section>
    </div>
</template>

<script>
import VueRouter from 'vue-router'
import axios from 'axios'
import SidebarUsuario from './SidebarUsuario.vue'
const configG = require('../../../config')

export default {
    data(){
        return{
            notificaciones: [],
            storage:{},
        }
    },
    created(){
        this.getStorage();
    },
    components:{
        'SidebarUsuario': SidebarUsuario  
    },
    methods:{
        getStorage: async function(){
            //console.log('Se ingresa a get storage')            
            var storage;
            try {
            if (localStorage.getItem) {
                this.storage = JSON.parse(localStorage.getItem('userInfo'))
                //console.log('Se muestra el storage '+storage)
            }
            } catch(e) {
                storage = {};
            }
        },
        getNotificaciones: async function(email){
            //console.log('Se ingresa a getnotificaciones y se muestra el email '+email)
            await axios.get('/api/alertas_notificaciones?correo_usuario='+email)
            .then(res => {
                //console.log('Se muestra respuesta get')
                //console.log(res.data.content);
                this.notificaciones = res.data.content;                    
            })
            .catch(error => { console.log('Error en get notificaciones',error); });
        },
        atenderNotificacion: async function(info){
            console.log('Se va a cambiar el estado de la solicitud')
            await axios.put('/api/alertas_notificaciones/'+info._id,{estado: 'Atendido' },configG.headersDataBase)
                .then(res => { 
                    this.getNotificaciones(info.correo_usuario)
                    })
                .catch(error => { console.log('Error en cambiar estado',error); });
        },
        eliminarNotificacion: async function(info){
            await axios.delete('/api/alertas_notificaciones?_id='+info._id, configG.headersDataBase)
            .then(res => { 
                //console.log(res)
                this.getNotificaciones(info.correo_usuario)
                })
            .catch(error => { console.log('Error en eliminar solicitud',error); });
        }
    }
}
</script>