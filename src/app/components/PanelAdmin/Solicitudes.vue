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
                                            <table class="table-responsive-xl table-striped table-hover w-auto">
                                                <thead class="thead-dark text-center">
                                                    <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Usuario</th>
                                                    <th scope="col">Fecha solicitud</th>
                                                    <th scope="col">Fecha finalización</th>
                                                    <th scope="col">SO</th>
                                                    <th scope="col">Versión</th>
                                                    <th scope="col">Almacenamiento</th>
                                                    <th scope="col">RAM</th>
                                                    <th scope="col">CPU</th>
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
                                                    <td>-</td>
                                                    <td> <button type="button" class="btn btn-success btn-xs">Resolver</button></td>                                              
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
    components:{
        'SidebarAdmin': SidebarAdmin
    }
}
</script>
    <!--   -->

