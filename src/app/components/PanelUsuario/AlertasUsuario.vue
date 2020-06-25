<template>
    <div>
        <section>
            <div class="row">
                <div class="col-sm-2 col-with-right-dorder">
                    <SidebarUsuario></SidebarUsuario> 
                </div>
                <div class="col-sm-8">
                    <p>Descripción de las funciones que se pueden realizar en esta sección</p>
                    <!--<div class="container">
                        <div class="accordion" id="accordionA">
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button v-on:click="getNotificaciones(storage.email)" class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Alertas y notificaciones
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
                                                <template v-if="notificacion.estado === false">
						                            <tr class="table-danger">
                                                    <th>{{index+1}}</th>
                                                    <td>{{notificacion.tipo}}</td>
                                                    <td>{{notificacion.fecha}}</td>
                                                    <td>{{notificacion.descripcion}}</td>
                                                    <td>Sin Atender</td>
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
                                                    <td>Atendido</td>
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
                        </div> 
                    </div>-->
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
        }
    },
    created(){
    },
    components:{
        'SidebarUsuario': SidebarUsuario  
    },
    methods:{
        
    }
}
</script>