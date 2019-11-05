<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-sm-2 col-with-right-border">
                    <SidebarAdmin></SidebarAdmin>
                </div>
                <div class="col-sm-8">
                    <p>Descripción de las funciones que se pueden realizar en esta sección</p>
                    <div class="container">
                        <div class="accordion" id="accordionPU">
                            <!-- -->
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Recursos Telco
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionPU">
                                    <div class="card-body">
                                        <p>Infomación correspondiente a los recursos de la plataforma Telco 2.0</p>
                                        <h3>Recursos totales Telco</h3>
                                        <table class="table table-striped">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Blade</th>
                                                <th scope="col">Almacenamiento</th>
                                                <th scope="col">RAM</th>
                                                <th scope="col">CPU</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <th scope="row">1</th>
                                                <th scope="row">-</th>
                                                <th scope="row">-</th> 
                                                <th scope="row">-</th> 
                                                <th scope="row">-</th>                                                 
                                                </tr>                                                
                                            </tbody>
                                        </table>

                                        <h3>Info Recursos</h3>
                                        <div class="row">
                                            <div class="col">
                                                <h5>Almacenamiento</h5>

                                            </div>
                                            <div class="col">
                                                <h5>RAM</h5>

                                            </div>
                                            <div class="col">
                                                <h5>CPU</h5>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <!-- -->
                            <div class="card">
                                <div class="card-header" id="headingTwo">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Recursos de Usuarios
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionPU">
                                    <div class="card-body">
                                        
                                    </div>
                                </div>
                            </div>
                            <!-- -->
                            <div class="card">
                                <div class="card-header" id="headingFour">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Máquinas Virtuales
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionPU">
                                    <div class="card-body">
                                        
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="headingFive">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    Estadísticas de funcionamiento
                                    </button>
                                </h5>
                                </div>
                                <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionPU">
                                    <div class="card-body">
                                        
                                        
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

