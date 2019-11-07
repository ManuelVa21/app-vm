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
                                        <h3>Recursos Totales Telco</h3>
                                        <table class="table-responsive-xl table-striped table-hover w-auto">
                                            <thead class="thead-dark">
                                                <tr>                                                
                                                <th scope="col">Almacenamiento</th>
                                                <th scope="col">Almacenamiento libre</th>
                                                <th scope="col">RAM</th>
                                                <th scope="col">RAM libre</th>
                                                <th scope="col">CPU</th>
                                                <th scope="col">CPU libre</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <th scope="row">-</th> 
                                                <th scope="row">-</th> 
                                                <th scope="row">-</th>
                                                <th scope="row">-</th> 
                                                <th scope="row">-</th> 
                                                <th scope="row">-</th>                                                   
                                                </tr>                                                
                                            </tbody>
                                        </table>

                                        <h3>Info Recursos Blade</h3>
                                        <div class="col">
                                            <div class="row-group text-center">
                                                <h4>Almacenamiento</h4>
                                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                                    <label class="btn btn-secondary active btn-sm">
                                                        <input type="radio" name="options" id="option1" autocomplete="off" checked> Blade 1
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option2" autocomplete="off"> Blade 2
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option3" autocomplete="off"> Blade 3
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option4" autocomplete="off"> Blade 4
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option5" autocomplete="off"> Blade 5
                                                    </label>
                                                </div>
                                                <div class="Chart">
                                                <h5 style="text-align:center;">Grafico</h5>
                                                <LineChart/>
                                                </div>                                                                                               
                                            </div>
                                            <br>
                                            <div class="row-group text-center">
                                                <h4>RAM</h4>
                                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                                    <label class="btn btn-secondary active btn-sm">
                                                        <input type="radio" name="options" id="option1" autocomplete="off" checked> Blade 1
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option2" autocomplete="off"> Blade 2
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option3" autocomplete="off"> Blade 3
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option4" autocomplete="off"> Blade 4
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option5" autocomplete="off"> Blade 5
                                                    </label>
                                                </div>
                                                <div class="Chart">
                                                <h5 style="text-align:center;">Grafico</h5>
                                                <LineChart/>
                                                </div> 

                                            </div>
                                            <br>
                                            <div class="row-group text-center">
                                                <h4>CPU</h4>
                                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                                    <label class="btn btn-secondary active btn-sm">
                                                        <input type="radio" name="options" id="option1" autocomplete="off" checked> Blade 1
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option2" autocomplete="off"> Blade 2
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option3" autocomplete="off"> Blade 3
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option4" autocomplete="off"> Blade 4
                                                    </label>
                                                    <label class="btn btn-secondary btn-sm">
                                                        <input type="radio" name="options" id="option5" autocomplete="off"> Blade 5
                                                    </label>
                                                </div>
                                                <div class="Chart">
                                                <h5 style="text-align:center;">Grafico</h5>
                                                <LineChart/>
                                                </div> 
                                            </div>
                                            <br>
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
                                        <table class="table-responsive-xl table-striped table-hover w-auto">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Propietario</th>
                                                <th scope="col">Proyecto</th>
                                                <th scope="col">Descripción</th>
                                                <th scope="col">Almacenamiento</th>
                                                <th scope="col">RAM</th>
                                                <th scope="col">CPU</th>
                                                <th scope="col">#máquinas</th>
                                                <th scope="col">Fecha Inicio</th>
                                                <th scope="col">Fecha fin</th>
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
                                                <td>-</td>                                              
                                                </tr>                                                
                                            </tbody>
                                        </table>
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
                                        <table class="table-responsive-xl table-striped table-hover w-auto">
                                            <thead class="thead-dark">
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Propietario</th>
                                                <th scope="col">Nombre VM</th>
                                                <th scope="col">SO</th>
                                                <th scope="col">Versión</th>
                                                <th scope="col">Almacenamiento</th>
                                                <th scope="col">RAM</th>
                                                <th scope="col">CPU</th>
                                                <th scope="col">Interfaces</th>
                                                <th scope="col">IP</th>
                                                <th scope="col">Blade</th>
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
                                                <td>-</td>
                                                <td>-</td>  
                                                <td>
                                                    <div class="btn-group-sm" role="group" aria-label="Basic example">
                                                    <button type="button" class="btn btn-success">Encender</button>
                                                    <button type="button" class="btn btn-danger">Apagar</button>
                                                </div>   
                                                </td>                                            
                                                </tr> 
                                                                                            
                                            </tbody>
                                        </table>                                                                                
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
                                        <p>Definir cuales son las Estadísticas que se van a presentar inicialmente</p>
                                        
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
import LineChart from './Chart/LineChart.vue'

export default{
    components:{
        'SidebarAdmin': SidebarAdmin,
        'LineChart': LineChart
    },
    
    
}
</script>
    <!--   -->

