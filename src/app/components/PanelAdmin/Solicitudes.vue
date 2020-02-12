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
                                <!-- Solicitud de Pool de recursos -->
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Solicitud de Pool de recursos
                                        </button>
                                    </h5>
                                    </div>
                                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionPU">
                                        <div class="card-body">
                                            <p>Lista de solicitudes de Pool de recursos</p>
                                            <table class="table-responsive-xl table-striped table-hover w-auto text-center">
                                                <thead class="thead-dark text-center">
                                                    <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Fecha solicitud</th>
                                                    <th scope="col">Usuario</th>
                                                    <th scope="col">Nombre Proyecto</th>
                                                    <th scope="col">Descripción</th>
                                                    <th scope="col">Tutor</th>
                                                    <th scope="col">Correo Tutor</th>
                                                    <th scope="col">Fecha Finalización</th>
                                                    <th scope="col">Estado</th>
                                                    <th scope="col">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(solicitud, index) in solicitudes" v-bind:key="solicitud.id">
                                                    <th>{{index+1}}</th>
                                                    <td>{{solicitud.fecha}}</td>
                                                    <td>-</td> 
                                                    <td>{{solicitud.nombre_proyecto}}</td>
                                                    <td>{{solicitud.descripcion}}</td>
                                                    <td>{{solicitud.tutor}}</td> 
                                                    <td>{{solicitud.correo_tutor}}</td> 
                                                    <td>{{solicitud.fecha_fin}}</td>                                                    
                                                        <template v-if="solicitud.estado === false">
                                                            <td>Sin resolver</td>                                                
                                                        </template>
                                                        <template v-else>
                                                            <td>Resuelto</td>
                                                        </template>                                                    
                                                    <td> <div class="btn-group-sm" role="group" aria-label="Basic example">                                                                                                            
                                                        <template v-if="solicitud.estado === false">
                                                            <button v-on:click="aceptarPool()" type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Aceptar"><i class="fas fa-check"></i></button>
                                                            <button v-on:click="negarPool()" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Rechazar"><i class="fas fa-times"></i></button>                                                
                                                        </template>
                                                        <template v-else>
                                                            <button v-on:click="eliminarSolicitud()" type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="fas fa-trash"></i></button>
                                                        </template>                                                        
                                                        </div>
                                                    </td>                                              
                                                    </tr>                                                
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- Solicitud de aumento de pool de recursos -->
                                <div class="card">
                                    <div class="card-header" id="headingTwo">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Solicitud de aumento de pool de recursos
                                        </button>
                                    </h5>
                                    </div>
                                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionPU">
                                        <div class="card-body">
                                            <p>Lista de solicitudes de Aumento de Pool de recursos</p>
                                            <table class="table-responsive-xl table-striped table-hover w-auto">
                                                <thead class="thead-dark text-center">
                                                    <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Usuario</th>
                                                    <th scope="col">Fecha solicitud</th>
                                                    <th scope="col">Motivo</th>
                                                    <th scope="col">Extensión de tiempo</th>
                                                    <th scope="col">Almacenamiento nuevo</th>
                                                    <th scope="col">RAM nueva</th>
                                                    <th scope="col">CPU nuevo</th>
                                                    <th scope="col">Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                    <th scope="row">1</th>
                                                    <td>-</td>
                                                    <td>-</td> 
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td> 
                                                    <td>-</td> 
                                                    <td>-</td>
                                                    <td> <button type="button" class="btn btn-success btn-xs">Resolver</button></td>                                              
                                                    </tr>                                                
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- Solicitud de backup -->
                                <div class="card">
                                    <div class="card-header" id="headingThree">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Solicitud de backup
                                        </button>
                                    </h5>
                                    </div>                              
                                    <div id="collapseThree" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionPU">
                                        <div class="card-body">
                                            <p>Lista de solicitudes de Backup</p>
                                            <table class="table-responsive-xl table-striped table-hover w-auto">
                                                <thead class="thead-dark text-center">
                                                    <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Usuario</th>
                                                    <th scope="col">Fecha solicitud</th>
                                                    <th scope="col">Máquina</th>
                                                    <th scope="col">Motivo</th>
                                                    <th scope="col">Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                    <th scope="row">1</th>
                                                    <td>-</td>
                                                    <td>-</td> 
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td> <button type="button" class="btn btn-success btn-xs">Resolver</button></td>                                              
                                                    </tr>                                                
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
        </section>
    </div>
</template>

<script>

import VueRouter from 'vue-router'
import axios from 'axios'
import SidebarAdmin from './SidebarAdmin.vue'

export default{
    data(){
        return{
            config:{
                headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            },
            solicitudes:[]
        }
    },
    created(){
        this.getSolicitudesPool();

    },
    components:{
        'SidebarAdmin': SidebarAdmin
    },
    methods:{
        getSolicitudesPool: async function(){
            console.log('Se ingresa a getSolicitudesPool')
            await axios.get('/api/solicitudes')
            .then(res => {
                console.log('Se muestra respuesta get')
                console.log(res);
                //this.solicitudes = res.data;                    
            })
            .catch(error => { console.log('Error ',error); });
        },
        //Acciones
        aceptarPool: async function(){
            console.log('Se ingresa a aceptarPool')

        },
        negarPool: async function(){
            console.log('Se ingresa a negarPool')

        },
        eliminarSolicitud: async function(){
            console.log('Se ingresa a eliminarSolicitud')

        }

    }
}
</script>
    <!--   -->

