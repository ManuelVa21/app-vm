<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-sm-2 col-with-right-border">
                    <SidebarAdmin></SidebarAdmin>
                </div>
                <div class="col-sm-8">
                    <div class="panel panel-info">
                        <p>Descripción de las funciones que se pueden realizar en esta sección</p>
                        <div class="container">
                            <div class="accordion" id="accordionPU">
                                <!-- Sugerencias -->
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                    <h5 class="mb-0">
                                        <button v-on:click="getSugerencias()" class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Sugerencias
                                        </button>
                                    </h5>
                                    </div>
                                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionPU">
                                        <div class="card-body">
                                            <p>Lista de Sugerencias</p>
                                            <div class="table-responsive">
                                            <table class="table table-striped table-hover w-auto">
                                                <thead class="thead-dark text-center">
                                                    <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Usuario</th>
                                                    <th scope="col">Fecha</th>
                                                    <th scope="col">Descripción</th>
                                                    <th scope="col">Estado</th>
                                                    <th scope="col">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-for="(sugerencia, index) in sugerencias" v-bind:key="sugerencia._id">
                                                    <template v-if="sugerencia.estado === 'Sin atender'">
                                                        <tr class="table-danger">
                                                            <th>{{index+1}}</th>
                                                            <td>{{sugerencia.usuario}}</td>
                                                            <td>{{sugerencia.fecha}}</td>
                                                            <td>{{sugerencia.descripcion}}</td>
                                                            <td>{{sugerencia.estado}}</td>                                                   
                                                            <td> 
                                                                <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                                                    <button v-on:click="cambiarEstado(sugerencia._id,'Atendiendo')" type="button" class="btn btn-warning" data-toggle="tooltip" data-placement="top" title="Atendiendo"><i class="fas fa-spinner"></i></button>
                                                                    <button v-on:click="cambiarEstado(sugerencia._id,'Atendido')" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Atendido"><i class="fas fa-check"></i></button>                                            
                                                                </div>
                                                            </td>                                              
                                                        </tr>  
                                                    </template>
                                                    <template v-else-if="sugerencia.estado === 'Atendiendo'">
                                                        <tr class="table-warning">
                                                            <th>{{index+1}}</th>
                                                            <td>{{sugerencia.usuario}}</td>
                                                            <td>{{sugerencia.fecha}}</td>
                                                            <td>{{sugerencia.descripcion}}</td>
                                                            <td>{{sugerencia.estado}}</td>                                                   
                                                            <td> 
                                                                <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                                                    <button v-on:click="cambiarEstado(sugerencia._id,'Atendido')" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Terminado"><i class="fas fa-check"></i></button>                                            
                                                                </div>
                                                            </td>                                              
                                                        </tr>  
                                                    </template>
                                                    <template v-else>
                                                        <tr class="table-success">
                                                            <th>{{index+1}}</th>
                                                            <td>{{sugerencia.usuario}}</td>
                                                            <td>{{sugerencia.fecha}}</td>
                                                            <td>{{sugerencia.descripcion}}</td>
                                                            <td>{{sugerencia.estado}}</td>                                                   
                                                            <td> 
                                                                <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                                                    <button v-on:click="eliminar(sugerencia._id)" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>                                            
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
                        </div>                     
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import VueRouter from 'vue-router'
import axios from 'axios'
import SidebarAdmin from './SidebarAdmin.vue'
const configG = require('../../../config')

export default{
    data(){
        return{
            sugerencias: [],
        }

    },
    components:{
        'SidebarAdmin': SidebarAdmin
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
                    console.log(res)
                    })
                .catch(error => { console.log('Error en cambiar estado',error); });

        },
        eliminar: async function(id){
            //console.log('Se ingresa a eliminar sugerencia')
            await axios.delete('/api/sugerencias?_id='+id, configG.headersDataBase)
            .then(res => { 
                //console.log(res)
                this.getSugerencias()
                })
            .catch(error => { console.log('Error en eliminar sugerencia',error); });
        }

    }
}
</script>
    <!--   -->
